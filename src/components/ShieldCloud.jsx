import { useEffect, useRef } from "react";

/* Das Netz-Schild aus dem ITx-Logo setzt sich beim Laden zusammen. Danach wächst von innen nach außen
   ein Spinnennetz in Schildform mit den Fachbegriffen. Mit jedem Pulsschlag des Kerns läuft eine Welle
   nach außen, Impulse tragen die Begriffe über die Fäden zum Kern. */

// Knoten und Kanten nach dem Logo (Koordinaten aus der Vorlage). dot: 0 = reiner Linienpunkt
const N = {
  a: [193, 411], b: [40, 465], c: [347, 466], d: [193, 487], e: [120, 527], f: [271, 533], g: [40, 551],
  h: [194, 589], i: [54, 636], j: [341, 611], k: [263, 633], l: [138, 668], m: [106, 731], n: [283, 731], o: [193, 787],
  p: [108, 440, 0], q: [277, 446, 0], r: [343, 549, 0]
};
const EDGES = ("ap pb aq qc bg gi im mo on nj jr rc be pe ea ad af qd de df fc fr ge dh eh hk hl ei el " +
  "fk fj il lm lk ln kj kn ko lo").split(" ");
const CORE = "h";
const MID = [193.5, 599], SPAN_W = 330, SPAN_H = 392;

const WORDS = ["MICROSERVICES", "ZERO TRUST", "CLOUD", "TARA", "API", "ISO 27001", ["KI", "AI"], "SAP",
  ["LOGISTIK", "LOGISTICS"], "OWASP", "NIST", "DEVSECOPS", "LLM", "INTEGRATION", "SCRUM", "CX"];

// Netz: zwei größere Schildumrisse um das Logo, Fäden von jedem Randknoten nach außen
const OUTLINE = "acjnomigb".split("");
const R1 = 1.2, R2 = 1.38;
const grow = (key, f) => [MID[0] + (N[key][0] - MID[0]) * f, MID[1] + (N[key][1] - MID[1]) * f];
// Begriffe sitzen außen: auf den Ecken und Kantenmitten des äußeren Umrisses (zwei Mitten bleiben frei)
const OUTER = OUTLINE.flatMap((k, i) => {
  const a = grow(k, R2), b = grow(OUTLINE[(i + 1) % OUTLINE.length], R2);
  return [{ at: a, spoke: i }, { at: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], spoke: i, mid: true }];
});
const FREE = [5, 13];
const LABELED = OUTER.map((_, i) => i).filter(i => !FREE.includes(i));

// kürzester Weg vom Randknoten zum Kern, entlang der Schildkanten
const toCore = start => {
  const prev = { [start]: null }, queue = [start];
  while (queue.length) {
    const k = queue.shift();
    for (const [a, b] of EDGES) {
      const n = a === k ? b : b === k ? a : null;
      if (n && !(n in prev)) { prev[n] = k; queue.push(n); }
    }
  }
  const path = [];
  for (let k = CORE; k; k = prev[k]) path.unshift(k);
  return path;
};
const ROUTES = OUTLINE.map(toCore);

const ease = t => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));
const rand = (a, b) => a + Math.random() * (b - a);

