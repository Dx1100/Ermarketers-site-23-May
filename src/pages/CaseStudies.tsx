import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";

export default function CaseStudies() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "E-commerce", "SaaS", "Healthcare", "EdTech", "Real Estate"];

  const caseStudies = [
    {
      id: 1,
      client: "FashionIndia.com",
      industry: "E-commerce",
      challenge: "High CPA on Meta Ads during festive seasons and low repeat purchase rate.",
      approach: "Restructured account taxonomy, implemented dynamic creative optimization, and built specialized retention funnels.",
      metrics: [
        { label: "Increase in ROAS", value: "+320%" },
        { label: "Reduction in CPA", value: "-45%" },
        { label: "YoY Revenue Growth", value: "2.8x" }
      ]
    },
    {
      id: 2,
      client: "TechStartup Mumbai",
      industry: "SaaS",
      challenge: "Struggling to gain visibility against global competitors for high-intent B2B keywords.",
      approach: "Executed a programmatic SEO strategy creating 500+ bottom-of-funnel comparison pages alongside technical fixes.",
      metrics: [
        { label: "Organic Traffic Growth", value: "+220%" },
        { label: "MQLs Generated", value: "850+" },
        { label: "Page 1 Rankings", value: "120+" }
      ]
    },
    {
      id: 3,
      client: "HealthCare Plus Delhi",
      industry: "Healthcare",
      challenge: "Low appointment booking rates from Google Search Ads due to poor landing page experience.",
      approach: "Complete overhaul of localized landing pages with CRO best practices and transition to value-based bidding.",
      metrics: [
        { label: "Increase in Leads", value: "+180%" },
        { label: "Conversion Rate", value: "4.5% to 12%" },
        { label: "Cost Per Booking", value: "-60%" }
      ]
    },
    {
      id: 4,
      client: "EduTech Bangalore",
      industry: "EdTech",
      challenge: "High drop-off rate between app install and paid course enrollment.",
      approach: "Implemented lifecycle marketing via email/WhatsApp and launched app-specific performance max campaigns.",
      metrics: [
        { label: "App Installs", value: "4x" },
        { label: "Free to Paid Conv.", value: "+40%" },
        { label: "Active Daily Users", value: "50k+" }
      ]
    },
    {
      id: 5,
      client: "RealEstate Hub",
      industry: "Real Estate",
      challenge: "Generating high volume of junk leads wasting sales team bandwidth.",
      approach: "Shifted from lead-gen objective to conversion objective focusing on qualified appointments, added pre-qualifying quiz.",
      metrics: [
        { label: "Lead Quality Score", value: "+75%" },
        { label: "Cost Per Site Visit", value: "-30%" },
        { label: "Units Sold via Ads", value: "45+" }
      ]
    },
    {
      id: 6,
      client: "RetailKart",
      industry: "E-commerce",
      challenge: "Content production bottleneck preventing scaling of category pages.",
      approach: "Deployed custom AI content generation pipeline with human editorial review to scale category descriptions.",
      metrics: [
        { label: "Pages Published", value: "5,000+" },
        { label: "Long-tail Traffic", value: "+150%" },
        { label: "Time to Publish", value: "-80%" }
      ]
    }
  ];

  const filteredStudies = filter === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === filter);

  return (
    <Layout title="Case Studies | GrowthLab" description="See how we've driven massive growth for our clients across various industries.">
      {/* Hero */}
      <section className="pt-24 pb-12 bg-card/20 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-primary">Impact</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results for real businesses. Explore how our strategic interventions have transformed our clients' bottom lines.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters */}
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

          {/* Grid */}
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
                        <h4 className="text-sm font-semibold text-foreground/80 mb-1">The Challenge:</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground/80 mb-1">Our Approach:</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{study.approach}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <div className="number-stat mb-1">{metric.value}</div>
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
