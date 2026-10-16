import React from "react";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  BookOpen,
  Brain,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  Code2,
  Crown,
  ExternalLink,
  Globe2,
  GraduationCap,
  Hand,
  Leaf,
  Mail,
  Medal,
  Mic,
  Pause,
  Play,
  Shield,
  Sparkles,
  TrainFront,
  X,
} from "lucide-react";
const icons = {
  arrow: ArrowUpRight,
  down: ArrowDown,
  right: ArrowRight,
  book: BookOpen,
  brain: Brain,
  chart: ChartNoAxesCombined,
  check: Check,
  chevron: ChevronRight,
  code: Code2,
  crown: Crown,
  external: ExternalLink,
  github: GithubLogo,
  globe: Globe2,
  graduation: GraduationCap,
  hand: Hand,
  leaf: Leaf,
  linkedin: LinkedinLogo,
  mail: Mail,
  medal: Medal,
  mic: Mic,
  pause: Pause,
  play: Play,
  shield: Shield,
  sparkles: Sparkles,
  train: TrainFront,
  close: X,
};
export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const I = icons[name as keyof typeof icons] || Shield;
  return (
    <I aria-hidden="true" className={`icon ${className}`} strokeWidth={1.4} />
  );
}
