import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";

export default function CaseStudies() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "E-Commerce", "Edtech", "Services"];

  const caseStudies = [
    {
      id: 1,
      client: "Vantenstudio.com",
      industry: "E-Commerce",
      challenge: "High CPA on Meta Ads during festive seasons and low repeat purchase rate.",
      approach: "Restructured account taxonomy, implemented dynamic creative optimization, and built specialized retention funnels.",
      metrics: [
        { label: "Increase in ROAS", value: "+320%" },
        { label: "Reduction in CPA", value: "-45%" },
        { label: "YoY Revenue Growth", value: "2.8x" },
      ],
    },
    {
      id: 2,
      client: "MG Concept",
      industry: "Edtech",
      challenge: "Needed stronger digital demand generation and better conversion into online course sales in Delhi.",
      approach: "Improved campaign targeting, refreshed offer-led creatives, and optimized the lead-to-sale journey for higher-intent conversions.",
      metrics: [
        { label: "Increase in Online Course Sales", value: "+40%" },
        { label: "Lead Quality", value: "Improved" },
        { label: "Market Focus", value: "PAN India" },
      ],
    },
    {
      id: 3,
      client: "Service Brand",
      industry: "Services",
      challenge: "Low lead-to-opportunity conversion rates from search campaigns.",
      approach: "Overhauled the lead collection funnel, optimized landing page speed, and implemented value-based campaign bidding.",
      metrics: [
        { label: "Increase in Leads", value: "+40%" },
        { label: "Conversion Rate", value: "+23%" },
        { label: "Cost Per Lead (CPL)", value: "-30%" },
      ],
    },
  ];

  const filteredStudies = filter === "All" ? caseStudies : caseStudies.filter((study) => study.industry === filter);

  return (
    <Layout title="Case Studies | ER Marketers" description="Explore real growth outcomes delivered by ER Marketers across eCommerce and Edtech campaigns.">
      <section className="pt-24 pb-12 bg-card/20 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Growth <span className="text-primary">Outcomes</span> Across Industries</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              See how strategic improvements in paid media, SEO, CRO, and lifecycle marketing translated into stronger business results.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredStudies.map((study, index) => (
              <Reveal key={study.id} type={index % 2 === 0 ? "left" : "right"}>
                <div className="group glass-panel p-8 rounded-2xl h-full flex flex-col relative overflow-hidden card-hover border-l-2 border-l-transparent hover:border-l-primary">
                  <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">
                          {study.industry}
                        </span>
                        <h3 className="text-2xl font-bold">{study.client}</h3>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 flex-1">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground/80 mb-1">Problem:</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground/80 mb-1">What We Changed:</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{study.approach}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx} className="min-w-0">
                          <div className="number-stat-card mb-1 pb-1 whitespace-nowrap">{metric.value}</div>
                          <div className="text-xs text-muted-foreground leading-tight">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filteredStudies.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              No case studies found for this category yet.
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
