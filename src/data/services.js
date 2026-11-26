/* ------------------------------------------------------------------
   Freelance service portfolio, kept general on purpose.
   Three equal pillars + AI as the vertical across all three.
   Bilingual { en, de }. No prices, no availability.
------------------------------------------------------------------- */

import { domains, aiVertical as aiV } from "./profile.js";
const title = id => domains.find(d => d.id === id).title;

export const pillars = [
  { id: "security", icon: "ShieldCheck", title: title("security"),
    claim: { en: "ISMS setup with an auditor's eye", de: "ISMS-Aufbau mit Prüferblick" },
    message: { en: "Customers, lawmakers and auditors ask for evidence. We build your ISO 27001 information security management system to be audit-ready. We know what auditors ask, which evidence they want to see and where nonconformities typically arise.", de: "Kunden, Gesetzgeber und Auditoren verlangen Nachweise. Wir bauen Ihr Informationssicherheits-Managementsystem nach ISO 27001 auditfest auf. Wir wissen, wonach Auditoren fragen, welche Nachweise sie sehen wollen und wo typischerweise Abweichungen entstehen." },
    note: { en: "We advise and prepare. Certification is always carried out by an accredited certification body, so there is no conflict of interest. We do not take on internal audits of an ISMS we have built or operated ourselves.", de: "Wir beraten und bereiten vor. Die Zertifizierung führt immer eine akkreditierte Zertifizierungsstelle durch, so entsteht kein Interessenkonflikt. Interne Audits übernehmen wir nicht für ein ISMS, das wir selbst aufgebaut oder betrieben haben." },
    offers: [
      { title: { en: "ISMS setup", de: "ISMS-Aufbau" }, text: { en: "From scope through risk assessment and controls to evidence: an ISMS that fits your operations and is built to be audit-ready.", de: "Vom Geltungsbereich über Risikobewertung und Maßnahmen bis zur Nachweisführung: ein ISMS, das zum Betrieb passt und auditfest aufgebaut ist." } },
      { title: { en: "Readiness audit", de: "Readiness-Audit" }, text: { en: "Where you stand before certification: gaps, possible nonconformities and a prioritised action list.", de: "Standortbestimmung vor der Zertifizierung: Lücken, mögliche Abweichungen und eine priorisierte Maßnahmenliste." } },
      { title: { en: "Internal audits", de: "Interne Audits" }, text: { en: "Planning, execution and report with an auditor's eye, so weak spots show before the external audit.", de: "Planung, Durchführung und Bericht mit Prüferblick, damit Schwachstellen vor dem externen Audit sichtbar werden." } },
      { title: { en: "Threat analysis & risk management", de: "Threat Analysis & Risk Management" }, text: { en: "Capture and rate threats and risks systematically (TARA, STRIDE), derive traceable measures and keep tracking them.", de: "Bedrohungen und Risiken systematisch erfassen und bewerten (TARA, STRIDE), Maßnahmen nachvollziehbar ableiten und nachverfolgen." } },
      { title: { en: "NIS2 advisory", de: "NIS2-Beratung" }, text: { en: "Clarify whether and how you are affected, and turn the obligations into manageable steps.", de: "Klären, ob und wie Sie betroffen sind, und die Pflichten in machbare Schritte übersetzen." } },
      { title: { en: "External information security officer", de: "Externer ISB" }, text: { en: "Information security officer for a limited period or permanently, including ISMS operation and reporting to management.", de: "Informationssicherheitsbeauftragter auf Zeit oder dauerhaft, inklusive ISMS-Betrieb und Reporting an die Geschäftsführung." } },
      { title: { en: "Awareness & workshops", de: "Awareness & Workshops" }, text: { en: "Training that starts from everyday work, for staff, IT and management.", de: "Schulungen, die am Arbeitsalltag ansetzen, für Belegschaft, IT und Leitung." } }
    ],
    ai: { title: aiV.aspects.security, offers: [
      { title: { en: "EU AI Act check", de: "EU-AI-Act-Check" }, text: { en: "Record AI applications, classify role and risk class, capture open obligations and next steps. No legal advice.", de: "KI-Anwendungen erfassen, Rolle und Risikoklasse einordnen, offene Pflichten und nächste Schritte festhalten. Keine Rechtsberatung." } },
      { title: { en: "AI governance following ISO/IEC 42001", de: "KI-Governance nach ISO/IEC 42001" }, text: { en: "Policies, roles, risk assessment and evidence, built on your existing ISMS where possible.", de: "Richtlinien, Rollen, Risikobewertung und Nachweise, möglichst auf dem vorhandenen ISMS aufgebaut." } },
      { title: { en: "Security assessment for LLMs & agents", de: "Security-Assessment für LLMs & Agenten" }, text: { en: "Threat modeling and review against the OWASP Top 10 for LLM and agentic applications: for example prompt injection, data leakage and excessive permissions.", de: "Threat Modeling und Prüfung gegen die OWASP-Top-10 für LLM- und Agenten-Anwendungen: etwa Prompt Injection, Datenabfluss und zu weit reichende Rechte." } }
    ] } },
  { id: "architecture", icon: "Boxes", title: title("architecture"),
    claim: { en: "Order for grown system landscapes", de: "Ordnung in gewachsene Systemlandschaften" },
    message: { en: "Systems that have grown over years are hard to see through. We make them transparent, put them in order and secure the data flow along the value chain. Modules can be booked individually or combined, vendor-neutral.", de: "Historisch gewachsene Systeme sind schwer zu durchschauen. Wir machen sie transparent, ordnen sie und sichern den Datenfluss entlang der Wertschöpfungskette. Bausteine einzeln oder kombiniert buchbar, herstellerneutral." },
    offers: [
      { title: { en: "Architecture assessment & target architecture", de: "Architektur-Assessment & Zielarchitektur" }, text: { en: "Where you stand, where the risks and breaks are, and what the target picture looks like.", de: "Wo stehen Sie, wo sind Risiken und Brüche, wie sieht das Zielbild aus." } },
      { title: { en: "IT strategy & roadmap", de: "IT-Strategie & Roadmap" }, text: { en: "A plan over three to five years with priorities and budget planning.", de: "Plan über drei bis fünf Jahre mit Prioritäten und Budgetplanung." } },
      { title: { en: "Cloud migration & modernisation", de: "Cloud-Migration & Modernisierung" }, text: { en: "Replace legacy systems step by step without losing sight of operations.", de: "Altsysteme schrittweise ablösen, ohne den Betrieb aus dem Blick zu verlieren." } },
      { title: { en: "Architecture management", de: "Architekturmanagement" }, text: { en: "Roles, decisions and documentation following recognised standards, traceable for auditors too.", de: "Rollen, Entscheidungen und Dokumentation nach anerkannten Standards, nachvollziehbar auch für Prüfer." } },
      { title: { en: "Security by design", de: "Security by Design" }, text: { en: "Zero Trust and authorisation concepts, with reference to ISO 27001 and BSI IT-Grundschutz.", de: "Zero Trust und Berechtigungskonzepte, mit Bezug zu ISO 27001 und BSI IT-Grundschutz." } }
    ],
    ai: { title: aiV.aspects.architecture, offers: [
      { title: { en: "AI readiness check", de: "KI-Readiness-Check" }, text: { en: "Assess data, systems, processes and skills, name gaps and prerequisites.", de: "Daten, Systeme, Prozesse und Kompetenzen bewerten, Lücken und Voraussetzungen benennen." } },
      { title: { en: "Target architecture for AI & agents", de: "Zielarchitektur für KI & Agenten" }, text: { en: "Integrate LLM applications and agents into your system landscape: data access, interfaces, MCP, guardrails.", de: "LLM-Anwendungen und Agenten in die Systemlandschaft einbinden: Datenzugriffe, Schnittstellen, MCP, Leitplanken." } },
      { title: { en: "Platform & vendor selection", de: "Plattform- & Anbieterauswahl" }, text: { en: "Cloud, own operation or service: a decision based on criteria such as data protection, cost and dependency.", de: "Cloud, eigener Betrieb oder Dienst: Entscheidung nach Kriterien wie Datenschutz, Kosten und Abhängigkeit." } }
    ] } },
  { id: "management", icon: "Workflow", title: title("management"),
    claim: { en: "Steering initiatives reliably", de: "Vorhaben verlässlich steuern" },
    message: { en: "When responsibility is unclear or vendors set the pace, projects tip over. We take responsibility with a clear mandate and no self-interest, and lead vendors independently of manufacturers. The result: clear governance, reduced risk and a reliable basis for project success.", de: "Wenn Verantwortung unklar ist oder Dienstleister den Takt vorgeben, kippen Vorhaben. Wir übernehmen mit klarem Mandat und ohne Eigeninteresse Verantwortung und führen Dienstleister herstellerunabhängig. Ergebnis: klare Governance, reduzierte Risiken, eine verlässliche Grundlage für den Projekterfolg." },
    offers: [
      { title: { en: "IT project management", de: "IT-Projektleitung" }, text: { en: "Leading initiatives with a clear mandate, plan, budget and reporting.", de: "Führung von Vorhaben mit klarem Auftrag, Plan, Budget und Berichtswesen." } },
      { title: { en: "Program & portfolio management", de: "Programm- & Portfoliomanagement" }, text: { en: "Steering priorities, dependencies and resources across several projects.", de: "Prioritäten, Abhängigkeiten und Ressourcen über mehrere Projekte steuern." } },
      { title: { en: "PMO setup", de: "PMO-Aufbau" }, text: { en: "Standards and reporting that fit the size of your company.", de: "Standards und Reporting, die zur Größe Ihres Unternehmens passen." } },
      { title: { en: "Interim IT leadership", de: "Interim-IT-Leitung" }, text: { en: "Lead IT while the position is vacant or a transition is ahead.", de: "Die IT führen, solange die Stelle offen ist oder ein Umbruch ansteht." } },
      { title: { en: "Project recovery", de: "Projektrettung" }, text: { en: "Clarify the situation, reset and stabilise projects that are tipping over.", de: "Lage klären, neu aufsetzen und kippende Vorhaben stabilisieren." } },
      { title: { en: "IT & project governance", de: "IT- & Projekt-Governance" }, text: { en: "Define decision paths, roles and evidence.", de: "Entscheidungswege, Rollen und Nachweise festlegen." } },
      { title: { en: "Vendor management", de: "Dienstleistersteuerung" }, text: { en: "Binding control of external partners' services, deadlines and quality.", de: "Leistungen, Termine und Qualität externer Partner verbindlich führen." } }
    ],
    ai: { title: aiV.aspects.management, offers: [
      { title: { en: "Use case workshop", de: "Use-Case-Workshop" }, text: { en: "Collect use cases, prioritise by value, effort and risk, set the roadmap.", de: "Anwendungsfälle sammeln, nach Nutzen, Aufwand und Risiko priorisieren, Fahrplan festlegen." } },
      { title: { en: "Pilot with a clear goal", de: "Pilot mit klarem Ziel" }, text: { en: "One use case, measurable criteria and a decision at the end: expand, change or stop.", de: "Ein Anwendungsfall, messbare Kriterien und am Ende eine Entscheidung: ausbauen, ändern oder stoppen." } },
      { title: { en: "Rollout & training", de: "Rollout & Schulung" }, text: { en: "Support the introduction and train staff to use AI safely, matched to their role.", de: "Einführung begleiten und Mitarbeitende im sicheren Umgang mit KI schulen, passend zu ihrer Rolle." } }
    ] } }
];

