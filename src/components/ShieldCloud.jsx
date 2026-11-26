import { useEffect, useRef } from "react";

/* Die Wolke aus Fachbegriffen setzt sich beim Laden zum Netz-Schild aus dem ITx-Logo zusammen.
   Danach schwebt das Schild leicht, Datenimpulse laufen zum goldenen Kern. */

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
    const dust = Array.from({ length: 46 }, (_, i) => {
      const a = (i / 46) * Math.PI * 2 + rand(-0.12, 0.12), r = rand(0.34, 0.5);
      return { x: 0.5 + Math.cos(a) * r, y: 0.5 + Math.sin(a) * r * 0.96, ph: rand(0, 6.28), word: i % 3 === 0 && i / 3 < WORDS.length ? WORDS[i / 3] : null };
    });
    const pulses = Array.from({ length: 5 }, (_, i) => ({ edge: (i * 7) % EDGES.length, off: i / 5 }));

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

      const s = Math.min(w * 0.68 / SPAN_W, h * 0.7 / SPAN_H);
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

      // umgebende Wolke mit Begriffen, schwach mit dem Schild verbunden
      const cloud = dust.map(d => ({
        x: d.x * w + (reduce ? 0 : Math.sin(t * 0.25 + d.ph) * 9) - pointer.x * 22,
        y: d.y * h + (reduce ? 0 : Math.cos(t * 0.22 + d.ph) * 9) - pointer.y * 16, word: d.word
      }));
      ctx.lineWidth = 0.7;
      cloud.forEach((p, i) => {
        const q = cloud[(i + 1) % cloud.length];
        ctx.strokeStyle = `rgba(${MIST},0.16)`; line(p, q);
        if (i % 4 === 0) {
          let best = null, bd = Infinity;
          for (const key of keys) { const dist = Math.hypot(pos[key].x - p.x, pos[key].y - p.y); if (dist < bd) { bd = dist; best = pos[key]; } }
          ctx.strokeStyle = `rgba(${MIST},${0.12 * form})`; line(p, best);
        }
        ctx.fillStyle = `rgba(${MIST},0.55)`; disc(p, 1.5);
        if (p.word && w > 380) {
          ctx.font = "500 10px 'Geist Mono Variable', ui-monospace, monospace";
          ctx.fillStyle = `rgba(${MIST},0.65)`;
          const txt = Array.isArray(p.word) ? p.word[de ? 0 : 1] : p.word;
          const left = p.x + 8 + ctx.measureText(txt).width > w;
          ctx.fillText(txt, left ? p.x - 8 - ctx.measureText(txt).width : p.x + 8, p.y + 3);
        }
      });

      // Schild
      const core = pos[CORE];
      const glow = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, 190 * s);
      glow.addColorStop(0, `rgba(${GOLD},${0.2 * form})`); glow.addColorStop(1, `rgba(${GOLD},0)`);
      ctx.fillStyle = glow; disc(core, 190 * s);

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
