import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { Zap, Mail, Lock, User, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — ApexScrims" },
      { name: "description", content: "Sign in to your ApexScrims player account to join paid BGMI scrims." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ign, setIgn] = useState("");
  const [bgmiId, setBgmiId] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [squadName, setSquadName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { ign },
          },
        });
        if (error) throw error;
        toast.success("Squad enlisted. Check your email to verify.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back, operator.");
        navigate({ to: "/" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/" });
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent animate-scan opacity-60" />

      <Link to="/" className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon transition">
        <ChevronLeft className="h-4 w-4" /> Back to Arena
      </Link>

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-11 w-11 grid place-items-center clip-corner gradient-red animate-pulse-glow">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-2xl font-black tracking-widest text-neon">
              APEX<span className="text-foreground">SCRIMS</span>
            </span>
          </Link>
        </div>

        <div className="clip-corner border-neon bg-card/80 backdrop-blur-xl p-8">
          <div className="flex gap-2 mb-6 p-1 clip-corner bg-secondary/50">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition ${
                  mode === m ? "gradient-red text-white clip-corner" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign In" : "Enlist"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-3xl font-black uppercase">
            {mode === "login" ? <>Drop <span className="text-neon">In.</span></> : <>Join the <span className="text-neon">Squad.</span></>}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Access your scrim dashboard and wallet." : "Create your operator profile to register for matches."}
          </p>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="mt-6 w-full clip-corner border border-border bg-background/60 hover:border-[var(--neon)] hover:bg-[var(--neon)]/5 py-3 px-4 flex items-center justify-center gap-3 font-semibold transition disabled:opacity-50"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="flex-1 h-px bg-border" /> or <span className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <Field icon={<User className="h-4 w-4" />} label="IGN">
                <input required value={ign} onChange={(e) => setIgn(e.target.value)} placeholder="GHOST_SNIPER" className="input-neon" />
              </Field>
            )}
            <Field icon={<Mail className="h-4 w-4" />} label="Email">
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="player@apex.gg" className="input-neon" />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />} label="Password">
              <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input-neon" />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="w-full clip-corner gradient-red py-3.5 font-display font-black uppercase tracking-widest text-white animate-pulse-glow disabled:opacity-60"
            >
              {loading ? "Loading..." : mode === "login" ? "Engage" : "Enlist Now"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {mode === "login" ? "New operator? " : "Already enlisted? "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-neon font-bold hover:underline">
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing you agree to the ApexScrims rulebook and anti-cheat policy.
        </p>
      </div>

      <style>{`
        .input-neon {
          width: 100%; background: var(--input); border: 1px solid var(--border);
          padding: 0.75rem 1rem 0.75rem 2.5rem; outline: none; transition: border-color 0.2s;
          clip-path: polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px);
        }
        .input-neon:focus { border-color: var(--neon); }
      `}</style>
    </main>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-neon">{label}</label>
      <div className="relative mt-1.5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neon">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
