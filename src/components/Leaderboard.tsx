import { SectionHeader } from "./Matches";
import { Crown, Skull, Award } from "lucide-react";

const players: { rank: number; name: string; team: string; kills: number; wwcd: number; earnings: number }[] = [];

const rankIcon = (r: number) => r === 1 ? <Crown className="h-4 w-4" /> : r === 2 ? <Award className="h-4 w-4" /> : r === 3 ? <Skull className="h-4 w-4" /> : null;

export function Leaderboard() {
  return (
    <section id="leaderboard" className="relative py-24 border-y border-border">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative container mx-auto px-4">
        <SectionHeader kicker="Season 7" title="Killboard" sub="Top fraggers earning real cash. Climb the ranks and stamp your name in apex history." />

        <div className="mt-12 clip-corner border border-border bg-card/40 backdrop-blur overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border text-xs font-bold uppercase tracking-widest text-muted-foreground bg-background/40">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-3">Team</div>
            <div className="col-span-1 text-right">Kills</div>
            <div className="col-span-1 text-right">WWCD</div>
            <div className="col-span-2 text-right">Earnings</div>
          </div>
          {players.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-neon">
                <span className="h-2 w-2 rounded-full bg-[var(--neon)] animate-pulse" /> Season Reset
              </div>
              <h3 className="mt-4 font-display text-3xl font-black uppercase">Killboard Cleared</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                A new season has begun. Drop into the next scrim and stamp your name at the top.
              </p>
            </div>
          ) : (
            players.map((p) => (
              <div key={p.rank} className={`grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-4 items-center border-b border-border/50 last:border-0 hover:bg-[var(--neon)]/5 transition group ${p.rank <= 3 ? "bg-[var(--neon)]/[0.03]" : ""}`}>
                <div className="md:col-span-1 flex items-center gap-2">
                  <span className={`font-display font-black text-xl ${p.rank <= 3 ? "text-neon" : "text-muted-foreground"}`}>#{p.rank}</span>
                  <span className="text-neon">{rankIcon(p.rank)}</span>
                </div>
                <div className="md:col-span-4 font-display font-bold tracking-wider">{p.name}</div>
                <div className="md:col-span-3 text-sm text-muted-foreground">{p.team}</div>
                <div className="md:col-span-1 text-right font-display font-bold">{p.kills}</div>
                <div className="md:col-span-1 text-right font-display font-bold">{p.wwcd}</div>
                <div className="md:col-span-2 text-right font-display font-black text-neon">₹{p.earnings.toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
