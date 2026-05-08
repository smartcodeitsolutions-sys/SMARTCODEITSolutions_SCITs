import { useState } from "react";
import logo from "@/assets/smartcode-logo.png";
import { Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="SmartCode" className="h-8 w-8 rounded-md" />
              <span className="text-lg font-bold text-foreground">Smart<span className="text-primary">Code</span></span>
            </div>
            
            <p className="text-foreground text-base md:text-lg max-w-md mb-6 leading-relaxed font-semibold">
              Excellence through focus. We accept a limited number of projects each month to ensure every client receives our full strategic attention.
            </p>
            {/* Newsletter */}
            <form onSubmit={(e) => { e.preventDefault(); setEmail(""); }} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button type="submit" className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Web Development", "E-commerce", "Digital Marketing", "AI Automation", "App Development"].map((s) => (
                <li key={s} className="hover:text-primary transition-colors cursor-pointer">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["About Us", "Portfolio", "Careers", "Blog", "Contact"].map((s) => (
                <li key={s} className="hover:text-primary transition-colors cursor-pointer">{s}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://www.linkedin.com/company/smartcode-it-solutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com/smartcode_it_solution?igsh=MXVxenFxeXF2Nm5zcQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://youtube.com/@smartcodeitsolutions?si=8TX36j0WflNJq1MQ"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={20} />
          </a>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Smart Code IT Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
