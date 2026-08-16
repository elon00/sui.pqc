/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Layers, TrendingUp, DollarSign, Award, Download, Copy, Check, Sparkles, Shield, Rocket, Globe, Users, ExternalLink } from 'lucide-react';
import { formatNumberCompact } from '../utils';

export default function TokenomicsAndMarketing() {
  const [stakeAmount, setStakeAmount] = useState<number>(50_000_000);
  const [stakeMonths, setStakeMonths] = useState<number>(12);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  const TOTAL_SUPPLY = 1_000_000_000_000_000; // 1,000 Trillion (1 Quadrillion)

  const allocations = [
    {
      name: 'Community Staking & Quantum Mining',
      percent: 35,
      amount: 350_000_000_000_000,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-400',
      description: 'Staking yields for running autonomous Conway automaton nodes and quantum validator verification on Sui.',
    },
    {
      name: 'Token Launchpad & Fair Launch IDO',
      percent: 20,
      amount: 200_000_000_000_000,
      color: 'bg-teal-400',
      textColor: 'text-teal-300',
      description: 'Distributed directly via the decentralized IDO with 20% TGE unlock and 6-month linear vesting.',
    },
    {
      name: 'Ecosystem & NIST Research Grants',
      percent: 15,
      amount: 150_000_000_000_000,
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
      description: 'Grants for academic cryptographers, post-quantum hardware integrations, and Web 4.0 AI tooling on Sui.',
    },
    {
      name: 'Liquidity Pools (Sui AMMs & CEX)',
      percent: 12,
      amount: 120_000_000_000_000,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      description: 'Locked liquidity on Cetus, Turbos, DeepBook, and dedicated market-making for Tier-1 CEX pairings.',
    },
    {
      name: 'Core Cryptographers & Development',
      percent: 10,
      amount: 100_000_000_000_000,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      description: 'Subject to a 12-month cliff followed by 36-month linear smart contract lock.',
    },
    {
      name: 'Strategic Advisory & Security Audits',
      percent: 8,
      amount: 80_000_000_000_000,
      color: 'bg-rose-500',
      textColor: 'text-rose-400',
      description: 'Allocated for continuous formal verification audits and institutional regulatory certifications.',
    },
  ];

  const marketingFlywheel = [
    {
      phase: 1,
      title: 'Quantum Awareness & Shor Threat Campaign',
      kpis: '500K Social Impressions | 50 PQC Research Articles',
      details: 'Global education initiative explaining the cryptographic obsolescence of legacy ECDSA and the necessity of ML-DSA lattice signatures on Sui.',
      status: 'Active',
    },
    {
      phase: 2,
      title: 'Viral Conway Automaton & Testnet Faucet',
      kpis: '100 Trillion QSUI Airdrop Pool | 50K Active On-Chain Wallets',
      details: 'Gamified cellular automaton simulation with on-chain entropy broadcasts and community node referrals.',
      status: 'Scaling',
    },
    {
      phase: 3,
      title: 'Tier-1 CEX Listings & Liquidity Bootstrapping',
      kpis: '$25M 24h Trading Volume | Binance & OKX Fast-Track Integration',
      details: 'Synchronized market making across Sui AMMs (Cetus/Turbos) and institutional Tier-1 exchange listing pools.',
      status: 'Scheduled',
    },
    {
      phase: 4,
      title: 'Institutional Enterprise & Quantum World Congress',
      kpis: '10+ Institutional Custodians | Sui Basecamp & Token2049 Keynotes',
      details: 'Integration with enterprise custody solutions and global financial infrastructure seeking post-quantum compliance.',
      status: 'Scheduled',
    },
  ];

  const APY_PERCENT = 18.5;
  const rewardEstimate = Math.round(stakeAmount * (APY_PERCENT / 100) * (stakeMonths / 12));
  const totalReturn = stakeAmount + rewardEstimate;

  const copyPitchDeck = () => {
    const pitchText = `=====================================================
QUANTUM SUI (QSUI): EXECUTIVE INSTITUTIONAL PITCH BRIEF
Full Name: Quantum Sui | Symbol: QSUI
Blockchain: Sui Network (Post-Quantum Cryptographic Layer)
Total Supply: 1,000,000,000,000,000 (1,000 Trillion QSUI)
Core Innovations:
1. ML-DSA (Crystals-Dilithium) & ML-KEM Quantum-Resistant Signatures
2. Autonomous Conway AI Cellular Automaton Engine on Sui DAG
3. Server-Side Gemini AI Agentic Intelligence Architecture
4. Audited under US SEC Howey Test (Passed - Consumptive Utility) & EU MiCA Title II
5. Comprehensive Global Marketing Strategy & Tier-1 CEX Roadmap
Contract Address: 0xqsui98f21a48c900e57b32d847aa01fb36f7ca0c895ac1a4d8eeb7d77eaa0e
=====================================================`;
    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <section id="tokenomics" className="py-20 border-t border-slate-900 bg-slate-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/40 border border-teal-800/40 px-3 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span>Quantitative Tokenomics & Marketing Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Quantum Sui (QSUI) 1,000T Economy & GTM
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered for high-frequency Web 4.0 agent transactions, micro-gas fee stability on Sui, and frictionless global liquidity across premier exchanges.
          </p>
        </div>

        {/* 1,000 Trillion Visual Distribution Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Max Token Cap
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
                1,000,000,000,000,000 QSUI
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                1,000 Trillion Fixed Hard Cap | Implemented via Sui Move Immutable Coin Package
              </p>
            </div>

            <button
              id="copy-pitch-deck-btn"
              onClick={copyPitchDeck}
              className="bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-cyan-500/40 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              {copiedPitch ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>Copy Institutional Pitch Brief</span>
            </button>
          </div>

          {/* Allocation Spectrum Bar */}
          <div className="space-y-2">
            <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
              {allocations.map((a, i) => (
                <div
                  key={i}
                  style={{ width: `${a.percent}%` }}
                  className={`${a.color} transition-all duration-300 hover:opacity-80`}
                  title={`${a.name}: ${a.percent}%`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0%</span>
              <span>1,000 Trillion Hard Cap (100%)</span>
            </div>
          </div>

          {/* Allocation Detail Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allocations.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-850 p-4 rounded-2xl space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-200">{item.name}</span>
                    <span className={`font-mono text-xs font-black ${item.textColor}`}>{item.percent}%</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-white mt-1">
                    {formatNumberCompact(item.amount)} QSUI
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Standard Marketing Flywheel & Staking Calculator */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Marketing Flywheel */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <span>4-Phase Marketing Strategy Flywheel</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">Institutional GTM</span>
            </div>

            <div className="grid gap-4">
              {marketingFlywheel.map((step) => (
                <div
                  key={step.phase}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-300 font-bold font-mono text-xs flex items-center justify-center border border-cyan-800/40">
                        {step.phase}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-100">{step.title}</h4>
                    </div>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                        step.status === 'Active'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800/40'
                          : step.status === 'Scaling'
                          ? 'bg-cyan-950 text-cyan-400 border-cyan-800/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-8">{step.details}</p>
                  <div className="text-[10px] text-cyan-300/80 font-mono pl-8">
                    Target KPI: {step.kpis}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staking Yield Calculator */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <h3 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Quantum Node Staking Simulator</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Lock QSUI tokens to validate lattice signatures and earn protocol fees.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 font-medium">Staked QSUI Amount</span>
                  <span className="font-mono text-cyan-300 font-bold">{stakeAmount.toLocaleString()} QSUI</span>
                </div>
                <input
                  type="range"
                  id="stake-amount-slider"
                  min="1000000"
                  max="1000000000"
                  step="1000000"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 font-medium">Lock Duration</span>
                  <span className="font-mono text-purple-300 font-bold">{stakeMonths} Months</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 12, 24].map((m) => (
                    <button
                      key={m}
                      onClick={() => setStakeMonths(m)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                        stakeMonths === m
                          ? 'bg-cyan-500 text-slate-950 shadow'
                          : 'bg-slate-950 text-slate-400 hover:bg-slate-850 border border-slate-850'
                      }`}
                    >
                      {m}M
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Staking Yield Output Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Base Annual APY</span>
                <span className="font-mono text-emerald-400 font-bold">{APY_PERCENT}% APY</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Estimated Mining Rewards</span>
                <span className="font-mono text-cyan-300 font-bold">
                  +{rewardEstimate.toLocaleString()} QSUI
                </span>
              </div>
              <hr className="border-slate-850 my-1" />
              <div className="flex justify-between items-center text-sm font-extrabold text-white">
                <span>Total Principal + Yield</span>
                <span className="font-mono text-cyan-300">{totalReturn.toLocaleString()} QSUI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
