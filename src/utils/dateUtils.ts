/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SunnahActivity } from '../types.ts';

export function getTodayKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatIndonesianDate(date: Date = new Date()): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${dayNumber} ${monthName} ${year}`;
}

// Approximate Hijri calendar calculation for Indonesian context
export function getApproximateHijriDate(date: Date = new Date()): string {
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi\'ul Awwal', 'Rabi\'uts Tsani',
    'Jumadil Ula', 'Jumadil Akhirah', 'Rajab', 'Sya\'ban',
    'Ramadhan', 'Syawwal', 'Dzulqa\'dah', 'Dzulhijjah'
  ];

  try {
    // Intl format supported in modern browsers
    const formatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    let day = 1;
    let month = 1;
    let year = 1448;

    parts.forEach(part => {
      if (part.type === 'day') day = parseInt(part.value, 10);
      if (part.type === 'month') month = parseInt(part.value, 10);
      if (part.type === 'year') year = parseInt(part.value, 10);
    });

    const monthName = hijriMonths[month - 1] || 'Hijriyah';
    return `${day} ${monthName} ${year} H`;
  } catch {
    return '1448 H';
  }
}

export interface PrayerTimeSlot {
  name: string;
  timeStr: string;
  hour: number;
  minute: number;
  arabicName: string;
}

// Standard daily reference prayer times (approximate for WIB / Central Indonesia)
export const DAILY_PRAYER_TIMES: PrayerTimeSlot[] = [
  { name: 'Subuh', timeStr: '04.28', hour: 4, minute: 28, arabicName: 'الفجر' },
  { name: 'Terbit', timeStr: '05.42', hour: 5, minute: 42, arabicName: 'الشروق' },
  { name: 'Dhuha', timeStr: '06.15', hour: 6, minute: 15, arabicName: 'الضحى' },
  { name: 'Dzuhur', timeStr: '11.53', hour: 11, minute: 53, arabicName: 'الظهر' },
  { name: 'Ashar', timeStr: '15.12', hour: 15, minute: 12, arabicName: 'العصر' },
  { name: 'Maghrib', timeStr: '17.58', hour: 17, minute: 58, arabicName: 'المغرب' },
  { name: 'Isya', timeStr: '19.08', hour: 19, minute: 8, arabicName: 'العشاء' }
];

export interface NextPrayerInfo {
  currentPrayer: PrayerTimeSlot | null;
  nextPrayer: PrayerTimeSlot;
  minutesRemaining: number;
  timeDisplay: string;
}

export function getNextPrayer(now: Date = new Date()): NextPrayerInfo {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Find next upcoming prayer
  let next = DAILY_PRAYER_TIMES.find(p => (p.hour * 60 + p.minute) > currentMinutes);
  let current: PrayerTimeSlot | null = null;

  // Find current prayer
  for (let i = DAILY_PRAYER_TIMES.length - 1; i >= 0; i--) {
    if (currentMinutes >= (DAILY_PRAYER_TIMES[i].hour * 60 + DAILY_PRAYER_TIMES[i].minute)) {
      current = DAILY_PRAYER_TIMES[i];
      break;
    }
  }

  let minutesDiff = 0;
  if (next) {
    minutesDiff = (next.hour * 60 + next.minute) - currentMinutes;
  } else {
    // Tomorrow Subuh
    next = DAILY_PRAYER_TIMES[0];
    minutesDiff = (24 * 60 - currentMinutes) + (next.hour * 60 + next.minute);
  }

  const hoursRemaining = Math.floor(minutesDiff / 60);
  const minsRemaining = minutesDiff % 60;
  let timeDisplay = '';
  if (hoursRemaining > 0) {
    timeDisplay = `${hoursRemaining} jam ${minsRemaining} mnt lagi`;
  } else {
    timeDisplay = `${minsRemaining} menit lagi`;
  }

  return {
    currentPrayer: current,
    nextPrayer: next,
    minutesRemaining: minutesDiff,
    timeDisplay
  };
}

// Find which activity matches the current clock
export function getCurrentAndNextActivity(
  activities: SunnahActivity[],
  now: Date = new Date()
): { current: SunnahActivity | null; next: SunnahActivity | null } {
  if (!activities || activities.length === 0) {
    return { current: null, next: null };
  }

  // Sort activities chronologically by hour and minute
  const sorted = [...activities].sort((a, b) => {
    return (a.hour * 60 + a.minute) - (b.hour * 60 + b.minute);
  });

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  let currentIndex = -1;
  for (let i = 0; i < sorted.length; i++) {
    const actMin = sorted[i].hour * 60 + sorted[i].minute;
    if (nowMinutes >= actMin) {
      currentIndex = i;
    }
  }

  const current = currentIndex !== -1 ? sorted[currentIndex] : sorted[sorted.length - 1];
  const next = currentIndex !== -1 && currentIndex + 1 < sorted.length
    ? sorted[currentIndex + 1]
    : sorted[0];

  return { current, next };
}
