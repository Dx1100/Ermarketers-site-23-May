import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function Contact() {
  return (
    <Layout title="Er marketers | Contact Us" description="Get in touch with our team to start your digital growth journey.">
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] border-[1px] border-primary/20 rounded-full animate-spin-slow pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-[200px] h-[200px] border-[1px] border-primary/10 rounded-full animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold tracking-widest mb-6">REACH OUT</div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">Let's <span className="text-gradient">Talk Growth</span></h1>
              <p className="text-xl text-white/70 font-medium leading-relaxed">
                Whether you need a full-funnel strategy or a specialized campaign, our team is ready to analyze your business and map out a growth plan.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              <Reveal delay={100}>
                <div className="glass-panel-strong p-10 rounded-[2rem]">
                  <h3 className="text-2xl font-bold mb-8 text-white">Contact Information</h3>
                  <ul className="space-y-8">
                    <li className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner shadow-white/5">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg mb-1">DelhiHQ</div>
                        <div className="text-base text-white/60 leading-relaxed font-medium">
                          Kh. No 123<br />
                          Asola Extn<br />
                          Delhi - 110074
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner shadow-white/5">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg mb-1">Email Us</div>
                        <a href="mailto:ermarketersofficial@gmail.com" className="text-base font-medium text-white/60 hover:text-primary transition-colors">ermarketersofficial@gmail.com</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner shadow-white/5">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg mb-1">Call Us</div>
                        <div className="space-y-1">
                          <a href="tel:+919310011952" className="block text-base font-medium text-white/60 hover:text-primary transition-colors">9310011952</a>
                          <a href="tel:+918799742772" className="block text-base font-medium text-white/60 hover:text-primary transition-colors">8799742772</a>
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner shadow-white/5">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg mb-1">Office Hours</div>
                        <div className="text-base font-medium text-white/60">Tue-Sunday 11AM - 7:30 PM</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="h-56 rounded-[2rem] gradient-border bg-card/40 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center transition-colors group-hover:bg-black/20 backdrop-blur-[2px] group-hover:backdrop-blur-none">
                    <div className="px-6 py-3 bg-background/80 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-bold tracking-wide flex items-center gap-2 text-white shadow-xl">
                      <MapPin className="w-4 h-4 text-primary" /> View on Map
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,122,0,0.4) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/80 to-background z-0"></div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-3">
              <Reveal delay={150}>
                <div className="glass-panel-strong p-10 md:p-14 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
                  <h2 className="text-3xl font-extrabold mb-8 text-white relative z-10">Send us a message</h2>
                  <div className="relative z-10">
                    <LeadForm
                      source="contact-page"
                      submitLabel="Submit Inquiry"
                      successTitle="Message Sent!"
                      successMessage="Thank you for reaching out. One of our growth consultants will get back to you shortly."
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
