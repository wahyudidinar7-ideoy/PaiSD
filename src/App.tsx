/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { Navbar, ActiveTab } from './components/Navbar.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { TimelineView } from './components/TimelineView.tsx';
import { JournalView } from './components/JournalView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { TimerModal } from './components/TimerModal.tsx';
import { ActivityDetailModal } from './components/ActivityDetailModal.tsx';
import { SunnahActivity, JournalEntry, UserSettings, CustomActivity } from './types.ts';
import { INITIAL_SUNNAH_ACTIVITIES } from './data/sunnahTimeline.ts';
import { getTodayKey } from './utils/dateUtils.ts';
import { soundManager } from './utils/audio.ts';

const STORAGE_KEYS = {
  CHECKLIST: 'waktu_berkah_checklist_v1',
  JOURNAL: 'waktu_berkah_journal_v1',
  SETTINGS: 'waktu_berkah_settings_v1',
  CUSTOM_ACTIVITIES: 'waktu_berkah_custom_v1'
};

const DEFAULT_SETTINGS: UserSettings = {
  bangunTime: '03:30',
  mulaiKerjaTime: '07:00',
  tidurTime: '21:30',
  soundEnabled: true
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const todayKey = getTodayKey();

  // LocalStorage state with safe fallback initialization
  const [checklist, setChecklist] = useState<Record<string, Record<string, boolean>>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [journalHistory, setJournalHistory] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [customActivities, setCustomActivities] = useState<CustomActivity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_ACTIVITIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [timerModalState, setTimerModalState] = useState<{
    isOpen: boolean;
    initialMinutes: number;
    activityTitle: string;
  }>({
    isOpen: false,
    initialMinutes: 15,
    activityTitle: 'Fokus & Sunnah'
  });

  const [detailModalState, setDetailModalState] = useState<{
    isOpen: boolean;
    activity: SunnahActivity | null;
  }>({
    isOpen: false,
    activity: null
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(checklist));
    } catch {
      // localStorage fallback
    }
  }, [checklist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journalHistory));
    } catch {
      // localStorage fallback
    }
  }, [journalHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {
      // localStorage fallback
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_ACTIVITIES, JSON.stringify(customActivities));
    } catch {
      // localStorage fallback
    }
  }, [customActivities]);

  // Merge default 12 activities + custom user activities
  const allActivities: SunnahActivity[] = useMemo(() => {
    const customConverted: SunnahActivity[] = customActivities.map(c => ({
      id: c.id,
      timeStr: c.timeStr,
      hour: c.hour,
      minute: c.minute,
      title: c.title,
      subtitle: `Aktivitas Kustom Pribadi (${c.category})`,
      category: c.category,
      sunnahDescription: c.note || 'Lakukan dengan niat ibadah dan menjaga keberkahan waktu.',
      prophetExample: 'Rasulullah SAW senantiasa memanfaatkan waktu dalam kebaikan dan memberi manfaat kepada sesama.',
      modernAdjustment: c.modernAdjustment,
      recommendedDurationMinutes: c.recommendedDurationMinutes || 30,
      timerLabel: `Timer (${c.recommendedDurationMinutes || 30}m)`,
      isCustom: true
    }));

    return [...INITIAL_SUNNAH_ACTIVITIES, ...customConverted];
  }, [customActivities]);

  // Today's completed IDs
  const todayCompletedIds: string[] = useMemo(() => {
    const todayMap = checklist[todayKey] || {};
    return Object.keys(todayMap).filter(id => todayMap[id] === true);
  }, [checklist, todayKey]);

  // Progress percentage
  const progressPercent = useMemo(() => {
    if (allActivities.length === 0) return 0;
    return Math.round((todayCompletedIds.length / allActivities.length) * 100);
  }, [todayCompletedIds, allActivities]);

  // Toggle activity checklist
  const handleToggleComplete = (id: string) => {
    setChecklist(prev => {
      const todayMap = { ...(prev[todayKey] || {}) };
      const nextState = !todayMap[id];
      todayMap[id] = nextState;

      if (nextState && settings.soundEnabled) {
        soundManager.playCheckmarkSound();
      }

      return {
        ...prev,
        [todayKey]: todayMap
      };
    });
  };

  // Save journal entry
  const handleSaveJournal = (entry: JournalEntry) => {
    setJournalHistory(prev => {
      const filtered = prev.filter(j => j.dateStr !== entry.dateStr);
      return [entry, ...filtered];
    });
  };

  // Delete journal entry
  const handleDeleteJournal = (id: string) => {
    setJournalHistory(prev => prev.filter(j => j.id !== id));
  };

  // Custom activity handlers
  const handleAddCustomActivity = (newAct: CustomActivity) => {
    setCustomActivities(prev => [...prev, newAct]);
  };

  const handleDeleteCustomActivity = (id: string) => {
    setCustomActivities(prev => prev.filter(a => a.id !== id));
  };

  // Reset today's checklist
  const handleResetTodayProgress = () => {
    setChecklist(prev => {
      const updated = { ...prev };
      delete updated[todayKey];
      return updated;
    });
  };

  const todayJournal = journalHistory.find(j => j.dateStr === todayKey);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 flex flex-col font-sans selection:bg-emerald-700 selection:text-white">
      
      {/* Navigation Bar (Desktop top tabs + Mobile bottom bar) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progressPercent={progressPercent}
        onOpenQuickTimer={() => {
          setTimerModalState({
            isOpen: true,
            initialMinutes: 15,
            activityTitle: 'Sesi Fokus & Sunnah (15 Mnt)'
          });
        }}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20 md:pb-12">
        {activeTab === 'dashboard' && (
          <DashboardView
            activities={allActivities}
            completedIds={todayCompletedIds}
            onToggleComplete={handleToggleComplete}
            onOpenDetail={act => setDetailModalState({ isOpen: true, activity: act })}
            onOpenTimer={(mins, title) => setTimerModalState({ isOpen: true, initialMinutes: mins, activityTitle: title })}
            onNavigateToTimeline={() => setActiveTab('timeline')}
            onNavigateToJournal={() => setActiveTab('journal')}
            todayJournal={todayJournal}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineView
            activities={allActivities}
            completedIds={todayCompletedIds}
            onToggleComplete={handleToggleComplete}
            onOpenDetail={act => setDetailModalState({ isOpen: true, activity: act })}
            onOpenTimer={(mins, title) => setTimerModalState({ isOpen: true, initialMinutes: mins, activityTitle: title })}
            onOpenAddCustom={() => setActiveTab('settings')}
          />
        )}

        {activeTab === 'journal' && (
          <JournalView
            journalHistory={journalHistory}
            onSaveJournal={handleSaveJournal}
            onDeleteJournal={handleDeleteJournal}
            soundEnabled={settings.soundEnabled}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            onUpdateSettings={setSettings}
            customActivities={customActivities}
            onAddCustomActivity={handleAddCustomActivity}
            onDeleteCustomActivity={handleDeleteCustomActivity}
            onResetTodayProgress={handleResetTodayProgress}
          />
        )}
      </main>

      {/* Timer Modal */}
      <TimerModal
        isOpen={timerModalState.isOpen}
        onClose={() => setTimerModalState(prev => ({ ...prev, isOpen: false }))}
        initialMinutes={timerModalState.initialMinutes}
        activityTitle={timerModalState.activityTitle}
        soundEnabled={settings.soundEnabled}
      />

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        isOpen={detailModalState.isOpen}
        activity={detailModalState.activity}
        onClose={() => setDetailModalState({ isOpen: false, activity: null })}
        isCompleted={detailModalState.activity ? todayCompletedIds.includes(detailModalState.activity.id) : false}
        onToggleComplete={handleToggleComplete}
        onOpenTimer={(mins, title) => setTimerModalState({ isOpen: true, initialMinutes: mins, activityTitle: title })}
      />

      {/* Footer */}
      <footer className="border-t border-[#E8E1D3] bg-[#F5EFE3]/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-950">WAKTU BERKAH</span>
            <span>·</span>
            <span>Manajemen Waktu Muslim Berdasarkan Sunnah Rasulullah SAW</span>
          </div>
          <div>
            "Demi masa, sesungguhnya manusia berada dalam kerugian, kecuali orang-orang yang beriman dan beramal saleh..." (QS. Al-’Ashr)
          </div>
        </div>
      </footer>

    </div>
  );
}
