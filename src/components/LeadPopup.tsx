import { useState, useEffect, useCallback } from "react";
import { X, ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ermarketers_popup_date";
const SCROLL_THRESHOLD = 0.6;
const TIMER_DELAY_MS = 3 * 60 * 1000;

function hasShownToday(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    return stored === new Date().toDateString();
  } catch {
    return false;
  }
}

function markShownToday(): void {
  try {
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
  } catch {}
}

interface FormState {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function validate(fields: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required";
  if (!fields.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Enter a valid email";
  if (!fields.phone.trim()) errors.phone = "Phone is required";
  else if (!/^[0-9+\-\s]{7,15}$/.test(fields.phone.trim()))
    errors.phone = "Enter a valid phone number";
  return errors;
}

export function LeadPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState<FormState>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const leadsEndpoint = import.meta.env.VITE_LEADS_ENDPOINT?.trim();

  const showPopup = useCallback(() => {
    if (hasShownToday() || dismissed) return;
    setVisible(true);
    markShownToday();
  }, [dismissed]);

  useEffect(() => {
    if (hasShownToday()) return;

    const timer = setTimeout(showPopup, TIMER_DELAY_MS);

    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD) {
        showPopup();
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [showPopup]);

  const close = () => {
    setVisible(false);
    setDismissed(true);
    markShownToday();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, ...validate({ ...fields, [name]: value }) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate({ ...fields, [name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!leadsEndpoint) {
      // Fallback if not configured yet, so the user doesn't get blocked in dev
      setSubmitted(true);
      setTimeout(() => {
        setVisible(false);
        setDismissed(true);
      }, 2800);
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      const res = await fetch(leadsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          company: "N/A (Popup Capture)",
          service: "Free Growth Audit",
          message: "Lead captured via homepage pop-up modal.",
          source: "popup-modal",
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setVisible(false);
          setDismissed(true);
        }, 2800);
      } else {
        setServerError("Failed to submit. Please try again.");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        "bg-black/70 backdrop-blur-sm",
        "animate-popup-overlay"
      )}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Get a free consultation"
    >
      <div
        className={cn(
          "relative w-full max-w-md",
          "rounded-2xl overflow-hidden",
          "glass-panel-strong border border-white/10",
          "shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,122,0,0.15)]",
          "animate-popup-card"
        )}
      >
        {/* Top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF7A00] via-[#FFB366] to-[#D45D00]" />

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-7 sm:p-8">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 badge-glow px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3 h-3" />
                  Limited Time — Free Audit
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                  Get a Free <span className="text-gradient">Growth Audit</span>
                </h2>
                <p className="text-white/55 text-sm leading-relaxed">
                  Our experts will analyze your digital footprint and identify revenue opportunities — at no cost.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="popup-name" className="block text-xs font-semibold text-white/60 uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="popup-name"
                    name="name"
                    type="text"
                    placeholder="Rahul Sharma"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full h-11 px-4 rounded-xl bg-white/5 border text-white placeholder-white/25 text-sm",
                      "focus:outline-none focus:ring-2 transition-all duration-200",
                      errors.name && touched.name
                        ? "border-red-500/60 focus:ring-red-500/30"
                        : "border-white/10 focus:border-primary/50 focus:ring-primary/20"
                    )}
                  />
                  {errors.name && touched.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="popup-email" className="block text-xs font-semibold text-white/60 uppercase tracking-wide mb-1.5">
                    Work Email
                  </label>
                  <input
                    id="popup-email"
                    name="email"
                    type="email"
                    placeholder="rahul@company.com"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full h-11 px-4 rounded-xl bg-white/5 border text-white placeholder-white/25 text-sm",
                      "focus:outline-none focus:ring-2 transition-all duration-200",
                      errors.email && touched.email
                        ? "border-red-500/60 focus:ring-red-500/30"
                        : "border-white/10 focus:border-primary/50 focus:ring-primary/20"
                    )}
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="popup-phone" className="block text-xs font-semibold text-white/60 uppercase tracking-wide mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="popup-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={fields.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full h-11 px-4 rounded-xl bg-white/5 border text-white placeholder-white/25 text-sm",
                      "focus:outline-none focus:ring-2 transition-all duration-200",
                      errors.phone && touched.phone
                        ? "border-red-500/60 focus:ring-red-500/30"
                        : "border-white/10 focus:border-primary/50 focus:ring-primary/20"
                    )}
                  />
                  {errors.phone && touched.phone && (
                    <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>

                {serverError && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-center">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "relative w-full h-12 mt-2 rounded-xl font-semibold text-white text-sm overflow-hidden",
                    "bg-gradient-to-r from-[#FF7A00] via-[#FFB366] to-[#D45D00] bg-[length:200%_auto]",
                    "flex items-center justify-center gap-2",
                    "shadow-[0_4px_20px_rgba(255,122,0,0.4)]",
                    "transition-all duration-300",
                    "hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,122,0,0.6)]",
                    "active:scale-[0.98] active:translate-y-0",
                    "btn-shine",
                    submitting && "opacity-80 cursor-not-allowed"
                  )}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    <>
                      Claim My Free Audit
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-white/30 pt-1">
                  No credit card · No commitment · 100% free
                </p>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">You're all set!</h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-xs mx-auto">
                Our team will reach out within <span className="text-primary font-semibold">24 hours</span> to schedule your free growth audit.
              </p>
              <div className="mt-6 flex flex-col gap-2 text-xs text-white/30">
                <span>Check your email for confirmation</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popup-overlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popup-card {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-popup-overlay {
          animation: popup-overlay 0.25s ease-out forwards;
        }
        .animate-popup-card {
          animation: popup-card 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
