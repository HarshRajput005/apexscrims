import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Shield, Users } from "lucide-react";

export const Route = createFileRoute("/host")({
  head: () => ({ meta: [{ title: "Host Console — ApexScrims" }] }),
  component: HostPage,
});

type Profile = {
  id: string;
  user_id: string;
  ign: string | null;
  bgmi_id: string | null;
  whatsapp: string | null;
  squad_name: string | null;
  created_at: string;
};

function HostPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [players, setPlayers] = useState<Profile[]>([]);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate({ to: "/login" }); return; }

      const { data: roles } = await supabase
        .from("user_roles").select("role").eq("user_id", session.user.id);
      const isAdmin = !!roles?.some((r) => r.role === "admin");
      setAllowed(isAdmin);

      if (isAdmin) {
        const { data } = await supabase
          .from("profiles").select("*").order("created_at", { ascending: false });
        setPlayers((data ?? []) as Profile[]);
      }
      setLoading(false);
    })();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 grid place-items-center clip-corner gradient-red">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neon">Host Console</p>
              <h1 className="font-display text-3xl font-black uppercase">Enlisted <span className="text-neon">Operators</span></h1>
            </div>
          </div>

          {loading ? (
            <p className="mt-12 text-muted-foreground">Loading...</p>
          ) : !allowed ? (
            <p className="mt-12 text-destructive font-bold">Access denied. Host privileges required.</p>
          ) : (
            <>
              <div className="mt-6 inline-flex items-center gap-2 clip-corner border border-border px-4 py-2 text-sm">
                <Users className="h-4 w-4 text-neon" />
                <span className="font-bold">{players.length}</span>
                <span className="text-muted-foreground">enlisted</span>
              </div>

              <div className="mt-6 overflow-x-auto clip-corner border-neon bg-card/70 backdrop-blur">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-xs uppercase tracking-widest text-neon">
                    <tr>
                      <th className="text-left px-4 py-3">IGN</th>
                      <th className="text-left px-4 py-3">Squad</th>
                      <th className="text-left px-4 py-3">BGMI ID</th>
                      <th className="text-left px-4 py-3">WhatsApp</th>
                      <th className="text-left px-4 py-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.length === 0 ? (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No players enlisted yet.</td></tr>
                    ) : players.map((p) => (
                      <tr key={p.id} className="border-t border-border hover:bg-secondary/30">
                        <td className="px-4 py-3 font-bold">{p.ign ?? "—"}</td>
                        <td className="px-4 py-3">{p.squad_name ?? "—"}</td>
                        <td className="px-4 py-3 font-mono text-xs">{p.bgmi_id ?? "—"}</td>
                        <td className="px-4 py-3 font-mono text-xs">{p.whatsapp ?? "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
