import { Calendar, Clock, Users, Coins, Trophy } from "lucide-react";

const matches = [
  { id: "SC-101", title: "Erangel Royale", map: "Erangel", mode: "Squad TPP", date: "May 22", time: "21:00", fee: 25, slots: 25, filled: 18, prize: 600, perKill: 10 },
  { id: "SC-102", title: "Miramar Mayhem", map: "Miramar", mode: "Squad FPP", date: "May 23", time: "20:30", fee: 25, slots: 25, filled: 22, prize: 600, perKill: 10 },
  { id: "SC-103", title: "Sanhok Sniper Showdown", map: "Sanhok", mode: "Sniper Only", date: "May 24", time: "22:00", fee: 25, slots: 16, filled: 9, prize: 600, perKill: 10 },
  { id: "SC-104", title: "Livik Lightning", map: "Livik", mode: "Squad TPP", date: "May 25", time: "19:00", fee: 25, slots: 20, filled: 14, prize: 600, perKill: 10 },
  { id: "SC-105", title: "Vikendi Night Ops", map: "Vikendi", mode: "Squad FPP", date: "May 26", time: "23:00", fee: 25, slots: 25, filled: 25, prize: 600, perKill: 10 },
  { id: "SC-106", title: "TDM Frag Frenzy", map: "Warehouse", mode: "TDM 4v4", date: "May 27", time: "21:30", fee: 25, slots: 32, filled: 12, prize: 600, perKill: 10 },
];

export function Matches() {
  return (
    <section id="matches" className="relative py-24">
      <div className="container mx-auto px-4">
        <SectionHeader kicker="Schedule" title="Upcoming Scrims" sub="Host-curated paid matches. Lock your slot, gear up, and drop in." />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((m) => {
            const full = m.filled >= m.slots;
            const pct = (m.filled / m.slots) * 100;
            return (
              <div key={m.id} className="group relative clip-corner border border-border bg-card/60 backdrop-blur p-6 hover:border-[var(--neon)] hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neon">{m.id} • {m.mode}</div>
                    <h3 className="mt-2 font-display text-2xl font-black uppercase">{m.title}</h3>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest clip-corner px-2 py-1 ${full ? "bg-muted text-muted-foreground" : "gradient-red text-white"}`}>
                    {full ? "Full" : "Open"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-neon" />{m.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-neon" />{m.time} IST</span>
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-neon" />{m.filled}/{m.slots}</span>
                </div>

                <div className="mt-5 h-1.5 w-full bg-secondary overflow-hidden">
                  <div className="h-full gradient-red transition-all" style={{ width: `${pct}%` }} />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <Stat icon={<Coins className="h-3.5 w-3.5" />} label="Entry" value={`₹${m.fee}`} />
                  <Stat icon={<Trophy className="h-3.5 w-3.5" />} label="WWCD" value={`₹${m.prize}`} highlight />
                  <Stat icon={<Coins className="h-3.5 w-3.5" />} label="/Kill" value={`₹${m.perKill}`} />
                </div>

                <button disabled={full} className="mt-6 w-full clip-corner gradient-red py-3 font-bold uppercase tracking-wider text-white disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition">
                  {full ? "Slot Locked" : "Join Match"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`clip-corner border p-2 ${highlight ? "border-neon bg-[var(--neon)]/5" : "border-border bg-background/40"}`}>
      <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">{icon}{label}</div>
      <div className={`font-display font-black text-sm mt-0.5 ${highlight ? "text-neon" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

export function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.4em] text-neon">
        <span className="h-px w-8 bg-[var(--neon)]" />{kicker}
      </div>
      <h2 className="mt-3 font-display text-4xl md:text-5xl font-black uppercase">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
