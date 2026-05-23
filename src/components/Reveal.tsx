import { ReactNode } from "react";
import { useScrollReveal, RevealType } from "@/hooks/use-scroll-reveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: RevealType;
}

export function Reveal({ children, className, delay = 0, type = "up" }: RevealProps) {
  const ref = useScrollReveal(type, delay / 1000); // convert ms to seconds

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
