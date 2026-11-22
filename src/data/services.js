/* ------------------------------------------------------------------
   Freelance service portfolio, kept general on purpose.
   Three equal pillars + AI as the vertical across all three.
   Bilingual { en, de }. No prices, no availability.
------------------------------------------------------------------- */

import { domains, aiVertical as aiV } from "./profile.js";
const title = id => domains.find(d => d.id === id).title;
const subtitle = id => domains.find(d => d.id === id).subtitle;

export const pillars = [
  { id: "architecture", icon: "Boxes", title: title("architecture"),
    claim: { en: "Solutions that integrate, scale and can be operated.", de: "Lösungen, die sich integrieren, skalieren und betreiben lassen." },
    offers: [
      { title: { en: "Architecture strategy & target picture", de: "Architekturstrategie & Zielbild" }, text: { en: "From business goals to a target architecture and roadmap that business and IT share.", de: "Von Geschäftszielen zu Zielarchitektur und Roadmap, die Fachbereich und IT teilen." } },
      { title: { en: "Architecture reviews & due diligence", de: "Architektur-Reviews & Due Diligence" }, text: { en: "An independent assessment of solutions, risks and technical debt.", de: "Unabhängige Bewertung von Lösungen, Risiken und technischen Schulden." } },
      { title: { en: "Platform, cloud & integration", de: "Plattform, Cloud & Integration" }, text: { en: "Platform and SaaS architectures, APIs and integration landscapes.", de: "Plattform- und SaaS-Architekturen, APIs und Integrationslandschaften." } },
      { title: { en: "Architecture governance", de: "Architektur-Governance" }, text: { en: "Principles, decision records and design boards that teams accept.", de: "Prinzipien, Architekturentscheidungen und Design Boards, die Teams mittragen." } },
      { title: { en: "Technology & vendor selection", de: "Technologie- & Anbieterauswahl" }, text: { en: "Decisions on criteria, not on demos.", de: "Entscheidungen nach Kriterien, nicht nach Demos." } }
    ],
    ai: { title: aiV.aspects.architecture, text: { en: "Architectures for LLM apps and AI agents: tools, data access, MCP, guardrails.", de: "Architekturen für LLM-Anwendungen und KI-Agenten: Tools, Datenzugriffe, MCP, Leitplanken." } } },
  { id: "security", icon: "ShieldCheck", title: title("security"),
    claim: { en: "Security built into strategy, design and operations.", de: "Security in Strategie, Design und Betrieb verankert." },
    offers: [
      { title: { en: "Security strategy & roadmap", de: "Security-Strategie & Roadmap" }, text: { en: "Business risk translated into priorities and a funded roadmap.", de: "Geschäftsrisiken in Prioritäten und eine finanzierbare Roadmap übersetzt." } },
      { title: { en: "Security architecture & Zero Trust", de: "Security-Architektur & Zero Trust" }, text: { en: "Security by design for identity, cloud, platforms and products.", de: "Security by Design für Identität, Cloud, Plattformen und Produkte." } },
      { title: { en: "Threat & risk assessment", de: "Bedrohungs- & Risikoanalyse" }, text: { en: "TARA and threat modelling, risks rated and measures traceable.", de: "TARA und Threat Modeling, Risiken bewertet, Maßnahmen nachvollziehbar." } },
      { title: { en: "Governance, risk & compliance", de: "Governance, Risk & Compliance" }, text: { en: "NIST CSF, ISO 27001, NIS2 and CRA turned into concrete controls.", de: "NIST CSF, ISO 27001, NIS2 und CRA in konkrete Maßnahmen übersetzt." } },
      { title: { en: "Security assessments & secure development", de: "Security-Assessments & sichere Entwicklung" }, text: { en: "Maturity checks and security in the development lifecycle.", de: "Reifegrad-Checks und Security im Entwicklungsprozess." } }
    ],
    ai: { title: aiV.aspects.security, text: { en: "Risks of LLMs and agents: prompt injection, data leakage, OWASP LLM Top 10, EU AI Act.", de: "Risiken von LLMs und Agenten: Prompt Injection, Datenabfluss, OWASP LLM Top 10, EU AI Act." } } },
  { id: "management", icon: "Workflow", title: title("management"), subtitle: subtitle("management"),
    claim: { en: "Complex IT delivered, end to end.", de: "Komplexe IT-Vorhaben sicher ins Ziel gebracht." },
    offers: [
      { title: { en: "Program & project leadership", de: "Programm- & Projektleitung" }, text: { en: "Leading complex IT programs across teams, partners and budgets.", de: "Führung komplexer IT-Programme über Teams, Partner und Budgets." } },
      { title: { en: "Interim solution management", de: "Interim Solution Management" }, text: { en: "End-to-end ownership of an application or platform, for a defined time.", de: "Durchgängige Verantwortung für eine Anwendung oder Plattform, auf Zeit." } },
      { title: { en: "Project recovery", de: "Projekt-Recovery" }, text: { en: "Honest status, root causes and a realistic re-plan.", de: "Ehrlicher Status, Ursachen und eine realistische Neuplanung." } },
      { title: { en: "Agile & hybrid delivery, PMO", de: "Agile & hybride Delivery, PMO" }, text: { en: "Delivery models, governance and reporting that fit your organisation.", de: "Vorgehensmodelle, Steuerung und Reporting passend zur Organisation." } },
      { title: { en: "Logistics IT", de: "Logistik-IT" }, text: { en: "Transport management and logistics solutions with partners and carriers.", de: "Transportmanagement und Logistiklösungen mit Partnern und Dienstleistern." } }
    ],
    ai: { title: aiV.aspects.management, text: { en: "Use case portfolio, pilots and rollout of AI, plus AI-assisted delivery.", de: "Use-Case-Portfolio, Pilote und Rollout von KI, dazu KI-gestützte Projektarbeit." } } }
];

