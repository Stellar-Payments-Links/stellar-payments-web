const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type PaymentLink = {
  id: string;
  title: string;
  amount: string;
  destinationPublicKey: string;
  memo?: string;
  status: "pending" | "paid";
  createdAt: string;
};

export type TransactionRecord = {
  id: string;
  paymentId: string;
  txHash: string;
  amount: string;
  payerPublicKey: string;
  createdAt: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Request failed");
  }
  return res.json() as Promise<T>;
}

export const api = {
  createPaymentLink: (body: {
    title: string;
    amount: string;
    destinationPublicKey: string;
    memo?: string;
  }) => request<{ payment: PaymentLink }>("/payments", { method: "POST", body: JSON.stringify(body) }),

  getPaymentLink: (id: string) => request<{ payment: PaymentLink }>(`/payments/${id}`),

  processPayment: (body: { paymentId: string; txHash: string; payerPublicKey: string; amount: string }) =>
    request<{ success: boolean; transaction: TransactionRecord }>("/payments/pay", {
      method: "POST",
      body: JSON.stringify(body)
    }),

  getTransactions: () => request<{ transactions: TransactionRecord[] }>("/transactions")
};
