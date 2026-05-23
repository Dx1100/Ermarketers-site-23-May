import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LeadPopup } from "./LeadPopup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function Layout({ 
  children, 
  title = "GrowthLab | Premium Digital Marketing Agency India",
  description = "India's premier digital marketing agency specializing in performance marketing, SEO, AI content, and brand scaling."
}: LayoutProps) {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Animate section dividers
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const triggers = gsap.utils.toArray<HTMLElement>(".section-divider").map(el =>
      gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true }
      })
    );
    return () => { 
      triggers.forEach(t => (t.scrollTrigger as ScrollTrigger)?.kill()); 
      ScrollTrigger.refresh(); 
    };
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 pt-20">
        {children}
      </main>
      
      <Footer />
      <LeadPopup />
    </div>
  );
}