export const aiVertical = { icon: "Sparkles", title: title("ai"), claim: aiV.claim };

export const formats = {
  advisory: { en: "Advisory", de: "Beratung" },
  workshop: { en: "Workshop", de: "Workshop" },
  project: { en: "Project", de: "Projekt" },
  interim: { en: "Interim", de: "Interim" }
};

export const process = [
  { id: "talk", icon: "MessageSquare", year: "01", short: { en: "Intro call", de: "Erstgespräch" }, title: { en: "Intro call", de: "Erstgespräch" }, text: { en: "Your goal, your situation, the right approach.", de: "Ihr Ziel, Ihre Ausgangslage, der passende Ansatz." } },
  { id: "offer", icon: "FileText", year: "02", short: { en: "Offer", de: "Angebot" }, title: { en: "Offer", de: "Angebot" }, text: { en: "Clear scope and clear results.", de: "Klarer Umfang und klare Ergebnisse." } },
  { id: "deliver", icon: "Rocket", year: "03", short: { en: "Delivery", de: "Umsetzung" }, title: { en: "Delivery", de: "Umsetzung" }, text: { en: "Remote or on site in the Stuttgart region.", de: "Remote oder vor Ort in der Region Stuttgart." } },
  { id: "handover", icon: "Handshake", year: "04", short: { en: "Handover", de: "Übergabe" }, title: { en: "Handover", de: "Übergabe" }, text: { en: "Results your team can keep using.", de: "Ergebnisse, mit denen Ihr Team weiterarbeiten kann." } }
];

export const industries = [
  { en: "Automotive", de: "Automotive" }, { en: "Mechanical engineering", de: "Maschinenbau" }, { en: "Logistics", de: "Logistik" },
  { en: "E-commerce & customer experience", de: "E-Commerce & Customer Experience" }, { en: "Industrial IoT", de: "Industrial IoT" }
];

