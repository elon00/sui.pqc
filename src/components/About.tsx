/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Cpu, Dna, Lock, Layers, Zap, Scale } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Post-Quantum Lattice Cryptography',
      description:
        'Standardized under NIST FIPS 204 (ML-DSA) and FIPS 203 (ML-KEM). High-dimensional module lattices (n=1024) ensure mathematical immunity against quantum polynomial-time factoring.',
      tag: 'NIST Standards',
      color: 'text-cyan-400',
    },
    {
      icon: Dna,
      title: 'Conway AI Cellular Automaton',
      description:
        'Discrete dynamical systems generate decentralized pseudo-entropy on-chain. Self-organizing cellular organisms validate peer states and generate cryptographic beacons for key rotation.',
      tag: 'Artificial Life',
      color: 'text-purple-400',
    },
    {
      icon: Cpu,
      title: 'Sui High-Speed Asynchronous DAG',
      description:
        'Parallel transaction execution and asynchronous consensus seamlessly process the expanded 2.4KB PQC signature payloads with sub-second finality and negligible gas costs.',
      tag: 'Sui Network',
      color: 'text-teal-300',
    },
    {
      icon: Scale,
      title: 'Securities Law & Formal Verification',
      description:
        'Audited under the SEC Howey Test (94/100 Decentralized Utility Score), EU MiCA Article 4 utility exemptions, and 100,000-cycle Move bytecode invariant verification.',
      tag: 'Legal Audit',
      color: 'text-amber-400',
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-900 bg-slate-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architecture & Design Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Quantum Sui (QSUI) Defines Web 4.0
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The convergence of quantum-resistant cryptography, discrete cellular automata, autonomous AI agents, and high-throughput Sui blockchain infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-850 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between hover:border-slate-750 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
                      <Icon className={`w-6 h-6 ${p.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-100">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
