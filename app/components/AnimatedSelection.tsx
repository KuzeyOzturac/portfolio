import React from "react";
// Adapted from ibelick's Motion Primitives Animated Background, discovered via 21st.dev.
// https://github.com/ibelick/motion-primitives/blob/main/components/core/animated-background.tsx
// MIT licensed; attribution in THIRD_PARTY_NOTICES.md. Semantic controls stay owned by the caller.
import { motion, useReducedMotion } from "motion/react";
export function AnimatedSelection({ id }: { id: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className="animated-selection"
      layoutId={reduced ? undefined : id}
      initial={false}
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
    />
  );
}
