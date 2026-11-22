/** Design DNA: Intelligence meets Technology. Deep navy ground, orange only for interaction and key statements. */
export default {
  content: ["./index.html", "./cv/index.html", "./cv/print.html", "./legal.html", "./link.html", "./tech-check.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Farben als CSS-Variablen (src/index.css), damit das helle Theme nur Werte tauscht.
        ink: "rgb(var(--c-ink) / <alpha-value>)",       // page ground
        deep: "rgb(var(--c-deep) / <alpha-value>)",     // deeper wells
        navy: "rgb(var(--c-navy) / <alpha-value>)",     // panels, lines
        signal: "rgb(var(--c-signal) / <alpha-value>)", // interaction + key statements
        snow: "rgb(var(--c-snow) / <alpha-value>)",     // primary text
        mist: "rgb(var(--c-mist) / <alpha-value>)",     // secondary text
        white: "rgb(var(--c-white) / <alpha-value>)"    // Linien/Flächen-Tönung (im hellen Theme dunkel); echtes Weiß: bg-[#fff]
      },
      fontFamily: {
        sans: ["Geist Variable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono Variable", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      maxWidth: { page: "1200px" },
      letterSpacing: { label: "0.14em" }
    }
  },
  plugins: []
};
