/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BookHeart,
  Save,
  Calendar,
  Sparkles,
  HeartHandshake,
  Check,
  Copy,
  Trash2
} from 'lucide-react';
import { JournalEntry } from '../types.ts';
import { formatIndonesianDate, getTodayKey } from '../utils/dateUtils.ts';
import { soundManager } from '../utils/audio.ts';

interface JournalViewProps {
  journalHistory: JournalEntry[];
  onSaveJournal: (entry: JournalEntry) => void;
  onDeleteJournal: (id: string) => void;
  soundEnabled?: boolean;
}

export const JournalView: React.FC<JournalViewProps> = ({
  journalHistory,
  onSaveJournal,
  onDeleteJournal,
  soundEnabled = true
}) => {
  const todayKey = getTodayKey();
  const existingToday = journalHistory.find(j => j.dateStr === todayKey);

  const [baikHariIni, setBaikHariIni] = useState(existingToday?.baikHariIni || '');
  const [perbaikanBesok, setPerbaikanBesok] = useState(existingToday?.perbaikanBesok || '');
  const [syukur1, setSyukur1] = useState(existingToday?.syukur1 || '');
  const [syukur2, setSyukur2] = useState(existingToday?.syukur2 || '');
  const [syukur3, setSyukur3] = useState(existingToday?.syukur3 || '');
  const [catatanHati, setCatatanHati] = useState(existingToday?.catatanHati || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (existingToday) {
      setBaikHariIni(existingToday.baikHariIni || '');
      setPerbaikanBesok(existingToday.perbaikanBesok || '');
      setSyukur1(existingToday.syukur1 || '');
      setSyukur2(existingToday.syukur2 || '');
      setSyukur3(existingToday.syukur3 || '');
      setCatatanHati(existingToday.catatanHati || '');
    }
  }, [existingToday]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const entry: JournalEntry = {
      id: existingToday?.id || `journal-${Date.now()}`,
      dateStr: todayKey,
      dateDisplay: formatIndonesianDate(new Date()),
      baikHariIni: baikHariIni.trim(),
      perbaikanBesok: perbaikanBesok.trim(),
      syukur1: syukur1.trim(),
      syukur2: syukur2.trim(),
      syukur3: syukur3.trim(),
      catatanHati: catatanHati.trim(),
      savedAt: Date.now()
    };

    onSaveJournal(entry);
    setSavedSuccess(true);
    if (soundEnabled) {
      soundManager.playCheckmarkSound();
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyText = (entry: JournalEntry) => {
    const text = `🌿 Jurnal & Muhasabah (${entry.dateDisplay})
Waktu Berkah ala Rasulullah SAW

1. Apa yang sudah baik hari ini:
${entry.baikHariIni || '-'}

2. Apa yang ingin diperbaiki besok:
${entry.perbaikanBesok || '-'}

3. Tiga Hal yang Disyukuri Hari Ini:
• ${entry.syukur1 || '-'}
• ${entry.syukur2 || '-'}
• ${entry.syukur3 || '-'}
${entry.catatanHati ? `\nCatatan Hati: ${entry.catatanHati}` : ''}

"Alhamdulillah \'alaa kulli haal."`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  // Sort history newest first, keep last 7 days
  const recentHistory = [...journalHistory]
    .sort((a, b) => b.savedAt - a.savedAt)
    .slice(0, 7);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D3] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <BookHeart className="w-4 h-4 text-emerald-700" />
            <span>Muhasabah Malam & Jurnal Syukur</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Evaluasi Diri & Rasa Syukur Hari Ini
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            "Hisablah dirimu sebelum kamu dihisab." Mengikat nikmat Allah dengan rasa syukur dan menutup hari dengan kedamaian hati.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200/80">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>{formatIndonesianDate(new Date())}</span>
        </div>
      </div>

      {/* Main Journal Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D3] shadow-sm space-y-6">
        
        {/* Form Title & Today Note */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Refleksi Hari Ini</span>
          </h2>
          {existingToday && (
            <span className="text-xs text-emerald-700 font-medium">
              Tersimpan hari ini · Bisa diperbarui kapan saja
            </span>
          )}
        </div>

        {/* 1. Apa yang sudah baik hari ini */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            1. Apa yang sudah baik hari ini? <span className="text-emerald-700 font-normal">(Amal saleh, shalat tepat waktu, sabar, dsb)</span>
          </label>
          <textarea
            value={baikHariIni}
            onChange={e => setBaikHariIni(e.target.value)}
            rows={2}
            placeholder="Contoh: Alhamdulillah shalat subuh tepat waktu, sempat sedekah subuh, dan menahan emosi saat bekerja..."
            className="w-full p-3.5 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* 2. Apa yang ingin diperbaiki besok */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            2. Apa yang ingin diperbaiki besok? <span className="text-amber-800 font-normal">(Muhasabah diri dengan tulus tanpa menyalahkan diri berlebihan)</span>
          </label>
          <textarea
            value={perbaikanBesok}
            onChange={e => setPerbaikanBesok(e.target.value)}
            rows={2}
            placeholder="Contoh: Besok ingin tidur lebih awal sebelum jam 22.00, kurangi scrolling HP sebelum tidur, dan menambah tilawah 1 juz..."
            className="w-full p-3.5 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* 3. Tiga Hal yang Disyukuri Hari Ini */}
        <div className="space-y-3 p-5 rounded-2xl bg-[#FBF9F5] border border-[#EBE4D5]">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <label className="block text-xs sm:text-sm font-bold text-slate-900">
              3. Tiga Hal yang Aku Syukuri Hari Ini <span className="text-amber-800 font-normal">(Kesehatan, keluarga, rezeki, rehat)</span>
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <input
                type="text"
                value={syukur1}
                onChange={e => setSyukur1(e.target.value)}
                placeholder="Nikmat pertama (misal: Napas lega dan nikmat sehat bangun pagi)"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <input
                type="text"
                value={syukur2}
                onChange={e => setSyukur2(e.target.value)}
                placeholder="Nikmat kedua (misal: Rezeki makanan halal dan keluarga yang hangat)"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <input
                type="text"
                value={syukur3}
                onChange={e => setSyukur3(e.target.value)}
                placeholder="Nikmat ketiga (misal: Kemudahan menyelesaikan tugas amanah hari ini)"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* 4. Catatan Hati (Optional) */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-700">
            Catatan Hati & Doa Khusus <span className="text-slate-400 font-normal">(Opsional)</span>
          </label>
          <textarea
            value={catatanHati}
            onChange={e => setCatatanHati(e.target.value)}
            rows={2}
            placeholder="Doa untuk orang tua, curahan hati, atau ayat Qur'an yang menyentuh hari ini..."
            className="w-full p-3.5 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* Submit Button & Confirmation */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Alhamdulillah, muhasabah tersimpan!</span>
            </span>
          ) : <div />}

          <button
            type="submit"
            className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Jurnal & Syukur</span>
          </button>
        </div>

      </form>

      {/* Riwayat 7 Hari Terakhir */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>Riwayat Muhasabah (7 Hari Terakhir)</span>
          </h2>
          <span className="text-xs text-slate-500">Tersimpan di perangkat Anda</span>
        </div>

        {recentHistory.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#E8E1D3] text-slate-500 space-y-2">
            <BookHeart className="w-8 h-8 text-emerald-700 mx-auto opacity-40" />
            <p className="text-sm font-semibold text-slate-700">Belum ada riwayat muhasabah</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Mulailah menuliskan apa yang sudah baik dan 3 hal yang disyukuri pada formulir di atas untuk mengabadikan jejak kebaikan Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-[#E8E1D3] shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-emerald-900">
                      {item.dateDisplay}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyText(item)}
                        className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Salin Jurnal ke WhatsApp / Catatan"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => onDeleteJournal(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Hapus riwayat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {item.baikHariIni && (
                    <div className="mt-2 text-xs text-slate-700">
                      <span className="font-semibold text-emerald-800 block mb-0.5">Sudah Baik:</span>
                      <p className="line-clamp-2 italic">{item.baikHariIni}</p>
                    </div>
                  )}

                  {item.perbaikanBesok && (
                    <div className="mt-2 text-xs text-slate-700">
                      <span className="font-semibold text-amber-800 block mb-0.5">Rencana Perbaikan:</span>
                      <p className="line-clamp-2 italic">{item.perbaikanBesok}</p>
                    </div>
                  )}

                  {(item.syukur1 || item.syukur2 || item.syukur3) && (
                    <div className="mt-3 p-3 rounded-xl bg-[#FAF8F3] border border-amber-200/50 text-xs text-slate-800 space-y-1">
                      <span className="font-bold text-amber-900 block text-[11px]">3 Hal yang Disyukuri:</span>
                      {item.syukur1 && <div>• {item.syukur1}</div>}
                      {item.syukur2 && <div>• {item.syukur2}</div>}
                      {item.syukur3 && <div>• {item.syukur3}</div>}
                    </div>
                  )}
                </div>

                <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Tersimpan {new Date(item.savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                  {copiedId === item.id && (
                    <span className="text-emerald-700 font-semibold">Tersalin ke Clipboard!</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
