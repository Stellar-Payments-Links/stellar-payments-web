"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function PaymentQr({ url }: { url: string }) {
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(url, { width: 220, margin: 1 }).then(setDataUrl).catch(() => setDataUrl(""));
  }, [url]);

  if (!dataUrl) return null;

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <img src={dataUrl} alt="Payment QR code" className="rounded bg-white p-2" />
      <a href={dataUrl} download="payment-qr.png" className="text-xs text-cyan-300 hover:underline">
        Download QR
      </a>
    </div>
  );
}
