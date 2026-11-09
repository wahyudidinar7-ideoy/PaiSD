/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  BookHeart,
  Quote,
  Flame,
  ArrowRight
} from 'lucide-react';
import { SunnahActivity, JournalEntry } from '../types.ts';
import {
  formatIndonesianDate,
  getApproximateHijriDate,
  getNextPrayer,
  getCurrentAndNextActivity,
  DAILY_PRAYER_TIMES
} from '../utils/dateUtils.ts';
import { HADITH_QUOTES } from '../data/hadithQuotes.ts';

interface DashboardViewProps {
  activities: SunnahActivity[];
  completedIds: string[];
  onToggleComplete: (id: string) => void;
  onOpenDetail: (activity: SunnahActivity) => void;
  onOpenTimer: (mins: number, title: string) => void;
  onNavigateToTimeline: () => void;
  onNavigateToJournal: () => void;
  todayJournal?: JournalEntry;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  activities,
  completedIds,
  onToggleComplete,
  onOpenDetail,
  onOpenTimer,
  onNavigateToTimeline,
  onNavigateToJournal,
  todayJournal
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hadithIndex, setHadithIndex] = useState(0);

  // Tick clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextPrayer = getNextPrayer(currentTime);
  const { current: currentActivity, next: nextActivity } = getCurrentAndNextActivity(activities, currentTime);

  const totalActivities = activities.length;
  const completedCount = completedIds.length;
  const progressPercent = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

  // Skor Waktu Produktif & Berkah calculation
  const getProductiveScoreLevel = (pct: number) => {
    if (pct === 0) {
      return {
        title: 'Niat Tulus di Awal Hari',
        desc: 'Awali harimu dengan membaca bismillah dan niatkan setiap langkah semata-mata karena Allah SWT.',
        color: 'text-amber-800 bg-amber-50 border-amber-200'
      };
    } else if (pct < 35) {
      return {
        title: 'Langkah Awal Berkah',
        desc: 'Alhamdulillah, langkah pertama meneladani sunnah telah dimulai. Sedikit demi sedikit namun istiqomah.',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-200'
      };
    } else if (pct < 70) {
      return {
        title: 'Meneladani Sunnah Rasulullah',
        desc: 'Masya Allah! Hari Anda tertata rapi, produktif, dan dipenuhi dzikir serta amalan saleh.',
        color: 'text-emerald-900 bg-emerald-100 border-emerald-300'
      };
    } else {
      return {
        title: 'Istiqomah Penuh Keberkahan',
        desc: 'Alhamdulillah, hari Anda hidup dengan jejak Rasulullah SAW dari bangun tidur hingga istirahat!',
        color: 'text-emerald-900 bg-amber-100/70 border-amber-300'
      };
    }
  };

  const scoreLevel = getProductiveScoreLevel(progressPercent);
  const activeHadith = HADITH_QUOTES[hadithIndex % HADITH_QUOTES.length];

  const handleNextHadith = () => {
    setHadithIndex(prev => (prev + 1) % HADITH_QUOTES.length);
  };

  const timeString = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hero Welcome Card: Emerald + Warm Gold */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-700/40">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-amber-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{getApproximateHijriDate(currentTime)}</span>
              <span>·</span>
              <span>{formatIndonesianDate(currentTime)}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Hidup Teratur Seperti Rasulullah SAW
            </h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl leading-relaxed">
              "Dari Bangun Tidur Sampai Tidur Lagi, Meraih Berkah di Setiap Detik Waktu."
            </p>
          </div>

          {/* Realtime Digital Clock & Next Prayer Widget */}
          <div className="bg-emerald-950/60 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-emerald-700/50 flex flex-col items-center justify-center min-w-[200px] text-center shrink-0">
            <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Waktu Saat Ini</span>
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-300 tabular-nums my-1">
              {timeString}
            </div>
            
            {/* Next Prayer countdown */}
            <div className="mt-2 pt-2 border-t border-emerald-800/80 w-full text-center">
              <div className="text-xs text-emerald-200">
                Menuju <span className="font-bold text-white">{nextPrayer.nextPrayer.name}</span> ({nextPrayer.nextPrayer.timeStr})
              </div>
              <div className="text-[11px] font-semibold text-amber-400 mt-0.5">
                {nextPrayer.timeDisplay}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Daily Prayer Times Strip (Unboxed, single-line tabs) */}
      <div className="bg-white rounded-2xl p-4 border border-[#E8E1D3] shadow-sm">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-700" /> Waktu Shalat Hari Ini
          </span>
          <span className="text-xs text-slate-500">Acuan Waktu Indonesia</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {DAILY_PRAYER_TIMES.map((slot) => {
            const isNext = slot.name === nextPrayer.nextPrayer.name;
            return (
              <div
                key={slot.name}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
                  isNext
                    ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-[#FAF7F2] text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <span className={`text-[11px] font-medium ${isNext ? 'text-amber-300' : 'text-slate-500'}`}>
                  {slot.name}
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold tabular-nums mt-0.5">
                  {slot.timeStr}
                </span>
                <span className={`text-[10px] ${isNext ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {slot.arabicName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 3: Progress Bar & Productive Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1 & 2: Score & Progress Bar */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D3] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" /> Kemiripan dengan Sunnah Nabi Hari Ini
              </span>
              <span className="font-mono text-sm font-extrabold text-emerald-900 tabular-nums">
                {completedCount} / {totalActivities} Aktivitas
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-mono tabular-nums">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-500 font-medium">terpenuhi</span>
            </div>

            {/* Custom styled progress bar */}
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 mb-5">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(progressPercent, 4)}%` }}
              />
            </div>

            {/* Score status card */}
            <div className={`p-4 rounded-2xl border ${scoreLevel.color} transition-colors`}>
              <div className="font-bold text-sm mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>{scoreLevel.title}</span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {scoreLevel.desc}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Setiap checklist menambah poin amal kebaikan
            </span>
            <button
              onClick={onNavigateToTimeline}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 hover:underline"
            >
              <span>Buka Timeline</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Col 3: Journal / Syukur Quick Card */}
        <div className="bg-[#FCFAF7] rounded-3xl p-6 border border-[#E8E1D3] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookHeart className="w-4 h-4 text-emerald-700" /> Muhasabah & Syukur
              </span>
              {todayJournal ? (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  Sudah Terisi
                </span>
              ) : (
                <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  Belum Ditulis
                </span>
              )}
            </div>

            <h3 className="text-sm font-bold text-slate-800 mb-2">
              3 Hal yang Disyukuri Hari Ini
            </h3>

            {todayJournal ? (
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/70 truncate">
                  1. {todayJournal.syukur1 || 'Alhamdulillah'}
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/70 truncate">
                  2. {todayJournal.syukur2 || 'Alhamdulillah'}
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/70 truncate">
                  3. {todayJournal.syukur3 || 'Alhamdulillah'}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-2xl border border-slate-200/70">
                "Barangsiapa bersyukur, niscaya Aku tambahkan nikmat-Ku kepadamu." (QS. Ibrahim: 7). Sempatkan 2 menit menuliskan nikmat hari ini.
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60">
            <button
              onClick={onNavigateToJournal}
              className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-98"
            >
              <span>{todayJournal ? 'Buka / Edit Jurnal Hari Ini' : 'Tulis Jurnal Syukur Sekarang'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Row 4: Smart Current Activity & Next Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Current Activity */}
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-600/30 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Aktivitas Saat Ini
          </div>

          {currentActivity ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Pukul {currentActivity.timeStr} WIB</span>
                <span>·</span>
                <span className="capitalize">{currentActivity.category}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {currentActivity.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentActivity.sunnahDescription}
              </p>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900">
                <span className="font-semibold block mb-0.5">📱 Tips Era Sekarang:</span>
                {currentActivity.modernAdjustment}
              </div>

              <div className="flex items-center justify-between pt-2 gap-2">
                <button
                  onClick={() => onOpenDetail(currentActivity)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline"
                >
                  Lihat Doa & Dalil
                </button>

                <div className="flex items-center gap-2">
                  {currentActivity.recommendedDurationMinutes && (
                    <button
                      onClick={() => onOpenTimer(currentActivity.recommendedDurationMinutes || 15, currentActivity.title)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
                    >
                      Timer
                    </button>
                  )}

                  <button
                    onClick={() => onToggleComplete(currentActivity.id)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                      completedIds.includes(currentActivity.id)
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{completedIds.includes(currentActivity.id) ? 'Selesai' : 'Checklist'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4">Belum ada aktivitas yang terjadwal.</p>
          )}
        </div>

        {/* Next Upcoming Activity */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8E1D3] shadow-sm relative">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Aktivitas Berikutnya
          </div>

          {nextActivity ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Pukul {nextActivity.timeStr} WIB</span>
                <span>·</span>
                <span className="capitalize">{nextActivity.category}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {nextActivity.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {nextActivity.subtitle} — {nextActivity.prophetExample}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenDetail(nextActivity)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
                >
                  <span>Baca Persiapan & Doa</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onToggleComplete(nextActivity.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    completedIds.includes(nextActivity.id)
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {completedIds.includes(nextActivity.id) ? 'Sudah Selesai' : 'Tandai Sekarang'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4">Tidak ada aktivitas tersisa hari ini.</p>
          )}
        </div>

      </div>

      {/* Row 5: Hadith Quote Card */}
      <div className="rounded-3xl bg-[#FAF6EE] border border-[#E4DEC] p-6 shadow-sm relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Quote className="w-4 h-4 text-amber-600" />
            <span>Kutipan Hadits Harian: {activeHadith.topic}</span>
          </div>
          <button
            onClick={handleNextHadith}
            className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            Kutipan Lain →
          </button>
        </div>

        {activeHadith.textArabic && (
          <div className="font-arabic text-xl md:text-2xl text-right text-emerald-950 my-2 leading-loose">
            {activeHadith.textArabic}
          </div>
        )}

        <blockquote className="text-sm font-serif italic text-slate-800 leading-relaxed my-2">
          "{activeHadith.textIndo}"
        </blockquote>

        <div className="text-xs text-emerald-800 font-semibold mt-2">
          — {activeHadith.source}
        </div>
      </div>

    </div>
  );
};
