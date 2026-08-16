/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { WalletState } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TokenLaunchpad from './components/TokenLaunchpad';
import ConwayAutomaton from './components/ConwayAutomaton';
import AiAgentChatbot from './components/AiAgentChatbot';
import SuiTestnetDeployment from './components/SuiTestnetDeployment';
import QuantumSimulator from './components/QuantumSimulator';
import TokenomicsAndMarketing from './components/TokenomicsAndMarketing';
import LawsAndSecurities from './components/LawsAndSecurities';
import About from './components/About';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import WalletModal from './components/WalletModal';

export default function App() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: true, // Pre-connected for smooth immediate demonstration
    address: '0xqsui89fa41c0b32f87d412e87a32904c99e14a2b',
    suiBalance: 485.5,
    qsuiBalance: 50_000_000, // 50 Million QSUI
    provider: 'Sui Wallet',
    isPqc: true,
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleConnectWallet = (provider: string, address: string, isPqc: boolean) => {
    setWallet({
      isConnected: true,
      address,
      suiBalance: 500,
      qsuiBalance: 10_000_000,
      provider,
      isPqc,
    });
  };

  const handleDisconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      suiBalance: 0,
      qsuiBalance: 0,
      provider: null,
      isPqc: false,
    });
  };

  const handleAddTokens = (amount: number) => {
    setWallet((prev) => ({
      ...prev,
      qsuiBalance: prev.qsuiBalance + amount,
    }));
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top sticky Navbar */}
      <Navbar
        wallet={wallet}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onConnectClick={() => setIsWalletModalOpen(true)}
        onDisconnect={handleDisconnectWallet}
        onAddTokens={handleAddTokens}
      />

      {/* Main Content Sections */}
      <main className="space-y-0">
        <Hero
          wallet={wallet}
          onConnectClick={() => setIsWalletModalOpen(true)}
          onNavigate={handleNavigate}
        />

        <TokenLaunchpad
          wallet={wallet}
          onConnectClick={() => setIsWalletModalOpen(true)}
          onAddTokens={handleAddTokens}
        />

        <ConwayAutomaton />

        <AiAgentChatbot />

        <SuiTestnetDeployment
          wallet={wallet}
          onConnectClick={() => setIsWalletModalOpen(true)}
        />

        <QuantumSimulator />

        <TokenomicsAndMarketing />

        <LawsAndSecurities />

        <About />

        <Roadmap />
      </main>

      {/* Comprehensive Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Wallet Connection Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnectWallet}
      />
    </div>
  );
}
