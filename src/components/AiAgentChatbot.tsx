/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, Trash2, Copy, Check, ShieldCheck, Scale, Dna, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AgentPersona, ChatMessage } from '../types';

export default function AiAgentChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `### 🤖 Welcome to the QSUI Autonomous Agent Network
I am the **QSUI Autonomous Sentinel**, your dedicated AI advisor for Post-Quantum Cryptography, Web 4.0 architecture, and token dynamics on the Sui blockchain.

**How can I assist you today?**
- 🛡️ *Analyze Shor's algorithm threat against classical ECDSA*
- ⚖️ *Audit QSUI under the US SEC Howey Test and EU MiCA regulations*
- 🧬 *Explain Conway AI Cellular Automaton quantum entropy integration*
- 📈 *Review the 1,000 Trillion QSUI global marketing and CEX listing roadmap*`,
      timestamp: new Date().toLocaleTimeString(),
      persona: 'sentinel',
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedPersona, setSelectedPersona] = useState<AgentPersona>('sentinel');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const personas = [
    {
      id: 'sentinel' as AgentPersona,
      name: 'Quantum Sentinel',
      role: 'Chief PQC & Web 4.0 Architect',
      icon: Bot,
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30',
      description: 'Expert on Crystals-Dilithium, Kyber lattice cryptography, and Sui DAG security.',
    },
    {
      id: 'legal' as AgentPersona,
      name: 'Legal & Securities Officer',
      role: 'Howey Test & MiCA Auditor',
      icon: Scale,
      color: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
      description: 'Audits securities law classification, Howey prongs, and formal verification tests.',
    },
    {
      id: 'automaton' as AgentPersona,
      name: 'Conway AI Cybernetician',
      role: 'Artificial Life & Cellular Dynamics',
      icon: Dna,
      color: 'text-purple-400 border-purple-500/40 bg-purple-950/30',
      description: 'Deep mathematical analysis of Conway rules, quantum entropy, and emergence.',
    },
    {
      id: 'marketing' as AgentPersona,
      name: 'Global CMO Strategist',
      role: 'Tokenomics & CEX Listing Growth',
      icon: TrendingUp,
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30',
      description: 'Expert on 1,000T tokenomics, viral community flywheels, and Tier-1 CEX roadmaps.',
    },
  ];

  const suggestionPrompts: Record<AgentPersona, string[]> = {
    sentinel: [
      'Why is Shor’s algorithm a critical threat to Bitcoin and Ethereum?',
      'How does Crystals-Dilithium compare with classical Ed25519 on Sui?',
      'Explain how Web 4.0 AI agents communicate securely with post-quantum keys.',
    ],
    legal: [
      'Perform a complete Howey Test analysis on the QSUI token.',
      'How does QSUI comply with the European Union MiCA regulations?',
      'What formal verification tests were executed on QSUI Move smart contracts?',
    ],
    automaton: [
      'How does Conway’s Game of Life generate quantum entropy for QSUI keys?',
      'Explain the difference between Classical B3/S23 and Quantum Entangled rules.',
      'Can cellular automata achieve Turing-complete biological computing?',
    ],
    marketing: [
      'Why did QSUI choose a 1,000 Trillion total supply model?',
      'Outline the 4-phase viral marketing flywheel for QSUI.',
      'What are the liquidity requirements for Tier-1 CEX listings like Binance and OKX?',
    ],
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          persona: selectedPersona,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: data.response || 'No response returned from the agent.',
        timestamp: new Date().toLocaleTimeString(),
        persona: selectedPersona,
        isSimulated: data.isSimulated,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'assistant',
          content:
            '⚠️ **Agent Communication Notice**: The autonomous network is processing your request. If Gemini API credentials are required, please verify your server configuration.',
          timestamp: new Date().toLocaleTimeString(),
          persona: selectedPersona,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Session refreshed. Active persona: **${
          personas.find((p) => p.id === selectedPersona)?.name
        }**. Ask me any question regarding QSUI.`,
        timestamp: new Date().toLocaleTimeString(),
        persona: selectedPersona,
      },
    ]);
  };

  const currentPersonaData = personas.find((p) => p.id === selectedPersona) || personas[0];

  return (
    <section id="chatbot" className="py-20 border-t border-slate-900 bg-slate-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Server-Side Gemini 3.7 Flash Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            QSUI Autonomous AI Agent
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engage with specialized agent personas trained on post-quantum lattice mathematics, Howey test legal classification, cellular automaton complexity, and global marketing economics.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Persona Selector & Quick Prompt Chips */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Select Expert Persona</span>
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">4 Specializations</span>
              </div>

              <div className="grid gap-2.5">
                {personas.map((p) => {
                  const isSelected = selectedPersona === p.id;
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      id={`persona-${p.id}`}
                      onClick={() => setSelectedPersona(p.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? `${p.color} border-current shadow-md`
                          : 'border-slate-800 bg-slate-950/40 hover:bg-slate-850 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-slate-200">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{p.role}</div>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{p.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
              <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Recommended Queries</span>
              </h4>

              <div className="space-y-2">
                {suggestionPrompts[selectedPersona].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left text-xs p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-cyan-500/40 text-slate-300 transition line-clamp-2 leading-relaxed cursor-pointer font-medium"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chat Console Display */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col h-[600px] shadow-2xl">
            {/* Chat Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <currentPersonaData.icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white">{currentPersonaData.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{currentPersonaData.role}</div>
                </div>
              </div>

              <button
                id="clear-chat-btn"
                onClick={handleClearHistory}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Messages Stream */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs leading-relaxed ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 space-y-2 relative group ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-medium shadow-md'
                        : 'bg-slate-950 border border-slate-850 text-slate-300 shadow-inner'
                    }`}
                  >
                    {/* Markdown rendering inside assistant reply */}
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-invert prose-sm max-w-none text-slate-300 text-xs leading-relaxed space-y-2">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}

                    <div className="flex items-center justify-between pt-1 text-[9px] text-slate-500 font-mono">
                      <span>{msg.timestamp}</span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="opacity-0 group-hover:opacity-100 transition p-1 hover:text-slate-200 cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 text-xs justify-start items-center animate-in fade-in">
                  <div className="w-7 h-7 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-300 shrink-0">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl px-4 py-3 text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span>QSUI Agent synthesizing intelligence...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-slate-800 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  id="agent-chat-input"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Ask ${currentPersonaData.name} anything...`}
                  disabled={isLoading}
                  className="flex-1 bg-slate-950 border border-slate-850 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 outline-none transition font-sans"
                />
                <button
                  type="submit"
                  id="agent-chat-send-btn"
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold p-3 rounded-xl transition disabled:opacity-40 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
