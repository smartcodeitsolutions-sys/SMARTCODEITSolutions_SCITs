import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { num: 1, content: '<span class="text-neon-purple">const</span> <span class="text-neon-cyan">agency</span> = {' },
  { num: 2, content: '  <span class="text-neon-green">name</span>: <span class="text-neon-orange">"Smart Code IT"</span>,' },
  { num: 3, content: '  <span class="text-neon-green">services</span>: [<span class="text-neon-orange">"Web"</span>, <span class="text-neon-orange">"AI"</span>, <span class="text-neon-orange">"Design"</span>],' },
  { num: 4, content: '  <span class="text-neon-green">mission</span>: <span class="text-neon-orange">"Digital Excellence"</span>,' },
  { num: 5, content: '  <span class="text-neon-purple">async</span> <span class="text-neon-cyan">transform</span>(business) {' },
  { num: 6, content: '    <span class="text-neon-purple">return await</span> <span class="text-neon-cyan">this</span>.innovate(business);' },
  { num: 7, content: '  }' },
  { num: 8, content: '};' },
];

const stats = [
  { value: "50+", label: "Projects" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];

const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/30"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
      />
    ))}
  </div>
);

const HeroSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => (prev < codeLines.length ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <Particles />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(160 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 100% 50%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 sm:mb-8 mx-auto lg:mx-0"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse_glow" />
              <span className="text-sm font-medium text-primary">Full-Service Digital Agency</span>
            </motion.div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5 sm:mb-6">
              Building Digital{" "}
              <span className="text-gradient-multi">Excellence</span> Through{" "}
              <span className="text-gradient-warm">Innovation</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-7 sm:mb-8 leading-relaxed">
              Smart Code IT Solutions is a full-service digital transformation agency specializing in cutting-edge web development, AI automation, e-commerce, and strategic digital marketing.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12 justify-center lg:justify-start">
              <button
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity neon-glow-green"
              >
                Explore Services
              </button>
              <button
                onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                View Portfolio
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-10 max-w-xl mx-auto lg:mx-0">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="min-w-0"
                >
                  <div className="text-xl sm:text-3xl font-black text-gradient-primary">{s.value}</div>
                  <div className="text-[11px] sm:text-sm text-muted-foreground leading-tight">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Code editor */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="rounded-xl overflow-hidden glass neon-glow-cyan">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-neon-orange" />
                <div className="w-3 h-3 rounded-full bg-neon-green" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">smartcode.ts</span>
              </div>
              {/* Code */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={line.num}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i < visibleLines ? 1 : 0 }}
                    className="flex gap-4"
                  >
                    <span className="text-muted-foreground/40 select-none w-4 text-right">{line.num}</span>
                    <span dangerouslySetInnerHTML={{ __html: line.content }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
