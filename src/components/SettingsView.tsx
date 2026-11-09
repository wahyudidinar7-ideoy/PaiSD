/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Settings,
  Plus,
  Trash2,
  RotateCcw,
  Volume2,
  VolumeX,
  BookOpen,
  Check,
  AlertCircle
} from 'lucide-react';
import { UserSettings, CustomActivity } from '../types.ts';

interface SettingsViewProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  customActivities: CustomActivity[];
  onAddCustomActivity: (act: CustomActivity) => void;
  onDeleteCustomActivity: (id: string) => void;
  onResetTodayProgress: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  customActivities,
  onAddCustomActivity,
  onDeleteCustomActivity,
  onResetTodayProgress
}) => {
  // Local form for custom activity
  const [actTitle, setActTitle] = useState('');
  const [actTime, setActTime] = useState('06:30');
  const [actCategory, setActCategory] = useState<'ibadah' | 'produktivitas' | 'keluarga' | 'istirahat' | 'muhasabah'>('produktivitas');
  const [actModern, setActModern] = useState('');
  const [actDuration, setActDuration] = useState('30');
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  // Time settings local state
  const [bangunTime, setBangunTime] = useState(settings.bangunTime);
  const [mulaiKerjaTime, setMulaiKerjaTime] = useState(settings.mulaiKerjaTime);
  const [tidurTime, setTidurTime] = useState(settings.tidurTime);
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);
  const [showSettingsSaved, setShowSettingsSaved] = useState(false);

  // Reset confirmation modal state
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      bangunTime,
      mulaiKerjaTime,
      tidurTime,
      soundEnabled
    });
    setShowSettingsSaved(true);
    setTimeout(() => setShowSettingsSaved(false), 2500);
  };

  const handleCreateCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle.trim()) return;

    const [hoursStr, minsStr] = actTime.split(':');
    const hour = parseInt(hoursStr, 10) || 6;
    const minute = parseInt(minsStr, 10) || 0;
    const timeFormatted = `${String(hour).padStart(2, '0')}.${String(minute).padStart(2, '0')}`;

    const newActivity: CustomActivity = {
      id: `custom-${Date.now()}`,
      title: actTitle.trim(),
      timeStr: timeFormatted,
      hour,
      minute,
      category: actCategory,
      modernAdjustment: actModern.trim() || 'Lakukan dengan niat ibadah dan mengharap ridha Allah.',
      recommendedDurationMinutes: parseInt(actDuration, 10) || 30
    };

    onAddCustomActivity(newActivity);
    setActTitle('');
    setActModern('');
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D3] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4 text-emerald-700" />
            <span>Kustomisasi & Kebiasaan Modern</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Pengaturan Waktu & Aktivitas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Sesuaikan ritme jam harian Anda dan tambahkan aktivitas modern (seperti antar anak, kuliah, olahraga) tanpa mengubah esensi sunnah.
          </p>
        </div>
      </div>

      {/* Section 1: Preferensi Jam Utama */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D3] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Preferensi Jam Bangun & Istirahat
            </h2>
            <p className="text-xs text-slate-500">
              Atur acuan waktu Anda sendiri untuk disesuaikan dengan aktivitas sehari-hari
            </p>
          </div>
          {showSettingsSaved && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <Check className="w-3.5 h-3.5" /> Tersimpan
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Jam Bangun Tidur (Tahajud/Subuh)
              </label>
              <input
                type="time"
                value={bangunTime}
                onChange={e => setBangunTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-[11px] text-slate-500">Standar sunnah: 03.30</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Jam Mulai Kerja / Belajar
              </label>
              <input
                type="time"
                value={mulaiKerjaTime}
                onChange={e => setMulaiKerjaTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-[11px] text-slate-500">Standar: 07.00 - 08.00</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Jam Istirahat / Tidur Malam
              </label>
              <input
                type="time"
                value={tidurTime}
                onChange={e => setTidurTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-[11px] text-slate-500">Standar sunnah: 21.30</span>
            </div>

          </div>

          {/* Sound Toggle */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-emerald-800"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>Suara Lonceng Notifikasi & Checklist: Aktif</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span>Suara Lonceng Notifikasi & Checklist: Mati</span>
                </>
              )}
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
            >
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Tambah Aktivitas Sendiri (Modern & Berkembang) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D3] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>Tambah Aktivitas Sendiri (Modern)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Integrasikan agenda harian Anda (misal: Antar anak sekolah, Olahraga sore, Kuliah daring) ke dalam Timeline
            </p>
          </div>
          {showAddSuccess && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <Check className="w-3.5 h-3.5" /> Berhasil Ditambahkan
            </span>
          )}
        </div>

        <form onSubmit={handleCreateCustomActivity} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700">
                Nama Aktivitas
              </label>
              <input
                type="text"
                required
                value={actTitle}
                onChange={e => setActTitle(e.target.value)}
                placeholder="Misal: Antar Anak ke Sekolah & Bersedekah Senyum"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Pukul (Jam:Menit)
              </label>
              <input
                type="time"
                value={actTime}
                onChange={e => setActTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Kategori
              </label>
              <select
                value={actCategory}
                onChange={e => setActCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="produktivitas">Produktivitas & Kerja</option>
                <option value="keluarga">Keluarga & Silaturahmi</option>
                <option value="ibadah">Ibadah & Doa</option>
                <option value="istirahat">Istirahat & Kebugaran</option>
                <option value="muhasabah">Muhasabah Diri</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Durasi Rekomendasi (Menit)
              </label>
              <input
                type="number"
                min="5"
                max="240"
                value={actDuration}
                onChange={e => setActDuration(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-1">
              <label className="block text-xs font-bold text-slate-700">
                Tips / Niat Sunnah Modern
              </label>
              <input
                type="text"
                value={actModern}
                onChange={e => setActModern(e.target.value)}
                placeholder="Misal: Niatkan menjaga amanah keluarga"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan ke Timeline</span>
            </button>
          </div>
        </form>

        {/* List of existing custom activities */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
            Daftar Aktivitas Kustom Anda ({customActivities.length})
          </span>

          {customActivities.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              Belum ada aktivitas kustom. Anda dapat menambahkan agenda rutin harian Anda di sini.
            </p>
          ) : (
            <div className="space-y-2">
              {customActivities.map(act => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded-md bg-emerald-900 text-amber-300 font-mono font-bold text-[11px]">
                      {act.timeStr}
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 block">{act.title}</span>
                      <span className="text-slate-500 capitalize">{act.category} · {act.modernAdjustment}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteCustomActivity(act.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
                    title="Hapus aktivitas ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Reset Progress Harian */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>Reset Progress Harian</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Mulai hari baru dengan checklist kosong. Catatan jurnal dan aktivitas kustom Anda tetap aman.
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Reset Checklist Hari Ini
        </button>
      </div>

      {/* Section 4: 5 Prinsip Manajemen Waktu Ala Rasulullah SAW */}
      <div className="rounded-3xl bg-[#FAF7F2] p-6 sm:p-8 border border-[#E8E1D3] space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-800" />
          <h2 className="text-base sm:text-lg font-bold text-emerald-950">
            5 Pilar Waktu Berkah Ala Rasulullah SAW
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-2xl bg-white border border-[#E5DFD3] space-y-1">
            <span className="font-bold text-emerald-900 block text-sm">1. Barakah di Pagi Hari</span>
            <p className="leading-relaxed">
              Memulai aktivitas sejak fajar. Doa Rasulullah SAW: <em>"Allahumma barik li-ummati fi bukuuriha"</em> (Berkahilah umatku di waktu paginya).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5DFD3] space-y-1">
            <span className="font-bold text-emerald-900 block text-sm">2. Waktu Terikat Shalat</span>
            <p className="leading-relaxed">
              Menjadikan 5 waktu shalat sebagai jangkar penata hari, bukan menyisipkan shalat di sela-sela kesibukan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5DFD3] space-y-1">
            <span className="font-bold text-emerald-900 block text-sm">3. Qailulah (Power Nap)</span>
            <p className="leading-relaxed">
              Tidur siang sejenak 15–20 menit untuk memulihkan kesegaran fisik dan kekuatan tahajud malam hari.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5DFD3] space-y-1">
            <span className="font-bold text-emerald-900 block text-sm">4. Tidak Begadang Sia-sia</span>
            <p className="leading-relaxed">
              Rasulullah SAW membenci mengobrol tidak berfaedah setelah shalat Isya agar bisa tidur awal dan bangun sepertiga malam.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5DFD3] space-y-1">
            <span className="font-bold text-emerald-900 block text-sm">5. Sedikit tapi Istiqomah</span>
            <p className="leading-relaxed">
              Amalan yang paling dicintai Allah adalah amalan yang rutin berkesinambungan (adwamuhu) walau sedikit.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900 text-amber-200 border border-emerald-800 space-y-1 flex flex-col justify-center">
            <span className="font-bold text-white block text-sm">Prinsip Sunnah</span>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              "Jadikan setiap helaan napas dan detik waktumu sebagai bekal menuju keabadian di surga-Nya."
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Reset Progress Hari Ini?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Semua checklist hari ini akan dikosongkan kembali untuk memulai hari baru. Riwayat jurnal Anda tidak akan terhapus.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onResetTodayProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-colors"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
