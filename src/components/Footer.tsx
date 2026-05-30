import { Link } from "wouter";
import { Twitter, Linkedin, Instagram, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { siteContent } from "@/content/siteContent";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/30 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full section-divider"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#D45D00] flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_12px_rgba(255,122,0,0.4)] transition-transform group-hover:scale-105">
                {siteContent.brand.logoLetter}
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {siteContent.brand.namePlain.split(" ")[0]}{" "}
                <span className="text-gradient">{siteContent.brand.nameAccent}</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed italic">
              "{siteContent.footer.tagline}"
            </p>
            <div className="flex gap-4 pt-2">
              <a href={siteContent.footer.social.twitter} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-gradient-to-br hover:from-[#FF7A00] hover:to-[#D45D00] hover:text-white transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={siteContent.footer.social.linkedin} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-gradient-to-br hover:from-[#FF7A00] hover:to-[#D45D00] hover:text-white transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={siteContent.footer.social.instagram} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-gradient-to-br hover:from-[#FF7A00] hover:to-[#D45D00] hover:text-white transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {siteContent.footer.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              {siteContent.footer.serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-semibold text-white mb-6">{siteContent.footer.newsletterTitle}</h4>
            <p className="text-sm text-muted-foreground mb-4">{siteContent.footer.newsletterBlurb}</p>
            <div className="flex gap-2 mb-8">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-white/30"
              />
              <Button size="sm" variant="gradient" className="shrink-0 rounded-xl px-4">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href={`mailto:${siteContent.footer.contactEmail}`} className="hover:text-primary transition-colors">
                  {siteContent.footer.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <a href={`tel:${siteContent.footer.contactPhoneTel}`} className="hover:text-primary transition-colors">
                    {siteContent.footer.contactPhoneDisplay}
                  </a>
                  {siteContent.footer.contactPhoneDisplay2 && (
                    <a href={`tel:${siteContent.footer.contactPhoneTel2}`} className="hover:text-primary transition-colors">
                      {siteContent.footer.contactPhoneDisplay2}
                    </a>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteContent.brand.namePlain}. {siteContent.footer.copyrightTail}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href={siteContent.footer.legal.privacyHref} className="hover:text-white transition-colors">
              {siteContent.footer.legal.privacyLabel}
            </a>
            <a href={siteContent.footer.legal.termsHref} className="hover:text-white transition-colors">
              {siteContent.footer.legal.termsLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
