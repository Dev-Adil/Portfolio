/**
 * Impact Stats Band
 *
 * Surfaces the strongest résumé metrics as count-up figures that animate
 * when scrolled into view. Reduced-motion shows final values immediately.
 *
 * @component
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../utils/useInView";
import { prefersReducedMotion } from "../utils/performance";

type Stat = { value: number; prefix?: string; suffix?: string; label: string };

const STATS: ReadonlyArray<Stat> = [
  { value: 10, label: "Years in production" },
  { value: 50, suffix: "K+", label: "Users served" },
  { value: 3, suffix: "×", label: "Faster feature delivery" },
  { value: 40, suffix: "%", label: "Faster repeat loads" },
];

function useCountUp(target: number, run: boolean, reduce: boolean, duration = 1100) {
  const [val, setVal] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    let startTs = 0;
    const tick = (t: number) => {
      if (!startTs) startTs = t;
      const p = Math.min((t - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, reduce, duration]);
  return val;
}

const StatItem = ({ stat, run, reduce }: { stat: Stat; run: boolean; reduce: boolean }) => {
  const val = useCountUp(stat.value, run, reduce);
  return (
    <div className="flex flex-col items-center text-center px-2">
      <span className="text-[34px] sm:text-[44px] font-black leading-none gradient-text">
        {stat.prefix}
        {val}
        {stat.suffix}
      </span>
      <span className="mt-2 text-secondary text-[12px] sm:text-[13px] uppercase tracking-wider">
        {stat.label}
      </span>
    </div>
  );
};

const Stats = () => {
  const reduce = prefersReducedMotion();
  const { ref, inView } = useInView({ rootMargin: "0px", threshold: 0.3 });

  return (
    <section className="relative z-10 max-w-7xl mx-auto sm:px-16 px-6 pt-4 pb-2">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 rounded-2xl bg-black-100/60 backdrop-blur-sm border border-white/10 py-8 px-6"
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} run={inView} reduce={reduce} />
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;
