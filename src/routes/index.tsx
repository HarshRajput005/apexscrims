import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Matches } from "@/components/Matches";
import { Leaderboard } from "@/components/Leaderboard";
import { Rewards } from "@/components/Rewards";
import { Register } from "@/components/Register";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ApexScrims — Premium BGMI Esports Tournaments & Paid Scrims" },
      { name: "description", content: "Host-scheduled BGMI paid scrims with per-kill payouts, position prize pools, and instant rewards. Join India's elite esports circuit." },
      { property: "og:title", content: "ApexScrims — BGMI Esports Tournaments" },
      { property: "og:description", content: "Premium paid BGMI scrims with real cash rewards per kill and position." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Matches />
      <Leaderboard />
      <Rewards />
      <Register />
      <Footer />
      <Toaster theme="dark" />
    </main>
  );
}
