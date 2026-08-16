/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Sparkles, Shuffle, Dna, Cpu, Activity, Zap, Check, ShieldCheck } from 'lucide-react';
import { AutomatonRuleMode, AutomatonStats } from '../types';
import { CONWAY_PRESETS } from '../utils';

const ROWS = 40;
const COLS = 70;

export default function ConwayAutomaton() {
  const [grid, setGrid] = useState<number[][]>(() => createEmptyGrid());
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(80);
  const [ruleMode, setRuleMode] = useState<AutomatonRuleMode>('conway');
  const [stats, setStats] = useState<AutomatonStats>({
    generation: 0,
    population: 0,
    liveRatio: 0,
    entropyIndex: 0,
    hashState: '0xqsui...genesis',
    isOscillating: false,
  });
  const [randomDensity, setRandomDensity] = useState<number>(0.2);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [broadcastLog, setBroadcastLog] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<number[][]>(grid);
  gridRef.current = grid;
  const isRunningRef = useRef<boolean>(isRunning);
  isRunningRef.current = isRunning;
  const ruleModeRef = useRef<AutomatonRuleMode>(ruleMode);
  ruleModeRef.current = ruleMode;
  const generationRef = useRef<number>(stats.generation);
  generationRef.current = stats.generation;

  function createEmptyGrid(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  // Load initial preset (Gosper Glider Gun or Quantum Superposition)
  useEffect(() => {
    loadPreset('quantum_superposition');
  }, []);

  const loadPreset = (presetId: string) => {
    setIsRunning(false);
    const preset = CONWAY_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      const newGrid = preset.generate(ROWS, COLS);
      setGrid(newGrid);
      updateStats(newGrid, 0);
    }
  };

  const handleRandomize = () => {
    setIsRunning(false);
    const newGrid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => (Math.random() < randomDensity ? 1 : 0))
    );
    setGrid(newGrid);
    updateStats(newGrid, 0);
  };

  const handleClear = () => {
    setIsRunning(false);
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    updateStats(newGrid, 0);
  };

  // Compute next step in cellular automaton
  const computeNextGeneration = useCallback(() => {
    const currentGrid = gridRef.current;
    const nextGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    const mode = ruleModeRef.current;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        let neighbors = 0;
        // Count 8 neighbors with toroidal wrapping
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = (r + dr + ROWS) % ROWS;
            const nc = (c + dc + COLS) % COLS;
            neighbors += currentGrid[nr][nc] ? 1 : 0;
          }
        }

        const isAlive = currentGrid[r][c] === 1;

        if (mode === 'conway') {
          // Standard Conway Game of Life B3/S23
          if (isAlive && (neighbors === 2 || neighbors === 3)) {
            nextGrid[r][c] = 1;
          } else if (!isAlive && neighbors === 3) {
            nextGrid[r][c] = 1;
          }
        } else if (mode === 'quantum_entangled') {
          // Quantum Entangled: normal Conway + spooky action at a distance
          if (isAlive && (neighbors === 2 || neighbors === 3)) {
            nextGrid[r][c] = 1;
          } else if (!isAlive && (neighbors === 3 || neighbors === 6)) {
            nextGrid[r][c] = 1;
          }
          // Entangle opposite cells: if opposite cell is highly excited, probabilistically spawn
          const oppR = ROWS - 1 - r;
          const oppC = COLS - 1 - c;
          if (currentGrid[oppR][oppC] === 1 && Math.random() < 0.04) {
            nextGrid[r][c] = 1;
          }
        } else if (mode === 'neural_adaptive') {
          // Neural Adaptive: high survivability and adaptive cluster growth
          if (isAlive && (neighbors === 2 || neighbors === 3 || neighbors === 4)) {
            nextGrid[r][c] = 1;
          } else if (!isAlive && (neighbors === 3 || neighbors === 5)) {
            nextGrid[r][c] = 1;
          }
        } else if (mode === 'web4_consensus') {
          // Web 4.0 Peer Mesh Consensus: cell state becomes the majority of its neighborhood
          if (neighbors >= 4) {
            nextGrid[r][c] = 1;
          } else if (neighbors <= 1) {
            nextGrid[r][c] = 0;
          } else {
            nextGrid[r][c] = currentGrid[r][c];
          }
        }
      }
    }

    const nextGen = generationRef.current + 1;
    setGrid(nextGrid);
    updateStats(nextGrid, nextGen);
  }, []);

  function updateStats(g: number[][], gen: number) {
    let count = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (g[r][c]) count++;
      }
    }
    const total = ROWS * COLS;
    const ratio = count / total;
    // Calculate Shannon-like pseudo entropy
    const p1 = Math.max(1e-5, ratio);
    const p0 = Math.max(1e-5, 1 - ratio);
    const entropy = -(p1 * Math.log2(p1) + p0 * Math.log2(p0));

    // Generate mock hash state derived from grid pattern
    const hash =
      '0x' +
      (Math.abs(count * 7919 + gen * 104729) % 0xffffffff)
        .toString(16)
        .padStart(8, '0') +
      '...' +
      (gen % 9999).toString().padStart(4, '0');

    setStats({
      generation: gen,
      population: count,
      liveRatio: ratio * 100,
      entropyIndex: Number(entropy.toFixed(3)),
      hashState: hash,
      isOscillating: false,
    });
  }

  // Animation Loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        computeNextGeneration();
      }, speedMs);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, speedMs, computeNextGeneration]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellWidth = canvas.width / COLS;
    const cellHeight = canvas.height / ROWS;

    // Dark grid background
    ctx.fillStyle = '#020617'; // slate-950
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid lines
    ctx.strokeStyle = '#0f172a'; // slate-900
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellHeight);
      ctx.lineTo(canvas.width, r * cellHeight);
      ctx.stroke();
    }
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellWidth, 0);
      ctx.lineTo(c * cellWidth, canvas.height);
      ctx.stroke();
    }

    // Draw living cells with neon quantum gradients
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c] === 1) {
          const x = c * cellWidth;
          const y = r * cellHeight;

          // Hue shifts subtly across coordinates
          const hue = ((c / COLS) * 80 + (r / ROWS) * 60 + 170) % 360;
          ctx.fillStyle = `hsl(${hue}, 90%, 55%)`;
          ctx.shadowColor = `hsl(${hue}, 90%, 50%)`;
          ctx.shadowBlur = 4;

          // Draw rounded cell rect
          ctx.fillRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2);
          ctx.shadowBlur = 0; // reset blur
        }
      }
    }
  }, [grid]);

  // Interactive mouse click/drag to toggle cells on canvas
  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const c = Math.floor((x / rect.width) * COLS);
    const r = Math.floor((y / rect.height) * ROWS);

    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        next[r][c] = next[r][c] ? 0 : 1;
        updateStats(next, stats.generation);
        return next;
      });
    }
  };

  const handleBroadcast = () => {
    setBroadcastLog(
      `State #${stats.generation} (Population: ${stats.population}) anchored to Sui Object ID: 0xqsui_cell_${Math.random()
        .toString(16)
        .slice(2, 10)} via Parallel DAG Pipeline.`
    );
    setTimeout(() => setBroadcastLog(null), 5000);
  };

  return (
    <section id="automaton" className="py-20 border-t border-slate-900 bg-slate-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-900/40 px-3 py-1 rounded-full">
            <Dna className="w-3.5 h-3.5 text-purple-400" />
            <span>Web 4.0 Artificial Life & Quantum Entropy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Conway AI Cellular Automaton
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Experience discrete dynamical emergent complexity. QSUI embeds Conway's mathematical cellular automaton to generate verifiable, non-deterministic quantum entropy on the Sui blockchain DAG.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Canvas + Main Player Controls */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="font-mono text-xs font-bold text-slate-200">
                  Gen: #{stats.generation.toLocaleString()}
                </span>
                <span className="text-slate-600">|</span>
                <span className="font-mono text-xs text-cyan-300">
                  Cells: {stats.population.toLocaleString()} ({stats.liveRatio.toFixed(1)}%)
                </span>
              </div>

              {/* Rule Mode Selector */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
                {(
                  [
                    { id: 'conway', label: 'Classical B3/S23' },
                    { id: 'quantum_entangled', label: 'Quantum Entangled' },
                    { id: 'neural_adaptive', label: 'Neural Adaptive' },
                    { id: 'web4_consensus', label: 'Web 4.0 Mesh' },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    id={`rule-mode-${mode.id}`}
                    onClick={() => setRuleMode(mode.id)}
                    className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                      ruleMode === mode.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Screen */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group">
              <canvas
                ref={canvasRef}
                width={840}
                height={480}
                onMouseDown={(e) => {
                  setIsDrawing(true);
                  handleCanvasInteraction(e);
                }}
                onMouseMove={(e) => {
                  if (isDrawing) handleCanvasInteraction(e);
                }}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
                className="w-full h-[320px] sm:h-[400px] cursor-crosshair block"
              />
              <div className="absolute bottom-2 right-3 text-[10px] text-slate-500 font-mono bg-slate-950/80 px-2 py-1 rounded border border-slate-900 pointer-events-none">
                Click/Drag canvas to paint cells
              </div>
            </div>

            {/* Execution Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2">
                <button
                  id="automaton-play-btn"
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                    isRunning
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Start Automaton</span>
                    </>
                  )}
                </button>

                <button
                  id="automaton-step-btn"
                  onClick={computeNextGeneration}
                  disabled={isRunning}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
                  title="Single Step"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Step</span>
                </button>

                <button
                  id="automaton-clear-btn"
                  onClick={handleClear}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                  title="Clear Grid"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>

                <button
                  id="automaton-random-btn"
                  onClick={handleRandomize}
                  className="px-3.5 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 text-xs font-semibold border border-purple-800/40 flex items-center gap-1.5 transition cursor-pointer"
                  title="Randomize Matrix"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Random Seed</span>
                </button>
              </div>

              {/* Speed Slider */}
              <div className="flex items-center gap-3 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Speed:</span>
                <input
                  type="range"
                  id="automaton-speed-slider"
                  min="20"
                  max="300"
                  step="10"
                  value={speedMs}
                  onChange={(e) => setSpeedMs(Number(e.target.value))}
                  className="w-24 accent-cyan-400 h-1.5 bg-slate-850 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] font-mono text-cyan-300 w-10 text-right">{speedMs}ms</span>
              </div>
            </div>

            {/* Broadcast Action Notification */}
            {broadcastLog && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{broadcastLog}</span>
              </div>
            )}
          </div>

          {/* Right Column: Preset Library, Mathematical Telemetry & DAG Anchor */}
          <div className="lg:col-span-4 space-y-6">
            {/* Presets Library */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Pattern Library</span>
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">5 Presets</span>
              </div>

              <div className="grid gap-2">
                {CONWAY_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    id={`preset-${preset.id}`}
                    onClick={() => loadPreset(preset.id)}
                    className="w-full p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-850 hover:border-cyan-500/50 text-left transition group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-300 transition">
                        {preset.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {preset.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time Math & Consensus Telemetry HUD */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Automaton Telemetry</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <span className="text-slate-400">Quantum Shannon Entropy</span>
                  <span className="font-mono font-bold text-cyan-300">{stats.entropyIndex} bits/cell</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <span className="text-slate-400">Current Grid Hash</span>
                  <span className="font-mono text-purple-300 text-[11px] truncate max-w-[150px]">
                    {stats.hashState}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <span className="text-slate-400">Active Rule Set</span>
                  <span className="font-mono text-emerald-400 font-semibold uppercase text-[10px]">
                    {ruleMode.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <button
                id="broadcast-automaton-btn"
                onClick={handleBroadcast}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-slate-950 font-bold text-xs py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-slate-950" />
                <span>Anchor Entropy to Sui DAG</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
