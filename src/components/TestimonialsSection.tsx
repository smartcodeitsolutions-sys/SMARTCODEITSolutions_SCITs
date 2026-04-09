import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  { name: "Sarah Johnson", role: "CEO, TechVault", text: "Smart Code transformed our entire digital presence. Their team delivered an outstanding e-commerce platform that exceeded all expectations.", rating: 5 },
  { name: "Ahmed Khan", role: "Founder, GrowthPulse", text: "The marketing strategy and execution were flawless. We saw a 340% increase in ROI within the first quarter.", rating: 5 },
  { name: "Emily Chen", role: "CTO, FinFlow", text: "Their AI automation solutions saved us thousands of hours. The chatbot alone reduced support tickets by 65%.", rating: 5 },
  { name: "Michael Torres", role: "Director, Artisan Co.", text: "The brand identity they created perfectly captures our vision. Professional, creative, and incredibly responsive team.", rating: 5 },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3">What Clients <span className="text-gradient-primary">Say</span></h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-xl p-8 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={16} className="text-neon-orange fill-neon-orange" />
              ))}
            </div>
            <p className="text-foreground text-lg mb-6 italic">"{testimonials[current].text}"</p>
            <div className="font-bold text-foreground">{testimonials[current].name}</div>
            <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-6">
            <button onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-primary transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30"}`} />
              ))}
            </div>
            <button onClick={() => setCurrent((current + 1) % testimonials.length)} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-primary transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
