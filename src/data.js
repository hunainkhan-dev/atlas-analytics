// Atlas — mock analytics data (no backend).

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const mrrSeries = [42, 44, 43, 47, 52, 51, 58, 63, 66, 71, 78, 84];

export const stats = [
  { label: 'Active users', value: '12,480', delta: '+8.2%', up: true },
  { label: 'Churn rate', value: '2.1%', delta: '-0.4%', up: true },
  { label: 'Avg. revenue / user', value: '$68', delta: '+$6', up: true },
];

export const cohorts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
export const retention = [
  [100, 82, 71, 64, 58, 54],
  [100, 84, 74, 66, 61, 57],
  [100, 80, 69, 62, 56, 51],
  [100, 86, 77, 70, 65, 61],
  [100, 88, 79, 72, 67, 63],
  [100, 90, 82, 76, 71, 68],
];

export const activity = [
  { who: 'Acme Inc.', what: 'upgraded to Scale', when: '2m ago', amt: '+$490' },
  { who: 'Belfort Co.', what: 'new subscription', when: '14m ago', amt: '+$99' },
  { who: 'Corely', what: 'payment recovered', when: '1h ago', amt: '+$149' },
  { who: 'Dunbar', what: 'downgraded plan', when: '3h ago', amt: '-$50' },
];

export const features = [
  { title: 'One hero metric', desc: 'The number that matters today, framed before anything else can distract you.' },
  { title: 'Hand-built charts', desc: 'Every chart drawn from scratch in SVG — no library bloat, pixel-perfect on any screen.' },
  { title: 'Cohort retention', desc: 'A colour-scaled heatmap that shows exactly where users stick and where they slip.' },
  { title: '3D data hero', desc: 'A live WebGL revenue landscape — your growth, rendered in real time.' },
];

// Customers table (sortable)
export const customers = [
  { name: 'Acme Inc.', plan: 'Scale', mrr: 490, seats: 42, health: 96, status: 'Active' },
  { name: 'Belfort Co.', plan: 'Pro', mrr: 99, seats: 8, health: 74, status: 'Active' },
  { name: 'Corely', plan: 'Pro', mrr: 149, seats: 12, health: 88, status: 'Active' },
  { name: 'Dunbar', plan: 'Starter', mrr: 50, seats: 3, health: 41, status: 'At risk' },
  { name: 'Everly Labs', plan: 'Scale', mrr: 620, seats: 55, health: 91, status: 'Active' },
  { name: 'Foundry', plan: 'Pro', mrr: 149, seats: 10, health: 63, status: 'Active' },
  { name: 'Grove', plan: 'Starter', mrr: 29, seats: 2, health: 38, status: 'At risk' },
  { name: 'Halcyon', plan: 'Scale', mrr: 540, seats: 48, health: 84, status: 'Active' },
  { name: 'Ionic', plan: 'Pro', mrr: 99, seats: 7, health: 70, status: 'Active' },
  { name: 'Juno', plan: 'Starter', mrr: 50, seats: 4, health: 55, status: 'Trial' },
];
