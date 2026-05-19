import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export function Navbar() {
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
          <a href="#matches" className="hover:text-neon transition-colors">Matches</a>
          <a href="#leaderboard" className="hover:text-neon transition-colors">Leaderboard</a>
          <a href="#rewards" className="hover:text-neon transition-colors">Rewards</a>
          <a href="#register" className="hover:text-neon transition-colors">Register</a>
        </nav>
        <a href="#register" className="relative inline-flex items-center gap-2 clip-corner gradient-red px-5 py-2 text-sm font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all animate-pulse-glow">
          Join Scrim
        </a>
      </div>
    </header>
  );
}
