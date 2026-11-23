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
      { title: { en: "Target architecture, strategy & governance", de: "Zielarchitektur, Strategie & Governance" }, text: { en: "Business requirements turned into a target architecture and roadmap with business, product owners and teams; decisions documented and represented in the architecture board.", de: "Anforderungen mit Fachbereich, Product Owner und Teams in Zielarchitektur und Roadmap übersetzt; Entscheidungen dokumentiert und im Architecture Board vertreten." } },
      { title: { en: "Reviews & technology decisions", de: "Reviews & Technologieentscheidungen" }, text: { en: "Independent assessments of solutions, risks and technical debt; make-or-buy and vendor decisions on criteria, not on demos; technical guidance of teams and quality of implementation.", de: "Unabhängige Bewertung von Lösungen, Risiken und technischen Schulden; Make-or-buy- und Anbieterentscheidungen nach Kriterien, nicht nach Demos; technische Führung der Teams und Qualität der Umsetzung." } },
      { title: { en: "Solution architecture, microservices & APIs", de: "Solution-Architektur, Microservices & APIs" }, text: { en: "End-to-end architecture from requirement to operations: microservices, event-driven, API-first, domain-driven design, messaging, REST and API management.", de: "Architektur von Ende zu Ende, von der Anforderung bis zum Betrieb: Microservices, Event-driven, API-first, Domain-driven Design, Messaging, REST und API-Management." } },
      { title: { en: "Cloud architecture (Azure, AWS, GCP)", de: "Cloud-Architektur (Azure, AWS, GCP)" }, text: { en: "Platform and SaaS architectures on Azure, AWS and Google Cloud; non-functional requirements secured: performance, availability, scalability, observability, security by design and cost.", de: "Plattform- und SaaS-Architekturen auf Azure, AWS und Google Cloud; nicht-funktionale Anforderungen abgesichert: Performance, Verfügbarkeit, Skalierbarkeit, Observability, Security by Design und Kosten." } },
      { title: { en: "SAP & enterprise integration", de: "SAP- & Enterprise-Integration" }, text: { en: "Interfaces and integration to existing systems: SAP (SD, MM, FI, PM, SRM), e-commerce, PIM and MAM in a coherent enterprise landscape.", de: "Schnittstellen und Integration zu bestehenden Systemen: SAP (SD, MM, FI, PM, SRM), E-Commerce, PIM und MAM in einer stimmigen Unternehmenslandschaft." } },
      { title: { en: "Modernization & migration (incl. mainframe)", de: "Modernisierung & Migration (inkl. Mainframe)" }, text: { en: "Step-by-step transition from legacy landscapes, including IBM mainframe, to modern platforms.", de: "Schrittweiser Übergang von Altlandschaften, auch IBM Mainframe, auf moderne Plattformen." } }
    ],
    ai: { title: aiV.aspects.architecture, text: { en: "Architectures for LLM apps and AI agents: tools, data access, MCP, guardrails.", de: "Architekturen für LLM-Anwendungen und KI-Agenten: Tools, Datenzugriffe, MCP, Leitplanken." } } },
  { id: "security", icon: "ShieldCheck", title: title("security"),
    claim: { en: "Security built into strategy, design and operations.", de: "Security in Strategie, Design und Betrieb verankert." },
    offers: [
      { title: { en: "Security strategy & roadmap", de: "Security-Strategie & Roadmap" }, text: { en: "Business risk translated into priorities and a funded roadmap.", de: "Geschäftsrisiken in Prioritäten und eine finanzierbare Roadmap übersetzt." } },
      { title: { en: "Security architecture, Zero Trust & IAM", de: "Security-Architektur, Zero Trust & IAM" }, text: { en: "Secure by design for identity, platforms and products: Zero Trust, IAM and network segmentation.", de: "Secure by Design für Identität, Plattformen und Produkte: Zero Trust, IAM und Netzwerksegmentierung." } },
      { title: { en: "Cloud security (Azure, AWS, GCP)", de: "Cloud-Security (Azure, AWS, GCP)" }, text: { en: "Security architecture and guardrails for workloads on Azure, AWS and Google Cloud.", de: "Security-Architektur und Leitplanken für Workloads auf Azure, AWS und Google Cloud." } },
      { title: { en: "Threat modeling & TARA", de: "Threat Modeling & TARA" }, text: { en: "Threat modeling (STRIDE) and TARA, risks rated and measures traceable.", de: "Threat Modeling (STRIDE) und TARA, Risiken bewertet, Maßnahmen nachvollziehbar." } },
      { title: { en: "ISO 27001, NIST & GRC", de: "ISO 27001, NIST & GRC" }, text: { en: "Governance, risk and compliance: ISO 27001, NIST CSF, NIS2 and CRA turned into concrete controls.", de: "Governance, Risk und Compliance: ISO 27001, NIST CSF, NIS2 und CRA in konkrete Maßnahmen übersetzt." } },
      { title: { en: "DevSecOps & secure development", de: "DevSecOps & sichere Entwicklung" }, text: { en: "Security requirements in the development process (OWASP), plus maturity checks and assessments.", de: "Security-Anforderungen im Entwicklungsprozess (OWASP), dazu Reifegrad-Checks und Assessments." } }
    ],
    ai: { title: aiV.aspects.security, text: { en: "Risks of LLMs and agents: prompt injection, data leakage, OWASP LLM Top 10, EU AI Act.", de: "Risiken von LLMs und Agenten: Prompt Injection, Datenabfluss, OWASP LLM Top 10, EU AI Act." } } },
  { id: "management", icon: "Workflow", title: title("management"), subtitle: subtitle("management"),
    claim: { en: "Complex IT delivered, end to end.", de: "Komplexe IT-Vorhaben sicher ins Ziel gebracht." },
    offers: [
      { title: { en: "Project, program & platform management", de: "Projekt-, Programm- & Plattformmanagement" }, text: { en: "Leading complex IT projects, programs and platforms across teams, partners and budgets.", de: "Führung komplexer IT-Projekte, -Programme und -Plattformen über Teams, Partner und Budgets." } },
      { title: { en: "Product ownership across the lifecycle", de: "Product Ownership über den gesamten Lifecycle" }, text: { en: "Responsibility for an application or platform from idea to retirement: roadmap, priorities, value.", de: "Verantwortung für Anwendung oder Plattform von der Idee bis zur Ablösung: Roadmap, Prioritäten, Wertbeitrag." } },
      { title: { en: "Migration, PoCs & rollouts", de: "Migration, PoCs & Rollouts" }, text: { en: "Proofs of concept that settle decisions, migrations and rollouts that land safely.", de: "Proofs of Concept, die Entscheidungen belegen, sowie Migrationen und Rollouts, die sicher landen." } },
      { title: { en: "Operations", de: "Betrieb & Operations" }, text: { en: "Stable operation, incident and change handling and continuous improvement after go-live.", de: "Stabiler Betrieb, Incident- und Change-Management und stetige Verbesserung nach dem Go-live." } },
      { title: { en: "Agile & hybrid delivery, PMO", de: "Agile & hybride Delivery, PMO" }, text: { en: "Delivery models, governance and reporting that fit your organisation.", de: "Vorgehensmodelle, Steuerung und Reporting passend zur Organisation." } },
      { title: { en: "Logistics IT", de: "Logistik-IT" }, text: { en: "Transport management and logistics solutions with partners and carriers.", de: "Transportmanagement und Logistiklösungen mit Partnern und Dienstleistern." } }
    ],
    ai: { title: aiV.aspects.management, text: { en: "Use case portfolio, pilots and rollout of AI, plus AI-assisted delivery.", de: "Use-Case-Portfolio, Pilote und Rollout von KI, dazu KI-gestützte Projektarbeit." } } }
];

