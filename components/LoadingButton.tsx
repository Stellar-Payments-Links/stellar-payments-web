"use client";

type Props = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function LoadingButton({ loading, children, className = "", type = "button", onClick, disabled }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center gap-2 rounded bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-500 disabled:opacity-60 ${className}`}
    >
      {loading && (
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          aria-hidden
        />
      )}
      {loading ? "Working..." : children}
    </button>
  );
}
