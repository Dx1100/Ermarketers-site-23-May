import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import gsap from "gsap";
import { siteContent } from "@/content/siteContent";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -80, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.1 });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const navLinks = siteContent.nav.links;

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    >
      <div className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500",
        isScrolled ? "py-3" : "py-5"
      )}>
        <div className={cn(
          "flex justify-between items-center px-5 md:px-8 h-16 md:h-[68px] transition-all duration-500",
          isScrolled
            ? "rounded-2xl bg-[#09090c] shadow-2xl shadow-black/40 border border-white/10"
            : "rounded-2xl"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#D45D00] flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_12px_rgba(255,122,0,0.4)] transition-transform group-hover:scale-105">
              {siteContent.brand.logoLetter}
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              {siteContent.brand.namePlain.split(" ")[0]}{" "}
              <span className="text-gradient">{siteContent.brand.nameAccent}</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(255,122,0,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href={siteContent.nav.ctaHref}>
              <Button size="sm" variant="gradient" className="gap-2 font-semibold">
                {siteContent.nav.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-white/70 hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden mx-4 bg-[#09090c] shadow-2xl rounded-2xl border border-white/8 transition-all duration-300 overflow-hidden",
        mobileMenuOpen ? "max-h-[400px] opacity-100 mt-1" : "max-h-0 opacity-0"
      )}>
        <nav className="flex flex-col p-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                location === link.href
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-white/8">
            <Link href={siteContent.nav.ctaHref} className="block">
              <Button className="w-full justify-center gap-2 font-bold" variant="gradient">
                {siteContent.nav.ctaLabel} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
