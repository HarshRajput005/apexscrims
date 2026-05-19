import { Zap, Instagram, Youtube, Twitch, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/40 backdrop-blur">
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 grid place-items-center clip-corner gradient-red"><Zap className="h-5 w-5 text-white" /></div>
            <span className="font-display text-xl font-black tracking-widest text-neon">APEX<span className="text-foreground">SCRIMS</span></span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">India's elite BGMI scrim hosting platform. Daily paid matches, instant payouts, zero tolerance for hackers.</p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Youtube, Twitch, Twitter].map((I, i) => (
              <a key={i} href="#" className="h-10 w-10 grid place-items-center clip-corner border border-border hover:border-[var(--neon)] hover:text-neon transition"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-neon">Arena</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#matches" className="hover:text-foreground">Matches</a></li>
            <li><a href="#leaderboard" className="hover:text-foreground">Leaderboard</a></li>
            <li><a href="#rewards" className="hover:text-foreground">Rewards</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-neon">Support</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Rulebook</a></li>
            <li><a href="#" className="hover:text-foreground">Anti-Cheat</a></li>
            <li><a href="#" className="hover:text-foreground">Contact Host</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 ApexScrims. Not affiliated with Krafton or BGMI. Play responsibly.
      </div>
    </footer>
  );
}
