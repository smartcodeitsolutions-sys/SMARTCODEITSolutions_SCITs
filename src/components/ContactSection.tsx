import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hi! I'm ${form.name}. I need help with: ${form.service}. ${form.message}`);
    window.open(`https://wa.me/923022120509?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-4">
            Contact <span className="text-gradient-primary">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Ready to start your project? Let's discuss how we can help transform your digital presence.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 space-y-5"
          >
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
              { key: "email", label: "Email", type: "email", placeholder: "john@example.com" },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  required
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Service Needed</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select a service</option>
                <option>Web Development</option>
                <option>E-commerce</option>
                <option>Digital Marketing</option>
                <option>AI & Automation</option>
                <option>Mobile App Development</option>
                <option>Design & Branding</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
              />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity neon-glow-green">
              Send Message <Send size={16} />
            </button>
          </motion.form>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {[
              { icon: Phone, title: "Phone", info: "+92 302 2120509" },
              { icon: Mail, title: "Email", info: "info@smartcodeit.com" },
              { icon: MapPin, title: "Location", info: "Karachi, Pakistan" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass rounded-xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">{item.title}</div>
                    <div className="text-foreground font-semibold">{item.info}</div>
                  </div>
                </div>
              );
            })}

            {/* WhatsApp */}
            <a
              href="https://wa.me/923022120509"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 glass rounded-xl p-6 hover:neon-glow-green transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-neon-green/20 flex items-center justify-center">
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
