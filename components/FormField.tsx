type Props = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, error, children }: Props) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-slate-300">{label}</span>
      {children}
      {error && <span className="text-xs text-rose-300">{error}</span>}
    </label>
  );
}
