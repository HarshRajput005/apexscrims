import { Link } from "@tanstack/react-router";
import { LogOut, User, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export function Navbar() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9 grid place-items-center clip-corner gradient-red">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-black tracking-widest text-neon">
            APEX<span className="text-foreground">SCRIMS</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
          <a href="/#matches" className="hover:text-neon transition-colors">Matches</a>
          <a href="/#leaderboard" className="hover:text-neon transition-colors">Leaderboard</a>
          <a href="/#rewards" className="hover:text-neon transition-colors">Rewards</a>
          <a href="/#register" className="hover:text-neon transition-colors">Register</a>
        </nav>
        {session ? (
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 clip-corner border border-border px-3 py-2 text-xs hover:border-[var(--neon)] transition"
            >
              <User className="h-3.5 w-3.5 text-neon" />
              <span className="font-bold truncate max-w-[140px]">{session.user.email}</span>
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-2 clip-corner border-neon px-4 py-2 text-xs font-bold uppercase tracking-wider text-neon hover:bg-[var(--neon)]/10 transition"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="relative inline-flex items-center gap-2 clip-corner gradient-red px-5 py-2 text-sm font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all animate-pulse-glow"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