export default function ShieldCloud() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = false, t0 = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const keys = Object.keys(N);
    // Startlage: irgendwo in der Wolke
    const start = Object.fromEntries(keys.map((k, i) => [k, { x: rand(0.02, 0.98), y: rand(0.02, 0.98), delay: rand(0, 0.7), ph: i * 1.7 }]));
    const pulses = Array.from({ length: 5 }, (_, i) => ({ edge: (i * 7) % EDGES.length, off: i / 5 }));
    const inbound = Array.from({ length: 3 }, (_, i) => ({ off: i / 3 }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const line = (a, b) => { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); };
    const disc = (p, r) => { ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); ctx.fill(); };

    const draw = now => {
      if (!w || !h) return;
      if (!t0) t0 = now;
      const t = reduce ? 10 : (now - t0) / 1000;
      const light = document.documentElement.dataset.theme === "light";
      const GOLD = light ? "133,101,32" : "201,170,110", LINE = light ? "16,24,48" : "248,249,250", MIST = light ? "74,88,108" : "169,180,194";
      const de = document.documentElement.lang === "de";
      pointer.x += (pointer.tx - pointer.x) * 0.05; pointer.y += (pointer.ty - pointer.y) * 0.05;

      // auch bei schmaler Fläche muss neben dem Netz Platz für die Begriffe bleiben
      const s = 0.7 * Math.min(w * 0.68 / SPAN_W, h * 0.7 / SPAN_H, (w - 160) / (SPAN_W * R2)); // Gesamtgröße um 30 % reduziert, Schrift bleibt 10px
      const form = ease((t - 0.35) / 2.2);
      const pos = {};
      for (const key of keys) {
        const st = start[key], k = ease((t - 0.2 - st.delay) / 1.9);
        const tx = w / 2 + (N[key][0] - MID[0]) * s + pointer.x * 14, ty = h / 2 + (N[key][1] - MID[1]) * s + pointer.y * 10;
        const float = reduce ? 0 : 1;
        pos[key] = {
          x: st.x * w + (tx - st.x * w) * k + Math.sin(t * 0.7 + st.ph) * 2.2 * float,
          y: st.y * h + (ty - st.y * h) * k + Math.cos(t * 0.6 + st.ph) * 2.2 * float
        };
      }

      // Linienpunkte ohne Knoten immer exakt auf ihrer Kante halten, sonst entstehen Knicke
      for (const [key, from, to, f] of [["p", "a", "b", 0.555], ["q", "a", "c", 0.545], ["r", "c", "j", 0.572]]) {
        pos[key] = { x: pos[from].x + (pos[to].x - pos[from].x) * f, y: pos[from].y + (pos[to].y - pos[from].y) * f };
      }

      ctx.clearRect(0, 0, w, h);

      // Spinnennetz in Schildform: erst nach dem Schild, von innen nach außen
      const g1 = ease((t - 2.2) / 0.9), g2 = ease((t - 2.8) / 1.1);
      const place = ([x, y], depth, ph) => ({
        x: w / 2 + (x - MID[0]) * s + pointer.x * depth + (reduce ? 0 : Math.sin(t * 0.7 + ph) * 1.8),
        y: h / 2 + (y - MID[1]) * s + pointer.y * depth * 0.7 + (reduce ? 0 : Math.cos(t * 0.6 + ph) * 1.8)
      });
      const mix = (a, b, k) => ({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
      const ring1 = OUTLINE.map((k, i) => mix(pos[k], place(grow(k, R1), 11, i * 1.3), g1));
      const ring2 = OUTLINE.map((k, i) => mix(ring1[i], place(grow(k, R2), 8, i * 2.1), g2));
      const outer = OUTER.map(o => (o.mid ? mix(ring2[o.spoke], ring2[(o.spoke + 1) % OUTLINE.length], 0.5) : ring2[o.spoke]));

      // Puls-Welle: startet mit jedem Herzschlag am Kern; f ist ihre Größe im Verhältnis zum Schild
      const waveOn = !reduce && t > 3.9;
      const phase = ((t * 1.8) / (Math.PI * 2) + 0.25) % 1, f = 0.15 + phase * 1.6;
      const lit = r => (waveOn && f >= r ? Math.exp(-(f - r) * 7) : 0);

      ctx.lineWidth = 0.8;
      for (const [ring, r, g] of [[ring1, R1, g1], [ring2, R2, g2]]) {
        ring.forEach((p, i) => {
          const q = ring[(i + 1) % ring.length];
          ctx.strokeStyle = `rgba(${MIST},${0.26 * g})`; line(p, q);
          if (lit(r) > 0.02) { ctx.strokeStyle = `rgba(${GOLD},${0.6 * lit(r) * g})`; line(p, q); }
        });
      }
      OUTLINE.forEach((k, i) => {
        ctx.strokeStyle = `rgba(${MIST},${0.26 * g1})`; line(pos[k], ring1[i]);
        ctx.strokeStyle = `rgba(${MIST},${0.26 * g2})`; line(ring1[i], ring2[i]);
        ctx.fillStyle = `rgba(${MIST},${0.55 * g1})`; disc(ring1[i], 1.4);
      });

      outer.forEach((p, i) => {
        const glow = lit(R2);
        const n = LABELED.indexOf(i);
        ctx.fillStyle = `rgba(${MIST},${0.65 * g2})`; disc(p, 1.7);
        if (glow > 0.02) { ctx.fillStyle = `rgba(${GOLD},${glow})`; disc(p, 1.7 + 1.6 * glow); }
        if (n < 0 || w <= 380) return;
        const word = WORDS[n], txt = Array.isArray(word) ? word[de ? 0 : 1] : word;
        ctx.font = "500 10px 'Geist Mono Variable', ui-monospace, monospace";
        const tw = ctx.measureText(txt).width, dx = OUTER[i].at[0] - MID[0], dy = OUTER[i].at[1] - MID[1];
        let x = Math.abs(dx) < 45 ? p.x - tw / 2 : dx > 0 ? p.x + 8 : p.x - 8 - tw;
        const y = Math.abs(dx) < 45 ? p.y + (dy < 0 ? -9 : 16) : p.y + 3;
        x = Math.max(2, Math.min(w - tw - 2, x));
        ctx.fillStyle = `rgba(${MIST},${0.7 * g2})`; ctx.fillText(txt, x, y);
        if (glow > 0.02) { ctx.fillStyle = `rgba(${GOLD},${glow})`; ctx.fillText(txt, x, y); }
      });

      // die Welle selbst, in Schildform
      if (waveOn) {
        ctx.beginPath();
        OUTLINE.forEach((k, i) => {
          const x = w / 2 + (N[k][0] - MID[0]) * s * f + pointer.x * 11, y = h / 2 + (N[k][1] - MID[1]) * s * f + pointer.y * 8;
          if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = `rgba(${GOLD},${0.35 * (1 - phase) * Math.min(1, phase * 8)})`; ctx.lineWidth = 1.4; ctx.stroke();
      }

      // Schild
      const core = pos[CORE];

      ctx.lineCap = "round";
      ctx.lineWidth = Math.max(1.2, 4.2 * s);
      ctx.strokeStyle = `rgba(${LINE},${0.08 + 0.62 * form})`;
      for (const [a, b] of EDGES) line(pos[a], pos[b]);

      // Impulse laufen entlang der Kanten Richtung Kern
      if (!reduce && form > 0.98) {
        for (const pu of pulses) {
          const raw = t * 0.45 + pu.off, k = raw % 1;
          const [a, b] = EDGES[(pu.edge + Math.floor(raw) * 11) % EDGES.length];
          const near = key => Math.hypot(N[key][0] - N[CORE][0], N[key][1] - N[CORE][1]);
          const [from, to] = near(a) > near(b) ? [pos[a], pos[b]] : [pos[b], pos[a]];
          const p = { x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k };
          ctx.fillStyle = `rgba(${GOLD},${0.25 * Math.sin(k * Math.PI)})`; disc(p, 9 * s);
          ctx.fillStyle = `rgba(${GOLD},${Math.sin(k * Math.PI)})`; disc(p, 3.5 * s);
        }
      }

      // Impulse von den Begriffen über die Fäden ins Schild bis zum Kern
      if (!reduce && t > 4) {
        inbound.forEach((pu, j) => {
          const raw = (t - 4) * 0.26 + pu.off, k = raw % 1;
          const from = LABELED[(Math.floor(raw) * 7 + j * 5) % LABELED.length], o = OUTER[from];
          const path = [outer[from], ...(o.mid ? [ring2[o.spoke]] : []), ring1[o.spoke], ...ROUTES[o.spoke].map(key => pos[key])];
          const len = path.slice(1).map((p, i) => Math.hypot(p.x - path[i].x, p.y - path[i].y));
          let d = k * len.reduce((a, b) => a + b, 0), i = 0;
          while (i < len.length - 1 && d > len[i]) d -= len[i++];
          const p = mix(path[i], path[i + 1], len[i] ? Math.min(1, d / len[i]) : 0);
          const a = Math.min(1, Math.sin(k * Math.PI) * 2.5);
          ctx.fillStyle = `rgba(${GOLD},${0.25 * a})`; disc(p, 7);
          ctx.fillStyle = `rgba(${GOLD},${a})`; disc(p, 2.6);
        });
      }

      for (const key of keys) {
        if (key === CORE || N[key][2] === 0) continue;
        ctx.fillStyle = `rgba(${LINE},${0.45 + 0.5 * form})`; disc(pos[key], Math.max(2.4, 12.5 * s * (0.5 + 0.5 * form)));
      }
      const beat = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(t * 1.8);
      ctx.strokeStyle = `rgba(${GOLD},${(0.55 - 0.45 * beat) * form})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(core.x, core.y, (24 + 22 * beat) * s, 0, 6.283); ctx.stroke();
      ctx.fillStyle = `rgb(${GOLD})`; disc(core, Math.max(5, 21 * s));

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const redraw = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };
    const onMove = e => { pointer.tx = e.clientX / window.innerWidth - 0.5; pointer.ty = e.clientY / window.innerHeight - 0.5; };
    const ro = new ResizeObserver(() => { resize(); redraw(); });
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) redraw(); });
    const mo = new MutationObserver(redraw); // Theme-/Sprachwechsel auch ohne Animation

    resize(); ro.observe(canvas); io.observe(canvas);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "lang"] });
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); window.removeEventListener("pointermove", onMove); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
