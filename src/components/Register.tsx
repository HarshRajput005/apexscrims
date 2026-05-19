import { useState } from "react";
import { SectionHeader } from "./Matches";
import { toast } from "sonner";

export function Register() {
  const [loading, setLoading] = useState(false);
  return (
    <section id="register" className="relative py-24 border-t border-border">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader kicker="Enlist" title="Register Your Squad" sub="Fill in your squad details, pay the entry fee, and receive room ID + password 15 minutes before drop." />
          <ul className="mt-8 space-y-3 text-sm">
            {["Instant slot confirmation via WhatsApp","Anti-cheat verified rooms","24hr payout guarantee","Live spectator stream on official channel"].map(p => (
              <li key={p} className="flex items-center gap-3"><span className="h-2 w-2 rotate-45 bg-[var(--neon)]" />{p}</li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => { setLoading(false); toast.success("Slot locked. Check WhatsApp for room credentials."); }, 900);
          }}
          className="clip-corner border-neon bg-card/70 backdrop-blur p-8 space-y-5"
        >
          <Field label="Squad Name" placeholder="TX·Wolves" />
          <Field label="IGN (Captain)" placeholder="GHOST_SNIPER" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="BGMI ID" placeholder="5XXXXXXXXX" />
            <Field label="WhatsApp" placeholder="+91 9XXXXXXXXX" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-neon">Select Match</label>
            <select className="mt-2 w-full bg-input border border-border clip-corner px-4 py-3 font-sans focus:border-[var(--neon)] outline-none">
              <option>SC-101 • Erangel Royale • ₹25/player</option>
              <option>SC-102 • Miramar Mayhem • ₹25/player</option>
              <option>SC-103 • Sanhok Sniper • ₹25/player</option>
              <option>SC-104 • Livik Lightning • ₹25/player</option>
            </select>
          </div>
          <button disabled={loading} className="w-full clip-corner gradient-red py-4 font-display font-black uppercase tracking-widest text-white animate-pulse-glow disabled:opacity-60">
            {loading ? "Locking Slot..." : "Pay & Lock Slot"}
          </button>
          <p className="text-xs text-center text-muted-foreground">Secure UPI / Card • Instant confirmation</p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-neon">{label}</label>
      <input required placeholder={placeholder} className="mt-2 w-full bg-input border border-border clip-corner px-4 py-3 font-sans focus:border-[var(--neon)] outline-none placeholder:text-muted-foreground/60" />
    </div>
  );
}
