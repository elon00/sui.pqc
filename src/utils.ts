/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulationLog } from './types';

export function formatAddress(address: string | null): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatNumberCompact(num: number): string {
  if (num >= 1e15) return (num / 1e15).toFixed(2) + ' Quadrillion';
  if (num >= 1e12) return (num / 1e12).toFixed(2) + ' Trillion';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + ' Billion';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + ' Million';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toLocaleString();
}

export function generateMockAddress(isPqc: boolean): string {
  const chars = '0123456789abcdef';
  let addr = '0x';
  if (isPqc) {
    addr += 'qsui';
  }
  for (let i = 0; i < (isPqc ? 58 : 62); i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
}

export interface SecurityFact {
  title: string;
  description: string;
  category: string;
}

export const SECURITY_FACTS: SecurityFact[] = [
  {
    title: "Shor's Algorithm Threat",
    description: "Peter Shor's algorithm solves discrete logarithms and prime factorization in polynomial time, rendering RSA, ECDSA (secp256k1), and Ed25519 vulnerable once ~4,000 logical qubits are available.",
    category: "Quantum Mechanics"
  },
  {
    title: "ML-DSA / Crystals-Dilithium",
    description: "NIST's primary standardized post-quantum digital signature algorithm. Based on Module Learning With Errors (M-LWE) in high-dimensional lattices (n=1024), offering impenetrable security against quantum adversaries.",
    category: "PQC Standard"
  },
  {
    title: "Web 4.0 Autonomous Intelligence",
    description: "Web 4.0 introduces symbiotic decentralization where autonomous AI agents communicate over quantum-secure peer-to-peer DAG consensus networks like Sui.",
    category: "Web 4.0"
  },
  {
    title: "1,000 Trillion Tokenomics",
    description: "QSUI's 1,000 Trillion (1 Quadrillion) supply provides ultra-low gas micro-denominations for high-frequency AI agent transactions and global liquidity bootstrapping.",
    category: "Token Economics"
  }
];

export function getShorAttackLogs(address: string, isPqc: boolean): Omit<SimulationLog, 'id' | 'timestamp'>[] {
  const formatted = formatAddress(address);
  if (isPqc) {
    return [
      { message: `[INIT] Spawning Shor's Algorithm Vector Factoring Matrix against ${formatted}`, type: 'info' },
      { message: '[SCAN] Probing Sui DAG state object for public key parameters...', type: 'info' },
      { message: '[IDENTIFIED] Target uses QSUI ML-DSA (Crystals-Dilithium-1024) signature layer', type: 'success' },
      { message: '[LATTICE] Constructing Shortest Vector Problem (SVP) in 1024-dimensional module space...', type: 'info' },
      { message: '[QUANTUM CIRCUIT] Allocating 131,072 simulated superconducting qubits for Fourier transform...', type: 'warning' },
      { message: '[CALCULATION] Evaluating quantum period finding on non-abelian lattice structure...', type: 'warning' },
      { message: '[FAILURE] Lattice reduction failed: Vector space possesses non-periodic algebraic geometry', type: 'error' },
      { message: '[QSUI LATTICE ACTIVE] Quantum attack completely neutralized. 0 bits leaked. QSUI defense coefficient 100%.', type: 'success' }
    ];
  } else {
    return [
      { message: `[INIT] Spawning Shor's Algorithm against Legacy Classical ECDSA address: ${formatted}`, type: 'info' },
      { message: '[SCAN] Intercepting secp256k1 public curve coordinates from Sui mempool...', type: 'info' },
      { message: '[QUANTUM SUPERPOSITION] Initializing 2,048 logical qubits with Hadamard gates...', type: 'warning' },
      { message: '[FOURIER TRANSFORM] Computing discrete logarithm period r on elliptic curve order...', type: 'warning' },
      { message: '[SUCCESS] Period r isolated: r = 0x7f4e92a01bc894...', type: 'success' },
      { message: '[BREACH] Private key mathematically derived in 1.84 seconds! Quantum collision achieved.', type: 'error' },
      { message: '[CRITICAL COMPROMISE] Wallet signing authority hijacked. Funds drained in simulation.', type: 'error' }
    ];
  }
}

// Preset library for Conway Automaton
export const CONWAY_PRESETS = [
  {
    id: 'gosper_gun',
    name: 'Gosper Glider Gun',
    category: 'guns' as const,
    description: 'The first known gun in Conway Life. Continuously produces gliders that travel infinitely across the canvas.',
    generate: (rows: number, cols: number): number[][] => {
      const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
      const gunCoords = [
        [5, 1], [5, 2], [6, 1], [6, 2],
        [5, 11], [6, 11], [7, 11], [4, 12], [8, 12], [3, 13], [9, 13], [3, 14], [9, 14], [6, 15], [4, 16], [8, 16], [5, 17], [6, 17], [7, 17], [6, 18],
        [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25],
        [3, 35], [4, 35], [3, 36], [4, 36]
      ];
      const startR = Math.floor(rows / 2) - 5;
      const startC = Math.floor(cols / 2) - 18;
      gunCoords.forEach(([r, c]) => {
        if (startR + r >= 0 && startR + r < rows && startC + c >= 0 && startC + c < cols) {
          grid[startR + r][startC + c] = 1;
        }
      });
      return grid;
    }
  },
  {
    id: 'quantum_superposition',
    name: 'Quantum Lattice Superposition',
    category: 'quantum_structures' as const,
    description: 'Symmetric high-density lattice crystal seed generating emergent fractal self-replication.',
    generate: (rows: number, cols: number): number[][] => {
      const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
      const cr = Math.floor(rows / 2);
      const cc = Math.floor(cols / 2);
      for (let r = cr - 8; r <= cr + 8; r += 2) {
        for (let c = cc - 8; c <= cc + 8; c += 2) {
          if (Math.abs(r - cr) + Math.abs(c - cc) <= 12) {
            grid[r][c] = 1;
            grid[r][c + 1] = 1;
          }
        }
      }
      return grid;
    }
  },
  {
    id: 'glider_fleet',
    name: 'Glider Armada',
    category: 'spaceships' as const,
    description: 'A synchronized fleet of diagonal gliders traveling across the decentralized space grid.',
    generate: (rows: number, cols: number): number[][] => {
      const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
      const offsets = [[4, 4], [4, 20], [16, 8], [16, 28], [28, 12]];
      offsets.forEach(([or, oc]) => {
        const glider = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
        glider.forEach(([dr, dc]) => {
          if (or + dr < rows && oc + dc < cols) {
            grid[or + dr][oc + dc] = 1;
          }
        });
      });
      return grid;
    }
  },
  {
    id: 'pulsar_oscillator',
    name: 'Pulsar Oscillator (Period 3)',
    category: 'oscillators' as const,
    description: 'A large period-3 oscillator that expands and contracts rhythmically like a quantum pacemaker.',
    generate: (rows: number, cols: number): number[][] => {
      const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
      const cr = Math.floor(rows / 2);
      const cc = Math.floor(cols / 2);
      const relPoints = [
        [-6, -4], [-6, -3], [-6, -2], [-6, 2], [-6, 3], [-6, 4],
        [-4, -6], [-3, -6], [-2, -6], [-4, -1], [-3, -1], [-2, -1], [-4, 1], [-3, 1], [-2, 1], [-4, 6], [-3, 6], [-2, 6],
        [-1, -4], [-1, -3], [-1, -2], [-1, 2], [-1, 3], [-1, 4],
        [1, -4], [1, -3], [1, -2], [1, 2], [1, 3], [1, 4],
        [4, -6], [3, -6], [2, -6], [4, -1], [3, -1], [2, -1], [4, 1], [3, 1], [2, 1], [4, 6], [3, 6], [2, 6],
        [6, -4], [6, -3], [6, -2], [6, 2], [6, 3], [6, 4]
      ];
      relPoints.forEach(([dr, dc]) => {
        if (cr + dr >= 0 && cr + dr < rows && cc + dc >= 0 && cc + dc < cols) {
          grid[cr + dr][cc + dc] = 1;
        }
      });
      return grid;
    }
  },
  {
    id: 'acorn_methuselah',
    name: 'Acorn Methuselah (5206 Gens)',
    category: 'methuselahs' as const,
    description: 'A 7-cell seed that evolves dynamically for 5,206 generations, creating 13 gliders and rich organic growth.',
    generate: (rows: number, cols: number): number[][] => {
      const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
      const cr = Math.floor(rows / 2);
      const cc = Math.floor(cols / 2) - 3;
      const points = [[0, 1], [1, 3], [2, 0], [2, 1], [2, 4], [2, 5], [2, 6]];
      points.forEach(([dr, dc]) => {
        if (cr + dr >= 0 && cr + dr < rows && cc + dc >= 0 && cc + dc < cols) {
          grid[cr + dr][cc + dc] = 1;
        }
      });
      return grid;
    }
  }
];
