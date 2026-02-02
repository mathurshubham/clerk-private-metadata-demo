"use client";

import { useState } from "react";
import { getPrivateMetadataAction } from "@/app/actions";
import { Database, RefreshCw, CheckCircle2, XCircle } from "lucide-react";

export default function BackendAccessView() {
    const [metadata, setMetadata] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastFetched, setLastFetched] = useState<Date | null>(null);

    async function fetchMetadata() {
        setLoading(true);
        setError(null);
        try {
            const result = await getPrivateMetadataAction();
            if (result.success) {
                setMetadata(result.data);
                setLastFetched(new Date());
            } else {
                setError(result.error || "Failed to fetch metadata");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Database size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-neutral-100">Approach 2: Backend API</h3>
                    <p className="text-sm font-medium text-neutral-400">Slow / Fresh (Server Action)</p>
                </div>
            </div>

            <div className="space-y-6">
                <button
                    onClick={fetchMetadata}
                    disabled={loading}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] disabled:opacity-50 active:scale-95"
                >
                    <RefreshCw size={18} className={loading ? "animate-spin" : "transition-transform group-hover:rotate-180"} />
                    <span>{loading ? "Fetching Fresh Data..." : "Fetch from Backend API"}</span>
                </button>

                {error && (
                    <div className="flex items-start gap-3 rounded-xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
                        <XCircle size={18} className="mt-0.5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {metadata !== null && (
                    <div className="rounded-xl bg-black/60 p-5 font-mono text-xs border border-emerald-500/20 ring-1 ring-emerald-500/10">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Live Backend Metadata:</span>
                            <CheckCircle2 size={16} className="text-emerald-500" />
                        </div>
                        <pre className="overflow-auto text-emerald-400 scrollbar-hide py-2">
                            {JSON.stringify(metadata, null, 2)}
                        </pre>
                    </div>
                )}

                {lastFetched && (
                    <p className="text-[10px] text-center text-neutral-500 font-medium italic">
                        Last fetched: {lastFetched.toLocaleTimeString()}
                    </p>
                )}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs leading-relaxed text-neutral-500">
                    This triggers a <code className="text-neutral-300 font-semibold italic">Server Action</code> that calls the Clerk Backend API directly. It is always fresh but costs a network hop and is subject to rate limits.
                </p>
            </div>
        </div>
    );
}
