"use client";

import { Horizon, Keypair, Networks, Operation, TransactionBuilder, Asset, Memo } from "stellar-sdk";

const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || "https://horizon-testnet.stellar.org";
const NETWORK_PASSPHRASE = Networks.TESTNET;
const WALLET_KEY = "stellar_payments_wallet";

export type LocalWallet = {
  publicKey: string;
  secret: string;
};

const server = new Horizon.Server(HORIZON_URL);

export function createWallet(): LocalWallet {
  const pair = Keypair.random();
  const wallet = { publicKey: pair.publicKey(), secret: pair.secret() };
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
  return wallet;
}

export function importWallet(secret: string): LocalWallet {
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
  const source = Keypair.fromSecret(params.sourceSecret);
  const account = await server.loadAccount(source.publicKey());
  const txBuilder = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: NETWORK_PASSPHRASE
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
