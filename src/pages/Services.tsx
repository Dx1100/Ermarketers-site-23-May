import { Layout } from "@/components/Layout";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { CheckCircle2 } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { getIcon } from "@/content/iconMap";

export default function Services() {
  const { servicesPage } = siteContent;

  return (
    <Layout title={servicesPage.seoTitle} description={servicesPage.seoDescription}>
      <section className="pt-32 pb-20 border-b border-white/5 bg-card/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold tracking-widest mb-8">{servicesPage.heroEyebrow}</div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              Our <span className="text-gradient">{servicesPage.heroTitle.replace("Our ", "")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
              {servicesPage.heroSubtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 relative z-10">
          {servicesPage.services.map((service, index) => (
            <div key={service.id} id={service.id} className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              
              <Reveal className="w-full lg:w-1/2" type={index % 2 === 0 ? "left" : "right"}>
                <div className="group glass-panel-strong p-10 md:p-14 rounded-[2.5rem] border-l-[3px] border-l-transparent hover:border-l-primary relative overflow-hidden transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 shadow-inner shadow-white/5 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                      {getIcon(service.icon, "w-12 h-12 text-primary")}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">{service.title}</h2>
                    <p className="text-lg text-zinc-300 leading-relaxed mb-10">
                      {service.description}
                    </p>
                    <ul className="space-y-5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <CheckCircle2 className="w-6 h-6 text-primary shrink-0 drop-shadow-[0_0_8px_rgba(255,122,0,0.5)]" />
                          <span className="text-zinc-100 font-medium text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal className="w-full lg:w-1/2" type={index % 2 === 0 ? "right" : "left"}>
                <div className="aspect-square max-w-[500px] mx-auto rounded-[3rem] gradient-border bg-card/40 backdrop-blur-md relative overflow-hidden flex items-center justify-center p-10 shadow-2xl">
                  <div className="absolute inset-0 mesh-bg opacity-40"></div>

                  <div className="relative z-10 w-full h-full border border-white/10 rounded-[2rem] bg-background/60 backdrop-blur-xl shadow-2xl flex flex-col p-8 card-hover">
                    <div className="w-full h-8 border-b border-white/10 mb-6 flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-white/20"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-white/20"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-white/20"></div>
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="w-3/4 h-5 bg-white/10 rounded-md"></div>
                      <div className="w-1/2 h-5 bg-white/10 rounded-md"></div>
                      <div className="w-full h-32 bg-primary/10 rounded-2xl mt-10 flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(255,122,0,0.1)]">
                        <div className="scale-150">
                          {getIcon(service.icon, "w-12 h-12 text-primary")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
