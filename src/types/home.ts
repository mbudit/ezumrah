export interface PrayerTimeData {
  location: string;
  nextPrayerName: string;
  nextPrayerTime: string; // e.g., "04.46"
  countdown: string; // e.g., "05 : 25 : 22"
  dateString: string; // e.g., "31 Agustus 2025"
  hijriDateString: string; // e.g., "7 Rabiul Awal 1447"
}

export interface HomeData {
  prayerData: PrayerTimeData;
}
