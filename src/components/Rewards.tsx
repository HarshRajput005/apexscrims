import { SectionHeader } from "./Matches";
import { Crosshair, Trophy, Medal, Star } from "lucide-react";

const rewards = [
  { pos: "WWCD", prize: "₹5,000 - ₹15,000", icon: <Trophy className="h-6 w-6" />, desc: "Winner Winner Chicken Dinner. Top squad takes the lion's share." },
  { pos: "2nd Place", prize: "₹2,500 - ₹7,000", icon: <Medal className="h-6 w-6" />, desc: "Runner-up squads earn a strong slice of the pool." },
  { pos: "3rd Place", prize: "₹1,500 - ₹4,000", icon: <Star className="h-6 w-6" />, desc: "Podium finish. Glory plus payout." },
  { pos: "Per Kill", prize: "₹40 - ₹100", icon: <Crosshair className="h-6 w-6" />, desc: "Every elimination credits your wallet instantly post-match." },
];

export function Rewards() {
  return (
    <section id="rewards" className="relative py-24">
      <div className="container mx-auto px-4">
        <SectionHeader kicker="Payouts" title="Reward Structure" sub="Transparent prize distribution. Paid out within 24 hours of match completion." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rewards.map((r) => (
            <div key={r.pos} className="group relative clip-corner border border-border bg-card/60 backdrop-blur p-6 hover:border-[var(--neon)] transition">
              <div className="grid h-12 w-12 place-items-center clip-corner gradient-red text-white animate-pulse-glow">{r.icon}</div>
              <div className="mt-5 text-xs uppercase tracking-widest text-neon">{r.pos}</div>
              <div className="mt-1 font-display text-2xl font-black">{r.prize}</div>
              <p className="mt-3 text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
