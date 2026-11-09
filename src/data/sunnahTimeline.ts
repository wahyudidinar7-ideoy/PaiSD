/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SunnahActivity } from '../types.ts';

export const INITIAL_SUNNAH_ACTIVITIES: SunnahActivity[] = [
  {
    id: 'tahajud',
    timeStr: '03.30',
    hour: 3,
    minute: 30,
    title: 'Bangun Malam & Tahajud',
    subtitle: 'Menghidupkan Sepertiga Malam Terakhir',
    category: 'ibadah',
    sunnahDescription:
      'Bangun dengan mengusap sisa kantuk di wajah, membaca doa bangun tidur, bersiwak membersihkan gigi, berwudhu dengan sempurna, lalu mendirikan Shalat Tahajud dan Witir serta memperbanyak istighfar waktu sahur.',
    prophetExample:
      'Rasulullah SAW biasa bangun di sepertiga malam terakhir, bersiwak, dan shalat malam hingga kedua telapak kaki beliau bengkak karena rasa syukur kepada Allah SWT (HR. Bukhari).',
    modernAdjustment:
      'Matikan alarm HP langsung dengan membaca doa bangun tidur. Jauhkan posisi HP dari tempat tidur agar tidak tergoda langsung membuka media sosial atau pesan chat.',
    arabicPrayer: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    latinPrayer: 'Alhamdulillahilladzii ahyaanaa ba\'da maa amaatanaa wa ilaihin nusyuur.',
    prayerMeaning:
      'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nyalah kami dibangkitkan.',
    hadithDalil: 'Shalat yang paling utama setelah shalat fardhu adalah shalat malam.',
    hadithSource: 'HR. Muslim no. 1163',
    recommendedDurationMinutes: 40,
    timerLabel: 'Timer Tahajud (40m)'
  },
  {
    id: 'subuh',
    timeStr: '04.30',
    hour: 4,
    minute: 30,
    title: 'Shalat Subuh & Dzikir Pagi',
    subtitle: 'Fondasi Keberkahan Cahaya Hari',
    category: 'ibadah',
    sunnahDescription:
      'Melaksanakan Shalat Subuh tepat waktu berjamaah (ke masjid bagi ikhwan), membaca dzikir pagi (Al-Ma\'tsurat), dan membaca Al-Qur\'an hingga fajar merekah.',
    prophetExample:
      'Rasulullah SAW setelah selesai shalat Subuh duduk berdzikir di tempat shalatnya hingga matahari terbit (HR. Muslim).',
    modernAdjustment:
      'Buka aplikasi Al-Qur\'an di HP atau mushaf fisik dan baca minimal 1 halaman sebelum membuka notifikasi WhatsApp atau media sosial lainnya.',
    arabicPrayer: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    latinPrayer: 'Ashbahnaa wa ashbahal mulku lillaahi, walhamdulillaahi, laa ilaaha illallaahu wahdahu laa syariika lah.',
    prayerMeaning:
      'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah, tiada sesembahan yang berhak disembah selain Allah semata...',
    hadithDalil: 'Barangsiapa shalat Subuh berjamaah, maka ia berada dalam jaminan perlindungan Allah.',
    hadithSource: 'HR. Muslim no. 657',
    recommendedDurationMinutes: 30,
    timerLabel: 'Timer Dzikir & Tilawah (30m)'
  },
  {
    id: 'pagi-produktif',
    timeStr: '06.00',
    hour: 6,
    minute: 0,
    title: 'Pagi Produktif & Khidmah Keluarga',
    subtitle: 'Kebugaran Fisik & Membantu Rumah Tangga',
    category: 'produktivitas',
    sunnahDescription:
      'Olahraga ringan atau peregangan, mandi pagi yang menyegarkan, sarapan halal dan thayyib, serta membantu pekerjaan di rumah bersama keluarga.',
    prophetExample:
      'Sayyidah Aisyah RA ditanya: "Apa yang dilakukan Rasulullah SAW di rumahnya?" Beliau menjawab: "Rasulullah biasa membantu pekerjaan keluarganya, lalu jika datang waktu shalat beliau keluar untuk shalat." (HR. Bukhari).',
    modernAdjustment:
      'Bantu siapkan sarapan atau merapikan tempat tidur, siapkan bekal sehat, dan cek agenda harian dengan niat mencari ridha Allah.',
    arabicPrayer: 'اللَّهُمَّ بَارِكْ لِأُمَّتِي فِي بُكُورِهَا',
    latinPrayer: 'Allahumma baarik li-ummatii fii bukuurihaa.',
    prayerMeaning: 'Ya Allah, berkahilah umatku pada waktu paginya.',
    hadithDalil: 'Waktu pagi yang dimanfaatkan untuk kebaikan menyimpan limpahan berkah dan kelapangan urusan.',
    hadithSource: 'HR. Abu Dawud no. 2606',
    recommendedDurationMinutes: 30,
    timerLabel: 'Timer Persiapan Pagi (30m)'
  },
  {
    id: 'fokus-pagi',
    timeStr: '07.00',
    hour: 7,
    minute: 0,
    title: 'Bekerja / Belajar dengan Amanah',
    subtitle: 'Sesi Fokus Utama Penuh Integritas',
    category: 'produktivitas',
    sunnahDescription:
      'Bekerja atau menuntut ilmu dengan sungguh-sungguh (itqan), jujur, tidak menunda-nunda pekerjaan, dan tidak membuang waktu dengan hal sia-sia.',
    prophetExample:
      'Rasulullah SAW dikenal sebagai Al-Amin (orang yang sangat terpercaya). Beliau berdagang dengan jujur dan bersabda bahwa pedagang yang jujur akan bersama para nabi dan syuhada.',
    modernAdjustment:
      'Terapkan metode fokus 90 menit tanpa distraksi (deep work). Matikan notifikasi ponsel yang tidak mendesak selama sesi kerja intensif.',
    arabicPrayer: 'اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً',
    latinPrayer: 'Allahumma laa sahla illaa maa ja\'altahu sahlaa, wa anta taj\'alul hazna idzaa syi\'ta sahlaa.',
    prayerMeaning:
      'Ya Allah, tidak ada kemudahan kecuali apa yang Engkau jadikan mudah, dan Engkau menjadikan kesulitan jika Engkau kehendaki menjadi mudah.',
    hadithDalil: 'Sesungguhnya Allah mencintai seorang hamba yang apabila ia mengerjakan suatu pekerjaan, ia melakukannya dengan itqan (profesional/sempurna).',
    hadithSource: 'HR. Al-Baihaqi no. 5312',
    recommendedDurationMinutes: 90,
    timerLabel: 'Fokus Kerja 90 Menit'
  },
  {
    id: 'dhuha',
    timeStr: '09.00',
    hour: 9,
    minute: 0,
    title: 'Shalat Dhuha & Sedekah Persendian',
    subtitle: 'Rehat Ruhani di Tengah Kesibukan',
    category: 'ibadah',
    sunnahDescription:
      'Mendirikan Shalat Dhuha 2 hingga 8 rakaat sebagai bentuk ungkapan rasa syukur atas 360 persendian tubuh dan pembuka pintu rezeki yang halal.',
    prophetExample:
      'Rasulullah SAW berwasiat kepada Abu Hurairah RA tiga perkara yang tidak pernah beliau tinggalkan: puasa 3 hari setiap bulan, dua rakaat Dhuha, dan shalat witir sebelum tidur (HR. Bukhari).',
    modernAdjustment:
      'Gunakan jeda istirahat 10 menit di kantor/kampus untuk berwudhu dan shalat Dhuha di mushalla, mengistirahatkan mata dari layar komputer.',
    arabicPrayer: 'اللَّهُمَّ إِنَّ الضُّحَاءَ ضُحَاؤُكَ وَالْبَهَاءَ بَهَاؤُكَ وَالْجَمَالَ جَمَالُكَ',
    latinPrayer: 'Allahumma innadh dhuhaa-a dhuhaa-uka, wal bahaa-a bahaa-uka, wal jamaala jamaaluka...',
    prayerMeaning:
      'Ya Allah, sesungguhnya waktu dhuha adalah waktu dhuha-Mu, keagungan adalah keagungan-Mu, keindahan adalah keindahan-Mu...',
    hadithDalil: 'Dan dua rakaat shalat Dhuha mencukupi sedekah untuk seluruh persendianmu.',
    hadithSource: 'HR. Muslim no. 720',
    recommendedDurationMinutes: 15,
    timerLabel: 'Rehat Dhuha 15 Menit'
  },
  {
    id: 'persiapan-dzuhur',
    timeStr: '11.30',
    hour: 11,
    minute: 30,
    title: 'Persiapan Dzuhur & Tenangkan Hati',
    subtitle: 'Menyambut Panggilan Shalat',
    category: 'ibadah',
    sunnahDescription:
      'Menghentikan aktivitas sesaat sebelum adzan berkumandang, mendengarkan dan menjawab adzan, serta melaksanakan shalat sunnah rawatib qabliyah.',
    prophetExample:
      'Rasulullah SAW tidak pernah meninggalkan 4 rakaat sebelum Dzuhur dan 2 rakaat setelahnya (HR. Bukhari & Tirmidzi).',
    modernAdjustment:
      'Tutup tab pekerjaan 5-10 menit sebelum adzan, regangkan tubuh, berwudhu dengan rileks, dan rapikan pakaian untuk menghadap Allah.',
    arabicPrayer: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلاَةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ',
    latinPrayer: 'Allahumma rabba haadzihid da\'watit taammati wash-shalaatil qaa-imah, aati Muhammadanil wasiilata wal fadhiilah.',
    prayerMeaning:
      'Ya Allah, Rabb pemilik panggilan yang sempurna dan shalat yang akan didirikan, berikanlah kepada Nabi Muhammad wasilah dan keutamaan.',
    hadithDalil: 'Barangsiapa yang menjaga shalat sunnah rawatib, Allah bangunkan untuknya istana di surga.',
    hadithSource: 'HR. Muslim no. 728',
    recommendedDurationMinutes: 15,
    timerLabel: 'Jeda Persiapan 15 Menit'
  },
  {
    id: 'dzuhur-qailulah',
    timeStr: '12.00',
    hour: 12,
    minute: 0,
    title: 'Shalat Dzuhur & Qailulah (Power Nap)',
    subtitle: 'Recharge Energi Jasmani & Ruhani',
    category: 'istirahat',
    sunnahDescription:
      'Shalat Dzuhur tepat waktu, makan siang secukupnya, dilanjutkan istirahat atau tidur siang singkat (Qailulah) 15–20 menit untuk memulihkan kesegaran tubuh.',
    prophetExample:
      'Rasulullah SAW dan para sahabat terbiasa melakukan Qailulah (tidur siang singkat) yang membantu mereka kuat beribadah di malam hari.',
    modernAdjustment:
      'Power nap di meja kerja / mushalla selama 15 menit. Hindari menghabiskan seluruh jam istirahat dengan scrolling video pendek di media sosial.',
    arabicPrayer: 'قِيلُوا فَإِنَّ الشَّيَاطِينَ لاَ تَقِيلُ',
    latinPrayer: 'Qiiluu fa-innasy syayaathiina laa taqiil.',
    prayerMeaning: 'Lakukanlah qailulah (tidur siang sejenak), karena sesungguhnya setan tidak pernah tidur siang.',
    hadithDalil: 'Qailulah menyegarkan kembali daya konsentrasi otak dan menjaga stamina ibadah.',
    hadithSource: 'HR. Ath-Thabrani dalam Al-Awsath',
    recommendedDurationMinutes: 20,
    timerLabel: 'Timer Qailulah 20 Menit'
  },
  {
    id: 'ashar-silaturahmi',
    timeStr: '15.00',
    hour: 15,
    minute: 0,
    title: 'Shalat Ashar & Silaturahmi',
    subtitle: 'Menjaga Shalat Wustha & Menghubungkan Kasih',
    category: 'keluarga',
    sunnahDescription:
      'Shalat Ashar tepat waktu (shalat wustha), bertegur sapa dengan tetangga atau rekan kerja, bersedekah, dan menjalin hubungan kekeluargaan.',
    prophetExample:
      'Rasulullah SAW sangat perhatian menjaga shalat Ashar dan mengingatkan bahaya orang yang melalaikannya, serta senantiasa menyambung silaturahmi.',
    modernAdjustment:
      'Sempatkan menelepon orang tua, menyapa sahabat lama lewat pesan positif, atau membeli jajanan sore dari pedagang kecil untuk bersedekah.',
    arabicPrayer: 'مَنْ سَرَّهُ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ وَيُنْسَأَ لَهُ فِي أَثَرِهِ فَلْيَصِلْ رَحِمَهُ',
    latinPrayer: 'Man sarrahu an yubsatha lahu fii rizqihi wa yunsa-a lahu fii atsarihi falyashil rahimahu.',
    prayerMeaning:
      'Barangsiapa senang dilapangkan rezekinya dan dipanjangkan umurnya, hendaklah ia menyambung silaturahmi.',
    hadithDalil: 'Peliharalah semua shalatmu, dan (peliharalah) shalat wustha (Ashar). Berdirilah untuk Allah (dalam shalatmu) dengan khusyuk.',
    hadithSource: 'QS. Al-Baqarah: 238',
    recommendedDurationMinutes: 20,
    timerLabel: 'Rehat Ashar (20m)'
  },
  {
    id: 'maghrib-keluarga',
    timeStr: '17.30',
    hour: 17,
    minute: 30,
    title: 'Shalat Maghrib & Hangat Bersama Keluarga',
    subtitle: 'Meja Makan Tanpa Layar Gadget',
    category: 'keluarga',
    sunnahDescription:
      'Shalat Maghrib berjamaah, dzikir petang, makan malam bersama keluarga dengan adab Rasulullah (membaca basmalah, tangan kanan), serta mendengar cerita anak dan pasangan.',
    prophetExample:
      'Rasulullah SAW adalah sosok yang paling lembut kepada keluarganya. Beliau bersabda: "Sebaik-baik kalian adalah yang paling baik terhadap keluarganya, dan aku adalah yang terbaik bagi keluargaku."',
    modernAdjustment:
      'Terapkan aturan "No Gadget di Meja Makan". Letakkan smartphone di keranjang dan nikmati obrolan hangat dari hati ke hati.',
    arabicPrayer: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللهُ',
    latinPrayer: 'Amsaynaa wa amsal mulku lillaahi, walhamdulillaahi, laa ilaaha illallaah.',
    prayerMeaning: 'Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah...',
    hadithDalil: 'Makanlah bersama-sama dan sebutlah nama Allah, niscaya makanan kalian akan diberkahi.',
    hadithSource: 'HR. Abu Dawud no. 3764',
    recommendedDurationMinutes: 45,
    timerLabel: 'Quality Time Keluarga (45m)'
  },
  {
    id: 'isya-belajar',
    timeStr: '19.00',
    hour: 19,
    minute: 0,
    title: 'Shalat Isya & Menuntut Ilmu',
    subtitle: 'Murojaah & Menambah Wawasan Bermanfaat',
    category: 'produktivitas',
    sunnahDescription:
      'Shalat Isya berjamaah, diikuti shalat sunnah ba\'diyah. Setelah itu mengkaji ilmu yang bermanfaat, membaca buku inspiratif, atau murojaah hafalan Al-Qur\'an.',
    prophetExample:
      'Rasulullah SAW terkadang duduk berbincang bersama Abu Bakar dan sahabat membahas urusan kaum muslimin ba\'da Isya (HR. Tirmidzi).',
    modernAdjustment:
      'Gunakan 30 menit untuk membaca buku berkualitas, mengikuti kajian online bermanfaat, atau mendampingi anak belajar tanpa gangguan notifikasi.',
    arabicPrayer: 'اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي وَزِدْنِي عِلْمًا',
    latinPrayer: 'Allahummanfa\'nii bimaa \'allamtanii wa \'allimnii maa yanfa\'unii wa zidnii \'ilmaa.',
    prayerMeaning:
      'Ya Allah, berilah manfaat dari apa yang telah Engkau ajarkan kepadaku, ajarkanlah hal yang bermanfaat bagiku, dan tambahkanlah ilmuku.',
    hadithDalil: 'Barangsiapa menempuh jalan untuk menuntut ilmu, maka Allah akan memudahkan baginya jalan menuju surga.',
    hadithSource: 'HR. Muslim no. 2699',
    recommendedDurationMinutes: 30,
    timerLabel: 'Sesi Belajar 30 Menit'
  },
  {
    id: 'muhasabah-syukur',
    timeStr: '20.30',
    hour: 20,
    minute: 30,
    title: 'Muhasabah & Jurnal Syukur',
    subtitle: 'Evaluasi Diri & Mengikat Nikmat Hari Ini',
    category: 'muhasabah',
    sunnahDescription:
      'Duduk tenang mengevaluasi amalan seharian, beristighfar atas kekurangan dan kekhilafan, serta mencatat dan mensyukuri anugerah nikmat yang diterima hari ini.',
    prophetExample:
      'Rasulullah SAW yang telah diampuni dosanya yang lalu dan yang akan datang tetap beristighfar dan bertaubat kepada Allah lebih dari 70 sampai 100 kali dalam sehari (HR. Bukhari).',
    modernAdjustment:
      'Buka menu Jurnal & Muhasabah di aplikasi ini: catat apa yang sudah baik, apa yang ingin diperbaiki besok, dan 3 nikmat yang disyukuri hari ini.',
    arabicPrayer: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    latinPrayer: 'Astaghfirullaahal \'azhiim alladzii laa ilaaha illaa huwal hayyul qayyuumu wa atuubu ilaiih.',
    prayerMeaning:
      'Aku memohon ampun kepada Allah Yang Maha Agung, tiada Tuhan yang berhak disembah melainkan Dia Yang Maha Hidup lagi Terus-menerus mengurus makhluk-Nya, dan aku bertaubat kepada-Nya.',
    hadithDalil: 'Hisablah (introspeksi) diri kalian sebelum kalian kelak dihisab.',
    hadithSource: 'Atsar Umar bin Al-Khattab RA',
    recommendedDurationMinutes: 15,
    timerLabel: 'Tenang & Istighfar (15m)'
  },
  {
    id: 'tidur-sunnah',
    timeStr: '21.30',
    hour: 21,
    minute: 30,
    title: 'Tidur Awal Sesuai Sunnah Nabi',
    subtitle: 'Menutup Hari dengan Dzikir & Kesucian',
    category: 'istirahat',
    sunnahDescription:
      'Tidur lebih awal, berwudhu sebelum tidur, membersihkan/mengibas tempat tidur 3 kali dengan kain, membaca doa tidur, membaca surat Al-Ikhlas, Al-Falaq, An-Nas lalu ditiupkan ke tangan dan diusap ke tubuh, serta tidur berbaring menghadap kanan.',
    prophetExample:
      'Rasulullah SAW membenci tidur sebelum shalat Isya dan membenci percakapan sia-sia sesudahnya (HR. Bukhari no. 568).',
    modernAdjustment:
      'Aktifkan mode "Jangan Ganggu" (Do Not Disturb) di HP 30 menit sebelum tidur. Jauhkan layar biru agar tidur nyenyak dan mudah bangun Tahajud.',
    arabicPrayer: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَبِاسْمِكَ أَمُوتُ',
    latinPrayer: 'Bismika Allahumma ahyaa wa bismika amuut.',
    prayerMeaning: 'Dengan nama-Mu ya Allah, aku hidup dan dengan nama-Mu aku mati.',
    hadithDalil: 'Apabila kamu hendak mendatangi tempat tidurmu, berwudhulah sebagaimana wudhumu untuk shalat, kemudian berbaringlah pada sisi kananmu...',
    hadithSource: 'HR. Bukhari no. 247 & Muslim no. 2710',
    recommendedDurationMinutes: 10,
    timerLabel: 'Dzikir Sebelum Tidur'
  }
];
