// SVG chart helpers.

export function areaPath(data, w, h, pad = 4) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => [pad + i * step, h - pad - ((v - min) / span) * (h - pad * 2)]);
  const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${line} L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
  return { line, area, pts };
}

export function heat(v) {
  const a = (v / 100) * 0.85 + 0.08;
  return `rgba(59,130,246,${a.toFixed(2)})`;
}
