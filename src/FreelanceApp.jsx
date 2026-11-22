import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ContactForm from "./components/ContactForm.jsx";
import { LangProvider, useLang } from "./i18n.jsx";
import LangSwitch from "./components/LangSwitch.jsx";
import SectionHead from "./components/SectionHead.jsx";
import PathMap from "./components/PathMap.jsx";
import Logo from "./components/Logo.jsx";
import NetworkCanvas from "./components/NetworkCanvas.jsx";
import ServiceMatrix from "./components/ServiceMatrix.jsx";
import Footer from "./components/Footer.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import LogoWall from "./components/LogoWall.jsx";
import { person } from "./data/profile.js";
import { site, slogan, cvUrl } from "./site.js";
import { pillars as rawPillars, aiVertical as rawAi, process as rawProcess, industries, expertise as rawExpertise, timing as rawTiming, formats as rawFormats, fl } from "./data/services.js";

function Page() {
  const { lang, L } = useLang();
  const T = L(fl);
  const pillars = L(rawPillars), ai = L(rawAi), steps = L(rawProcess), timing = L(rawTiming), formats = L(rawFormats);
  const areas = [...pillars.map(p => ({ id: p.id, title: p.title })), { id: "ai", title: ai.title }];
  const groups = rawExpertise.map(g => ({ id: g.id, title: L(g.title), items: g.items.map(i => (typeof i === "string" ? i : L(i))) }));
  const [picked, setPicked] = useState([]);
  const [format, setFormat] = useState("advisory");
  const [when, setWhen] = useState("q");
  const [note, setNote] = useState("");
  const [step, setStep] = useState(steps[0].id);

  useEffect(() => { document.title = T.title; document.querySelector('meta[name="description"]')?.setAttribute("content", T.desc); }, [T]);
  const toggle = id => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const mail = useMemo(() => {
    const names = areas.filter(a => picked.includes(a.id)).map(a => a.title);
    const subject = T.subject(names.join(", "));
    const body = T.body(names.map(n => `• ${n}`).join("\n"), formats[format], timing.find(t => t.id === when).label, "", note.trim());
    return { names, subject, body };
  }, [picked, format, when, note, lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const chip = on => `min-h-[44px] rounded-xl border px-3 text-sm font-medium transition-colors ${on ? "border-signal bg-signal/10 text-snow" : "border-mist/40 text-mist hover:text-snow"}`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-snow focus:px-4 focus:py-3 focus:text-ink">{T.skip}</a>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="wrap flex h-16 items-center justify-between gap-3">
          <a href={`/?lang=${lang}`} className="flex h-11 min-w-0 items-center" aria-label={site.company}><><img src="/solvexa-logo-dark.png" alt={site.company} width="900" height="162" loading="lazy" className="brand-dark h-8 w-auto sm:h-10" /><img src="/solvexa-logo-light.png" alt={site.company} width="900" height="159" loading="lazy" className="brand-light h-8 w-auto sm:h-10" /></></a>
          <div className="flex items-center gap-4">
            <a href={cvUrl(lang)} className="hidden items-center gap-1.5 text-sm text-mist hover:text-snow sm:inline-flex"><ArrowLeft size={16} />{T.back}: {person.name}</a>
            <ThemeToggle />
            <LangSwitch />
          </div>
        </div>
      </header>

      <main id="main">
        <section className="relative isolate overflow-hidden pb-10 pt-28 md:pt-36">
          <div className="absolute inset-0 -z-10 opacity-40 md:opacity-80 md:[mask-image:linear-gradient(to_right,rgba(0,0,0,.2),black_60%)]"><NetworkCanvas /></div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-ink" />
          <div className="wrap">
            {site.hasCompany
              ? <h1 className="text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-7xl">{site.company}<span className="mt-3 block text-[1.25rem] font-medium leading-snug tracking-[-0.02em] text-signal sm:text-3xl">{slogan}</span></h1>
              : <h1 className="mt-5 max-w-[20ch] text-[2.3rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl">{T.h1a} <span className="text-signal">{T.h1b}</span></h1>}
            {site.hasCompany && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{T.heroLead}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#request" className="btn-primary">{T.cta} <ArrowUpRight size={16} /></a>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/60 py-1.5 pl-1.5 pr-4 backdrop-blur">
                <img src="/engin.jpg" alt="" className="h-9 w-9 rounded-full object-cover" />
                <span className="text-sm">{person.name}, {person.degree}</span>
              </div>
            </div>
            {site.hasCompany && <p className="mt-6 flex max-w-2xl items-start gap-3 text-[15px] text-snow/80"><span className="mt-2 h-px w-6 flex-none bg-signal" />{T.proof}</p>}
          </div>
        </section>

        <section id="services" className="section scroll-mt-16">
          <div className="wrap">
            <SectionHead no="01" kicker={T.mapKicker} title={T.mapTitle} lead={T.mapLead} />
            <ServiceMatrix T={T} />
          </div>
        </section>

        <section id="about" className="section scroll-mt-16">
          <div className="wrap">
            <SectionHead no="02" kicker={T.aboutKicker} title={T.aboutTitle} />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-12">
              <div className="flex items-center gap-4 lg:items-start">
                <img src="/engin.jpg" alt={person.name} width="96" height="96" loading="lazy" className="h-20 w-20 flex-none rounded-2xl object-cover sm:h-24 sm:w-24" />
                <p className="text-xl font-semibold tracking-tight">{person.name}, {person.degree}</p>
              </div>
              <p className="text-lg leading-relaxed text-snow/90">{T.aboutText}</p>
            </div>
            <h3 className="label mt-12">{T.expTitle}</h3>
            <div className="mt-4">
            <ul aria-label={T.expTitle} className="flex flex-wrap gap-2">{L(industries).map(i => <li key={i} className="rounded-full border border-white/10 px-4 py-2 text-sm">{i}</li>)}</ul>
<div className="mt-2"><LogoWall /></div>
            <h3 className="label mt-12">{T.expGroups}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {groups.map(g => (
                <div key={g.id} className="rounded-2xl border border-white/[0.08] bg-navy/20 p-5">
                  <p className="font-semibold">{g.title}</p>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label={g.title}>
                    {g.items.map(it => <li key={it} className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-sm text-snow/90">{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>

        <section id="request" className="section scroll-mt-16">
          <div className="wrap">
            <SectionHead no="03" kicker={T.cfgKicker} title={T.cfgTitle} lead={T.cfgLead} />
            <h3 className="label">{T.howKicker} · {T.howTitle}</h3>
            <div className="mb-12 mt-4">
              <PathMap items={steps} mode="curve" active={step} setActive={setStep} label={T.howKicker}
              renderCard={(x, compact) => <div className={`panel ${compact ? "p-4" : "p-6"}`}><h3 className="text-lg font-semibold">{x.title}</h3><p className="mt-1 text-mist">{x.text}</p></div>} />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <div className="panel min-w-0 space-y-6 p-5 sm:p-7">
                <fieldset>
                  <legend className="label">{T.cfgAreas}</legend>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {areas.map(a => <button key={a.id} type="button" aria-pressed={picked.includes(a.id)} onClick={() => toggle(a.id)} className={`${chip(picked.includes(a.id))} text-left`}>{a.title}</button>)}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="label">{T.cfgFormat}</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {Object.entries(formats).map(([id, label]) => <button key={id} type="button" aria-pressed={format === id} onClick={() => setFormat(id)} className={chip(format === id)}>{label}</button>)}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="label">{T.cfgTiming}</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {timing.map(t => <button key={t.id} type="button" aria-pressed={when === t.id} onClick={() => setWhen(t.id)} className={chip(when === t.id)}>{t.label}</button>)}
                  </div>
                </fieldset>
                <label className="block"><span className="label">{T.cfgNote}</span>
                  <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder={T.cfgNotePh} className="mt-2 w-full rounded-xl border border-mist/40 bg-ink p-4 text-[16px] placeholder:text-mist/80 focus:border-signal focus:outline-none" /></label>
              </div>
              <div className="panel flex min-w-0 flex-col p-5 sm:p-7 lg:sticky lg:top-24 lg:self-start">
                <p className="label">{T.preview}</p>
                <div className="mt-4"><ContactForm initialMessage={mail.names.length ? mail.body : ""} subject={mail.names.length ? mail.subject : undefined} source="freelance" /></div>
                <p className="mt-5 text-xs text-mist">{T.note}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer company={site.company} />
    </>
  );
}

export default function FreelanceApp() { return <LangProvider><Page /></LangProvider>; }
