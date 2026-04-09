import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, ShoppingCart, BookOpen, Layout, Video, Bot, BarChart3, Megaphone,
  Wrench, Share2, Cpu, Smartphone,
} from "lucide-react";

const services = [
  { icon: Globe, title: "Full-Stack Web Development", desc: "Custom websites and web apps built with cutting-edge technologies for performance and scalability.", category: "core" },
  { icon: ShoppingCart, title: "E-commerce Setup & Infrastructure", desc: "Complete online store solutions with payment integration, inventory management, and optimized checkout.", category: "core" },
  { icon: BookOpen, title: "Premium Ebooks & Lead Magnets", desc: "Professionally designed digital products that capture leads and establish authority.", category: "core" },
  { icon: Layout, title: "Custom Template Design", desc: "Bespoke design templates for websites, emails, and social media that align with your brand.", category: "core" },
  { icon: Video, title: "Visual Content & Motion Graphics", desc: "Eye-catching animations, explainer videos, and visual content that tells your story.", category: "core" },
  { icon: Bot, title: "Faceless Content Automation", desc: "AI-powered content creation systems for consistent, scalable digital presence.", category: "core" },
  { icon: BarChart3, title: "Strategic Infographic Design", desc: "Data visualization and infographics that communicate complex ideas simply.", category: "core" },
  { icon: Megaphone, title: "Digital Marketing & Performance", desc: "ROI-driven campaigns across SEO, PPC, social media, and email marketing.", category: "core" },
  { icon: Wrench, title: "Technical Maintenance & Support", desc: "24/7 monitoring, updates, security patches, and performance optimization.", category: "advanced" },
  { icon: Share2, title: "Dedicated Social Media Management", desc: "Full-service social strategy, content creation, community management, and analytics.", category: "advanced" },
  { icon: Cpu, title: "Custom AI & Automation Engineering", desc: "Intelligent workflows, chatbots, and machine learning solutions tailored to your business.", category: "advanced" },
  { icon: Smartphone, title: "Mobile & Web App Development", desc: "Native and cross-platform applications with intuitive UX and robust architecture.", category: "advanced" },
];

const ServicesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="group rounded-xl p-6 glass hover:neon-glow-green transition-all duration-300 cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : i)}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">{s.title}</h3>
                <p className={`text-muted-foreground text-xs leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>{s.desc}</p>
                <span className="text-primary text-xs mt-3 inline-block font-medium">
                  {isExpanded ? "Show Less" : "Learn More →"}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