export const aiVertical = { icon: "Sparkles", title: title("ai"),
  claim: { en: "Introducing AI that withstands an audit.", de: "KI einführen, die einer Prüfung standhält." },
  message: { en: "Many teams already use AI, often without overview, rules and evidence. We help use AI where it pays off, build it securely and steer it traceably. Vendor-neutral and with an auditor's eye.", de: "Viele Teams nutzen KI schon, oft ohne Überblick, Regeln und Nachweise. Wir helfen, KI dort einzusetzen, wo sie sich lohnt, sicher aufzubauen und nachvollziehbar zu steuern. Herstellerneutral und mit Prüferblick." },
  note: { en: "We advise and prepare. Certification to ISO/IEC 42001 is carried out by an independent certification body.", de: "Wir beraten und bereiten vor. Eine Zertifizierung nach ISO/IEC 42001 führt eine unabhängige Zertifizierungsstelle durch." } };

export const industries = [
  { en: "Automotive", de: "Automotive" }, { en: "Mechanical engineering", de: "Maschinenbau" }, { en: "Logistics", de: "Logistik" },
  { en: "E-commerce & customer experience", de: "E-Commerce & Customer Experience" }, { en: "Industrial IoT", de: "Industrial IoT" }
];


import { site } from "../site.js";
const brand = site.hasCompany ? site.company : "Engin Celenk";

