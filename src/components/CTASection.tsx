import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden bg-card/20">
      <div className="absolute top-0 left-0 w-full section-divider animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
      
      {/* Background accents & animated mesh */}
      <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 border border-primary/10 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-16 border border-primary/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Reveal>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
            Ready to Scale Your <br className="hidden sm:block" />
            <span className="text-gradient">Digital Presence?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Stop leaving money on the table. Partner with India's most data-driven digital growth agency and dominate your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="xl" variant="gradient" className="w-full sm:w-auto shadow-2xl shadow-primary/20">
                Get a Free Audit <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto">
              <Button size="xl" variant="outline" className="w-full sm:w-auto hover:border-primary/50 hover:text-primary bg-background/50 backdrop-blur-sm">
                Explore Services
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/80 animate-pulse"></span>
            Join 200+ brands scaling with Er marketers
          </p>
        </Reveal>
      </div>
    </section>
  );
}