import { PrayerTimes, Coordinates, CalculationMethod } from "adhan";

export function calculatePrayerTimes(
  date: Date,
  adjustments: Record<string, number>
) {
  const coordinates = new Coordinates(25.612323, 85.1765909);
  const params = CalculationMethod.MuslimWorldLeague();
  const prayerTimes = new PrayerTimes(coordinates, date, params);

  return {
    Fajr: adjustPrayerTime(prayerTimes.fajr, adjustments["Fajr"]),
    Dhuhr: adjustPrayerTime(prayerTimes.dhuhr, adjustments["Dhuhr"]),
    Asr: adjustPrayerTime(prayerTimes.asr, adjustments["Asr"]),
    Maghrib: adjustPrayerTime(prayerTimes.maghrib, adjustments["Maghrib"]),
    Isha: adjustPrayerTime(prayerTimes.isha, adjustments["Isha"]),
  };
}

export function adjustPrayerTime(time: Date, adjustment: number = 0): Date {
  return new Date(time.getTime() + adjustment * 60000);
}
