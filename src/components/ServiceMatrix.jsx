import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import Icon from "./Icon.jsx";

import { pillars as rawPillars, aiVertical as rawAi } from "../data/services.js";
import { useLang } from "../i18n.jsx";

const WIDE = "(min-width: 1024px)";
function useWide() {
  const [wide, setWide] = useState(() => matchMedia(WIDE).matches);
  useEffect(() => {
    const mq = matchMedia(WIDE), on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

const Offer = ({ o }) => (
  <li className="flex gap-2.5"><Check size={16} className="mt-1 flex-none text-signal" /><span><span className="block text-sm font-semibold">{o.title}</span><span className="block text-sm text-mist">{o.text}</span></span></li>
);
const Message = ({ children }) => (
  <p className="flex items-start gap-2.5 rounded-xl border border-signal/30 bg-signal/10 px-4 py-3 text-snow"><Check size={16} className="mt-1 flex-none text-signal" /><span>{children}</span></p>
);

/* Drei Säulen als Zeilen, KI als senkrechter Balken daneben, Leistungen rechts.
   Unter 1024 px klappen die Leistungen direkt unter der angetippten Zeile auf. */
export default function ServiceMatrix({ T }) {
  const { L, lang } = useLang();
  const reduce = useReducedMotion();
  const wide = useWide();
  const pillars = L(rawPillars), ai = L(rawAi);
  const [sel, setSel] = useState("security");
  const shown = wide ? sel || "security" : sel; // am Desktop steht rechts immer etwas
  const rows = useRef({});
  const tapped = useRef(false);

  const pick = id => { tapped.current = true; setSel(s => (!wide && s === id ? null : id)); };
  // Handy: Beim Wechsel rutscht der Inhalt, die angetippte Zeile wieder in Sicht holen
  useEffect(() => {
    if (!tapped.current || wide || !sel) return;
    rows.current[sel]?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }, [sel]); // eslint-disable-line react-hooks/exhaustive-deps

  const detail = id => {
    if (id === "ai") return (
      <>
        <p className="hidden text-lg font-semibold lg:block">{ai.title}</p>
        <p className="mb-3 hidden text-signal lg:block">{ai.claim}</p>
        <div className="lg:mt-3"><Message>{ai.message}</Message></div>
        <div className="mt-5 grid gap-6 xl:grid-cols-3">
          {pillars.map(p => (
            <div key={p.id}>
              <p className="text-sm font-semibold">{p.ai.title}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-mist">{T.inArea} {p.title}</p>
              <ul className="mt-3 space-y-3">{p.ai.offers.map(o => <Offer key={o.title} o={o} />)}</ul>
            </div>
          ))}
        </div>
      </>
    );
    const p = pillars.find(x => x.id === id);
    return (
      <>
        <p className="hidden text-lg font-semibold lg:block">{p.title}</p>
        <div className="lg:mt-3"><Message>{p.message}</Message></div>
        <ul className="mt-5 grid gap-x-6 gap-y-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{p.offers.map(o => <Offer key={o.title} o={o} />)}</ul>
        <button type="button" onClick={() => pick("ai")} className="mt-5 flex w-full items-start gap-2.5 rounded-xl border border-signal/40 px-4 py-3 text-left hover:border-signal">
          <Icon name={ai.icon} size={16} className="mt-1 flex-none text-signal" />
          <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{p.ai.title}</span><span className="block text-sm text-mist">{p.ai.offers.map(o => o.title).join(" · ")}</span></span>
          <ChevronRight size={16} aria-hidden="true" className="mt-1 flex-none text-mist" />
        </button>
        {p.note && <p className="mt-5 border-t border-white/[0.08] pt-4 text-xs leading-relaxed text-mist">{p.note}</p>}
      </>
    );
  };

  const tab = (id, on) => ({ type: "button", onClick: () => pick(id), "aria-expanded": wide ? undefined : on, "aria-pressed": wide ? on : undefined });
  const row = p => {
    const on = shown === p.id;
    return (
      <button {...tab(p.id, on)} className={`flex w-full flex-1 items-center gap-3 rounded-2xl border p-4 text-left transition-colors sm:p-5 ${on ? "border-signal/70 bg-navy/50" : "border-white/[0.08] bg-navy/20 hover:border-signal/40"}`}>
        <span className={`grid h-11 w-11 flex-none place-items-center rounded-xl ${on ? "bg-signal text-ink" : "bg-white/[0.06] text-signal"}`}><Icon name={p.icon} size={20} /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold leading-tight tracking-tight">{p.title}</span>
          <span className="mt-1 block text-sm text-mist">{p.claim}</span>
        </span>
        {wide
          ? <ChevronRight size={18} aria-hidden="true" className={`flex-none ${on ? "text-signal" : "text-mist"}`} />
          : <ChevronDown size={18} aria-hidden="true" className={`flex-none transition-transform ${on ? "rotate-180 text-signal" : "text-mist"}`} />}
      </button>
    );
  };

  const aiOn = shown === "ai";
  const aiTone = `relative overflow-hidden rounded-2xl border transition-colors ${aiOn ? "border-signal" : "border-signal/40 hover:border-signal/80"}`;
  const aiBg = <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--c-signal)/.22),rgb(var(--c-signal)/.08)_50%,rgb(var(--c-signal)/.22))]" />;
  const aiIcon = <span className="relative grid h-11 w-11 flex-none place-items-center rounded-xl bg-signal text-ink"><Icon name={ai.icon} size={20} /></span>;

  const inline = id => !wide && shown === id && <div className="panel mt-2 p-4 sm:p-6">{detail(id)}</div>;

  return (
    <div>
      <p className="mb-3 text-sm text-mist">{T.mapHint}</p>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
        {wide ? (
          <div className="flex gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              {pillars.map(p => <div key={p.id} className="flex min-h-[116px]">{row(p)}</div>)}
            </div>
            <button {...tab("ai", aiOn)} className={`${aiTone} flex w-[72px] flex-none flex-col items-center gap-3 py-4`}>
              {aiBg}{aiIcon}
              <span className="relative text-lg font-semibold">{ai.title}</span>
              <span className="relative my-auto rotate-180 font-mono text-[11px] uppercase tracking-wider text-signal [writing-mode:vertical-rl]">{T.aiAcross}</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pillars.map(p => (
              <div key={p.id} ref={el => (rows.current[p.id] = el)} className="scroll-mt-12">{row(p)}{inline(p.id)}</div>
            ))}
            <div ref={el => (rows.current.ai = el)} className="scroll-mt-12">
              <button {...tab("ai", aiOn)} className={`${aiTone} flex w-full items-center gap-3 p-4 text-left sm:p-5`}>
                {aiBg}{aiIcon}
                <span className="relative min-w-0 flex-1">
                  <span className="block text-lg font-semibold leading-tight">{ai.title}</span>
                  <span className="mt-1 block text-sm text-snow/90">{ai.claim}</span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-wider text-signal">{T.aiAcross}</span>
                </span>
                <ChevronDown size={18} aria-hidden="true" className={`relative flex-none transition-transform ${aiOn ? "rotate-180 text-signal" : "text-mist"}`} />
              </button>
              {inline("ai")}
            </div>
          </div>
        )}

        {wide && (
          <AnimatePresence mode="wait">
            <motion.div key={shown + lang} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.2 }}
              className="panel p-6 xl:p-7" aria-live="polite">
              {detail(shown)}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
