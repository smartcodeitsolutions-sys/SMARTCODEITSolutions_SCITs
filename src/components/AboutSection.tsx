import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users } from "lucide-react";

const milestones = [
  { year: "2019", title: "Founded", desc: "Smart Code IT Solutions was established with a vision for digital excellence." },
  { year: "2020", title: "First 10 Clients", desc: "Delivered transformative solutions across web, marketing, and design." },
  { year: "2022", title: "AI Integration", desc: "Expanded into AI automation and intelligent business solutions." },
  { year: "2024", title: "50+ Projects", desc: "Reached milestone of 50+ successfully delivered projects worldwide." },
];

const counters = [
  { target: 50, suffix: "+", label: "Projects Completed" },
  { target: 40, suffix: "+", label: "Happy Clients" },
  { target: 5, suffix: "+", label: "Years Experience" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
];

const Counter = ({ target, suffix, label }: { target: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        let start = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(interval); }
          else setCount(start);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-black text-gradient-primary">{count}{suffix}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

const AboutSection = () => (
  <section id="about" className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary tracking-wider uppercase">Who We Are</span>
        <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-4">About <span className="text-gradient-primary">Smart Code</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We are a passionate team of developers, designers, and strategists dedicated to transforming businesses through technology and creativity.
        </p>
      </motion.div>

      {/* Mission / Vision */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          { icon: Target, title: "Our Mission", desc: "To empower businesses with innovative digital solutions that drive growth, enhance engagement, and deliver measurable results." },
          { icon: Eye, title: "Our Vision", desc: "To be the leading digital transformation partner, recognized for excellence, innovation, and unwavering commitment to client success." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Counters */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 glass rounded-xl p-8">
        {counters.map((c) => <Counter key={c.label} {...c} />)}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"} mb-8 pl-12 md:pl-0`}
          >
            <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary neon-glow-green mt-2" />
            <div className={`glass rounded-xl p-6 max-w-sm ${i % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}>
              <span className="text-primary font-bold text-sm">{m.year}</span>
              <h4 className="font-bold text-foreground mt-1">{m.title}</h4>
              <p className="text-muted-foreground text-sm mt-2">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
