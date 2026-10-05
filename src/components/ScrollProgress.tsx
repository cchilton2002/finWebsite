import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 right-0 z-40 w-[3px] bg-navy/5">
      <motion.div style={{ scaleY }} className="h-full origin-top bg-magenta" />
    </div>
  );
}
