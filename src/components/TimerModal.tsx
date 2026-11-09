/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Bell } from 'lucide-react';
import { soundManager } from '../utils/audio.ts';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMinutes?: number;
  activityTitle?: string;
  soundEnabled?: boolean;
}

export const TimerModal: React.FC<TimerModalProps> = ({
  isOpen,
  onClose,
  initialMinutes = 15,
  activityTitle = 'Aktivitas Berkah',
  soundEnabled = true
}) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const secs = (initialMinutes || 15) * 60;
      setTotalSeconds(secs);
      setRemainingSeconds(secs);
      setIsRunning(true);
      setIsFinished(false);
    }
  }, [isOpen, initialMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            if (soundEnabled) {
              soundManager.playTimerDoneSound();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remainingSeconds, soundEnabled]);

  if (!isOpen) return null;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  const handleSetPreset = (mins: number) => {
    const secs = mins * 60;
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
    setIsRunning(true);
    setIsFinished(false);
  };

  const handleReset = () => {
    setRemainingSeconds(totalSeconds);
    setIsRunning(false);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-900/10 p-6 overflow-hidden">
        {/* Subtle decorative Islamic pattern background element */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-50 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">Timer Sunnah & Fokus</span>
            <h3 className="text-lg font-bold text-slate-800 leading-tight">{activityTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timer Display */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-52 h-52">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-slate-100 stroke-current"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-emerald-600 stroke-current transition-all duration-500 ease-linear"
                strokeWidth="7"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Time numbers inside circle */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-mono text-4xl font-extrabold tracking-tight text-slate-800 tabular-nums">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                {isFinished ? 'Alhamdulillah Selesai!' : isRunning ? 'Sedang Berlangsung' : 'Jeda Sejenak'}
              </span>
            </div>
          </div>

          {isFinished && (
            <div className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-center text-sm font-medium border border-emerald-200">
              Masya Allah, waktu telah selesai. Semoga berkah dan bernilai ibadah di sisi Allah SWT.
            </div>
          )}
        </div>

        {/* Quick Presets */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          <button
            onClick={() => handleSetPreset(10)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            10 Mnt
          </button>
          <button
            onClick={() => handleSetPreset(15)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            15 Mnt (Qailulah)
          </button>
          <button
            onClick={() => handleSetPreset(25)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            25 Mnt (Pomodoro)
          </button>
          <button
            onClick={() => handleSetPreset(45)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            45 Mnt
          </button>
          <button
            onClick={() => handleSetPreset(90)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            90 Mnt (Fokus)
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="p-3 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{remainingSeconds === 0 ? 'Mulai Lagi' : 'Mulai Timer'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) soundManager.playTimerDoneSound();
            }}
            className="p-3 text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-2xl transition-colors"
            title="Tes Suara Notifikasi"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
