/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, Cpu, Copy, Check, Rocket, Dna, Bot, ShieldCheck, Zap, Layers } from 'lucide-react';
import { WalletState } from '../types';
import { formatNumberCompact } from '../utils';

interface HeroProps {
  wallet: WalletState;
  onConnectClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ wallet, onConnectClick, onNavigate }: HeroProps) {
  const [suiAmount, setSuiAmount] = useState<string>('10');
  const [qsuiResult, setQsuiResult] = useState<number>(10_000_000);
  const [copied, setCopied] = useState<boolean>(false);

  // Real-time block height and metrics simulator
  const [blockHeight, setBlockHeight] = useState<number>(58392104);
  const [activeProtectRating, setActiveProtectRating] = useState<number>(99.99);

  const CONTRACT_ADDRESS = '0xqsui98f21a48c900e57b32d847aa01fb36f7ca0c895ac1a4d8eeb7d77eaa0e';

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight((prev) => prev + Math.floor(Math.random() * 3) + 1);
      setActiveProtectRating((prev) => {
        const delta = (Math.random() - 0.5) * 0.005;
        return Math.min(100, Math.max(99.95, prev + delta));
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rawSui = parseFloat(suiAmount);
    if (!isNaN(rawSui) && rawSui >= 0) {
      // 1 SUI = 1,000,000 QSUI in Fair Launch / IDO phase (1,000 Trillion total supply economy)
      setQsuiResult(rawSui * 1_000_000);
    } else {
      setQsuiResult(0);
    }
  }, [suiAmount]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative py-16 md:py-24 overflow-hidden border-b border-slate-900 bg-slate-950">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-cyan-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-1/4 w-[550px] h-[550px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-teal-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left column - Value Proposition & Project Introduction */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Eyebrow badge */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-300 uppercase bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-full shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Sui Web 4.0 Post-Quantum Standard</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1.5 rounded-full font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>1,000 Trillion Total Supply</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 font-sans">
            The Quantum-Immune <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Web 4.0 Token & Automaton
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            <span className="text-cyan-300 font-bold">Quantum Sui (QSUI)</span> is the flagship Post-Quantum Cryptographic (PQC) network token on the high-performance Sui blockchain. Integrated with an autonomous <span className="text-purple-300 font-semibold">Conway AI Cellular Automaton</span>, an interactive <span className="text-teal-300 font-semibold">Agentic Chatbot</span>, and audited under global securities standards.
          </p>

          {/* Key Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-xl text-left">
              <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Supply Cap</div>
              <div className="text-sm font-bold text-white font-mono">1,000 Trillion QSUI</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-xl text-left">
              <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Signature Protocol</div>
              <div className="text-sm font-bold text-cyan-300 font-mono">ML-DSA / Kyber</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-xl text-left col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Howey Test Rating</div>
              <div className="text-sm font-bold text-emerald-400 font-mono">Non-Security Utility</div>
            </div>
          </div>

          {/* Interactive contract registry badge */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4 w-full max-w-xl">
              <div className="min-w-0">
                <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold font-mono">
                  Sui Package Registry (PQC Core)
                </div>
                <div className="font-mono text-cyan-300 text-xs truncate max-w-[240px] sm:max-w-[340px]">
                  {CONTRACT_ADDRESS}
                </div>
              </div>
              <button
                id="copy-contract-btn"
                onClick={copyToClipboard}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition shrink-0 cursor-pointer"
                title="Copy Contract Address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              id="hero-launchpad-btn"
              onClick={() => onNavigate('launchpad')}
              className="bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-slate-950" />
              <span>Enter Token Launchpad</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-automaton-btn"
              onClick={() => onNavigate('automaton')}
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/40 px-5 py-3.5 rounded-xl font-semibold transition text-sm text-slate-200 flex items-center gap-2 cursor-pointer"
            >
              <Dna className="w-4 h-4 text-purple-400" />
              <span>Conway AI Automaton</span>
            </button>

            <button
              id="hero-chatbot-btn"
              onClick={() => onNavigate('chatbot')}
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 px-5 py-3.5 rounded-xl font-semibold transition text-sm text-slate-200 flex items-center gap-2 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Sentinel</span>
            </button>
          </div>
        </div>

        {/* Right column - Interactive Graphic & Quick Exchange Estimator */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Glowing Lattice Hexagon Visual Unit */}
          <div className="relative flex justify-center bg-slate-900/40 border border-slate-850 rounded-3xl p-8 backdrop-blur-sm shadow-2xl overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-slate-950/80 border border-emerald-900/40 px-3 py-1 rounded-full text-[10px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Shor\'s Factorization Proof: ACTIVE</span>
            </div>

            {/* Rotating PQC Geometric Lattice Visual */}
            <div className="w-64 h-64 relative flex items-center justify-center my-2">
              <svg viewBox="0 0 200 200" className="w-full h-full animate-spin" style={{ animationDuration: '45s' }}>
                <defs>
                  <linearGradient id="qsui-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                {/* Outer protective shield ring */}
                <circle cx="100" cy="100" r="92" stroke="url(#qsui-grad)" strokeWidth="1.2" strokeDasharray="6,8" fill="none" className="opacity-40" />

                {/* High-dimensional lattice polygons */}
                <path d="M 100,12 L 176,55 L 176,145 L 100,188 L 24,145 L 24,55 Z" stroke="url(#qsui-grad)" strokeWidth="1.5" fill="none" className="opacity-70" />
                <path d="M 100,30 L 160,65 L 160,135 L 100,170 L 40,135 L 40,65 Z" stroke="#38bdf8" strokeWidth="1" fill="none" className="opacity-50" />
                <path d="M 100,48 L 145,74 L 145,126 L 100,152 L 55,126 L 55,74 Z" stroke="#a855f7" strokeWidth="0.8" fill="none" className="opacity-40" />

                {/* Inter-dimensional mesh lines */}
                <line x1="100" y1="12" x2="100" y2="188" stroke="url(#qsui-grad)" strokeWidth="0.6" className="opacity-40" />
                <line x1="24" y1="55" x2="176" y2="145" stroke="url(#qsui-grad)" strokeWidth="0.6" className="opacity-40" />
                <line x1="24" y1="145" x2="176" y2="55" stroke="url(#qsui-grad)" strokeWidth="0.6" className="opacity-40" />

                {/* Crystal Lattice Vertex Nodes */}
                <circle cx="100" cy="12" r="4.5" fill="#06b6d4" />
                <circle cx="176" cy="55" r="4.5" fill="#a855f7" />
                <circle cx="176" cy="145" r="4.5" fill="#2dd4bf" />
                <circle cx="100" cy="188" r="4.5" fill="#a855f7" />
                <circle cx="24" cy="145" r="4.5" fill="#06b6d4" />
                <circle cx="24" cy="55" r="4.5" fill="#2dd4bf" />
                <circle cx="100" cy="100" r="6" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '3s' }} />
              </svg>

              {/* Centered high-tech typography */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                <span className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-teal-100 to-purple-300 font-sans">
                  QSUI
                </span>
                <span className="text-[9px] tracking-widest text-cyan-400 font-extrabold uppercase font-mono mt-1">
                  1,000 TRILLION
                </span>
              </div>
            </div>
          </div>

          {/* Quick Swap/Mint Calculator */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-left">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launchpad Presale Estimator</span>
              </span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 font-bold font-mono px-2 py-0.5 rounded border border-cyan-800/40">
                1 SUI = 1,000,000 QSUI
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Commit Amount (SUI)</label>
                <div className="relative">
                  <input
                    type="number"
                    id="swap-input-sui"
                    value={suiAmount}
                    onChange={(e) => setSuiAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-sm font-semibold font-mono text-slate-100 outline-none transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-400 font-mono">
                    SUI
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-7 h-7 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
                  ↓
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Receive QSUI Allocation</label>
                <div className="w-full bg-slate-950/80 border border-slate-850 rounded-xl px-4 py-3 flex justify-between items-center">
                  <span id="swap-result-spqc" className="font-bold font-mono text-sm text-cyan-300">
                    {qsuiResult.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-cyan-400 font-mono">QSUI</span>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                id="hero-launchpad-jump"
                onClick={() => onNavigate('launchpad')}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-xs py-3 rounded-xl transition shadow-md shadow-cyan-500/10 cursor-pointer flex items-center justify-center gap-2"
              >
                <Rocket className="w-3.5 h-3.5 text-slate-950" />
                <span>Go to QSUI Launchpad</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Network Stats Bar - Responsive Bento Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-slate-900/50 border border-slate-850 p-6 rounded-2xl backdrop-blur-sm text-left">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1 font-mono">
              Live Sui Block Height
            </div>
            <div id="metric-block-height" className="text-xl font-extrabold font-mono text-white">
              #{blockHeight.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>DAG Consensus Synced</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1 font-mono">
              Quantum Defense Coeff
            </div>
            <div id="metric-rating" className="text-xl font-extrabold font-mono text-cyan-400">
              {activeProtectRating.toFixed(2)}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1">ML-DSA 1024 Lattice</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1 font-mono">
              Total Supply Hardcap
            </div>
            <div className="text-xl font-extrabold font-mono text-white">1,000 Trillion</div>
            <div className="text-[10px] text-slate-400 mt-1">Fixed Hard Cap | No Mint</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1 font-mono">
              Conway AI Node Mesh
            </div>
            <div className="text-xl font-extrabold font-mono text-purple-400">1,337 Nodes</div>
            <div className="text-[10px] text-slate-400 mt-1">Web 4.0 Peer Consensus</div>
          </div>
        </div>
      </div>
    </section>
  );
}
