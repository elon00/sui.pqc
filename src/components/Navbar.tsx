/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShieldCheck, Coins, LogOut, ChevronDown, Menu, X, Wallet, Rocket, Dna, Bot, Shield, FileCheck, Layers, Server } from 'lucide-react';
import { WalletState } from '../types';
import { formatAddress, formatNumberCompact } from '../utils';

interface NavbarProps {
  wallet: WalletState;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onConnectClick: () => void;
  onDisconnect: () => void;
  onAddTokens: (amount: number) => void;
}

export default function Navbar({
  wallet,
  activeSection,
  onNavigate,
  onConnectClick,
  onDisconnect,
  onAddTokens,
}: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleFaucet = () => {
    // Give 10 Million QSUI from the testnet faucet
    onAddTokens(10_000_000);
    setDropdownOpen(false);
  };

  const navLinks = [
    { id: 'launchpad', label: 'Launchpad', icon: Rocket, badge: 'Live IDO' },
    { id: 'automaton', label: 'Conway AI', icon: Dna, badge: 'Web 4.0' },
    { id: 'chatbot', label: 'AI Agent', icon: Bot, badge: 'Gemini' },
    { id: 'sui-deployment', label: 'Sui Testnet', icon: Server, badge: 'Move' },
    { id: 'simulator', label: 'PQC Sandbox', icon: Shield },
    { id: 'tokenomics', label: '1,000T Economy', icon: Layers },
    { id: 'laws-testing', label: 'Laws & Testing', icon: FileCheck, badge: 'Passed' },
    { id: 'roadmap', label: 'Roadmap' },
  ];

  return (
    <header className="border-b border-slate-900 sticky top-0 bg-slate-950/90 backdrop-blur-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo and Branding */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-purple-600 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30">
            Q
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="flex flex-col text-left"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 font-sans">
                Quantum Sui
              </span>
              <span className="text-[10px] font-extrabold font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/60">
                QSUI
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
              Post-Quantum Web 4.0 Protocol
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-slate-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-1.5 transition py-1 px-2 rounded-lg cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/30 font-bold border border-cyan-900/40'
                    : 'hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {link.icon && <link.icon className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Wallet Status */}
        <div className="hidden md:flex items-center gap-3 relative shrink-0">
          {wallet.isConnected ? (
            <div className="relative">
              <button
                id="wallet-dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 transition shadow-inner"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="font-mono text-cyan-300">{formatAddress(wallet.address)}</span>
                <span className="text-slate-500 text-[10px]">|</span>
                <span className="text-emerald-400 font-mono text-[11px] font-bold">
                  {formatNumberCompact(wallet.qsuiBalance)} QSUI
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {dropdownOpen && (
                <div
                  id="wallet-dropdown-menu"
                  className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl text-slate-300 divide-y divide-slate-800/60 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="pb-3 text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                        Connected: {wallet.provider}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900/40 font-mono">
                        {wallet.isPqc ? 'ML-DSA Quantum Safe' : 'ECDSA Legacy'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-200 font-medium py-1">
                      <span className="text-slate-400">Sui Gas Balance</span>
                      <span className="font-mono text-white font-bold">{wallet.suiBalance.toLocaleString()} SUI</span>
                    </div>
                    <div className="flex items-center justify-between text-cyan-400 font-bold py-1">
                      <span>QSUI Balance</span>
                      <span className="font-mono text-sm">{wallet.qsuiBalance.toLocaleString()} QSUI</span>
                    </div>
                  </div>

                  <div className="py-2.5">
                    <button
                      id="claim-faucet-btn"
                      onClick={handleFaucet}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-xs text-left transition font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-cyan-400" />
                        Claim Testnet Faucet
                      </span>
                      <span className="font-mono text-[10px] bg-cyan-900/80 px-1.5 py-0.5 rounded text-cyan-200">
                        +10M QSUI
                      </span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      id="disconnect-wallet-btn"
                      onClick={() => {
                        onDisconnect();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-950/20 text-red-400 hover:text-red-300 text-xs text-left transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Disconnect Wallet
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="connect-wallet-nav-btn"
              onClick={onConnectClick}
              className="bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
            >
              <Wallet className="w-4 h-4 text-slate-950" />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex xl:hidden items-center gap-3">
          {wallet.isConnected && (
            <div className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="font-mono text-[10px] text-cyan-300 font-bold">
                {formatNumberCompact(wallet.qsuiBalance)}
              </span>
            </div>
          )}
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden border-t border-slate-900 bg-slate-950 py-4 px-6 space-y-4 animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto"
        >
          <nav className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/70 border border-slate-850 hover:border-cyan-500/40 text-left transition"
              >
                {link.icon && <link.icon className="w-4 h-4 text-cyan-400 shrink-0" />}
                <span className="truncate">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-900 flex flex-col gap-3">
            {wallet.isConnected ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl text-xs border border-slate-800">
                  <div>
                    <div className="text-slate-500 text-[10px]">QSUI Balance ({wallet.provider})</div>
                    <div className="font-bold text-cyan-300 text-sm mt-0.5">
                      {wallet.qsuiBalance.toLocaleString()} QSUI
                    </div>
                  </div>
                  <button
                    id="mobile-faucet-btn"
                    onClick={handleFaucet}
                    className="bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-800 px-3 py-1.5 rounded-lg font-bold text-xs transition"
                  >
                    +10M Faucet
                  </button>
                </div>
                <button
                  id="mobile-disconnect-btn"
                  onClick={() => {
                    onDisconnect();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-red-950/20 text-red-400 border border-red-900/30 font-semibold text-xs px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <button
                id="mobile-connect-btn"
                onClick={() => {
                  onConnectClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-xs py-3 rounded-xl text-slate-950 transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Wallet className="w-4 h-4 text-slate-950" />
                Connect Sui Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
