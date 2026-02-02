"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Shield, Clock, AlertCircle } from "lucide-react";

export default function SessionTokenView() {
    const { getToken } = useAuth();
    const [tokenData, setTokenData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function decodeToken() {
            try {
                const token = await getToken();
                if (token) {
                    const decoded: any = jwtDecode(token);
                    setTokenData(decoded);
                    setError(null);
                } else {
                    setError("No session token found. Are you signed in?");
                }
            } catch (err) {
                console.error("Error decoding token:", err);
                setError("Failed to decode session token.");
            } finally {
                setLoading(false);
            }
        }

        decodeToken();
    }, [getToken]);

    const [showFullToken, setShowFullToken] = useState(false);

    return (
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Shield size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-neutral-100">Approach 1: Session Token</h3>
                    <p className="text-sm font-medium text-neutral-400">Fast / Potentially Stale (Read from JWT)</p>
                </div>
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="flex items-center gap-3 text-sm text-neutral-500 py-10 justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-700 border-t-blue-500"></div>
                        <span>Decoding JWT...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-start gap-3 rounded-xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        {/* Private Data Section */}
                        <div className="rounded-xl bg-black/60 p-5 font-mono text-xs border border-white/5 ring-1 ring-white/5">
                            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600">Decoded Private Data Claim:</div>
                            {tokenData?.private_data ? (
                                <pre className="overflow-auto text-blue-400 scrollbar-hide py-2">
                                    {JSON.stringify(tokenData.private_data, null, 2)}
                                </pre>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2 text-amber-400/90 font-medium italic">
                                        <AlertCircle size={14} />
                                        <span>"private_data" claim missing from token.</span>
                                    </div>
                                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-[12px] leading-relaxed text-amber-200">
                                        <span className="font-bold text-amber-400 block mb-2 underline decoration-amber-500/50 underline-offset-4">Setup Required:</span>
                                        <p className="mb-3">Go to Clerk Dashboard &gt; Sessions &gt; Edit Session Token &gt; Add:</p>
                                        <code className="block rounded-md bg-black/60 p-3 font-mono text-blue-300 border border-white/5">
                                            {`{ "private_data": "{{user.private_metadata}}" }`}
                                        </code>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Full Token Payload Toggle */}
                        <div className="space-y-3">
                            <button
                                onClick={() => setShowFullToken(!showFullToken)}
                                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-300 transition-colors"
                            >
                                {showFullToken ? "Hide Full Payload" : "Show Full Token Payload"}
                                {showFullToken ? "↑" : "↓"}
                            </button>

                            {showFullToken && (
                                <div className="rounded-xl bg-black/40 p-5 font-mono text-[10px] border border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <pre className="overflow-auto text-neutral-400 scrollbar-hide">
                                        {JSON.stringify(tokenData, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-500">
                            <Clock size={12} className="text-neutral-600" />
                            <span>Expires at: {tokenData?.exp ? new Date(tokenData.exp * 1000).toLocaleTimeString() : 'N/A'}</span>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs leading-relaxed text-neutral-500">
                    This uses the <code className="text-neutral-300 font-semibold italic">getToken()</code> method. It is instant because the token is cached locally, but requires manual configuration in the Clerk Dashboard.
                </p>
            </div>
        </div>
    );
}
