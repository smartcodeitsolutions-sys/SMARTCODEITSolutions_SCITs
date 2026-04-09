import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";

const categories = ["All", "Web Development", "E-commerce", "Marketing", "Branding", "AI Automation", "Apps"];

const projects = [
  {
    title: "Blood Bridge",
    category: "Web Development",
    desc: "Smart blood donation platform with donor search, blood requests, and responsive emergency-first workflows.",
    color: "neon-glow-red",
    images: ["/P-1/01.png", "/P-1/02.png", "/P-1/03.png", "/P-1/04.png"],
    caseStudy: {
      status: "Discontinued Project ⚒️",
      developedBy: "Smart Code IT Solutions",
      github: "Add your GitHub link here",
      overview:
        "Blood Bridge is a full-stack blood donation management system designed to connect donors and recipients quickly during emergencies. It allows users to register as donors, search by blood group and location, and submit blood requests through a simple and responsive interface.",
      problem:
        "Finding blood donors in emergencies is often slow due to unorganized systems, manual communication, and lack of centralized data.",
      solution:
        "Blood Bridge provides a centralized platform where users can register as donors, search donors by blood group and location, submit blood requests instantly, and access structured donor data to improve speed and reliability in emergency situations.",
      features: ["Donor Registration System", "Search by Blood Group & Location", "Blood Request System", "Responsive UI", "MySQL Database Integration", "PHP-based Backend"],
      techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "XAMPP / WAMP"],
      statusNote: "Project is discontinued, but available for learning and further development.",
      future: ["API integration", "Mobile app version", "AI-based donor matching", "Live location tracking"],
    },
  },
  { title: "TechVault E-commerce Platform", category: "E-commerce", desc: "Full-stack e-commerce solution with AI-powered recommendations and real-time analytics.", color: "neon-glow-green" },
  { title: "FinFlow Dashboard", category: "Web Development", desc: "Real-time financial analytics dashboard with interactive charts and automated reporting.", color: "neon-glow-cyan" },
  { title: "GrowthPulse Campaign", category: "Marketing", desc: "Multi-channel digital marketing campaign achieving 340% ROI increase.", color: "neon-glow-purple" },
  { title: "Artisan Brand Identity", category: "Branding", desc: "Complete brand overhaul including logo, guidelines, and digital presence.", color: "neon-glow-green" },
  { title: "AutoBot AI Assistant", category: "AI Automation", desc: "Custom AI chatbot reducing customer support tickets by 65%.", color: "neon-glow-cyan" },
  { title: "FitTrack Mobile App", category: "Apps", desc: "Cross-platform fitness app with real-time tracking and social features.", color: "neon-glow-purple" },
];

