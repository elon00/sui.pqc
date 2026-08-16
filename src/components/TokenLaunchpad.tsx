/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Rocket, ShieldCheck, Zap, Lock, Sparkles, CheckCircle2, Clock, ArrowRight, Coins, AlertCircle, Award } from 'lucide-react';
import { WalletState, LaunchpadTier } from '../types';
import { formatNumberCompact } from '../utils';

interface TokenLaunchpadProps {
  wallet: WalletState;
  onConnectClick: () => void;
  onAddTokens: (amount: number) => void;
}

export default function TokenLaunchpad({ wallet, onConnectClick, onAddTokens }: TokenLaunchpadProps) {
  const [commitSui, setCommitSui] = useState<number>(250);
  const [selectedTierId, setSelectedTierId] = useState<string>('sentinel');
  const [isCommitting, setIsCommitting] = useState<boolean>(false);
  const [commitSuccess, setCommitSuccess] = useState<boolean>(false);
  const [lastCommittedAmount, setLastCommittedAmount] = useState<number>(0);
  const [totalRaisedSui, setTotalRaisedSui] = useState<number>(4285000);
  const HARD_CAP_SUI = 5000000;

  // Countdown timer for Public IDO closing
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tiers: LaunchpadTier[] = [
    {
      id: 'sentinel',
      name: 'Sentinel Node',
      minCommitSui: 50,
      maxCommitSui: 500,
      allocationMultiplier: 1.05, // +5% Bonus
      qsuiPerSui: 1_000_000,
      badge: '5% Bonus',
      benefits: ['Guaranteed IDO Allocation', 'Basic Staking Node APY', 'PQC Diagnostic Sandbox Access'],
      slotsTotal: 10000,
      slotsClaimed: 8420,
    },
    {
      id: 'validator',
      name: 'Quantum Validator',
      minCommitSui: 500,
      maxCommitSui: 2500,
      allocationMultiplier: 1.12, // +12% Bonus
      qsuiPerSui: 1_000_000,
      badge: '12% Bonus',
      benefits: ['Priority Validator Slot on Sui DevNet', 'Enhanced 12-Month Staking Yield (22% APY)', 'DAO Governance Voting Weight 1.2x'],
      slotsTotal: 4000,
      slotsClaimed: 3610,
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Syndicate',
      minCommitSui: 2500,
      maxCommitSui: 10000,
      allocationMultiplier: 1.2, // +20% Bonus
      qsuiPerSui: 1_000_000,
      badge: '20% Bonus',
      benefits: ['Private Cryptography Research Channel', 'Direct Sui Move Codebase Audit Access', 'Airdrop Multiplier on Future NIST Protocols'],
      slotsTotal: 1500,
      slotsClaimed: 1395,
    },
    {
      id: 'apex_whale',
      name: 'Apex Whale DAO',
      minCommitSui: 10000,
      maxCommitSui: 50000,
      allocationMultiplier: 1.35, // +35% Bonus
      qsuiPerSui: 1_000_000,
      badge: '35% Bonus',
      benefits: ['Institutional Co-Governance Committee', 'Direct Liquidity Pool Fee Share', 'VIP Keynote Pass for Token2049 & Sui Basecamp'],
      slotsTotal: 500,
      slotsClaimed: 488,
    },
  ];

  const currentTier = tiers.find((t) => t.id === selectedTierId) || tiers[0];
  const baseTokens = commitSui * currentTier.qsuiPerSui;
  const bonusTokens = Math.round(baseTokens * (currentTier.allocationMultiplier - 1));
  const totalTokens = baseTokens + bonusTokens;

  const handleCommitAndClaim = () => {
    if (!wallet.isConnected) {
      onConnectClick();
      return;
    }
    setIsCommitting(true);
    setTimeout(() => {
      setIsCommitting(false);
      setCommitSuccess(true);
      setLastCommittedAmount(totalTokens);
      setTotalRaisedSui((prev) => prev + commitSui);
      // Immediately add the 20% TGE unlocked tokens to the simulated wallet
      const immediateUnlocked = Math.round(totalTokens * 0.2);
      onAddTokens(immediateUnlocked);
    }, 1500);
  };

  const percentRaised = Math.min(100, (totalRaisedSui / HARD_CAP_SUI) * 100);

  return (
    <section id="launchpad" className="py-20 border-t border-slate-900 bg-slate-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>Public IDO & Token Launchpad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Quantum Sui (QSUI) Fair Launch IDO
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Join the 1,000 Trillion post-quantum digital asset distribution on Sui. Transparent smart contract allocation with anti-whale safeguards, instant TGE unlock, and linear vesting.
          </p>
        </div>

        {/* Live Stage Progress & Countdown HUD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  Stage 2: Public IDO (Live)
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {totalRaisedSui.toLocaleString()} / {HARD_CAP_SUI.toLocaleString()} SUI
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Allocated Supply: 100 Trillion QSUI (10% of Total 1,000T Supply)
              </p>
            </div>

            {/* Countdown Clock */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex items-center gap-3 font-mono text-center">
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-black text-cyan-300">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">Days</div>
              </div>
              <span className="text-slate-700 font-bold">:</span>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-black text-cyan-300">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">Hours</div>
              </div>
              <span className="text-slate-700 font-bold">:</span>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-black text-cyan-300">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">Mins</div>
              </div>
              <span className="text-slate-700 font-bold">:</span>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-black text-purple-400">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">Secs</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Hard Cap Progress ({percentRaised.toFixed(1)}% Filled)</span>
              <span className="text-cyan-400 font-bold">
                {(HARD_CAP_SUI - totalRaisedSui).toLocaleString()} SUI Remaining
              </span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                id="launchpad-progress-fill"
                className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${percentRaised}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tier Selector & Interactive Allocation Calculator */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Tiers */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>Select Participation Tier</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">Higher Tier = Higher Allocation Bonus</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {tiers.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    id={`tier-card-${tier.id}`}
                    onClick={() => {
                      setSelectedTierId(tier.id);
                      setCommitSui(tier.minCommitSui);
                    }}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold font-mono text-slate-500">Tier Tier</span>
                          <h4 className="font-bold text-sm text-slate-100">{tier.name}</h4>
                        </div>
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                          {tier.badge}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-xl text-xs font-mono">
                        <div className="text-slate-400 text-[11px]">Commit Range:</div>
                        <div className="text-white font-bold">
                          {tier.minCommitSui} - {tier.maxCommitSui.toLocaleString()} SUI
                        </div>
                      </div>

                      <ul className="space-y-1 text-[11px] text-slate-400">
                        {tier.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span className="truncate">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>
                        Slots: {tier.slotsClaimed}/{tier.slotsTotal}
                      </span>
                      <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                        {isSelected ? '✓ SELECTED' : 'Click to Select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Contribution & Claim Terminal */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div>
              <h3 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
                <Coins className="w-5 h-5 text-purple-400" />
                <span>Allocation Terminal</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current Tier: <span className="text-cyan-300 font-bold">{currentTier.name}</span>
              </p>
            </div>

            {/* Input & Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-400 uppercase font-mono">Commit SUI Amount</label>
                <span className="font-mono text-cyan-300 font-bold">{commitSui.toLocaleString()} SUI</span>
              </div>

              <input
                type="range"
                id="launchpad-slider"
                min={currentTier.minCommitSui}
                max={currentTier.maxCommitSui}
                step={currentTier.minCommitSui < 500 ? 25 : 250}
                value={commitSui}
                onChange={(e) => setCommitSui(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Min: {currentTier.minCommitSui} SUI</span>
                <span>Max: {currentTier.maxCommitSui.toLocaleString()} SUI</span>
              </div>
            </div>

            {/* Allocation Breakdown Table */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Base QSUI Allocation</span>
                <span className="font-mono text-slate-200 font-semibold">{baseTokens.toLocaleString()} QSUI</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Tier Bonus (+{(currentTier.allocationMultiplier - 1) * 100}%)</span>
                <span className="font-mono text-emerald-400 font-bold">+{bonusTokens.toLocaleString()} QSUI</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Immediate TGE Unlock (20%)</span>
                <span className="font-mono text-cyan-300 font-bold">
                  {Math.round(totalTokens * 0.2).toLocaleString()} QSUI
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Linear Vesting (80% / 6 Mo)</span>
                <span className="font-mono text-slate-400">
                  {Math.round(totalTokens * 0.8).toLocaleString()} QSUI
                </span>
              </div>
              <hr className="border-slate-850 my-1" />
              <div className="flex justify-between items-center text-sm font-extrabold text-white">
                <span>Total Received</span>
                <span className="font-mono text-cyan-300 text-base">{totalTokens.toLocaleString()} QSUI</span>
              </div>
            </div>

            {/* Action Commit Button */}
            <div>
              {commitSuccess ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl space-y-2 text-center animate-in fade-in">
                  <div className="text-emerald-400 font-bold text-sm flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Allocation Committed Successfully!</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Claimed <span className="font-bold text-cyan-300">{Math.round(lastCommittedAmount * 0.2).toLocaleString()} QSUI</span> directly into your connected wallet. Remaining 80% locked under Sui Move linear vesting schedule.
                  </p>
                  <button
                    onClick={() => setCommitSuccess(false)}
                    className="mt-2 text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Commit Another Allocation
                  </button>
                </div>
              ) : (
                <button
                  id="launchpad-commit-btn"
                  onClick={handleCommitAndClaim}
                  disabled={isCommitting}
                  className="w-full bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isCommitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Signing Sui Move Smart Contract...</span>
                    </>
                  ) : wallet.isConnected ? (
                    <>
                      <Rocket className="w-4 h-4 text-slate-950" />
                      <span>Commit {commitSui.toLocaleString()} SUI Allocation</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-slate-950" />
                      <span>Connect Wallet to Participate</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Launchpad Guarantee Notes */}
            <div className="flex items-center gap-2 text-[10px] text-slate-500 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sui Bytecode Verified | Zero-Slippage Anti-Bot Protection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
