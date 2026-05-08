import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  BookOpen,
  Layout,
  Video,
  Bot,
  BarChart3,
  Megaphone,
  Wrench,
  Share2,
  Cpu,
  Smartphone,
  Package,
  X,
} from "lucide-react";

const services = [
  {
    id: "full-stack",
    icon: Globe,
    title: "Full-Stack Web Development",
    category: "Core Solution",
    desc: "High-performance, responsive, and dynamic websites designed for modern business goals.",
    details: [
      { label: "Dynamic Business Websites", value: "Professional portfolios and complex corporate platforms." },
      { label: "UI/UX-Focused Design", value: "Modern and intuitive interfaces (Figma-based)." },
      { label: "Conversion-Optimized Landing Pages", value: "Fast-loading pages built to turn visitors into leads." },
      { label: "Mobile-First Engineering", value: "Seamless user experience across all devices." },
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce Setup & Infrastructure",
    category: "Core Solution",
    desc: "Expert store configuration and optimization across global marketplaces.",
    details: [
      { label: "Multi-Platform Configuration", value: "Professional setup for Shopify, WooCommerce, Amazon, eBay, Walmart, and Etsy." },
      { label: "Strategic Store Design", value: "Bespoke storefronts that reflect your brand identity." },
      { label: "SEO-Optimized Product Listings", value: "High-ranking titles and descriptions for maximum visibility." },
      { label: "Store Customization", value: "Seamless integration of themes, plugins, and branding assets." },
    ],
    note: "Base packages include technical setup and design. For full-service Virtual Assistance (Product Hunting/Sourcing), please Book a Consultation.",
  },
  {
    id: "ebooks",
    icon: BookOpen,
    title: "Premium Ebooks & Lead Magnets",
    category: "Core Solution",
    desc: "High-value digital assets designed to build authority and capture leads.",
    details: [
      { label: "Professional Layout Design", value: "Visually stunning PDF formatting and custom graphics." },
      { label: "Strategic Lead Magnets", value: "Designed specifically to grow your sales funnel and email list." },
      { label: "Interactive Elements", value: "Clickable CTAs, links, and navigation for a seamless user experience." },
    ],
  },
  {
    id: "templates",
    icon: Layout,
    title: "Custom Template Design",
    category: "Core Solution",
    desc: "Tailor-made, fully editable templates crafted from scratch based on your unique vision.",
    details: [
      { label: "Presentation & Slide Design", value: "Professional decks (PowerPoint, Canva, Google Slides)." },
      { label: "Document & Branding Templates", value: "Custom-styled business documents and layouts." },
      { label: "Social Media Graphics", value: "Ready-to-use editable templates for consistent branding." },
    ],
    note: "We do not sell generic pre-made templates; every asset is custom-designed for your specific requirements.",
  },
  {
    id: "motion-graphics",
    icon: Video,
    title: "Visual Content & Motion Graphics",
    category: "Core Solution",
    desc: "High-impact visuals designed to stop the scroll and drive engagement.",
    details: [
      { label: "Short-Form Vertical Content (9:16)", value: "Viral-ready videos for TikTok, Instagram Reels, and YouTube Shorts." },
      { label: "Specialized Product Commercials", value: "High-converting video ads designed to showcase and sell products." },
      { label: "Premium Video Editing", value: "Story-driven post-production, color grading, and professional sound design." },
      { label: "2D & 3D Animations", value: "High-end explainer videos and realistic product visualizations." },
      { label: "Brand Identity Systems", value: "Cohesive logos, typography, and visual brand guidelines." },
    ],
  },
  {
    id: "faceless",
    icon: Bot,
    title: "Faceless Content Automation (For Creators)",
    category: "Core Solution",
    desc: "End-to-end video creation services designed for YouTube, TikTok, and Facebook, allowing creators to scale without being on camera.",
    details: [
      { label: "Faceless Video Production", value: "High-quality long-form and short-form video creation for automated channels." },
      { label: "Strategic Automation", value: "Complete workflow from scriptwriting and professional voiceovers to stock footage integration." },
      { label: "Platform-Optimized Content", value: "Tailored storytelling for YouTube Automation and Facebook Watch algorithms." },
    ],
  },
  {
    id: "infographic",
    icon: BarChart3,
    title: "Strategic Infographic Design",
    category: "Core Solution",
    desc: "Data-driven and visually compelling infographics to simplify complex information.",
    details: [
      { label: "Educational & Technical Infographics", value: "Clear visualizations for technical concepts and systems." },
      { label: "Social Media Infographics", value: "High-engagement vertical designs optimized for Pinterest and Instagram." },
      { label: "Corporate & Research Visuals", value: "Professional charts and layouts for business reports and presentations." },
    ],
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Digital Marketing & Performance",
    category: "Core Solution",
    desc: "Comprehensive growth strategies across all major digital ecosystems.",
    details: [
      { label: "Paid Advertising (PPC)", value: "Data-driven campaigns on Meta, Facebook, Instagram, Google Ads, YouTube, TikTok Ads, LinkedIn Ads, Twitter (X) Ads, and Pinterest Ads." },
      { label: "Performance SEO", value: "On-page and technical optimization for Google and Bing search rankings." },
      { label: "Social Media Marketing (SMM)", value: "Strategic content and promotions to build brand visibility." },
    ],
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Technical Maintenance & Support",
    category: "Advanced Solution",
    desc: "Ongoing technical management to ensure your Web or Mobile application remains secure and active.",
    details: [
      { label: "Continuous Monitoring", value: "Regular updates, security patches, and performance tuning." },
      { label: "Content & Database Management", value: "Expert handling of backend infrastructure and periodic data updates." },
      { label: "Status", value: "Available via consultation." },
    ],
  },
  {
    id: "social-media",
    icon: Share2,
    title: "Dedicated Social Media Management (Full-Time)",
    category: "Advanced Solution",
    desc: "Complete management of your social handles, including daily engagement and community growth strategy.",
    details: [
      { label: "Status", value: "Accepting select projects via consultation." },
    ],
  },
  {
    id: "ai-automation",
    icon: Cpu,
    title: "Custom AI & Automation Engineering",
    category: "Advanced Solution",
    desc: "Streamlining business operations through intelligent automation and AI integration.",
    details: [
      { label: "AI Workflow Automation (n8n, make, Zapier, IFTTT)", value: "Automating repetitive manual tasks to scale efficiency." },
      { label: "Custom AI Chatbots (Python, Node.js, JavaScript, APIs)", value: "Intelligent automated customer support and sales assistants." },
      { label: "Status", value: "Accepting select projects via consultation." },
    ],
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile & Web Application Development",
    category: "Advanced Solution",
    desc: "High-performance iOS/Android applications and custom SaaS solutions built from the ground up.",
    details: [
      { label: "Status", value: "Accepting enquiries for strategic builds via consultation." },
    ],
  },
  {
    id: "merch-branding",
    icon: Package,
    title: "Elite Merchandise & Custom Branding",
    category: "Advanced Solution",
    desc: "The Physical Extension of Your Brand through premium apparel and custom promotional merchandise.",
    details: [
      { label: "The Physical Extension of Your Brand", value: "We bridge the gap between your digital identity and physical presence. Whether you need high-end corporate apparel or custom promotional gear, we provide premium printing solutions that ensure your brand looks as good in person as it does on screen." },
    ],
    capabilities: [
      { label: "High-Definition DTF Printing", value: "Precision Direct-to-Film technology for vibrant, durable, and stretch-resistant designs on any fabric." },
      { label: "Corporate & Industrial Branding", value: "Customizing safety gear, vests, and professional uniforms with high-visibility logos." },
      { label: "Premium Apparel", value: "Specialized branding for Polos, T-shirts, Hoodies, and Caps." },
      { label: "Bulk Production Management", value: "Scalable solutions for team events, launches, or retail-ready merchandise." },
    ],
    whyChoose: [
      { label: "Superior Durability", value: "Our prints are tested for high wash-resistance—no cracking, no fading." },
      { label: "Versatile Application", value: "From 100% Cotton to complex Polyesters and dark-colored fabrics." },
      { label: "Design Alignment", value: "We ensure your physical colors and logo proportions perfectly match your digital brand guidelines." },
    ],
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<typeof services[number] | null>(null);

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-4">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to transform your business and accelerate growth.
          </p>
        </motion.div>

        <div className="space-y-14">
          <div>
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase text-primary tracking-widest">Core Solutions (Active & Ready for Implementation)</p>
              <p className="text-muted-foreground max-w-3xl mx-auto mt-4 text-sm sm:text-base">
                Premium digital services with fast turnaround times and high-impact results.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {services.filter((service) => service.category === "Core Solution").map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.button
                    type="button"
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group rounded-xl p-6 glass hover:neon-glow-green transition-all duration-300 text-left"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <h3 className="font-bold text-foreground mb-2 text-sm">{service.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{service.desc}</p>
                    <span className="text-primary text-xs mt-3 inline-block font-medium">Learn More →</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase text-primary tracking-widest">Advanced Solutions (Consultation Only)</p>
              <p className="text-muted-foreground max-w-3xl mx-auto mt-4 text-sm sm:text-base">
                High-complexity projects and ongoing management services handled via exclusive consultation.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {services.filter((service) => service.category === "Advanced Solution").map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.button
                    type="button"
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group rounded-xl p-6 glass hover:neon-glow-green transition-all duration-300 text-left"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <h3 className="font-bold text-foreground mb-2 text-sm">{service.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{service.desc}</p>
                    <span className="text-primary text-xs mt-3 inline-block font-medium">Learn More →</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-border/60">
                <div>
                  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary uppercase tracking-wider">
                    {selectedService.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-3 leading-tight">
                    {selectedService.title}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
                    {selectedService.desc}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-muted-foreground hover:text-foreground rounded-full bg-secondary/70 p-2 border border-border/70 hover:border-primary/40 transition-colors"
                  aria-label="Close service details"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-4">
                  {selectedService.details.map((item, index) => (
                    <div key={index}>
                      <p className="text-sm sm:text-base text-foreground font-semibold">{item.label}</p>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.value}</p>
                    </div>
                  ))}
                </div>

                {selectedService.note && (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
                    {selectedService.note}
                  </div>
                )}

                {selectedService.capabilities && (
                  <div className="rounded-2xl border border-primary/20 bg-secondary/5 p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Our Core Capabilities</h3>
                    <ul className="space-y-3 list-disc list-inside text-sm text-muted-foreground">
                      {selectedService.capabilities.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          <span className="font-semibold text-foreground">{item.label}:</span> {item.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedService.whyChoose && (
                  <div className="rounded-2xl border border-primary/20 bg-secondary/5 p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Why Choose HowSmart Branding?</h3>
                    <ul className="space-y-3 list-disc list-inside text-sm text-muted-foreground">
                      {selectedService.whyChoose.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          <span className="font-semibold text-foreground">{item.label}:</span> {item.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href="#contact"
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Contact Us
                  </a>
                  <a
                    href="https://wa.me/923022120509"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center justify-center rounded-xl border border-primary bg-transparent px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                  >
                    Join Us
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
