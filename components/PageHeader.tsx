type Props = { title: string; subtitle?: string };

export function PageHeader({ title, subtitle }: Props) {
  return (
    <header className="mb-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
    </header>
  );
}
