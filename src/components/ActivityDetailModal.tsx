/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, CheckCircle2, Clock, BookOpen, Sparkles, Timer } from 'lucide-react';
import { SunnahActivity } from '../types.ts';

interface ActivityDetailModalProps {
  activity: SunnahActivity | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onOpenTimer: (mins: number, title: string) => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
  onOpenTimer
}) => {
  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-emerald-900/10 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-emerald-200 hover:text-white rounded-full hover:bg-emerald-700/50 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Pukul {activity.timeStr} WIB</span>
            <span>·</span>
            <span className="capitalize">{activity.category}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">
            {activity.title}
          </h2>
          <p className="text-sm text-emerald-100">{activity.subtitle}</p>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Teladan Rasulullah SAW */}
          <div className="p-4 rounded-2xl bg-[#F7F4EC] border border-amber-200/60 text-slate-800">
            <div className="flex items-center gap-2 font-semibold text-amber-900 text-sm mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Teladan Sunnah Rasulullah SAW:</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">{activity.prophetExample}</p>
            <p className="text-xs text-slate-600 mt-2 italic font-serif">"{activity.sunnahDescription}"</p>
          </div>

          {/* Doa / Dzikir / Dalil Box (Amiri Arabic Typography) */}
          {activity.arabicPrayer && (
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" /> Doa / Dzikir Sunnah
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Arab & Arti
                </span>
              </div>

              {/* Arabic text with beautiful Amiri font */}
              <div className="font-arabic text-2xl md:text-3xl text-right text-emerald-950 leading-loose py-2">
                {activity.arabicPrayer}
              </div>

              {activity.latinPrayer && (
                <div className="text-xs md:text-sm text-slate-600 italic bg-white/70 p-3 rounded-xl border border-emerald-100/50">
                  <span className="font-semibold text-emerald-900 not-italic block mb-0.5">Transliterasi Latin:</span>
                  "{activity.latinPrayer}"
                </div>
              )}

              {activity.prayerMeaning && (
                <div className="text-xs md:text-sm text-slate-700">
                  <span className="font-semibold text-emerald-900 block mb-0.5">Artinya:</span>
                  {activity.prayerMeaning}
                </div>
              )}
            </div>
          )}

          {/* Hadith Dalil & Source */}
          {activity.hadithDalil && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 text-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Dalil Landasan Hadits:
              </span>
              <p className="italic text-slate-800 font-serif">"{activity.hadithDalil}"</p>
              {activity.hadithSource && (
                <span className="text-xs text-emerald-700 font-medium block mt-1">
                  — {activity.hadithSource}
                </span>
              )}
            </div>
          )}

          {/* Penyesuaian Modern (Tips Kontekstual Era Digital) */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1">
              📱 Penyesuaian Modern & Tips Anti-Distraksi:
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">
              {activity.modernAdjustment}
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          {activity.recommendedDurationMinutes ? (
            <button
              onClick={() => {
                onClose();
                onOpenTimer(activity.recommendedDurationMinutes || 15, activity.title);
              }}
              className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors flex items-center gap-1.5"
            >
              <Timer className="w-4 h-4" />
              <span>{activity.timerLabel || 'Mulai Timer'}</span>
            </button>
          ) : <div />}

          <button
            onClick={() => {
              onToggleComplete(activity.id);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-700' : 'text-white'}`} />
            <span>{isCompleted ? 'Sudah Selesai (Klik Batal)' : 'Tandai Selesai'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
