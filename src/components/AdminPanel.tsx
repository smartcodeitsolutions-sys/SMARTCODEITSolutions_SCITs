import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Check, X, Loader2, AlertCircle } from "lucide-react";
import { Service, useServices } from "@/hooks/useServices";
import { supabase } from "@/lib/supabase";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const { services, loading, error: hookError, hasFetched, batchUpdateServices, seedServices } = useServices();
  const [localServices, setLocalServices] = useState<Service[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Use hook error if it exists, otherwise use local error
  const displayError = error || hookError;

  // Simple password-based login (in production, use proper Supabase auth)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    if (passwordInput === correctPassword) {
      setIsLoggedIn(true);
      setPasswordInput("");
      setAdminPassword(correctPassword);
    } else {
      setLoginError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPasswordInput("");
    setAdminPassword("");
  };

  const handleSeedServices = async () => {
    setIsSeeding(true);
    setError(null);

    try {
      await seedServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to seed services");
    } finally {
      setIsSeeding(false);
    }
  };

  useEffect(() => {
    setLocalServices(services);
    setHasChanges(false);
  }, [services]);

  const handleToggleService = (id: string) => {
    setLocalServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, active: !service.active } : service
      )
    );
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    const updates = localServices
      .filter((local) => {
        const original = services.find((service) => service.id === local.id);
        return original ? original.active !== local.active : false;
      })
      .map((service) => ({ id: service.id, active: service.active }));

    if (updates.length === 0) {
      setHasChanges(false);
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await batchUpdateServices(updates);
      setHasChanges(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Service Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Admin Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {loginError && <div className="text-red-500 text-sm font-medium">{loginError}</div>}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full py-3 rounded-lg bg-secondary text-foreground font-semibold hover:bg-secondary/90 transition-colors"
          >
            Back to website
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4 md:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mb-8 sm:flex-row sm:justify-between sm:items-center"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground">Service Manager</h1>
            <p className="text-muted-foreground mt-1">Control which services are active or inactive</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary/70 text-foreground hover:bg-secondary/90 transition-colors"
            >
              Back to website
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Supabase configuration warning */}
        {!supabase && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-amber-500/20 border border-amber-500/50 flex flex-col sm:flex-row gap-3"
          >
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" size={20} />
            <div className="text-sm text-amber-700 flex-1">
              <p className="font-semibold mb-1">Supabase is not configured</p>
              <p>Set <code className="bg-amber-900/20 px-1">VITE_SUPABASE_URL</code> and <code className="bg-amber-900/20 px-1">VITE_SUPABASE_ANON_KEY</code> in your environment and restart.</p>
              <div className="mt-3 p-3 bg-amber-900/10 rounded text-xs">
                <p className="font-medium mb-2">Current env values:</p>
                <p className="break-all"><strong>VITE_SUPABASE_URL:</strong> {import.meta.env.VITE_SUPABASE_URL ? `${import.meta.env.VITE_SUPABASE_URL.substring(0, 20)}...` : 'undefined'}</p>
                <p className="break-all"><strong>VITE_SUPABASE_ANON_KEY:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? `${import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 10)}...` : 'undefined'}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Debug info when Supabase is configured */}
        {supabase && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex flex-col sm:flex-row gap-3"
          >
            <Check className="text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" size={20} />
            <div className="text-sm text-green-700 flex-1">
              <p className="font-semibold mb-1">Supabase is configured</p>
              <div className="mt-2 p-3 bg-green-900/10 rounded text-xs">
                <p className="font-medium mb-2">Loaded env values:</p>
                <p className="break-all"><strong>VITE_SUPABASE_URL:</strong> {import.meta.env.VITE_SUPABASE_URL ? `${import.meta.env.VITE_SUPABASE_URL.substring(0, 20)}...` : 'undefined'}</p>
                <p className="break-all"><strong>VITE_SUPABASE_ANON_KEY:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? `${import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 10)}...` : 'undefined'}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Alert */}
        {displayError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 flex flex-col sm:flex-row gap-3"
          >
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5 sm:mt-0" size={20} />
            <div className="text-sm text-red-700 flex-1">
              <p className="font-semibold">Error</p>
              <p className="break-words">{displayError}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 flex-shrink-0"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}


        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Toggle services and click Save changes to persist status in Supabase.</p>
          </div>
          <div className="w-full sm:w-auto flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={!hasChanges || isSaving || loading}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Save changes"}
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
          className="space-y-4"
        >
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="inline-block animate-spin text-primary" size={32} />
              <p className="text-muted-foreground mt-4">Loading services...</p>
            </div>
          ) : localServices.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-muted-foreground">No services found. Please check your Supabase connection.</p>
              {!displayError && hasFetched && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    The connection works but the `services` table is empty.
                    Click below to seed default service rows into Supabase.
                  </p>
                  <button
                    type="button"
                    onClick={handleSeedServices}
                    disabled={isSeeding}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSeeding ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Seed default services"
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            localServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all ${
                  service.active ? "border-l-4 border-green-500" : "border-l-4 border-red-500"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${service.active ? "bg-green-500" : "bg-red-500"}`} />
                    <h3 className="font-semibold text-foreground truncate">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Status: <span className={service.active ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                      {service.active ? "Active" : "Inactive (Wishlist)"}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:ml-4 w-full sm:w-auto">
                  <button
                    onClick={() => handleToggleService(service.id)}
                    disabled={togglingId === service.id}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      service.active
                        ? "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                        : "bg-red-500/20 text-red-600 hover:bg-red-500/30"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {togglingId === service.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : service.active ? (
                      <>
                        <Check size={16} />
                        Active
                      </>
                    ) : (
                      <>
                        <X size={16} />
                        Inactive
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Stats */}
        {!loading && localServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 grid sm:grid-cols-2 gap-4"
          >
            <div className="glass rounded-xl p-6">
              <div className="text-3xl font-black text-green-500 mb-2">
                {localServices.filter((s) => s.active).length}
              </div>
              <p className="text-sm text-muted-foreground">Active Services</p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-3xl font-black text-red-500 mb-2">
                {localServices.filter((s) => !s.active).length}
              </div>
              <p className="text-sm text-muted-foreground">Inactive / Wishlist</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
