/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Timer,
  BookOpen,
  Plus,
  Sparkles,
  Search
} from 'lucide-react';
import { SunnahActivity } from '../types.ts';

interface TimelineViewProps {
  activities: SunnahActivity[];
  completedIds: string[];
  onToggleComplete: (id: string) => void;
  onOpenDetail: (activity: SunnahActivity) => void;
  onOpenTimer: (mins: number, title: string) => void;
  onOpenAddCustom: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  activities,
  completedIds,
  onToggleComplete,
  onOpenDetail,
  onOpenTimer,
  onOpenAddCustom
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort activities chronologically by hour & minute
  const sortedActivities = [...activities].sort((a, b) => {
    return (a.hour * 60 + a.minute) - (b.hour * 60 + b.minute);
  });

  const filteredActivities = sortedActivities.filter(act => {
    const matchesCategory = categoryFilter === 'semua' || act.category === categoryFilter;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.timeStr.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const total = activities.length;
  const completedCount = completedIds.length;
  const progressPercent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner & Stats */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D3] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Timeline 1 Hari Penuh Meneladani Rasulullah SAW</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Jadwal Harian Sunnah & Teratur
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Dari bangun malam hingga tidur kembali, dilengkapi doa, tuntunan sunnah, dan penyesuaian modern bebas distraksi.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-500 font-medium">Progress Hari Ini</span>
            <div className="flex items-baseline gap-1 font-mono font-bold text-emerald-900 text-lg">
              <span>{completedCount}</span>
              <span className="text-slate-400">/</span>
              <span>{total}</span>
              <span className="text-xs text-emerald-600 font-sans ml-1">({progressPercent}%)</span>
            </div>
          </div>

          <button
            onClick={onOpenAddCustom}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Aktivitas</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3 border border-[#E8E1D3] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Filters (Clean functional buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'semua', label: 'Semua (12+)' },
            { id: 'ibadah', label: 'Ibadah' },
            { id: 'produktivitas', label: 'Produktivitas' },
            { id: 'keluarga', label: 'Keluarga' },
            { id: 'istirahat', label: 'Istirahat' },
            { id: 'muhasabah', label: 'Muhasabah' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari aktivitas atau doa..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-700 before:via-amber-400 before:to-emerald-900">
        
        {filteredActivities.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
            Tidak ada aktivitas yang sesuai dengan filter.
          </div>
        ) : (
          filteredActivities.map((act) => {
            const isCompleted = completedIds.includes(act.id);

            return (
              <div key={act.id} className="relative group">
                
                {/* Timeline node icon */}
                <button
                  onClick={() => onToggleComplete(act.id)}
                  className={`absolute -left-6 sm:-left-8 top-5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 scale-110'
                      : 'bg-white border-2 border-slate-300 text-slate-400 hover:border-emerald-600 group-hover:scale-105'
                  }`}
                  title={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 fill-current stroke-white" />
                  ) : (
                    <Circle className="w-2.5 h-2.5 fill-current opacity-40" />
                  )}
                </button>

                {/* Card Container */}
                <div
                  className={`rounded-3xl p-5 sm:p-6 transition-all border ${
                    isCompleted
                      ? 'bg-[#F4F9F5] border-emerald-300/80 shadow-sm'
                      : 'bg-white border-[#E8E1D3] hover:border-emerald-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    
                    {/* Time & Badges */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-900 text-amber-300 font-mono text-xs font-bold tracking-tight">
                          {act.timeStr} WIB
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider capitalize">
                          {act.category}
                        </span>
                        {act.isCustom && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold">
                            Aktivitas Saya
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Selesai
                          </span>
                        )}
                      </div>

                      <h3 className={`text-base sm:text-lg font-bold tracking-tight text-slate-900 ${isCompleted ? 'text-emerald-950 line-through opacity-80' : ''}`}>
                        {act.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">
                        {act.subtitle}
                      </p>
                    </div>

                    {/* Quick Action Button in card header */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {act.recommendedDurationMinutes && (
                        <button
                          onClick={() => onOpenTimer(act.recommendedDurationMinutes || 15, act.title)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                          title="Buka Timer Sesi"
                        >
                          <Timer className="w-3.5 h-3.5" />
                          <span>{act.recommendedDurationMinutes} mnt</span>
                        </button>
                      )}

                      <button
                        onClick={() => onToggleComplete(act.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isCompleted ? 'Selesai' : 'Tandai Selesai'}</span>
                      </button>
                    </div>

                  </div>

                  {/* Sunnah Description */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                    {act.sunnahDescription}
                  </p>

                  {/* Modern Adjustment Box */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950 mb-3 space-y-1">
                    <span className="font-bold flex items-center gap-1 text-amber-900">
                      📱 Penyesuaian Modern:
                    </span>
                    <p className="leading-relaxed text-amber-900/90">
                      {act.modernAdjustment}
                    </p>
                  </div>

                  {/* Quick prayer preview & detail trigger */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                    {act.arabicPrayer ? (
                      <div className="text-xs text-emerald-800 italic truncate max-w-xs sm:max-w-md">
                        Doa: {act.latinPrayer || act.arabicPrayer}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">Jaga niat ikhlas lillahi ta'ala</span>
                    )}

                    <button
                      onClick={() => onOpenDetail(act)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-950 flex items-center gap-1 hover:underline"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Lihat Doa & Dalil</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}

      </div>

    </div>
  );
};
