import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useServices } from "@/hooks/useServices";

const FORM_ENDPOINT = "https://formspree.io/f/xwvyrlko";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; service?: string; message?: string }>({});
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "sending" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const { services, loading, error, fetchServices } = useServices();

  useEffect(() => {
    const loadServices = async () => {
      await fetchServices();
    };
    loadServices();

    const handleServicesUpdated = () => {
      loadServices();
    };

    window.addEventListener("servicesUpdated", handleServicesUpdated);
    return () => window.removeEventListener("servicesUpdated", handleServicesUpdated);
  }, []);

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!form.name.trim()) nextErrors.name = "Full Name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.service.trim()) nextErrors.service = "Please select a service.";
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const selectedService = services.find((service) => service.title === form.service);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submissionState.status === "sending") return;
    if (!validate()) return;

    setSubmissionState({ status: "sending", message: "Sending your message..." });

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        service: form.service,
        message: form.message.trim(),
        _replyto: form.email.trim(),
        _subject: "Website Contact Submission",
      };

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage = data?.error || "Submission failed";
        throw new Error(errorMessage);
      }

      setForm({ name: "", email: "", service: "", message: "" });
      setErrors({});
      setSubmissionState({ status: "success", message: "Thank you! Your message was submitted successfully." });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong while sending your message. Please try again in a moment.";
      setSubmissionState({
        status: "error",
        message,
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-4">
            Contact <span className="text-gradient-primary">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to start your project? Let’s get your request submitted and our team will follow up promptly.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[32px] p-6 md:p-8 space-y-6 shadow-xl border border-white/10"
          >
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-2xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {errors.name && <p className="mt-2 text-xs text-rose-400">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-2xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {errors.email && <p className="mt-2 text-xs text-rose-400">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Service Needed</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange("service")}
                className="w-full appearance-none px-4 py-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              >
                <option value="">Select a service</option>
                {services && services.length > 0 ? (
                  services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.active ? "🟢 " : "🔴 "}
                      {service.title}
                    </option>
                  ))
                ) : (
                  <option disabled>{loading ? "Loading services..." : "No services available"}</option>
                )}
              </select>
              {errors.service && <p className="mt-2 text-xs text-rose-400">{errors.service}</p>}
              {form.service && (
                <div
                  className={`mt-4 rounded-3xl border p-4 text-sm ${
                    selectedService?.active
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
                      : "border-rose-500/30 bg-rose-500/10 text-rose-100"
                  }`}
                >
                  {selectedService?.active ? (
                    <p>
                      This service is available — we’ll contact you shortly with the next steps.
                    </p>
                  ) : (
                    <p>
                      This request is queued due to high demand — we’ll follow up as soon as possible.
                    </p>
                  )}
                </div>
              )}
              {error && <p className="mt-3 text-xs text-rose-400">Failed to load services: {error}</p>}
              <p className="text-xs text-muted-foreground mt-3">
                <span className="mr-3">🟢 Active</span>
                <span>🔴 Inactive / Wishlist</span>
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange("message")}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 rounded-2xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
              />
              {errors.message && <p className="mt-2 text-xs text-rose-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submissionState.status === "sending"}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submissionState.status === "sending" ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>

            {submissionState.status === "success" && (
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-400 mt-0.5" size={22} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Message sent successfully</p>
                    <p className="mt-2 text-sm text-muted-foreground">{submissionState.message}</p>
                  </div>
                </div>
              </div>
            )}

            {submissionState.status === "error" && (
              <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-rose-400 mt-0.5" size={22} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Submission failed</p>
                    <p className="mt-2 text-sm text-muted-foreground">{submissionState.message}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 sm:space-y-6"
          >
            {[
              { icon: Phone, title: "Phone", info: "+92 302 2120509" },
              { icon: Mail, title: "Email", info: "info@smartcodeit.com" },
              { icon: MapPin, title: "Location", info: "Karachi, Pakistan" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="glass rounded-3xl p-5 flex items-start gap-4 border border-white/10 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">{item.title}</div>
                    <div className="text-foreground font-semibold">{item.info}</div>
                  </div>
                </div>
              );
            })}

            <a
              href="https://wa.me/923022120509"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 glass rounded-3xl p-5 border border-white/10 hover:border-primary/30 transition-all shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-neon-green/20 flex items-center justify-center">
                <MessageCircle className="text-primary" size={20} />
              </div>
              <div>
                <div className="text-foreground font-semibold">Quick WhatsApp Chat</div>
                <div className="text-sm text-muted-foreground">Get instant response</div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
