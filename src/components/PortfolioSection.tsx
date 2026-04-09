import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Web Development", "E-commerce", "Marketing", "Branding", "AI Automation", "Apps"];

const projects = [
  { title: "TechVault E-commerce Platform", category: "E-commerce", desc: "Full-stack e-commerce solution with AI-powered recommendations and real-time analytics.", color: "neon-glow-green" },
  { title: "FinFlow Dashboard", category: "Web Development", desc: "Real-time financial analytics dashboard with interactive charts and automated reporting.", color: "neon-glow-cyan" },
  { title: "GrowthPulse Campaign", category: "Marketing", desc: "Multi-channel digital marketing campaign achieving 340% ROI increase.", color: "neon-glow-purple" },
  { title: "Artisan Brand Identity", category: "Branding", desc: "Complete brand overhaul including logo, guidelines, and digital presence.", color: "neon-glow-green" },
  { title: "AutoBot AI Assistant", category: "AI Automation", desc: "Custom AI chatbot reducing customer support tickets by 65%.", color: "neon-glow-cyan" },
  { title: "FitTrack Mobile App", category: "Apps", desc: "Cross-platform fitness app with real-time tracking and social features.", color: "neon-glow-purple" },
];

const PortfolioSection = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">Our Work</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-4">
            Featured <span className="text-gradient-primary">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Explore our latest projects and see how we transform ideas into digital reality.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === cat ? "bg-primary text-primary-foreground neon-glow-green" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                className={`group rounded-xl overflow-hidden glass hover:${project.color} transition-all duration-300`}
              >
                {/* Placeholder visual */}
                <div className="h-48 bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-black text-primary/20">{project.title[0]}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <button
                      onClick={() => setSelectedProject(i)}
                      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-2"
                    >
                      View Case Study <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{project.category}</span>
                  <h3 className="font-bold text-foreground mt-1 mb-2 text-sm">{project.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-strong rounded-2xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{projects[selectedProject].category}</span>
                    <h3 className="text-2xl font-black text-foreground mt-1">{projects[selectedProject].title}</h3>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="text-muted-foreground hover:text-foreground">✕</button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Overview</h4>
                    <p className="text-muted-foreground text-sm">{projects[selectedProject].desc}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Challenge</h4>
                    <p className="text-muted-foreground text-sm">The client needed a comprehensive digital solution to modernize their operations and improve customer engagement across all channels.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Solution</h4>
                    <p className="text-muted-foreground text-sm">We delivered a custom-built solution leveraging modern technologies, resulting in improved performance, user experience, and measurable business growth.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"].map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Results</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[{ v: "150%", l: "Traffic Increase" }, { v: "65%", l: "Cost Reduction" }, { v: "4.9★", l: "Client Rating" }].map((r) => (
                        <div key={r.l} className="text-center p-3 rounded-lg bg-secondary">
                          <div className="text-xl font-black text-gradient-primary">{r.v}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">{r.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioSection;
