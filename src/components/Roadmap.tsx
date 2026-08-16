/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, Clock, Calendar, Sparkles, Rocket, Shield, Dna, Bot } from 'lucide-react';
import { RoadmapStep } from '../types';

export default function Roadmap() {
  const steps: RoadmapStep[] = [
    {
      phase: 'Phase 01',
      title: 'Cryptographic Genesis & Sui PQC Core',
      date: 'Q1 2026',
      description: 'Foundational smart contract architecture implementing NIST ML-DSA (Crystals-Dilithium) and ML-KEM on the Sui Move runtime.',
      status: 'completed',
      points: [
        'Move bytecode formal verification of post-quantum signature schemes',
        '1,000 Trillion immutable hard-cap token contract deployment on Sui DevNet',
        'Shor\'s 4096-qubit algorithmic resilience testing passing 100,000 fuzz cycles',
        'Initial Howey Test and EU MiCA regulatory compliance filings completed',
      ],
    },
    {
      phase: 'Phase 02',
      title: 'Conway AI Automaton & Web 4.0 Mesh',
      date: 'Q2 2026',
      description: 'Integrating discrete dynamical cellular automata with server-side AI agents for decentralized entropy generation.',
      status: 'active',
      points: [
        'Live Conway AI Cellular Automaton engine with quantum entangled mutation rules',
        'Autonomous Agentic Chatbot powered by Gemini 3.7 Flash intelligence',
        'Community Testnet Faucet & 100 Trillion QSUI airdrop distribution',
        'High-load parallel DAG transaction benchmarking on Sui TestNet',
      ],
    },
    {
      phase: 'Phase 03',
      title: 'Public Token Launchpad & Tier-1 CEX Listings',
      date: 'Q3 2026',
      description: 'Executing the public fair launch IDO and establishing global liquidity depth across premier cryptocurrency exchanges.',
      status: 'upcoming',
      points: [
        'Public IDO completion across 4 allocation tiers with anti-whale protection',
        'Sui AMM DEX liquidity pool seeding on Cetus, Turbos, and DeepBook',
        'Tier-1 centralized exchange listing blitz (Binance, OKX, Bybit, Coinbase)',
        'Release of the QSUI Quantum Mobile Wallet with biometric ML-DSA signing',
      ],
    },
    {
      phase: 'Phase 04',
      title: 'Autonomous Validator Mesh & Enterprise Adoption',
      date: 'Q4 2026 & Beyond',
      description: 'Institutional custody integrations, post-quantum hardware security module (HSM) support, and keynotes at global summits.',
      status: 'upcoming',
      points: [
        'Decentralized Conway validator nodes achieving full MainNet consensus autonomy',
        'Enterprise banking & Web 4.0 cross-chain quantum bridge protocols',
        'Keynote showcase at Token2049, Sui Basecamp, and Quantum World Congress',
        'Establishment of the QSUI Post-Quantum Cryptography Research Foundation',
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-20 border-t border-slate-900 bg-slate-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-900/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Strategic Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Quantum Sui (QSUI) Ecosystem Roadmap
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From mathematical lattice verification to global Tier-1 exchange liquidity and autonomous Web 4.0 validator mesh consensus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 shadow-xl ${
                  isActive
                    ? 'bg-gradient-to-b from-slate-900 to-cyan-950/20 border-cyan-500 shadow-cyan-500/10 ring-1 ring-cyan-500/20'
                    : isCompleted
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-slate-900/40 border-slate-850 opacity-80'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-500">
                      {step.phase}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                        isCompleted
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800/40'
                          : isActive
                          ? 'bg-cyan-950 text-cyan-400 border-cyan-800/40 animate-pulse'
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      {step.status.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-mono font-bold text-cyan-300">{step.date}</div>
                    <h3 className="font-extrabold text-base text-slate-100 mt-1">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">{step.description}</p>
                  </div>

                  <hr className="border-slate-800" />

                  <ul className="space-y-2 text-[11px] text-slate-300">
                    {step.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            isCompleted || isActive ? 'text-cyan-400' : 'text-slate-600'
                          }`}
                        />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
