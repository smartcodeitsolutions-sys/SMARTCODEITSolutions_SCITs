import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What services does Smart Code IT Solutions offer?", a: "We offer a comprehensive range of digital services including web development, e-commerce solutions, digital marketing, AI automation, mobile app development, branding, and design." },
  { q: "How long does a typical project take?", a: "Project timelines vary based on complexity. A standard website takes 2-4 weeks, while complex web applications or e-commerce platforms may take 6-12 weeks." },
  { q: "Do you provide ongoing support?", a: "Yes! We offer 24/7 technical support and maintenance packages to ensure your digital solutions remain secure, up-to-date, and performing optimally." },
  { q: "What is your development process?", a: "Our process includes discovery, planning, design, development, testing, deployment, and ongoing support. We keep you involved at every stage." },
  { q: "Can you work with existing websites?", a: "Absolutely. We can redesign, optimize, or add new features to your existing website or application." },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3">Frequently Asked <span className="text-gradient-primary">Questions</span></h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full glass rounded-xl p-5 text-left flex items-center justify-between gap-4 hover:neon-glow-green transition-all"
              >
                <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                <ChevronDown size={18} className={`text-primary flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-4 pt-2">
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
