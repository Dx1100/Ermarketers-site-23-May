import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { Award, Target, Eye, Zap, Users } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    document.querySelectorAll("[data-count-up]").forEach((el) => {
      const targetStr = el.getAttribute("data-count-value") || "0";
      // Removing any non-numeric chars from target before parsing if needed, but in this case we expect clean numbers in data-count-value
      const target = Number(targetStr);
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.from({ val: 0 }, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate() { el.textContent = Math.round(this.targets()[0].val).toString(); },
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const stats = [
    { value: "8", suffix: "+", label: "Years Experience" },
    { value: "200", suffix: "+", label: "Clients Scaled" },
    { value: "50", suffix: "+", label: "Digital Experts" },
    { value: "500", prefix: "₹", suffix: "Cr+", label: "Ad Spend Managed" }
  ];

  const values = [
    { icon: <Target className="w-6 h-6 text-primary" />, title: "Data-Driven", desc: "Every decision is backed by solid analytics, not gut feeling." },
    { icon: <Eye className="w-6 h-6 text-primary" />, title: "Transparent", desc: "Complete visibility into where every rupee of your budget goes." },
    { icon: <Zap className="w-6 h-6 text-primary" />, title: "Results-Focused", desc: "We tie our success to your bottom-line business metrics." },
    { icon: <Award className="w-6 h-6 text-primary" />, title: "Innovation-First", desc: "Constantly adopting new AI tools and beta platforms." }
  ];

  const team = [
    { name: "Rahul Desai", role: "Founder & CEO" },
    { name: "Neha Sharma", role: "Head of Performance" },
    { name: "Vikram Singh", role: "SEO Director" },
    { name: "Pooja Mehta", role: "Creative Director" },
    { name: "Arjun Nair", role: "Lead Data Analyst" },
    { name: "Sanya Gupta", role: "Client Success Head" }
  ];

  return (
    <Layout title="Er marketers | About Us" description="Learn about the team driving digital growth for India's top brands.">
      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
           <img src={`${import.meta.env.BASE_URL}images/about-story.png`} alt="Abstract" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wider mb-6">OUR STORY</div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8">Built for the <span className="text-gradient">Ambitious</span></h1>
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
                Er marketers was founded with a singular mission: to provide enterprise-level digital marketing sophistication to ambitious Indian brands. We are a collective of data scientists, creative strategists, and growth hackers.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel-strong gradient-border rounded-[2.5rem] p-10 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
              {stats.map((stat, i) => (
                <Reveal key={i} delay={i * 100} className="text-center px-4">
                  <div className="number-stat mb-3">
                    {stat.prefix}
                    <span data-count-up data-count-value={stat.value}>0</span>
                    {stat.suffix}
                  </div>
                  <div className="text-sm md:text-base font-bold text-white/60 uppercase tracking-widest">{stat.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Our <span className="text-primary">DNA</span></h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">The core principles that guide our work, our hiring, and our client relationships.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group glass-panel-strong p-10 rounded-3xl h-full card-hover border-t-2 border-t-transparent hover:border-t-primary relative overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative z-10 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 animate-float shadow-inner shadow-white/5" style={{ animationDelay: `${i * 0.2}s` }}>
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 bg-card/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-20 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Meet the <span className="text-primary">Experts</span></h2>
                <p className="text-xl text-muted-foreground">The minds behind the growth engines.</p>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-full glass-panel border border-white/10 text-white font-medium">
                <Users className="w-5 h-5 text-primary" />
                <span>50+ strong team</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {team.map((member, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="group text-center">
                  <div className="aspect-square mb-6 rounded-[2rem] overflow-hidden bg-card border border-white/10 relative p-2 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_rgba(255,122,0,0.15)]">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 z-10 transition-opacity"></div>
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0A0A0A&color=FF7A00&size=256&bold=true`} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium tracking-wide">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}