import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const DEFAULT_SERVICES = [
  { slug: "full-stack", title: "Full-Stack Web Development", description: "High-performance, responsive, and dynamic websites designed for modern business goals.", active: true },
  { slug: "ecommerce", title: "E-commerce Setup & Infrastructure", description: "Expert store configuration and optimization across global marketplaces.", active: true },
  { slug: "ebooks", title: "Premium Ebooks & Lead Magnets", description: "High-value digital assets designed to build authority and capture leads.", active: true },
  { slug: "templates", title: "Custom Template Design", description: "Tailor-made, fully editable templates crafted from scratch based on your unique vision.", active: true },
  { slug: "motion-graphics", title: "Visual Content & Motion Graphics", description: "High-impact visuals designed to stop the scroll and drive engagement.", active: true },
  { slug: "faceless", title: "Faceless Content Automation", description: "End-to-end video creation services for creators who scale without appearing on camera.", active: true },
  { slug: "infographic", title: "Strategic Infographic Design", description: "Data-driven and visually compelling infographics to simplify complex information.", active: true },
  { slug: "marketing", title: "Digital Marketing & Performance", description: "Comprehensive growth strategies across all major digital ecosystems.", active: true },
  { slug: "maintenance", title: "Technical Maintenance & Support", description: "Ongoing technical management to keep your website and applications secure and active.", active: true },
  { slug: "social-media", title: "Social Media Management", description: "Complete management of social profiles, engagement, and community growth.", active: true },
  { slug: "ai-automation", title: "AI-Powered Workflow Automation", description: "Streamlining business operations through intelligent automation and AI integration.", active: true },
  { slug: "mobile-apps", title: "Mobile & App Development", description: "High-performance mobile and web applications built from the ground up.", active: true },
  { slug: "merch-branding", title: "Elite Merchandise & Custom Branding", description: "Premium apparel and custom promotional merchandise for physical brand presence.", active: true },
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const emitServicesUpdated = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("servicesUpdated"));
    }
  };

  const fetchServices = async () => {
    if (!supabase) {
      setError("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("services")
        .select("id,slug,title,description,active,created_at,updated_at")
        .order("active", { ascending: false })
        .order("title", { ascending: true });

      if (fetchError) throw fetchError;
      setServices(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch services from Supabase.");
      setServices([]);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  const fetchActiveServices = async () => {
    if (!supabase) {
      setError("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      setServices([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("services")
        .select("id,slug,title,description,active,created_at,updated_at")
        .eq("active", true)
        .order("title", { ascending: true });

      if (fetchError) throw fetchError;
      setServices(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch active services from Supabase.");
      setServices([]);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  const toggleService = async (id: string, currentStatus: boolean) => {
    if (!supabase) {
      setError("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    try {
      setError(null);
      const { error: updateError } = await supabase
        .from("services")
        .update({ active: !currentStatus, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (updateError) throw updateError;

      setServices((prev) =>
        prev.map((service) =>
          service.id === id ? { ...service, active: !currentStatus } : service
        )
      );
      emitServicesUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update service in Supabase.");
    }
  };

  const batchUpdateServices = async (updates: { id: string; active: boolean }[]) => {
    if (!supabase) {
      setError("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const results = await Promise.all(
        updates.map((item) =>
          supabase
            .from("services")
            .update({ active: item.active, updated_at: new Date().toISOString() })
            .eq("id", item.id)
        )
      );

      const failed = results.find((result) => result.error);
      if (failed?.error) throw failed.error;

      await fetchServices();
      emitServicesUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save service updates to Supabase.");
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  const seedServices = async () => {
    if (!supabase) {
      setError("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error: insertError } = await supabase.from("services").insert(DEFAULT_SERVICES);
      if (insertError) throw insertError;
      await fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to seed services in Supabase.");
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    hasFetched,
    fetchServices,
    fetchActiveServices,
    toggleService,
    batchUpdateServices,
    seedServices,
  };
};