/* "Wer ich bin": Werdegang plakativ, Berufserfahrung im Vordergrund. */
export const careerStart = "2012-03"; // Beginn der Berufstätigkeit (Daimler Protics)
export const stations = [
  { year: "2012", org: "Daimler", role: { en: "IT consulting & project management", de: "IT-Consulting & Projektmanagement" } },
  { year: "2017", org: "TRUMPF", role: { en: "Solution architecture & digitalization", de: "Solution Architecture & Digitalisierung" } },
  { year: "2019", org: "Bosch", role: { en: "Lead architect digital business & CX", de: "Lead Architect Digital Business & CX" } },
  { year: "2021", org: "Bosch", role: { en: "Solution manager logistics · VDA Award", de: "Solution Manager Logistik · VDA-Award" } },
  { year: "2024", org: "Bosch", role: { en: "Cyber security engineer", de: "Cyber Security Engineer" } }
];

/* Erfahrungsgebiete, gruppiert. */
export const expertise = [
  { id: "digital", title: { en: "Digital business & commerce", de: "Digital Business & Commerce" },
    items: ["Customer Experience", "Digital Business", { en: "B2C & B2B e-commerce", de: "B2C- & B2B-E-Commerce" }, "MAM", "PIM"] },
  { id: "arch", title: { en: "Architecture & cloud", de: "Architektur & Cloud" },
    items: ["Microservices", "API Management", "Azure", "AWS", "GCP", "Agentic Architecture", "IBM Mainframe"] },
  { id: "sap", title: { en: "Enterprise, SAP & logistics", de: "Enterprise, SAP & Logistik" },
    items: ["SAP SD", "SAP MM", "SAP FI", "SAP PM", "SAP SRM", { en: "Logistics", de: "Logistik" }] },
  { id: "sec", title: { en: "Security & AI", de: "Security & KI" },
    items: ["ISO 27001", "NIST", "Threat Analysis & Risk Assessment (TARA)", "AI Enablement"] }
];

export const timing = [
  { id: "asap", label: { en: "As soon as possible", de: "So bald wie möglich" } },
  { id: "q", label: { en: "In 1–3 months", de: "In 1–3 Monaten" } },
  { id: "later", label: { en: "Later / exploring", de: "Später / erst informieren" } }
];

import { site } from "../site.js";
const brand = site.hasCompany ? site.company : "Engin Celenk";

