import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { months, mrrSeries, stats, cohorts, retention, activity } from '../data.js';
import { areaPath, heat } from '../charts.js';

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Dashboard() {
  const [range, setRange] = useState('12M');
  const sliced = range === '3M' ? mrrSeries.slice(-3) : range === '6M' ? mrrSeries.slice(-6) : mrrSeries;
  const labels = months.slice(months.length - sliced.length);
  const chart = areaPath(sliced, 640, 200);

  return (
    <motion.div {...page} className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted">Welcome back — here's what moved today.</p>
      </div>

      {/* Hero metric + chart */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">Monthly Recurring Revenue</p>
            <div className="mt-1 flex items-end gap-3">
              <span className="font-mono text-4xl font-bold md:text-5xl">$84,200</span>
              <span className="mb-1 flex items-center gap-1 text-sm text-pos">
                <ArrowUpRight className="h-4 w-4" /> 21.4% vs last month
              </span>
            </div>
          </div>
          <div className="flex rounded-lg border border-line p-1">
            {['3M', '6M', '12M'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded px-3 py-1 text-xs transition-colors ${range === r ? 'bg-brand text-bg' : 'text-muted'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <svg viewBox="0 0 640 200" className="w-full" preserveAspectRatio="none" style={{ height: 200 }}>
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path key={`a-${range}`} d={chart.area} fill="url(#fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
            <motion.path
              key={`l-${range}`}
              d={chart.line}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            {chart.pts.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#0a0e17" stroke="#3b82f6" strokeWidth="2" />
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-[10px] text-muted">
            {labels.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border border-line bg-card p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted">{s.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-mono text-2xl font-bold">{s.value}</span>
              <span className={`flex items-center gap-1 text-xs ${s.up ? 'text-pos' : 'text-neg'}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.delta}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Cohort heatmap */}
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Retention by cohort</h3>
              <p className="text-xs text-muted">% of users active, months since signup</p>
            </div>
            <span className="text-xs text-muted">Live</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-separate" style={{ borderSpacing: 4 }}>
              <thead>
                <tr>
                  <th className="text-left text-xs font-normal text-muted"></th>
                  {retention[0].map((_, i) => (
                    <th key={i} className="text-xs font-normal text-muted">M{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {retention.map((row, r) => (
                  <tr key={r}>
                    <td className="pr-2 text-xs text-muted">{cohorts[r]}</td>
                    {row.map((v, c) => (
                      <td key={c}>
                        <div
                          className="flex h-9 items-center justify-center rounded text-[11px] font-medium"
                          style={{ background: heat(v), color: v > 55 ? '#0a0e17' : '#8493b0' }}
                          title={`${v}%`}
                        >
                          {v}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly read + activity */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-brand/30 bg-brand/[0.07] p-6">
            <div className="mb-3 flex items-center gap-2 text-brand">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Weekly read</span>
            </div>
            <p className="text-sm leading-relaxed text-ink/90">
              MRR is up <b>21.4%</b>, driven by 6 upgrades to Scale. Churn dropped to a 6-month low.
              Watch the <b>April cohort</b> — month-4 retention trails peers by 5 points. Consider a
              re-engagement email this week.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6">
            <h3 className="mb-4 font-semibold">Recent activity</h3>
            <div className="space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{a.who}</span> <span className="text-muted">{a.what}</span>
                    <div className="text-xs text-muted">{a.when}</div>
                  </div>
                  <span className={a.amt.startsWith('+') ? 'text-pos' : 'text-neg'}>{a.amt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
