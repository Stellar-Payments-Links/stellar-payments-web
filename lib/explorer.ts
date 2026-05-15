export function stellarExpertTxUrl(txHash: string, network: "testnet" | "public" = "testnet") {
  return `https://stellar.expert/explorer/${network}/tx/${txHash}`;
}
