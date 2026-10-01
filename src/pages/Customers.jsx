import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Search } from 'lucide-react';
import { customers } from '../data.js';

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const columns = [
  { key: 'name', label: 'Customer', align: 'left' },
  { key: 'plan', label: 'Plan', align: 'left' },
  { key: 'mrr', label: 'MRR', align: 'right' },
  { key: 'seats', label: 'Seats', align: 'right' },
  { key: 'health', label: 'Health', align: 'left' },
  { key: 'status', label: 'Status', align: 'left' },
];

const statusColor = {
  Active: 'text-pos bg-pos/10',
  'At risk': 'text-neg bg-neg/10',
  Trial: 'text-brand bg-brand/10',
};

export default function Customers() {
  const [sort, setSort] = useState({ key: 'mrr', dir: 'desc' });
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    const filtered = customers.filter((c) => !query || c.name.toLowerCase().includes(query) || c.plan.toLowerCase().includes(query));
    const sorted = [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [sort, q]);

  const toggle = (key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));

  return (
    <motion.div {...page} className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-muted">{rows.length} accounts · click a column to sort</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} maxLength={40} placeholder="Search customers…" className="a-input !pl-10 text-sm" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              {columns.map((c) => (
                <th key={c.key} className={`px-5 py-3 font-normal ${c.align === 'right' ? 'text-right' : 'text-left'}`}>
                  <button
                    onClick={() => toggle(c.key)}
                    className={`inline-flex items-center gap-1 transition-colors hover:text-ink ${sort.key === c.key ? 'text-ink' : ''} ${
                      c.align === 'right' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {c.label}
                    {sort.key === c.key && (sort.dir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.name} className="border-b border-line/50 last:border-0 hover:bg-panel/60">
                <td className="px-5 py-4 font-medium">{c.name}</td>
                <td className="px-5 py-4 text-muted">{c.plan}</td>
                <td className="px-5 py-4 text-right font-mono">${c.mrr}</td>
                <td className="px-5 py-4 text-right font-mono">{c.seats}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${c.health}%`, background: c.health > 70 ? '#34d399' : c.health > 50 ? '#3b82f6' : '#f87171' }}
                      />
                    </div>
                    <span className="text-xs text-muted">{c.health}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs ${statusColor[c.status] || 'text-muted bg-line/40'}`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="px-5 py-12 text-center text-muted">No customers match “{q}”.</p>}
      </div>
    </motion.div>
  );
}
