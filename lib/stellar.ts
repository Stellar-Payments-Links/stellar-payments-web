"use client";

const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || "https://horizon-testnet.stellar.org";
const WALLET_KEY = "stellar_payments_wallet";

export type LocalWallet = {
  publicKey: string;
  secret: string;
};

let server: any = null;

async function getStellarSdk() {
  const stellar = await import("stellar-sdk");
  return stellar;
}

async function getServer() {
  if (!server) {
    const stellar = await getStellarSdk();
    const stellarAny = stellar as any;
    const Server = stellarAny.Horizon?.Server || stellarAny.Server || stellarAny.Horizon;
    server = new Server(HORIZON_URL);
  }
  return server;
}

export async function createWallet(): Promise<LocalWallet> {
  const stellar = await getStellarSdk();
  const Keypair = stellar.Keypair;
  const pair = Keypair.random();
  const wallet = { publicKey: pair.publicKey(), secret: pair.secret() };
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
  return wallet;
}

export async function importWallet(secret: string): Promise<LocalWallet> {
  const stellar = await getStellarSdk();
  const Keypair = stellar.Keypair;
  const pair = Keypair.fromSecret(secret.trim());
  const wallet = { publicKey: pair.publicKey(), secret: pair.secret() };
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
  return wallet;
}

export function getWallet(): LocalWallet | null {
  const raw = localStorage.getItem(WALLET_KEY);
  return raw ? (JSON.parse(raw) as LocalWallet) : null;
}

export async function buildAndSubmitPayment(params: {
  sourceSecret: string;
  destination: string;
  amount: string;
  memo?: string;
}) {
  const stellar = await getStellarSdk();
  const Keypair = stellar.Keypair;
  const Networks = stellar.Networks;
  const Operation = stellar.Operation;
  const TransactionBuilder = stellar.TransactionBuilder;
  const Asset = stellar.Asset;
  const Memo = stellar.Memo;

  const source = Keypair.fromSecret(params.sourceSecret);
  const server = await getServer();
  const account = await server.loadAccount(source.publicKey());

  const txBuilder = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET
  }).addOperation(
    Operation.payment({
      destination: params.destination,
      asset: Asset.native(),
      amount: params.amount
    })
  );

  if (params.memo) txBuilder.addMemo(Memo.text(params.memo));

  const tx = txBuilder.setTimeout(30).build();
  tx.sign(source);
  return server.submitTransaction(tx);
}