export const aiVertical = { icon: "Sparkles", title: title("ai"), claim: aiV.claim };

export const industries = [
  { en: "Automotive", de: "Automotive" }, { en: "Mechanical engineering", de: "Maschinenbau" }, { en: "Logistics", de: "Logistik" },
  { en: "E-commerce & customer experience", de: "E-Commerce & Customer Experience" }, { en: "Industrial IoT", de: "Industrial IoT" }
];


import { site } from "../site.js";
const brand = site.hasCompany ? site.company : "Engin Celenk";

export const fl = {
  en: {
    title: brand, desc: "IT architecture, cyber security and IT management, with AI as the vertical.",
    back: "Portfolio", skip: "Skip to content", aboutKicker: "Who I am", aboutTitle: "IT through and through.", aboutText: "I am the founder of Solvexa Consulting and IT through and through. I gained my professional experience as an employee at the leading companies of the Stuttgart region: as project manager, solution architect, lead architect, solution manager and cyber security engineer. My background combines software engineering with business informatics (M.Sc.): deep enough in technology for architecture and security, close enough to the business for decisions.",  heroLead: "Architecture, security and delivery from one hand. For IT leaders in enterprises and mid-sized companies who need complex programs landed safely.", h1a: "IT Architecture. Cyber Security. IT Management.", h1b: "With AI as the vertical.",
    cta: "Get in touch",
    mapKicker: "Service portfolio", mapTitle: "Three pillars, one vertical.", mapLead: "Select a pillar or the AI band.",
    aiAcross: "across all three pillars", inArea: "in",
    expKicker: "Experience from", expTitle: "Where I have delivered",
    cfgKicker: "Contact", cfgTitle: "Let's talk.", cfgLead: "Tell me briefly what it is about. I will get back to you personally.", subject: n => `Project request: ${n}`,
    note: "Details and prices after the intro call. No newsletter, no tracking."
  },
  de: {
    title: brand, desc: "IT-Architektur, Cyber Security und IT Management, mit KI als Vertikale.",
    back: "Portfolio", skip: "Zum Inhalt springen", aboutKicker: "Wer ich bin", aboutTitle: "Durch und durch IT.", aboutText: "Ich bin Gründer von Solvexa Consulting und durch und durch ITler. Meine Berufserfahrung habe ich im Angestelltenverhältnis bei den führenden Unternehmen im Raum Stuttgart gesammelt: als Projektmanager, Solution Architect, Lead Architect, Solution Manager und Cyber Security Engineer. Mein Hintergrund verbindet Software Engineering mit Wirtschaftsinformatik (M.Sc.): technisch tief genug für Architektur und Security, nah genug am Geschäft für Entscheidungen.",  heroLead: "Architektur, Security und Delivery aus einer Hand. Für IT-Entscheider in Konzern und Mittelstand, die komplexe Vorhaben sicher ins Ziel bringen müssen.", h1a: "IT-Architektur. Cyber Security. IT Management.", h1b: "Mit KI als Vertikale.",
    cta: "Kontakt aufnehmen",
    mapKicker: "Leistungsportfolio", mapTitle: "Drei Säulen, eine Vertikale.", mapLead: "Säule oder KI-Band auswählen.",
    aiAcross: "quer über alle drei Säulen", inArea: "in",
    expKicker: "Erfahrung aus", expTitle: "Wo ich bereits geliefert habe",
    cfgKicker: "Kontakt", cfgTitle: "Sprechen wir.", cfgLead: "Schreiben Sie mir kurz, worum es geht. Ich melde mich persönlich bei Ihnen.", subject: n => `Projektanfrage: ${n}`,
    note: "Details und Preise nach dem Erstgespräch. Kein Newsletter, kein Tracking."
  }
};