export const fl = {
  en: {
    title: brand, desc: "IT architecture, cyber security and IT management, with AI as the vertical.",
    back: "Portfolio", skip: "Skip to content", navLabel: "Menu", navServices: "Services", navAbout: "About me", navContact: "Contact", aboutKicker: "Who I am", aboutTitle: "IT through and through.", aboutText: "I am the founder of ITX Consulting and IT through and through. I gained my professional experience as an employee at the leading companies of the Stuttgart region: as project manager, solution architect, lead architect, solution manager and cyber security engineer. My background combines software engineering with business informatics (M.Sc.): deep enough in technology for architecture and security, close enough to the business for decisions.",  heroLead: "Architecture, security and delivery from one hand.", h1a: "IT Architecture. Cyber Security. IT Management.", h1b: "With AI as the vertical.",
    cta: "Arrange a non-binding intro call",
    mapKicker: "Service portfolio", mapTitle: "Built to withstand audits.", mapLead: "We build, steer and secure IT in mid-sized companies so that it withstands an audit. We know both sides: building it and auditing it.", mapHint: "Select a pillar or the AI band.",
    aiAcross: "across all three pillars", inArea: "in",
    expKicker: "Experience from", expTitle: "Where I have delivered",
    cfgKicker: "Contact", cfgTitle: "Let's talk.", cfgLead: "Tell me briefly what it is about. I will get back to you personally.", subject: n => `Project request: ${n}`,
    note: "Details and prices after the intro call. No newsletter, no tracking."
  },
  de: {
    title: brand, desc: "IT-Architektur, Cyber Security und IT Management, mit KI als Vertikale.",
    back: "Portfolio", skip: "Zum Inhalt springen", navLabel: "Menü", navServices: "Leistungen", navAbout: "Über mich", navContact: "Kontakt", aboutKicker: "Wer ich bin", aboutTitle: "Durch und durch IT.", aboutText: "Ich bin Gründer von ITX Consulting und durch und durch ITler. Meine Berufserfahrung habe ich im Angestelltenverhältnis bei den führenden Unternehmen im Raum Stuttgart gesammelt: als Projektmanager, Solution Architect, Lead Architect, Solution Manager und Cyber Security Engineer. Mein Hintergrund verbindet Software Engineering mit Wirtschaftsinformatik (M.Sc.): technisch tief genug für Architektur und Security, nah genug am Geschäft für Entscheidungen.",  heroLead: "Architektur, Security und Delivery aus einer Hand.", h1a: "IT-Architektur. Cyber Security. IT Management.", h1b: "Mit KI als Vertikale.",
    cta: "Unverbindliches Erstgespräch vereinbaren",
    mapKicker: "Leistungsportfolio", mapTitle: "Prüfungsfest aufgebaut.", mapLead: "Wir bauen, steuern und sichern IT im Mittelstand so auf, dass sie einer Prüfung standhält. Wir kennen beide Seiten: den Aufbau und die Prüfung.", mapHint: "Säule oder KI-Band auswählen.",
    aiAcross: "quer über alle drei Säulen", inArea: "in",
    expKicker: "Erfahrung aus", expTitle: "Wo ich bereits geliefert habe",
    cfgKicker: "Kontakt", cfgTitle: "Sprechen wir.", cfgLead: "Schreiben Sie mir kurz, worum es geht. Ich melde mich persönlich bei Ihnen.", subject: n => `Projektanfrage: ${n}`,
    note: "Details und Preise nach dem Erstgespräch. Kein Newsletter, kein Tracking."
  }
};
