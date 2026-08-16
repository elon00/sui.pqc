/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, ShieldCheck, ShieldAlert, Wallet, Sparkles, CheckCircle2 } from 'lucide-react';
import { generateMockAddress } from '../utils';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (provider: string, address: string, isPqc: boolean) => void;
}

export default function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const [selectedPqc, setSelectedPqc] = useState<boolean>(true);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  if (!isOpen) return null;

  const providers = [
    {
      id: 'sui_wallet',
      name: 'Sui Wallet',
      description: 'Official Sui wallet with Web 4.0 Post-Quantum signature plugin.',
      iconText: 'SUI',
      color: 'bg-cyan-500 text-slate-950',
    },
    {
      id: 'suiet',
      name: 'Suiet Wallet',
      description: 'User-friendly non-custodial Sui wallet with hardware key support.',
      iconText: 'ST',
      color: 'bg-teal-400 text-slate-950',
    },
    {
      id: 'nightly',
      name: 'Nightly Wallet',
      description: 'Multi-chain Web3 wallet with post-quantum key vault.',
      iconText: 'N',
      color: 'bg-purple-500 text-white',
    },
    {
      id: 'quantum_vault',
      name: 'QSUI Quantum Hardware Key',
      description: 'Hardware lattice signature module (NIST ML-DSA / Crystals-Dilithium).',
      iconText: 'PQC',
      color: 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950',
    },
  ];

  const handleProviderSelect = (provider: typeof providers[0]) => {
    setIsConnecting(provider.id);
    setTimeout(() => {
      const mockAddress = generateMockAddress(selectedPqc);
      onConnect(provider.name, mockAddress, selectedPqc);
      setIsConnecting(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-left relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Connect Sui Wallet</h3>
              <p className="text-[10px] text-slate-400 font-mono">Select a provider to access QSUI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Post-Quantum Signature Scheme Toggle */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Cryptographic Signing Algorithm
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedPqc(true)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                selectedPqc
                  ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 ring-1 ring-cyan-500/30'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>ML-DSA (PQC)</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-1">Quantum-Immune Lattice</p>
            </button>

            <button
              onClick={() => setSelectedPqc(false)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                !selectedPqc
                  ? 'border-red-500 bg-red-950/40 text-red-300 ring-1 ring-red-500/30'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span>ECDSA (Legacy)</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-1">Shor's Attack Vulnerable</p>
            </button>
          </div>
        </div>

        {/* Provider List */}
        <div className="space-y-2.5">
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProviderSelect(p)}
              disabled={isConnecting !== null}
              className="w-full p-3.5 rounded-2xl border border-slate-850 bg-slate-950/80 hover:bg-slate-850 hover:border-cyan-500/40 text-left transition flex items-center justify-between group cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl ${p.color} flex items-center justify-center font-black text-xs shrink-0 shadow`}
                >
                  {p.iconText}
                </div>
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-slate-400">{p.description}</div>
                </div>
              </div>

              {isConnecting === p.id && (
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              )}
            </button>
          ))}
        </div>

        <div className="pt-2 text-[10px] text-slate-500 text-center font-mono">
          Connecting on Sui DevNet / TestNet with 500 SUI gas + 10,000,000 QSUI faucet.
        </div>
      </div>
    </div>
  );
}
