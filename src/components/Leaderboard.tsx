import { SectionHeader } from "./Matches";
import { Crown, Skull, Award } from "lucide-react";

const players = [
  { rank: 1, name: "GHOST·SNIPER", team: "TX Wolves", kills: 412, wwcd: 18, earnings: 84500 },
  { rank: 2, name: "VENOM_X", team: "Hydra Esports", kills: 387, wwcd: 14, earnings: 71200 },
  { rank: 3, name: "PHANTOM₁", team: "Soul Mortal", kills: 365, wwcd: 12, earnings: 62800 },
  { rank: 4, name: "REAPER·77", team: "Godlike", kills: 341, wwcd: 11, earnings: 55400 },
  { rank: 5, name: "BLAZE_OP", team: "Team XO", kills: 318, wwcd: 9, earnings: 47100 },
  { rank: 6, name: "JOKER·404", team: "Revenant", kills: 296, wwcd: 8, earnings: 39800 },
  { rank: 7, name: "SHADOW_K", team: "Orange Rock", kills: 274, wwcd: 7, earnings: 33500 },
  { rank: 8, name: "TITAN·X", team: "Velocity", kills: 258, wwcd: 6, earnings: 28900 },
];

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
          {players.map((p) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
