/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Sparkles, Github, Twitter, Disc as Discord, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs text-left py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-black text-slate-950">
                Q
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">Quantum Sui</span>
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800/60">QSUI</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Post-Quantum Cryptographic Web 4.0 token and autonomous Conway AI Cellular Automaton ecosystem on the Sui blockchain.
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              Total Supply: 1,000 Trillion QSUI
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-slate-200 text-[11px] font-mono">
              Protocol Modules
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('launchpad')} className="hover:text-cyan-400 transition cursor-pointer">
                  Token Launchpad (IDO)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('automaton')} className="hover:text-cyan-400 transition cursor-pointer">
                  Conway AI Automaton
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('chatbot')} className="hover:text-cyan-400 transition cursor-pointer">
                  Autonomous AI Agent
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sui-deployment')} className="hover:text-cyan-400 transition cursor-pointer">
                  Sui Testnet Move Deployer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('simulator')} className="hover:text-cyan-400 transition cursor-pointer">
                  PQC Shor Attack Sandbox
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tokenomics')} className="hover:text-cyan-400 transition cursor-pointer">
                  1,000T Tokenomics & Marketing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('laws-testing')} className="hover:text-cyan-400 transition cursor-pointer">
                  Laws, Securities & Testing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cryptographic Standards */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-slate-200 text-[11px] font-mono">
              Standards & Audits
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>NIST FIPS 204 (ML-DSA)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>NIST FIPS 203 (ML-KEM)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Move Bytecode Verifier (Passed)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>SEC Howey Test (Pass - Consumptive)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>EU MiCA Title II Compliant</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance Notice */}
          <div className="space-y-3 md:col-span-1">
            <div className="font-bold uppercase tracking-wider text-slate-200 text-[11px] font-mono">
              Regulatory Disclosures
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              QSUI is a decentralized cryptographic utility token built on the Sui proof-of-stake DAG network. It is not an investment contract, security, or collective investment scheme under US SEC regulations or EU MiCA laws. Participation in launchpads involves market risk.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 QSUI Foundation. Post-Quantum Web 4.0 Autonomous Network.
          </div>
          <div className="font-mono text-[10px] text-cyan-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Sui DAG Engine Online | Lattice Security Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
