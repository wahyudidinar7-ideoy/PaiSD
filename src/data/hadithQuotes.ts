/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HadithQuote {
  id: number;
  textArabic?: string;
  textIndo: string;
  source: string;
  topic: string;
}

export const HADITH_QUOTES: HadithQuote[] = [
  {
    id: 1,
    textArabic: 'نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالْفَرَاغُ',
    textIndo:
      'Dua nikmat yang seringkali memperdaya banyak manusia: kesehatan dan waktu luang.',
    source: 'HR. Bukhari no. 6412',
    topic: 'Pentingnya Menghargai Waktu'
  },
  {
    id: 2,
    textArabic: 'اغْتَنِمْ خَمْسًا قَبْلَ خَمْسٍ: شَبَابَكَ قَبْلَ هَرَمِكَ، وَصِحَّتَكَ قَبْلَ سَقَمِكَ، وَغِنَاكَ قَبْلَ فَقْرِكَ، وَفَرَاغَكَ قَبْلَ شُغْلِكَ، وَحَيَاتَكَ قَبْلَ مَوْتِكَ',
    textIndo:
      'Manfaatkan lima perkara sebelum lima perkara: Masa mudamu sebelum masa tuamu, sehatmu sebelum sakitmu, kayamu sebelum miskinmu, waktu luangmu sebelum sibukmu, dan hidupmu sebelum matimu.',
    source: 'HR. Al-Hakim (Shahih)',
    topic: 'Keutamaan Mengatur Kesempatan'
  },
  {
    id: 3,
    textArabic: 'مِنْ حُسْنِ إِسْلاَمِ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيهِ',
    textIndo:
      'Di antara tanda kebaikan Islam seseorang adalah meninggalkan hal-hal yang tidak bermanfaat baginya.',
    source: 'HR. At-Tirmidzi no. 2317',
    topic: 'Fokus & Menjauhi Hal Sia-sia'
  },
  {
    id: 4,
    textArabic: 'اللَّهُمَّ بَارِكْ لِأُمَّتِي فِي بُكُورِهَا',
    textIndo:
      'Ya Allah, berkahilah umatku pada waktu paginya.',
    source: 'HR. Abu Dawud & At-Tirmidzi',
    topic: 'Keberkahan Memulai Pagi Awal'
  },
  {
    id: 5,
    textArabic: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ وَأَنَا خَيْرُكُمْ لِأَهْلِي',
    textIndo:
      'Sebaik-baik kalian adalah yang paling baik terhadap keluarganya, dan aku adalah orang yang paling baik terhadap keluargaku.',
    source: 'HR. At-Tirmidzi no. 3895',
    topic: 'Keluarga & Kasih Sayang'
  },
  {
    id: 6,
    textArabic: 'إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلاً أَنْ يُتْقِنَهُ',
    textIndo:
      'Sesungguhnya Allah menyukai apabila salah seorang di antara kalian melakukan suatu pekerjaan, ia melakukannya dengan itqan (sungguh-sungguh dan profesional).',
    source: 'HR. Al-Baihaqi',
    topic: 'Integritas & Kualitas Kerja'
  },
  {
    id: 7,
    textArabic: 'قِيلُوا فَإِنَّ الشَّيَاطِينَ لاَ تَقِيلُ',
    textIndo:
      'Lakukanlah Qailulah (tidur siang sejenak), karena sesungguhnya setan tidak pernah tidur siang.',
    source: 'HR. Ath-Thabrani',
    topic: 'Kebugaran Fisik Sunnah'
  }
];
