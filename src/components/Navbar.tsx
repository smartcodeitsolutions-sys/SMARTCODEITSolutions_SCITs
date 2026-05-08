import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/smartcode-logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "About Us", href: "#about" },
  { name: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between py-3 px-4 sm:px-6 gap-3">
        <button onClick={() => scrollTo("#home")} className="flex min-w-0 items-center gap-3 text-left">
          <img src={logo} alt="SmartCode IT Solutions" className="h-10 w-10 rounded-2xl shrink-0" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-base font-semibold text-foreground">Smart<span className="text-primary">Code</span></span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Digital Agency</span>
          </div>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity neon-glow-green"
          >
            Book Consultation
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-secondary/90 text-foreground shadow-lg shadow-black/20 transition-all hover:bg-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="md:hidden fixed inset-x-0 top-0 z-50 glass-strong border-b border-border shadow-2xl shadow-black/30"
          >
            <div className="container mx-auto max-w-7xl px-4 py-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <button
                  onClick={() => scrollTo("#home")}
                  className="flex items-center gap-3 text-left"
                >
                  <img src={logo} alt="SmartCode IT Solutions" className="h-10 w-10 rounded-2xl" />
                  <div className="hidden sm:flex flex-col leading-tight">
                    <span className="text-base font-semibold text-foreground">Smart<span className="text-primary">Code</span></span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Digital Agency</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-secondary/90 text-foreground shadow-sm transition-all hover:bg-secondary"
                  aria-label="Close mobile menu"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className="w-full rounded-3xl px-4 py-4 text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full rounded-3xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground shadow-neon-green transition-all hover:opacity-95"
                >
                  Book Consultation
                </button>
              </div>
              <div className="mt-4 rounded-3xl border border-white/10 bg-secondary/80 p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-1">Need help deciding?</p>
                <p>Tap any section to explore our services and launch your project faster.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
