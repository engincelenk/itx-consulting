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

// Zunächst nur der Name, der Text klappt beim Antippen auf
const Offer = ({ o }) => (
  <li>
    <details className="group">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2.5 py-2 [&::-webkit-details-marker]:hidden">
        <Check size={16} className="flex-none text-signal" />
        <span className="min-w-0 flex-1 text-[15px] font-semibold">{o.title}</span>
        <ChevronDown size={16} aria-hidden="true" className="flex-none text-mist transition-transform group-open:rotate-180" />
      </summary>
      <p className="pb-3 pl-[26px] pr-6 text-sm text-mist">{o.text}</p>
    </details>
  </li>
);
const LIST = "divide-y divide-white/[0.08]";
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
        <div className="mt-5 space-y-6">
          {pillars.map(p => (
            <div key={p.id}>
              <p className="text-sm font-semibold">{p.ai.title}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-mist">{T.inArea} {p.title}</p>
              <ul className={`mt-1 ${LIST}`}>{p.ai.offers.map(o => <Offer key={o.title} o={o} />)}</ul>
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
        <ul className={`mt-3 ${LIST}`}>{p.offers.map(o => <Offer key={o.title} o={o} />)}</ul>
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
  const row = (p, i) => {
    const on = shown === p.id;
    const tone = on ? "border-signal/70 bg-navy/50" : "border-white/[0.08] bg-navy/20 hover:border-signal/40";
    const icon = size => <span className={`grid flex-none place-items-center rounded-xl ${size} ${on ? "bg-signal text-ink" : "bg-white/[0.06] text-signal"}`}><Icon name={p.icon} size={wide ? 28 : 20} /></span>;
    // Desktop: hohe Säule mit Nummer, Handy: kompakte Zeile
    if (wide) return (
      <button {...tab(p.id, on)} className={`relative flex w-full flex-1 flex-col items-start justify-center gap-4 rounded-2xl border p-6 text-left transition-colors xl:p-8 ${tone}`}>
        <span aria-hidden="true" className="absolute right-6 top-5 font-mono text-sm text-signal">0{i + 1}</span>
        {icon("h-14 w-14")}
        <span className="block min-w-0">
          <span className="block text-2xl font-semibold leading-tight tracking-tight xl:text-[1.7rem]">{p.title}</span>
          <span className="mt-2 block text-base text-mist">{p.claim}</span>
        </span>
      </button>
    );
    return (
      <button {...tab(p.id, on)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors sm:p-5 ${tone}`}>
        {icon("h-11 w-11")}
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold leading-tight tracking-tight">{p.title}</span>
          <span className="mt-1 block text-sm text-mist">{p.claim}</span>
        </span>
        <ChevronDown size={18} aria-hidden="true" className={`flex-none transition-transform ${on ? "rotate-180 text-signal" : "text-mist"}`} />
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
      <div className="grid gap-3 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
        {wide ? (
          <div className="flex gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              {pillars.map((p, i) => <div key={p.id} className="flex min-h-[170px] flex-1">{row(p, i)}</div>)}
            </div>
            <button {...tab("ai", aiOn)} className={`${aiTone} flex w-[84px] flex-none flex-col items-center gap-3 py-5`}>
              {aiBg}{aiIcon}
              <span className="relative text-2xl font-semibold">{ai.title}</span>
              <span className="relative my-auto rotate-180 font-mono text-[11px] uppercase tracking-wider text-signal [writing-mode:vertical-rl]">{T.aiAcross}</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pillars.map((p, i) => (
              <div key={p.id} ref={el => (rows.current[p.id] = el)} className="scroll-mt-12">{row(p, i)}{inline(p.id)}</div>
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