export const fl = {
  en: {
    title: brand, desc: "IT architecture, cyber security and IT management, with AI as the vertical.",
    back: "Portfolio", skip: "Skip to content", aboutKicker: "Who I am", aboutTitle: "IT through and through.", aboutRole: "Founder of Solvexa Consulting · principal level", aboutText: y => `Over ${y} years in corporate IT at Daimler, TRUMPF and Bosch: as project manager, solution architect, lead architect, solution manager and cyber security engineer. My background combines software engineering with business informatics (M.Sc.): deep enough in technology for architecture and security, close enough to the business for decisions. At Solvexa I work at principal level and in person, from analysis to delivery.`, aboutCv: "Full CV", expGroups: "Technology and topic experience", owner: "Founder & principal consultant", heroLead: "Architecture, security and delivery from one hand. For IT leaders in enterprises and mid-sized companies who need complex programs landed safely.", proof: "1st place VDA Logistics Award 2024 · NGTM, Bosch's worldwide transport management", h1a: "IT Architecture. Cyber Security. IT Management.", h1b: "With AI as the vertical.",
    cta: "Start a request",
    mapKicker: "Service portfolio", mapTitle: "Three pillars, one vertical.", mapLead: "Select a pillar or the AI band.",
    aiAcross: "across all three pillars", inArea: "in",
    howKicker: "How I work", howTitle: "Four steps, no surprises.", howLead: "Select a step.",
    expKicker: "Experience from", expTitle: "Where I have delivered",
    cfgKicker: "Request", cfgTitle: "Put your request together.", cfgLead: "Choose areas, format and timing. Your request is prepared, you only add your details. I reply personally and offer a non-binding intro call.",
    cfgAreas: "Areas (optional)", cfgFormat: "Format", cfgTiming: "Timing", cfgCompany: "Company (optional)", cfgNote: "Short description (optional)",
    cfgNotePh: "What do you want to achieve?", openMail: "Open email", copyText: "Copy text", copied: "Copied", preview: "Your request",
    none: "Choose at least one area.", subject: n => `Project request: ${n}`,
    body: (s, f, t, c, n) => `Hello Mr Celenk,\n\nwe are interested in:\n${s}\n\nFormat: ${f}\nTiming: ${t}${c ? `\nCompany: ${c}` : ""}${n ? `\n\nAbout the project:\n${n}` : ""}\n\nPlease get in touch for an intro call.\n\nBest regards`,
    note: "Details and prices after the intro call. No newsletter, no tracking."
  },
  de: {
    title: brand, desc: "IT-Architektur, Cyber Security und IT Management, mit KI als Vertikale.",
    back: "Portfolio", skip: "Zum Inhalt springen", aboutKicker: "Wer ich bin", aboutTitle: "Durch und durch IT.", aboutRole: "Gründer von Solvexa Consulting · Principal-Level", aboutText: y => `Über ${y} Jahre in der Konzern-IT von Daimler, TRUMPF und Bosch: als Projektmanager, Solution Architect, Lead Architect, Solution Manager und Cyber Security Engineer. Mein Hintergrund verbindet Software Engineering mit Wirtschaftsinformatik (M.Sc.): technisch tief genug für Architektur und Security, nah genug am Geschäft für Entscheidungen. Bei Solvexa arbeite ich auf Principal-Level und persönlich, von der Analyse bis zur Umsetzung.`, aboutCv: "Ausführlicher Lebenslauf", expGroups: "Technologie- und Themenerfahrung", owner: "Gründer & Principal Consultant", heroLead: "Architektur, Security und Delivery aus einer Hand. Für IT-Entscheider in Konzern und Mittelstand, die komplexe Vorhaben sicher ins Ziel bringen müssen.", proof: "1. Platz VDA Logistik-Award 2024 · NGTM, weltweites Transportmanagement bei Bosch", h1a: "IT-Architektur. Cyber Security. IT Management.", h1b: "Mit KI als Vertikale.",
    cta: "Anfrage starten",
    mapKicker: "Leistungsportfolio", mapTitle: "Drei Säulen, eine Vertikale.", mapLead: "Säule oder KI-Band auswählen.",
    aiAcross: "quer über alle drei Säulen", inArea: "in",
    howKicker: "Arbeitsweise", howTitle: "Vier Schritte, keine Überraschungen.", howLead: "Schritt auswählen.",
    expKicker: "Erfahrung aus", expTitle: "Wo ich bereits geliefert habe",
    cfgKicker: "Anfrage", cfgTitle: "Stellen Sie Ihre Anfrage zusammen.", cfgLead: "Bereiche, Format und Zeitraum wählen. Ihre Anfrage wird vorbereitet, Sie ergänzen nur Ihre Daten. Ich antworte persönlich und biete ein unverbindliches Erstgespräch an.",
    cfgAreas: "Bereiche (optional)", cfgFormat: "Format", cfgTiming: "Zeitraum", cfgCompany: "Unternehmen (optional)", cfgNote: "Kurzbeschreibung (optional)",
    cfgNotePh: "Was möchten Sie erreichen?", openMail: "E-Mail öffnen", copyText: "Text kopieren", copied: "Kopiert", preview: "Ihre Anfrage",
    none: "Mindestens einen Bereich wählen.", subject: n => `Projektanfrage: ${n}`,
    body: (s, f, t, c, n) => `Hallo Herr Celenk,\n\nwir interessieren uns für:\n${s}\n\nFormat: ${f}\nZeitraum: ${t}${c ? `\nUnternehmen: ${c}` : ""}${n ? `\n\nZum Vorhaben:\n${n}` : ""}\n\nBitte melden Sie sich für ein Erstgespräch.\n\nViele Grüße`,
    note: "Details und Preise nach dem Erstgespräch. Kein Newsletter, kein Tracking."
  }
};
