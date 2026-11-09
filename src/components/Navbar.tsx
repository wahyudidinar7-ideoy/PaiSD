/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Clock, BookHeart, Settings, Timer, Sparkles } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'timeline' | 'journal' | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  progressPercent: number;
  onOpenQuickTimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progressPercent,
  onOpenQuickTimer
}) => {
  return (
    <>
      {/* Top Header Bar for Desktop and Tablet */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark (Single visual unit) */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-amber-300 shadow-sm shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-emerald-950 flex items-center gap-1.5 leading-none">
                <span>WAKTU BERKAH</span>
              </div>
              <span className="text-[10px] text-amber-800 font-medium tracking-wide">
                Ala Rasulullah SAW
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F2ECE1] p-1 rounded-xl border border-[#E3DCB] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Timeline Sunnah</span>
            </button>

            <button
              onClick={() => setActiveTab('journal')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'journal'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              <BookHeart className="w-4 h-4" />
              <span>Jurnal & Muhasabah</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan & Kebiasaan</span>
            </button>
          </nav>

          {/* Right Action / Progress & Quick Timer */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80">
              <span className="text-xs text-emerald-800 font-medium">Sunnah Hari Ini:</span>
              <span className="font-mono text-xs font-bold text-emerald-900 tabular-nums">
                {progressPercent}%
              </span>
            </div>

            <button
              onClick={onOpenQuickTimer}
              className="px-3 py-2 text-xs font-semibold text-emerald-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
              title="Buka Timer Sunnah & Fokus"
            >
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">Timer Fokus</span>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Tab Bar (Ergonomic Thumb-Zone Navigation) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E1D3] shadow-lg">
        <div className="grid grid-cols-4 items-center h-16 px-1 max-w-md mx-auto">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'dashboard' ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors relative ${
              activeTab === 'timeline' ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className={`w-5 h-5 ${activeTab === 'timeline' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">Timeline</span>
            {progressPercent > 0 && (
              <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-emerald-600" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('journal')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'journal' ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookHeart className={`w-5 h-5 ${activeTab === 'journal' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">Muhasabah</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'settings' ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">Pengaturan</span>
          </button>

        </div>
      </div>
    </>
  );
};
