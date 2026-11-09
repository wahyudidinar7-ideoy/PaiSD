/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SunnahActivity {
  id: string;
  timeStr: string; // e.g. "03.30"
  hour: number;
  minute: number;
  title: string;
  subtitle: string;
  category: 'ibadah' | 'produktivitas' | 'keluarga' | 'istirahat' | 'muhasabah';
  sunnahDescription: string;
  prophetExample: string;
  modernAdjustment: string;
  arabicPrayer?: string;
  latinPrayer?: string;
  prayerMeaning?: string;
  hadithDalil?: string;
  hadithSource?: string;
  recommendedDurationMinutes?: number;
  timerLabel?: string;
  isCustom?: boolean;
}

export interface JournalEntry {
  id: string;
  dateStr: string; // YYYY-MM-DD
  dateDisplay: string;
  baikHariIni: string;
  perbaikanBesok: string;
  syukur1: string;
  syukur2: string;
  syukur3: string;
  catatanHati?: string;
  mood?: 'sangat-bersyukur' | 'tenang' | 'butuh-semangat' | 'lelah-tapi-ikhlas';
  savedAt: number;
}

export interface UserSettings {
  bangunTime: string; // "03:30"
  mulaiKerjaTime: string; // "07:00"
  tidurTime: string; // "21:30"
  userName?: string;
  soundEnabled: boolean;
}

export interface CustomActivity {
  id: string;
  timeStr: string;
  hour: number;
  minute: number;
  title: string;
  category: 'ibadah' | 'produktivitas' | 'keluarga' | 'istirahat' | 'muhasabah';
  modernAdjustment: string;
  note?: string;
  recommendedDurationMinutes?: number;
}
