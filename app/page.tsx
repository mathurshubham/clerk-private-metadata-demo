import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import SessionTokenView from "@/components/SessionTokenView";
import BackendAccessView from "@/components/BackendAccessView";
import { Info, ExternalLink, Key } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 md:py-32">
      {/* Header */}
      <div className="mb-20 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 backdrop-blur-sm">
          <Key size={14} className="text-blue-500" />
          <span>Clerk Authentication & Metadata</span>
        </div>
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Private <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">Metadata</span> Demo
        </h1>
        <p className="max-w-2xl text-xl text-neutral-400 leading-relaxed">
          Explore and compare methods for accessing sensitive user data securely in Next.js.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group relative overflow-hidden rounded-full bg-neutral-50 px-10 py-4 text-sm font-bold text-neutral-950 transition-all hover:bg-white hover:scale-105 active:scale-95">
                Sign In to Start
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="rounded-full border border-white/10 p-1 backdrop-blur-sm bg-white/5">
              <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarImg: "rounded-full" } }} />
            </div>
          </SignedIn>
        </div>
      </div>

      <SignedIn>
        {/* Warning Banner */}
        <div className="mb-16 overflow-hidden rounded-3xl border border-amber-500/20 bg-amber-500/10 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.05)]">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-500 border border-amber-500/20">
              <Info size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-100 mb-1">Mandatory Dashboard Configuration</h3>
              <p className="text-sm leading-relaxed text-amber-100/70">
                For <span className="text-amber-300 font-bold italic">Approach 1</span> to work, you must synchronize your private metadata with the session token in the Clerk Dashboard.
              </p>
            </div>
            <a
              href="https://clerk.com/docs/backend-requests/custom-session-token"
              target="_blank"
              className="flex items-center gap-2 rounded-xl bg-amber-500/20 px-5 py-2.5 text-xs font-bold text-amber-200 transition-all hover:bg-amber-500/30 hover:text-white"
            >
              View Setup Guide <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-10 md:grid-cols-2">
          <SessionTokenView />
          <BackendAccessView />
        </div>

        {/* Comparison Table */}
        <div className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="p-8 border-b border-white/10">
            <h2 className="text-2xl font-bold">Protocol Comparison</h2>
            <p className="text-sm text-neutral-500 mt-1">Understanding the trade-offs between Client-side and Server-side access.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.02] text-[11px] font-bold uppercase tracking-widest text-neutral-500 border-b border-white/10">
                <tr>
                  <th className="px-8 py-5">Feature</th>
                  <th className="px-8 py-5">Approach 1: Session Token</th>
                  <th className="px-8 py-5">Approach 2: Backend API</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-8 py-6 text-neutral-400">Latency</td>
                  <td className="px-8 py-6 text-blue-400 font-bold">Zero (Instant Local Decode)</td>
                  <td className="px-8 py-6 text-emerald-400">Network Bound (~100-300ms)</td>
                </tr>
                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-8 py-6 text-neutral-400">Data Freshness</td>
                  <td className="px-8 py-6 text-neutral-300">Stale (Cached until re-auth)</td>
                  <td className="px-8 py-6 text-emerald-400 font-bold">Real-time (Force Fetch)</td>
                </tr>
                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-8 py-6 text-neutral-400">Setup Effort</td>
                  <td className="px-8 py-6 text-amber-200">Moderate (Clerk Dashboard Config)</td>
                  <td className="px-8 py-6 text-emerald-400 font-bold">Low (Seamless API Access)</td>
                </tr>
                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-8 py-6 text-neutral-400">Scalability</td>
                  <td className="px-8 py-6 text-blue-400 font-bold">Infinite (Client-side usage)</td>
                  <td className="px-8 py-6 text-amber-400">Subject to API Rate Limits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SignedIn>

      {/* Placeholder for Signed Out state */}
      <SignedOut>
        <div className="grid gap-10 opacity-20 grayscale pointer-events-none md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 h-72 flex items-center justify-center text-neutral-500 italic">
            Sign in to preview approach comparison
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 h-72 flex items-center justify-center text-neutral-500 italic">
            Sign in to preview backend integration
          </div>
        </div>
      </SignedOut>
    </main>
  );
}
