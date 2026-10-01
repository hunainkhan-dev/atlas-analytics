import { lazy, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { features } from '../data.js';

const DataViz = lazy(() => import('../three/DataViz.jsx'));

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
const ease = [0.33, 1, 0.68, 1];

export default function Home() {
  const reduced = useReducedMotion();
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const id = requestAnimationFrame(() => setShow3D(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  return (
    <motion.div {...page}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {show3D && !reduced && (
          <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
            <Suspense fallback={null}>
              <DataViz />
            </Suspense>
          </div>
        )}
        <div className="absolute -right-40 top-0 z-0 h-96 w-96 rounded-full bg-brand/20 blur-[130px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs text-muted backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-pos" /> Live · analytics for SaaS founders
          </motion.div>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            The metric that matters,
            <br />
            <span className="text-brand">before anything else.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Atlas shows the three numbers that move your business today — not the forty charts
            most dashboards drown you in. Hand-built, fast, and honest.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/dashboard"
              data-cursor="Open"
              className="group inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-bg transition-transform hover:scale-[1.03]"
            >
              Open the dashboard
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/customers" className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-ink hover:border-brand/60">
              View customers
            </Link>
          </div>

          {/* 3D caption */}
          <p className="mt-16 max-w-xs text-xs text-muted">
            ↑ A live WebGL revenue landscape — rendered in real time in your browser.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="rounded-2xl border border-line bg-card p-6"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Check className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 to-transparent p-10 md:p-16">
          <h2 className="max-w-2xl text-3xl font-bold md:text-5xl">Stop reading dashboards. Start reading your business.</h2>
          <p className="mt-4 max-w-lg text-muted">Open the live demo dashboard — mock data, real interactions.</p>
          <Link
            to="/dashboard"
            data-cursor="Open"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-bg transition-transform hover:scale-[1.03]"
          >
            Open the dashboard <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
