/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  suiBalance: number;
  qsuiBalance: number; // 1,000 Trillion economy
  provider: string | null;
  isPqc: boolean;
  stakedAmount?: number;
}

export interface SimulationLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface SecurityStatus {
  isSimulating: boolean;
  progress: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  logs: SimulationLog[];
  victimAddress: string;
  isPqcProtected: boolean;
  hacked: boolean | null;
}

export interface RoadmapStep {
  phase: string;
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  points: string[];
}

// Launchpad Types
export interface LaunchpadTier {
  id: string;
  name: string;
  minCommitSui: number;
  maxCommitSui: number;
  allocationMultiplier: number;
  qsuiPerSui: number;
  badge: string;
  benefits: string[];
  slotsTotal: number;
  slotsClaimed: number;
}

export interface LaunchpadStage {
  id: string;
  name: string;
  status: 'live' | 'upcoming' | 'ended';
  targetRaiseSui: number;
  currentRaiseSui: number;
  totalTokensAllocated: number; // e.g. 100 Trillion QSUI
  tokenPriceSui: number;
  unlockTgePercent: number;
  vestingMonths: number;
  startTime: string;
  endTime: string;
}

// Conway AI Automaton Types
export type AutomatonRuleMode = 'conway' | 'quantum_entangled' | 'neural_adaptive' | 'web4_consensus';

export interface AutomatonPreset {
  id: string;
  name: string;
  category: 'spaceships' | 'oscillators' | 'guns' | 'quantum_structures' | 'methuselahs';
  description: string;
  matrix: number[][];
}

export interface AutomatonStats {
  generation: number;
  population: number;
  liveRatio: number;
  entropyIndex: number;
  hashState: string;
  isOscillating: boolean;
}

// AI Agentic Chatbot Types
export type AgentPersona = 'sentinel' | 'legal' | 'automaton' | 'marketing';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  persona?: AgentPersona;
  isSimulated?: boolean;
}

// Laws, Securities & Testing Types
export interface HoweyTestFactor {
  id: string;
  prong: string;
  question: string;
  assessment: string;
  riskScore: number; // 1 to 10 (1 = low security risk, 10 = high security risk)
  status: 'PASS_UTILITY' | 'NEUTRAL' | 'FLAG_SECURITY';
  rationale: string;
}

export interface SmartContractTest {
  id: string;
  name: string;
  category: 'formal_verification' | 'quantum_fuzzing' | 'move_bytecode' | 'concurrency';
  description: string;
  status: 'passed' | 'running' | 'pending';
  executionTimeMs: number;
  assertionsChecked: number;
  details: string;
}

export interface ComplianceStandard {
  id: string;
  title: string;
  jurisdiction: string;
  status: 'Compliant' | 'Audited' | 'Exempt';
  summary: string;
  keyArticles: string[];
}

// Marketing Strategy Types
export interface MarketingFlywheelStep {
  stage: number;
  title: string;
  subtitle: string;
  kpis: string[];
  tactics: string[];
  budgetAllocation: string;
  status: 'active' | 'scheduled' | 'scaling';
}

export interface CexRoadmapTier {
  tier: string;
  exchanges: string[];
  targetVolume: string;
  timeline: string;
  requirements: string[];
  status: 'in_review' | 'technical_integration' | 'approved' | 'target';
}
