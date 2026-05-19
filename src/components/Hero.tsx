import hero from "@/assets/hero-arena.jpg";
import { ChevronRight, Crosshair, Trophy } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img src={hero} alt="BGMI esports arena" width={1920} height={1080} className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* scanline beam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent animate-scan opacity-60" />

      <div className="relative container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-neon clip-corner px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-neon animate-flicker">
            <span className="h-2 w-2 rounded-full bg-[var(--neon)] animate-pulse" />
            Live Host • Season 7
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] uppercase">
            Drop. <span className="text-neon">Frag.</span><br />
            Dominate the <span className="text-neon">Arena.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            India's most ruthless BGMI scrim circuit. Host-scheduled paid matches with per-kill payouts and position prize pools. No mercy. Only glory.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#register" className="group inline-flex items-center gap-2 gradient-red clip-corner px-7 py-4 font-bold uppercase tracking-wider text-white animate-pulse-glow">
              Register Squad <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </a>
            <a href="#matches" className="inline-flex items-center gap-2 border-neon clip-corner px-7 py-4 font-bold uppercase tracking-wider text-neon hover:bg-[var(--neon)]/10 transition">
              View Schedule
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl">
            {[
              { v: "₹12L+", l: "Prize Pool" },
              { v: "48K", l: "Players" },
              { v: "320", l: "Matches Hosted" },
            ].map((s) => (
              <div key={s.l} className="relative clip-corner bg-card/60 border border-border p-4 backdrop-blur">
                <div className="font-display text-3xl font-black text-neon">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* floating HUD badges */}
        <div className="hidden lg:flex absolute right-10 top-32 flex-col gap-4 animate-float">
          <div className="clip-corner bg-card/80 border-neon p-4 w-56 backdrop-blur">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neon"><Crosshair className="h-3 w-3" /> Per Kill</div>
            <div className="font-display text-3xl font-black mt-1">₹10</div>
          </div>
          <div className="clip-corner bg-card/80 border-neon p-4 w-56 backdrop-blur">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neon"><Trophy className="h-3 w-3" /> WWCD</div>
            <div className="font-display text-3xl font-black mt-1">₹600</div>
          </div>
        </div>
      </div>

      {/* ticker */}
      <div className="relative border-y border-border bg-card/40 backdrop-blur overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3 text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {["Erangel", "Miramar", "Sanhok", "Vikendi", "Livik", "TDM Custom", "Sniper Only", "1v1 Arena"].map((t) => (
                <span key={t} className="mx-8 flex items-center gap-3"><span className="h-2 w-2 rotate-45 bg-[var(--neon)]" />{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
