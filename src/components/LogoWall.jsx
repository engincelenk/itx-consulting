import { motion, useReducedMotion } from "motion/react";
import Logo from "./Logo.jsx";
import { logoStrip, logos } from "../data/profile.js";
/* All logos visible at once. They pop in one after another and lift on hover. */
export default function LogoWall({ flat = false }) {
  const reduce = useReducedMotion();
  return (
    <ul className="mt-4 grid grid-cols-5 gap-2 sm:gap-3 lg:grid-cols-10">
      {logoStrip.map((id, i) => (
        <motion.li key={id} initial={reduce ? false : { opacity: 0, y: 14, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }} whileHover={reduce ? undefined : { y: -4, scale: 1.06 }}>
          {(() => {
            const l = logos[id];
            const tile = <Logo id={id} className={`h-10 w-full sm:h-14${flat ? "" : " shadow-lg shadow-black/20 transition-shadow hover:shadow-[0_8px_30px_-6px_rgb(var(--c-signal)/.55)]"}`} pad="p-1.5 sm:p-2" />;
            return l?.url ? <a href={l.url} target="_blank" rel="noopener noreferrer" aria-label={l.name} className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal">{tile}</a> : tile;
          })()}
        </motion.li>
      ))}
    </ul>
  );
}
