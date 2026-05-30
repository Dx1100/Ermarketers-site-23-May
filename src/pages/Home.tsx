import { Link } from "wouter";
import { ArrowRight, Quote, ArrowUpRight, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/content/siteContent";
import { getIcon } from "@/content/iconMap";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroBgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (heroContentRef.current) {
      gsap.to(heroContentRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: heroContentRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!headlineRef.current) return;
    const lines = headlineRef.current.querySelectorAll(".hero-line");
    gsap.from(lines, {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2,
    });
  }, []);

  const { home } = siteContent;

  return (
    <Layout title={home.seoTitle}>
      <section className="relative min-h-[100vh] flex items-center pt-24 pb-20 overflow-hidden">
        <div ref={heroBgRef} className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg-dark.png`}
            alt="Abstract dark background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
          <div className="hero-glow top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="hero-glow top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-primary/6 blur-[120px] w-[800px] h-[800px]"></div>
          <div className="absolute inset-0 dot-grid opacity-50"></div>

          <div className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-primary/20 animate-spin-slow left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#FF7A00] -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        <div ref={heroContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel-strong badge-glow text-sm font-semibold tracking-wide mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                {home.heroBadge}
              </div>
            </Reveal>

            <h1 ref={headlineRef} className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.05]">
              <span className="hero-line block text-white drop-shadow-lg">{home.heroHeadlineLines[0]}</span>
              <span className="hero-line block text-gradient pb-2 drop-shadow-2xl">{home.heroHeadlineLines[1]}</span>
            </h1>

            <Reveal delay={200}>
              <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                {home.heroSubheadline}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
                <Button size="xl" variant="gradient" className="gap-2 shadow-2xl shadow-primary/20" onClick={() => document.getElementById("audit-form")?.scrollIntoView()}>
                  Get a Free Audit <ArrowRight className="w-5 h-5" />
                </Button>
                <Link href="/case-studies">
                  <Button size="xl" variant="outline" className="bg-background/40 backdrop-blur-md hover:border-primary/50">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="pt-10 border-t border-white/10 mt-10">
                <p className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-6">{home.trustedByLabel}</p>
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  {home.trustedByBrands.map((brand, i) => (
                    <div key={i} className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white/80">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full section-divider animate-shimmer" style={{ backgroundSize: "200% 100%" }}></div>
      </section>

      <section className="py-12 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {home.stats.map((stat, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="glass-panel-strong p-6 md:p-8 rounded-2xl text-center border-t border-t-primary/20">
                  <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base text-primary font-medium tracking-wide uppercase">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wider mb-6">WHAT WE DO</div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Core <span className="text-primary">Expertise</span></h2>
                <p className="text-lg text-muted-foreground">We build performance, SEO, AI content, and website systems that support measurable business growth.</p>
              </div>
              <Link href="/services">
                <Button variant="ghost" size="lg" className="gap-2 group text-base">
                  All Services <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-primary" />
                </Button>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.services.map((service, index) => {
              const serviceIds = ["performance", "seo", "ai", "website-development"];
              return (
                <Reveal key={index} delay={index * 100}>
                  <Link href={`/services#${serviceIds[index]}`} className="block h-full">
                    <div className="group relative glass-panel-strong p-8 rounded-3xl h-full card-hover overflow-hidden flex flex-col cursor-pointer">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-deep-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute top-6 right-6 text-3xl font-bold text-white/5 group-hover:text-primary/10 transition-colors">
                        0{index + 1}
                      </div>

                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner shadow-white/5 group-hover:border-primary/30 transition-colors">
                          {getIcon(service.icon, "w-8 h-8 text-primary")}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                        <p className="text-zinc-300 text-base leading-relaxed mb-8 flex-1">{service.desc}</p>

                        <div className="flex items-center gap-2 text-primary font-semibold mt-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          Explore <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wider mb-6">PROVEN RESULTS</div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Real <span className="text-primary">Impact</span></h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A quick look at the type of outcomes we help brands work toward across paid media, content, and growth execution.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.caseStudies.map((study, index) => (
              <Reveal key={index} delay={index * 100} type="scale">
                <Link href="/case-studies" className="block group">
                  <div className="relative rounded-3xl overflow-hidden h-96 card-hover border border-white/10">
                    <img
                      src={study.image}
                      alt={study.client}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                      <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider bg-primary/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">{study.industry}</div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{study.client}</h3>

                      <div className="pt-4 border-t border-white/20 mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <div className="text-4xl font-extrabold text-white mb-1 drop-shadow-md">{study.metric}</div>
                        <div className="text-sm font-medium text-white/80">{study.metricLabel}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-16 text-center">
              <Link href="/case-studies">
                <Button variant="secondary" size="xl" className="font-bold border-white/10 bg-white/5 hover:bg-white/10">
                  + See All Case Studies
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-32 bg-card/20 border-y border-border/50 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wider mb-6">CLIENT LOVE</div>
              <h2 className="text-4xl md:text-5xl font-extrabold">What They <span className="text-primary">Say</span></h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The campaign structure became far more efficient, and we finally had better visibility into what was driving real sales.",
                author: "Brand Partner",
                role: "E-Commerce Growth",
                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
              },
              {
                quote: "We appreciated the focus on practical execution. The strategy felt grounded in business outcomes, not vanity metrics.",
                author: "Marketing Lead",
                role: "Edtech Brand",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
              },
              {
                quote: "Their approach helped us connect paid media, landing page improvements, and lead quality in a much clearer way.",
                author: "Operations Head",
                role: "Growth-Focused Business",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="glass-panel-strong p-10 rounded-3xl h-full flex flex-col border-l-[3px] border-l-primary hover:border-l-deep-accent transition-colors">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="w-16 h-16 text-primary/20 mb-6 absolute top-8 right-8" />
                  <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-10 flex-1 relative z-10">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={t.avatar} alt={t.author} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                    <div>
                      <div className="font-bold text-white text-lg">{t.author}</div>
                      <div className="text-sm text-primary font-medium">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="audit-form" className="py-32 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel-strong rounded-[2.5rem] p-8 md:p-16 border-border/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 border border-primary/20 rounded-full animate-spin-slow opacity-50 pointer-events-none">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#FF7A00] -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <Reveal>
                  <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Get a Free <br /><span className="text-gradient">Growth Audit</span></h2>
                  <p className="text-xl text-white/70 mb-10 leading-relaxed">
                    Discover hidden revenue opportunities in your current marketing strategy. Our experts will analyze your digital footprint and provide actionable insights.
                  </p>
                  <ul className="space-y-6 mb-8 text-lg font-medium">
                    {[
                      "Comprehensive SEO Analysis",
                      "Ad Account Waste Identification",
                      "Competitor Benchmarking",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_#FF7A00]"></div>
                        </div>
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <div>
                <Reveal delay={200}>
                  <div className="bg-background/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-xl">
                    <LeadForm
                      source="home-audit"
                      submitLabel="Claim Free Audit"
                      successTitle="Audit Requested!"
                      successMessage="Our team will be in touch within 24 hours."
                      compact
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
