import { BarChart3, Search, Sparkles, Target } from "lucide-react";
import type { IconKey } from "./siteContent";

export function getIcon(icon: IconKey, className: string) {
  switch (icon) {
    case "barChart3":
      return <BarChart3 className={className} />;
    case "search":
      return <Search className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "target":
      return <Target className={className} />;
  }
}

