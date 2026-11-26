import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ContactForm from "./components/ContactForm.jsx";
import { LangProvider, useLang } from "./i18n.jsx";
import LangSwitch from "./components/LangSwitch.jsx";
import SectionHead from "./components/SectionHead.jsx";
import Logo from "./components/Logo.jsx";
import ShieldCloud from "./components/ShieldCloud.jsx";
import ServiceMatrix from "./components/ServiceMatrix.jsx";
import Footer from "./components/Footer.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import LogoWall from "./components/LogoWall.jsx";
import { person } from "./data/profile.js";
import { site, slogan } from "./site.js";
import { industries, fl } from "./data/services.js";

function Page() {
  const { lang, L } = useLang();
  const T = L(fl);
  const [menu, setMenu] = useState(false);
  const links = [["services", T.navServices], ["about", T.navAbout], ["contact", T.navContact]];

  useEffect(() => {
    if (!menu) return;
    const esc = e => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  useEffect(() => { document.title = T.title; document.querySelector('meta[name="description"]')?.setAttribute("content", T.desc); }, [T]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-snow focus:px-4 focus:py-3 focus:text-ink">{T.skip}</a>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="wrap flex h-16 items-center justify-between gap-3">
          <a href={`/?lang=${lang}`} className="flex h-14 min-w-0 items-center" aria-label={site.company}><><img src="/itx-logo-dark.png" alt={site.company} width="900" height="436" loading="lazy" className="brand-dark h-12 w-auto sm:h-14" /><img src="/itx-logo-light.png" alt={site.company} width="900" height="436" loading="lazy" className="brand-light h-12 w-auto sm:h-14" /></></a>
          <nav aria-label={T.navLabel} className="hidden items-center gap-1 md:flex">
            {links.map(([id, label]) => <a key={id} href={`#${id}`} className="inline-flex min-h-[44px] items-center rounded-full px-3 text-sm text-snow/80 hover:text-signal">{label}</a>)}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <LangSwitch />
            <button type="button" onClick={() => setMenu(v => !v)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={T.navLabel} className="grid h-11 w-11 place-items-center rounded-full border border-mist/40 md:hidden">{menu ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {menu && (
          <nav id="mobile-menu" aria-label={T.navLabel} className="wrap flex flex-col border-t border-white/[0.06] bg-ink py-2 md:hidden">
            {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="flex min-h-[48px] items-center text-base">{label}</a>)}
          </nav>
        )}
      </header>

      <main id="main" className="relative">
        {/* Ab Desktop: Wolke und Schild rechts neben Hero und Leistungs-Überschrift */}
        <div className="pointer-events-none absolute inset-x-0 top-[72px] z-10 hidden lg:block">
          <div className="wrap flex justify-end">
            <div className="relative h-[620px] w-[46%] xl:w-[52%]"><ShieldCloud /></div>
          </div>
        </div>
        <section className="relative isolate overflow-hidden pb-10 pt-28 md:pt-36">
          <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-ink" />
          <div className="wrap">
            {site.hasCompany
              ? <h1 className="text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-7xl">{site.company}<span className="mt-3 block text-[1.25rem] font-medium leading-snug tracking-[-0.02em] text-signal sm:text-3xl">{slogan}</span></h1>
              : <h1 className="mt-5 max-w-[20ch] text-[2.3rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl">{T.h1a} <span className="text-signal">{T.h1b}</span></h1>}
            {site.hasCompany && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{T.heroLead}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">{T.cta} <ArrowUpRight size={16} /></a>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/60 py-1.5 pl-1.5 pr-4 backdrop-blur">
                <img src="/engin.jpg" alt="" className="h-9 w-9 rounded-full object-cover" />
                <span className="text-sm">{person.name}, {person.degree}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="wrap">
            <SectionHead no="01" kicker={T.mapKicker} title={T.mapTitle} lead={T.mapLead} />
            <ServiceMatrix T={T} />
            <a href="#contact" className="btn-primary mt-8 text-center">{T.cta} <ArrowUpRight size={16} className="flex-none" /></a>
          </div>
        </section>

        <section id="about" className="section">
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
            <p className="text-base leading-relaxed text-snow/90 sm:text-lg">{L(industries).map((i, n) => <span key={i}>{n > 0 && <span className="mx-2 text-signal" aria-hidden="true">·</span>}<span className="inline-block max-w-full">{i}</span></span>)}</p>
<div className="mt-6"><LogoWall /></div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="wrap">
            <SectionHead no="03" kicker={T.cfgKicker} title={T.cfgTitle} lead={T.cfgLead} />
            <div className="panel max-w-3xl p-5 sm:p-7">
              <ContactForm source="freelance" />
              <p className="mt-5 text-xs text-mist">{T.note}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer company={site.company} />
    </>
  );
}

export default function FreelanceApp() { return <LangProvider><Page /></LangProvider>; }
