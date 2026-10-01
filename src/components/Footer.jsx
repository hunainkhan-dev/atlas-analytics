import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-xs font-bold text-bg">A</span>
          <span className="text-ink">Atlas</span>
        </div>
        <p>© {new Date().getFullYear()} Atlas Analytics — a portfolio case study, not a real product.</p>
        <div className="flex gap-6">
          <Link to="/dashboard" className="hover:text-ink">Dashboard</Link>
          <Link to="/customers" className="hover:text-ink">Customers</Link>
        </div>
      </div>
    </footer>
  );
}