const SlideshowPreview = ({
  images,
  title,
  onOpenCaseStudy,
  onOpenImage,
}: {
  images: string[];
  title: string;
  onOpenCaseStudy: () => void;
  onOpenImage: (index: number) => void;
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentImage((value) => (value + 1) % images.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <div className="h-48 bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentImage]}
          src={images[currentImage]}
          alt={`${title} preview ${currentImage + 1}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 h-full w-full object-cover cursor-zoom-in"
          onClick={() => onOpenImage(currentImage)}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className="rounded-full bg-background/70 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
          Web Development
        </span>
        <div className="flex gap-1.5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${currentImage === index ? "bg-primary scale-110" : "bg-white/50"}`}
              aria-label={`Show ${title} screenshot ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
        <button
          onClick={onOpenCaseStudy}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-2"
        >
          View Case Study <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

const PortfolioSection = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);
  const [selectedImageProjectTitle, setSelectedImageProjectTitle] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const selectedProject = selectedProjectTitle ? projects.find((project) => project.title === selectedProjectTitle) ?? null : null;
  const selectedImageProject = selectedImageProjectTitle
    ? projects.find((project) => project.title === selectedImageProjectTitle) ?? null
    : null;

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
                {project.title === "Blood Bridge" ? (
                  <SlideshowPreview
                    images={project.images}
                    title={project.title}
                    onOpenCaseStudy={() => setSelectedProjectTitle(project.title)}
                    onOpenImage={(index) => {
                      setSelectedImageProjectTitle(project.title);
                      setSelectedImageIndex(index);
                    }}
                  />
                ) : (
                  <div className="h-48 bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-black text-primary/20">{project.title[0]}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <button
                        onClick={() => setSelectedProjectTitle(project.title)}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-2"
                      >
                        View Case Study <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                )}
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
              onClick={() => setSelectedProjectTitle(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-strong rounded-2xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedProject.title === "Blood Bridge" && (
                  <div className="mb-6 overflow-hidden rounded-2xl border border-border">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
                      {(selectedProject as typeof projects[number] & { images?: string[] }).images?.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          className="aspect-square bg-background overflow-hidden cursor-zoom-in"
                          onClick={() => {
                            setSelectedImageProjectTitle(selectedProject.title);
                            setSelectedImageIndex(index);
                          }}
                        >
                          <img src={image} alt={`Blood Bridge screenshot ${index + 1}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{selectedProject.category}</span>
                    <h3 className="text-2xl font-black text-foreground mt-1">{selectedProject.title}</h3>
                    {selectedProject.title === "Blood Bridge" && (
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Discontinued Project ⚒️</p>
                    )}
                  </div>
                  <button onClick={() => setSelectedProjectTitle(null)} className="text-muted-foreground hover:text-foreground">✕</button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Overview</h4>
                    <p className="text-muted-foreground text-sm">
                      {selectedProject.title === "Blood Bridge" ? selectedProject.caseStudy?.overview : selectedProject.desc}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Problem</h4>
                    <p className="text-muted-foreground text-sm">
                      {selectedProject.title === "Blood Bridge"
                        ? selectedProject.caseStudy?.problem
                        : "The client needed a comprehensive digital solution to modernize their operations and improve customer engagement across all channels."}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Solution</h4>
                    <p className="text-muted-foreground text-sm">
                      {selectedProject.title === "Blood Bridge"
                        ? selectedProject.caseStudy?.solution
                        : "We delivered a custom-built solution leveraging modern technologies, resulting in improved performance, user experience, and measurable business growth."}
                    </p>
                  </div>
                  {selectedProject.title === "Blood Bridge" && (
                    <>
                      <div>
                        <h4 className="font-bold text-foreground mb-2">Developed By</h4>
                        <p className="text-muted-foreground text-sm">{selectedProject.caseStudy?.developedBy}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-2">GitHub Repository</h4>
                        <p className="text-muted-foreground text-sm">👉 {selectedProject.caseStudy?.github}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-2">Key Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.caseStudy?.features.map((feature) => (
                            <span key={feature} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.title === "Blood Bridge"
                        ? selectedProject.caseStudy?.techStack ?? []
                        : ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"]
                      ).map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Results</h4>
                    {selectedProject.title === "Blood Bridge" ? (
                      <div className="space-y-3 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
                        <p>{selectedProject.caseStudy?.statusNote}</p>
                        <div>
                          <h5 className="font-semibold text-foreground mb-1">Future Improvements</h5>
                          <ul className="space-y-1">
                            {selectedProject.caseStudy?.future.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs uppercase tracking-wider text-primary font-semibold">{selectedProject.caseStudy?.status}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-4">
                        {[{ v: "150%", l: "Traffic Increase" }, { v: "65%", l: "Cost Reduction" }, { v: "4.9★", l: "Client Rating" }].map((r) => (
                          <div key={r.l} className="text-center p-3 rounded-lg bg-secondary">
                            <div className="text-xl font-black text-gradient-primary">{r.v}</div>
                            <div className="text-[10px] text-muted-foreground mt-1">{r.l}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedImageProject && selectedImageProject.images?.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedImageProjectTitle(null)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                className="relative w-full max-w-6xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="absolute -top-12 right-0 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex((value) => (value - 1 + selectedImageProject.images.length) % selectedImageProject.images.length)}
                    className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex((value) => (value + 1) % selectedImageProject.images.length)}
                    className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedImageProjectTitle(null)}
                    className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
                    aria-label="Close image viewer"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
                  <img
                    src={selectedImageProject.images[selectedImageIndex]}
                    alt={`${selectedImageProject.title} enlarged screenshot ${selectedImageIndex + 1}`}
                    className="max-h-[85vh] w-full object-contain bg-black"
                  />
                </div>
                <div className="mt-3 text-center text-xs uppercase tracking-wider text-white/70">
                  {selectedImageIndex + 1} / {selectedImageProject.images.length}
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
