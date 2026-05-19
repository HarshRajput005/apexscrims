import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { User, Shield } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ApexScrims" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({ ign: "", bgmi_id: "", whatsapp: "", squad_name: "" });

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate({ to: "/login" }); return; }
      setEmail(session.user.email ?? "");

      const [{ data: profile }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", session.user.id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", session.user.id),
      ]);
      if (profile) setForm({
        ign: profile.ign ?? "", bgmi_id: profile.bgmi_id ?? "",
        whatsapp: profile.whatsapp ?? "", squad_name: profile.squad_name ?? "",
      });
      setIsAdmin(!!roles?.some((r) => r.role === "admin"));
      setLoading(false);
    })();
  }, [navigate]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from("profiles").update(form).eq("user_id", session.user.id);
    setSaving(false);
    if (error) toast.error(error.message); else toast.success("Profile updated.");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-neon">Operator Dashboard</p>
              <h1 className="font-display text-4xl font-black uppercase mt-1">Your <span className="text-neon">Profile</span></h1>
              <p className="text-sm text-muted-foreground mt-1">{email}</p>
            </div>
            {isAdmin && (
              <Link to="/host" className="inline-flex items-center gap-2 clip-corner gradient-red px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                <Shield className="h-4 w-4" /> Host Console
              </Link>
            )}
          </div>

          {loading ? (
            <p className="mt-12 text-muted-foreground">Loading...</p>
          ) : (
            <form onSubmit={save} className="mt-8 clip-corner border-neon bg-card/70 backdrop-blur p-8 space-y-5">
              {(["ign", "bgmi_id", "whatsapp", "squad_name"] as const).map((k) => (
                <div key={k}>
                  <label className="text-xs font-bold uppercase tracking-widest text-neon">{k.replace("_", " ")}</label>
                  <input
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    className="mt-2 w-full bg-input border border-border clip-corner px-4 py-3 outline-none focus:border-[var(--neon)]"
                  />
                </div>
              ))}
              <button disabled={saving} className="w-full clip-corner gradient-red py-3.5 font-display font-black uppercase tracking-widest text-white disabled:opacity-60">
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
