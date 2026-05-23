import { useState } from "react";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
}

interface LeadFormProps {
  source?: string;
  title?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  compact?: boolean;
}

const SERVICE_OPTIONS = [
  { value: "performance", label: "Performance Marketing" },
  { value: "seo", label: "SEO & Content Strategy" },
  { value: "ai-content", label: "AI Content Creation" },
  { value: "consulting", label: "Marketing Consultation" },
  { value: "full-funnel", label: "Full Funnel Strategy" },
];

function validate(fields: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.name || fields.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a valid email address";
  if (!fields.phone || fields.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number";
  if (!fields.company || fields.company.trim().length < 1) errors.company = "Company name is required";
  if (!fields.service) errors.service = "Please select a service";
  if (!fields.message || fields.message.trim().length < 5) errors.message = "Message must be at least 5 characters";
  return errors;
}

export function LeadForm({
  source = "website",
  submitLabel = "Submit Inquiry",
  successTitle = "Message Sent!",
  successMessage = "Our team will be in touch within 24 hours.",
  compact = false,
}: LeadFormProps) {
  const [fields, setFields] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const leadsEndpoint = import.meta.env.VITE_LEADS_ENDPOINT?.trim();

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(err => ({ ...err, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!leadsEndpoint) {
      setServerError("Lead form is not configured yet. Add VITE_LEADS_ENDPOINT before deploying.");
      setStatus("error");
      return;
    }

    setServerError("");
    setStatus("submitting");
    try {
      const res = await fetch(leadsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          source,
          timestamp: new Date().toISOString(),
        }),
      });
      const data = await parseLeadResponse(res);
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{successTitle}</h3>
        <p className="text-muted-foreground mb-8 max-w-sm">{successMessage}</p>
        <Button variant="outline" onClick={() => { setStatus("idle"); setFields({ name: "", email: "", phone: "", company: "", service: "", message: "" }); }} type="button">
          Submit Another
        </Button>
      </div>
    );
  }

  const gap = compact ? "gap-4" : "gap-6";

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("space-y-0 flex flex-col", gap)}>
      {/* Row 1: Name + Email */}
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", gap)}>
        <Field label="Full Name" error={errors.name}>
          <Input value={fields.name} onChange={set("name")} placeholder="Rahul Sharma" disabled={status === "submitting"} className={errors.name ? "border-red-500" : ""} />
        </Field>
        <Field label="Email Address" error={errors.email}>
          <Input type="email" value={fields.email} onChange={set("email")} placeholder="rahul@company.com" disabled={status === "submitting"} className={errors.email ? "border-red-500" : ""} />
        </Field>
      </div>

      {/* Row 2: Phone + Company */}
      <div className={cn("grid grid-cols-1 sm:grid-cols-2", gap)}>
        <Field label="Phone Number" error={errors.phone}>
          <Input type="tel" value={fields.phone} onChange={set("phone")} placeholder="+91 98765 43210" disabled={status === "submitting"} className={errors.phone ? "border-red-500" : ""} />
        </Field>
        <Field label="Company Name" error={errors.company}>
          <Input value={fields.company} onChange={set("company")} placeholder="Your Company Pvt Ltd" disabled={status === "submitting"} className={errors.company ? "border-red-500" : ""} />
        </Field>
      </div>

      {/* Row 3: Service */}
      <Field label="Service Interested In" error={errors.service}>
        <Select value={fields.service} onChange={set("service")} disabled={status === "submitting"} className={errors.service ? "border-red-500" : ""}>
          <option value="">Select a service...</option>
          {SERVICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
      </Field>

      {/* Row 4: Message */}
      <Field label="Message" error={errors.message}>
        <Textarea
          value={fields.message}
          onChange={set("message")}
          placeholder="Tell us about your goals, current challenges, or what you're looking to achieve..."
          disabled={status === "submitting"}
          className={cn("min-h-[120px]", errors.message ? "border-red-500" : "")}
        />
      </Field>

      {serverError && status === "error" && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{serverError}</p>
      )}

      <Button type="submit" size="lg" className="w-full gap-2 mt-2" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
        ) : (
          <><Send className="w-4 h-4" /> {submitLabel}</>
        )}
      </Button>
    </form>
  );
}

async function parseLeadResponse(res: Response): Promise<{ success?: boolean; error?: string }> {
  const text = await res.text();

  if (!text) {
    return res.ok
      ? { success: true }
      : { success: false, error: "Empty response from lead service." };
  }

  try {
    return JSON.parse(text);
  } catch {
    return res.ok
      ? { success: true }
      : { success: false, error: "Unexpected response from lead service." };
  }
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
