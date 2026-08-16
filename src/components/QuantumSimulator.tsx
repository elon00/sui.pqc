/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Play, RotateCcw, AlertTriangle, Cpu, ArrowRight, Zap, CheckCircle2, Lock } from 'lucide-react';
import { SecurityStatus } from '../types';
import { generateMockAddress, getShorAttackLogs } from '../utils';

export default function QuantumSimulator() {
  const [status, setStatus] = useState<SecurityStatus>({
    isSimulating: false,
    progress: 0,
    threatLevel: 'low',
    logs: [],
    victimAddress: generateMockAddress(false),
    isPqcProtected: false,
    hacked: null,
  });

  const [qubits, setQubits] = useState<number>(4096);
  const [selectedAlgo, setSelectedAlgo] = useState<'ml_dsa' | 'ecdsa'>('ml_dsa');

  const startSimulation = (pqcTarget: boolean) => {
    const address = generateMockAddress(pqcTarget);
    setStatus({
      isSimulating: true,
      progress: 0,
      threatLevel: pqcTarget ? 'low' : 'critical',
      logs: [],
      victimAddress: address,
      isPqcProtected: pqcTarget,
      hacked: null,
    });

    const logsToPlay = getShorAttackLogs(address, pqcTarget);
    let step = 0;

    const interval = setInterval(() => {
      if (step < logsToPlay.length) {
        const currentLog = logsToPlay[step];
        setStatus((prev) => ({
          ...prev,
          progress: Math.min(100, Math.round(((step + 1) / logsToPlay.length) * 100)),
          logs: [
            ...prev.logs,
            {
              id: Math.random().toString(),
              timestamp: new Date().toISOString().split('T')[1].slice(0, 8),
              message: currentLog.message,
              type: currentLog.type,
            },
          ],
        }));
        step++;
      } else {
        clearInterval(interval);
        setStatus((prev) => ({
          ...prev,
          isSimulating: false,
          progress: 100,
          hacked: !pqcTarget,
        }));
      }
    }, 450);
  };

  return (
    <section id="simulator" className="py-20 border-t border-slate-900 bg-slate-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive PQC Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Shor's Quantum Algorithm Attack Sandbox
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Execute a simulated quantum period-finding attack with 4,096 logical qubits. Compare legacy elliptic-curve signatures with QSUI's high-dimensional lattice cryptography (ML-DSA / Crystals-Dilithium).
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Attack Simulation Parameters</span>
            </h3>

            {/* Target Algorithm Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400 font-mono">
                Target Cryptographic Scheme
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="target-pqc-btn"
                  onClick={() => setSelectedAlgo('ml_dsa')}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    selectedAlgo === 'ml_dsa'
                      ? 'border-cyan-500 bg-cyan-950/30 shadow'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">QSUI ML-DSA</div>
                  <div className="text-[10px] text-cyan-400 mt-0.5">Post-Quantum Lattice</div>
                </button>

                <button
                  id="target-ecdsa-btn"
                  onClick={() => setSelectedAlgo('ecdsa')}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    selectedAlgo === 'ecdsa'
                      ? 'border-red-500 bg-red-950/30 shadow'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">Legacy ECDSA</div>
                  <div className="text-[10px] text-red-400 mt-0.5">Vulnerable Curve (secp256k1)</div>
                </button>
              </div>
            </div>

            {/* Simulated Qubits Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Quantum Coherent Qubits</span>
                <span className="font-mono text-cyan-300 font-bold">{qubits.toLocaleString()} Qubits</span>
              </div>
              <input
                type="range"
                min="512"
                max="8192"
                step="512"
                value={qubits}
                onChange={(e) => setQubits(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>512 Qubits (NISQ)</span>
                <span>8,192 Qubits (Fault-Tolerant)</span>
              </div>
            </div>

            {/* Launch Attack Buttons */}
            <div className="space-y-3 pt-2">
              <button
                id="run-shor-attack-btn"
                onClick={() => startSimulation(selectedAlgo === 'ml_dsa')}
                disabled={status.isSimulating}
                className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg ${
                  selectedAlgo === 'ml_dsa'
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-cyan-500/20'
                    : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white shadow-red-500/20'
                } disabled:opacity-50`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {status.isSimulating
                    ? 'Executing Quantum Period Finding...'
                    : `Simulate Shor Attack on ${selectedAlgo === 'ml_dsa' ? 'QSUI PQC' : 'Legacy ECDSA'}`}
                </span>
              </button>
            </div>
          </div>

          {/* Execution Terminal Display */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col h-[480px] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    status.isSimulating
                      ? 'bg-amber-400 animate-ping'
                      : status.hacked === true
                      ? 'bg-red-400'
                      : status.hacked === false
                      ? 'bg-emerald-400'
                      : 'bg-slate-600'
                  }`}
                />
                <span className="font-mono text-xs font-bold text-slate-200">
                  Target: {status.victimAddress.slice(0, 16)}...
                </span>
              </div>

              <span className="text-xs font-mono font-bold text-cyan-400">
                Progress: {status.progress}%
              </span>
            </div>

            {/* Terminal Logs */}
            <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 bg-slate-950 p-4 rounded-2xl border border-slate-850">
              {status.logs.length === 0 ? (
                <div className="text-slate-600 italic text-center py-20">
                  Select a target cryptographic scheme and click "Simulate Shor Attack" to execute quantum factorization test.
                </div>
              ) : (
                status.logs.map((log) => (
                  <div
                    key={log.id}
                    className={`leading-relaxed ${
                      log.type === 'error'
                        ? 'text-red-400'
                        : log.type === 'success'
                        ? 'text-emerald-400'
                        : log.type === 'warning'
                        ? 'text-amber-300'
                        : 'text-slate-300'
                    }`}
                  >
                    <span className="text-slate-600 mr-2">[{log.timestamp}]</span>
                    <span>{log.message}</span>
                  </div>
                ))
              )}
            </div>

            {/* Result Status Banner */}
            {status.hacked !== null && (
              <div
                className={`mt-4 p-3.5 rounded-2xl border text-xs flex items-center gap-3 animate-in fade-in ${
                  status.hacked
                    ? 'bg-red-950/40 border-red-800 text-red-300'
                    : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                }`}
              >
                {status.hacked ? (
                  <>
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                    <div>
                      <span className="font-bold">CRITICAL SECURITY BREACH:</span> Legacy ECDSA private key compromised via Shor's discrete log period finding.
                    </div>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold">QSUI POST-QUANTUM LATTICE IMMUNIZATION ACTIVE:</span> ML-DSA lattice parameters successfully resisted 4096-qubit quantum attack.
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
