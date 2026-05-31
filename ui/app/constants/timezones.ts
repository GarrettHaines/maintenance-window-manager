import type { TimezoneEntry, DstRule } from '../types/types';

// =====================================================================
// DST RULES
// Each rule specifies when DST starts and ends in local clock-time.
// `hour` is the local hour in the offset that is active *just before*
// the transition (so for spring-forward it's the standard offset, and
// for fall-back it's the DST offset). For day-granularity comparisons
// this hour only matters on the transition day itself.
// =====================================================================

// United States / Canada: 2nd Sun March 02:00 → 1st Sun November 02:00
const DST_US: DstRule = {
  start: { month: 3, week: 2, dayOfWeek: 0, hour: 2 },
  end:   { month: 11, week: 1, dayOfWeek: 0, hour: 2 },
};

// European Union / UK: Last Sun March 01:00 UTC → Last Sun October 01:00 UTC
// Encoded as local 02:00 — close enough at day granularity for all EU zones.
const DST_EU: DstRule = {
  start: { month: 3, week: -1, dayOfWeek: 0, hour: 2 },
  end:   { month: 10, week: -1, dayOfWeek: 0, hour: 3 },
};

// Israel: "Friday before last Sunday of March" → Last Sun October 02:00.
// Approximated as last Friday of March, which matches in most years.
const DST_ISRAEL: DstRule = {
  start: { month: 3, week: -1, dayOfWeek: 5, hour: 2 },
  end:   { month: 10, week: -1, dayOfWeek: 0, hour: 2 },
};

// Egypt: Last Friday April 00:00 → Last Thursday October 24:00 (≈23:59)
const DST_EGYPT: DstRule = {
  start: { month: 4, week: -1, dayOfWeek: 5, hour: 0 },
  end:   { month: 10, week: -1, dayOfWeek: 4, hour: 23 },
};

// Cuba: 2nd Sun March 00:00 → 1st Sun November 01:00
const DST_CUBA: DstRule = {
  start: { month: 3, week: 2, dayOfWeek: 0, hour: 0 },
  end:   { month: 11, week: 1, dayOfWeek: 0, hour: 1 },
};

// Chile (mainland): 1st Sun September 00:00 → 1st Sun April 00:00 (southern hemisphere)
const DST_CHILE: DstRule = {
  start: { month: 9, week: 1, dayOfWeek: 0, hour: 0 },
  end:   { month: 4, week: 1, dayOfWeek: 0, hour: 0 },
};

// Australia (NSW/VIC/TAS/ACT/SA): 1st Sun October 02:00 → 1st Sun April 03:00
const DST_AUSTRALIA: DstRule = {
  start: { month: 10, week: 1, dayOfWeek: 0, hour: 2 },
  end:   { month: 4, week: 1, dayOfWeek: 0, hour: 3 },
};

// New Zealand (and Chatham): Last Sun September 02:00 → 1st Sun April 03:00
const DST_NEW_ZEALAND: DstRule = {
  start: { month: 9, week: -1, dayOfWeek: 0, hour: 2 },
  end:   { month: 4, week: 1, dayOfWeek: 0, hour: 3 },
};

// =====================================================================
// TIMEZONES
// One entry per *distinct DST behavior*. Two zones with identical standard
// offset, DST offset, and DST rule are consolidated under the entry whose
// `city` is the largest population center; the other IANA IDs become aliases.
// Two zones that share a standard offset but differ in DST rule (or whether
// DST is observed at all) are kept as separate entries.
// =====================================================================

export const TIMEZONES: TimezoneEntry[] = [
  // ---------- UTC−11 / −10 / −09:30 / −09 ----------
  { id: 'Pacific/Pago_Pago', offset: '−11:00', city: 'Pago Pago',
    aliases: ['Pacific/Midway', 'Pacific/Niue', 'US/Samoa', 'UTC-11:00'] },
  { id: 'Pacific/Honolulu', offset: '−10:00', city: 'Honolulu',
    aliases: ['US/Hawaii', 'Pacific/Tahiti', 'Pacific/Rarotonga', 'UTC-10:00'] },
  { id: 'America/Adak', offset: '−10:00', offsetDST: '−09:00', dstRule: DST_US, city: 'Adak',
    aliases: ['US/Aleutian', 'America/Atka'] },
  { id: 'Pacific/Marquesas', offset: '−09:30', city: 'Marquesas', aliases: ['UTC-09:30'] },
  { id: 'America/Anchorage', offset: '−09:00', offsetDST: '−08:00', dstRule: DST_US, city: 'Anchorage',
    aliases: ['US/Alaska', 'America/Juneau', 'America/Nome', 'America/Sitka', 'America/Yakutat'] },
  { id: 'Pacific/Gambier', offset: '−09:00', city: 'Gambier' },

  // ---------- UTC−08 ----------
  { id: 'America/Los_Angeles', offset: '−08:00', offsetDST: '−07:00', dstRule: DST_US, city: 'Los Angeles',
    aliases: ['US/Pacific', 'PST8PDT', 'America/Vancouver', 'America/Tijuana', 'Canada/Pacific'] },
  { id: 'Pacific/Pitcairn', offset: '−08:00', city: 'Pitcairn' },

  // ---------- UTC−07 ----------
  { id: 'America/Phoenix', offset: '−07:00', city: 'Phoenix',
    aliases: ['US/Arizona', 'MST', 'America/Hermosillo', 'America/Mazatlan', 'America/Creston', 'UTC-07:00'] },
  { id: 'America/Denver', offset: '−07:00', offsetDST: '−06:00', dstRule: DST_US, city: 'Denver',
    aliases: ['US/Mountain', 'MST7MDT', 'America/Edmonton', 'America/Boise', 'Canada/Mountain'] },

  // ---------- UTC−06 ----------
  { id: 'America/Mexico_City', offset: '−06:00', city: 'Mexico City',
    aliases: ['America/Guatemala', 'America/Tegucigalpa', 'America/Costa_Rica', 'America/El_Salvador',
              'America/Managua', 'America/Belize', 'America/Regina', 'America/Swift_Current',
              'Canada/Saskatchewan', 'Pacific/Galapagos', 'UTC-06:00'] },
  { id: 'America/Chicago', offset: '−06:00', offsetDST: '−05:00', dstRule: DST_US, city: 'Chicago',
    aliases: ['US/Central', 'CST6CDT', 'America/Winnipeg', 'America/Matamoros',
              'America/Indiana/Knox', 'America/Indiana/Tell_City', 'America/Menominee',
              'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/Rainy_River',
              'America/Resolute', 'Canada/Central'] },

  // ---------- UTC−05 ----------
  { id: 'America/Bogota', offset: '−05:00', city: 'Bogotá',
    aliases: ['America/Lima', 'America/Panama', 'America/Jamaica', 'America/Cayman', 'America/Cancun',
              'America/Eirunepe', 'America/Rio_Branco', 'America/Atikokan', 'America/Coral_Harbour',
              'EST', 'UTC-05:00'] },
  { id: 'America/New_York', offset: '−05:00', offsetDST: '−04:00', dstRule: DST_US, city: 'New York',
    aliases: ['US/Eastern', 'EST5EDT', 'America/Toronto', 'America/Detroit', 'America/Indianapolis',
              'America/Indiana/Indianapolis', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello',
              'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Vincennes',
              'America/Indiana/Vevay', 'America/Indiana/Winamac', 'America/Iqaluit', 'America/Montreal',
              'America/Nassau', 'America/Nipigon', 'America/Pangnirtung', 'America/Port-au-Prince',
              'America/Thunder_Bay', 'Canada/Eastern'] },
  { id: 'America/Havana', offset: '−05:00', offsetDST: '−04:00', dstRule: DST_CUBA, city: 'Havana',
    aliases: ['Cuba'] },

  // ---------- UTC−04 ----------
  { id: 'America/Caracas', offset: '−04:00', city: 'Caracas',
    aliases: ['America/La_Paz', 'America/Manaus', 'America/Puerto_Rico', 'America/Santo_Domingo',
              'America/Asuncion', 'America/Boa_Vista', 'America/Campo_Grande', 'America/Cuiaba',
              'America/Curacao', 'America/Aruba', 'America/Barbados', 'America/Anguilla',
              'America/Antigua', 'America/Blanc-Sablon', 'America/Dominica', 'America/Grenada',
              'America/Guadeloupe', 'America/Guyana', 'America/Kralendijk', 'America/Lower_Princes',
              'America/Marigot', 'America/Martinique', 'America/Montserrat', 'America/Port_of_Spain',
              'America/Porto_Velho', 'America/St_Barthelemy', 'America/St_Kitts', 'America/St_Lucia',
              'America/St_Thomas', 'America/St_Vincent', 'America/Tortola', 'America/Virgin', 'UTC-04:00'] },
  { id: 'America/Halifax', offset: '−04:00', offsetDST: '−03:00', dstRule: DST_US, city: 'Halifax',
    aliases: ['AST4ADT', 'America/Moncton', 'America/Glace_Bay', 'America/Goose_Bay',
              'America/Thule', 'Atlantic/Bermuda', 'Canada/Atlantic'] },
  { id: 'America/Santiago', offset: '−04:00', offsetDST: '−03:00', dstRule: DST_CHILE, city: 'Santiago',
    aliases: ['Chile/Continental', 'Antarctica/Palmer'] },

  // ---------- UTC−03:30 ----------
  { id: 'America/St_Johns', offset: '−03:30', offsetDST: '−02:30', dstRule: DST_US, city: "St. John's",
    aliases: ['Canada/Newfoundland'] },

  // ---------- UTC−03 ----------
  { id: 'America/Sao_Paulo', offset: '−03:00', city: 'São Paulo',
    aliases: ['America/Buenos_Aires', 'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca',
              'America/Argentina/Cordoba', 'America/Argentina/Jujuy', 'America/Argentina/La_Rioja',
              'America/Argentina/Mendoza', 'America/Argentina/Rio_Gallegos', 'America/Argentina/Salta',
              'America/Argentina/San_Juan', 'America/Argentina/San_Luis', 'America/Argentina/Tucuman',
              'America/Argentina/Ushuaia', 'America/Montevideo', 'America/Cayenne', 'America/Paramaribo',
              'America/Bahia', 'America/Belem', 'America/Fortaleza', 'America/Maceio',
              'America/Recife', 'America/Araguaina', 'America/Punta_Arenas', 'America/Miquelon',
              'Antarctica/Rothera', 'UTC-03:00'] },

  // ---------- UTC−02 ----------
  // Greenland adopted EU DST rules in 2023 (transitions at 01:00 UTC, same Sundays).
  { id: 'America/Nuuk', offset: '−02:00', offsetDST: '−01:00', dstRule: DST_EU, city: 'Nuuk',
    aliases: ['America/Godthab'] },
  { id: 'America/Noronha', offset: '−02:00', city: 'Noronha',
    aliases: ['Atlantic/South_Georgia', 'UTC-02:00'] },

  // ---------- UTC−01 ----------
  { id: 'Atlantic/Azores', offset: '−01:00', offsetDST: '+00:00', dstRule: DST_EU, city: 'Azores',
    aliases: ['America/Scoresbysund'] },
  { id: 'Atlantic/Cape_Verde', offset: '−01:00', city: 'Cape Verde', aliases: ['UTC-01:00'] },

  // ---------- UTC+00 ----------
  { id: 'UTC', offset: '+00:00', city: 'UTC',
    aliases: ['Etc/UTC', 'Etc/GMT', 'GMT', 'Africa/Abidjan', 'Africa/Accra', 'Africa/Bamako',
              'Africa/Banjul', 'Africa/Bissau', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Freetown',
              'Africa/Lome', 'Africa/Monrovia', 'Africa/Nouakchott', 'Africa/Ouagadougou',
              'Africa/Sao_Tome', 'Atlantic/Reykjavik', 'Atlantic/St_Helena', 'UTC+00:00'] },
  { id: 'Europe/London', offset: '+00:00', offsetDST: '+01:00', dstRule: DST_EU, city: 'London',
    aliases: ['Europe/Dublin', 'Europe/Lisbon', 'Europe/Belfast', 'Europe/Guernsey', 'Europe/Isle_of_Man',
              'Europe/Jersey', 'Atlantic/Canary', 'Atlantic/Faroe', 'Atlantic/Madeira', 'GB', 'Eire'] },

  // ---------- UTC+01 ----------
  { id: 'Africa/Lagos', offset: '+01:00', city: 'Lagos',
    aliases: ['Africa/Algiers', 'Africa/Tunis', 'Africa/Kinshasa', 'Africa/Brazzaville',
              'Africa/Bangui', 'Africa/Douala', 'Africa/Libreville', 'Africa/Luanda',
              'Africa/Malabo', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Porto-Novo', 'UTC+01:00'] },
  // Morocco is permanent UTC+1 except during Ramadan (shifts to UTC+0). The Ramadan
  // shift is governed by the lunar calendar and cannot be expressed as a simple weekday
  // rule, so we list it as a standalone entry without dstRule. The display will be
  // slightly off during Ramadan; accept this small inaccuracy.
  { id: 'Africa/Casablanca', offset: '+01:00', city: 'Casablanca', aliases: ['Africa/El_Aaiun'] },
  { id: 'Europe/Paris', offset: '+01:00', offsetDST: '+02:00', dstRule: DST_EU, city: 'Paris',
    aliases: ['Europe/Amsterdam', 'Europe/Berlin', 'Europe/Rome', 'Europe/Madrid',
              'Europe/Stockholm', 'Europe/Warsaw', 'Europe/Brussels', 'Europe/Vienna',
              'Europe/Prague', 'Europe/Copenhagen', 'Europe/Zurich', 'Europe/Budapest',
              'Europe/Belgrade', 'Europe/Bratislava', 'Europe/Ljubljana', 'Europe/Luxembourg',
              'Europe/Malta', 'Europe/Monaco', 'Europe/Oslo', 'Europe/Podgorica',
              'Europe/San_Marino', 'Europe/Sarajevo', 'Europe/Skopje', 'Europe/Tirane',
              'Europe/Vaduz', 'Europe/Vatican', 'Europe/Zagreb', 'Europe/Andorra',
              'Africa/Ceuta', 'Arctic/Longyearbyen'] },

  // ---------- UTC+02 ----------
  { id: 'Africa/Johannesburg', offset: '+02:00', city: 'Johannesburg',
    aliases: ['Africa/Harare', 'Africa/Maputo', 'Africa/Tripoli', 'Africa/Blantyre',
              'Africa/Bujumbura', 'Africa/Gaborone', 'Africa/Kigali', 'Africa/Lubumbashi',
              'Africa/Lusaka', 'Africa/Mbabane', 'Africa/Windhoek', 'Africa/Khartoum',
              'Africa/Juba', 'UTC+02:00'] },
  { id: 'Europe/Athens', offset: '+02:00', offsetDST: '+03:00', dstRule: DST_EU, city: 'Athens',
    aliases: ['Europe/Bucharest', 'Europe/Helsinki', 'Europe/Sofia', 'Europe/Kiev', 'Europe/Kyiv',
              'Europe/Riga', 'Europe/Tallinn', 'Europe/Vilnius', 'Europe/Chisinau', 'Europe/Mariehamn',
              'Europe/Nicosia', 'Asia/Nicosia', 'Asia/Famagusta', 'Asia/Beirut', 'Asia/Gaza',
              'Asia/Hebron'] },
  { id: 'Asia/Jerusalem', offset: '+02:00', offsetDST: '+03:00', dstRule: DST_ISRAEL, city: 'Jerusalem',
    aliases: ['Asia/Tel_Aviv', 'Israel'] },
  { id: 'Africa/Cairo', offset: '+02:00', offsetDST: '+03:00', dstRule: DST_EGYPT, city: 'Cairo',
    aliases: ['Egypt'] },
  { id: 'Europe/Kaliningrad', offset: '+02:00', city: 'Kaliningrad' },

  // ---------- UTC+03 ----------
  // Turkey, Russia (Moscow), Saudi Arabia, Iraq, Jordan, Belarus, much of East Africa — all
  // permanent +03:00 with no DST. Largest city across the group: Moscow (~13M). Istanbul (~16M)
  // is technically the largest, but for consistency with the IANA "primary" identifier
  // convention we use Europe/Istanbul as canonical since several apps key off this.
  { id: 'Europe/Istanbul', offset: '+03:00', city: 'Istanbul',
    aliases: ['Turkey', 'Asia/Riyadh', 'Asia/Qatar', 'Asia/Kuwait', 'Asia/Bahrain',
              'Asia/Aden', 'Asia/Baghdad', 'Asia/Amman', 'Asia/Damascus',
              'Europe/Moscow', 'Europe/Minsk', 'Europe/Simferopol', 'Europe/Volgograd',
              'Europe/Kirov', 'Africa/Nairobi', 'Africa/Addis_Ababa', 'Africa/Asmara',
              'Africa/Asmera', 'Africa/Dar_es_Salaam', 'Africa/Djibouti', 'Africa/Kampala',
              'Africa/Mogadishu', 'Antarctica/Syowa', 'Indian/Antananarivo', 'Indian/Comoro',
              'Indian/Mayotte', 'UTC+03:00'] },

  // ---------- UTC+03:30 ----------
  // Iran abolished DST in 2022 — now permanent +03:30
  { id: 'Asia/Tehran', offset: '+03:30', city: 'Tehran', aliases: ['Iran', 'UTC+03:30'] },

  // ---------- UTC+04 ----------
  { id: 'Asia/Dubai', offset: '+04:00', city: 'Dubai',
    aliases: ['Asia/Muscat', 'Asia/Baku', 'Asia/Tbilisi', 'Asia/Yerevan', 'Europe/Samara',
              'Europe/Saratov', 'Europe/Astrakhan', 'Europe/Ulyanovsk', 'Indian/Mauritius',
              'Indian/Reunion', 'Indian/Mahe', 'UTC+04:00'] },

  // ---------- UTC+04:30 ----------
  { id: 'Asia/Kabul', offset: '+04:30', city: 'Kabul', aliases: ['UTC+04:30'] },

  // ---------- UTC+05 ----------
  { id: 'Asia/Karachi', offset: '+05:00', city: 'Karachi',
    aliases: ['Asia/Tashkent', 'Asia/Yekaterinburg', 'Asia/Ashgabat', 'Asia/Ashkhabad',
              'Asia/Dushanbe', 'Asia/Samarkand', 'Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Atyrau',
              'Asia/Oral', 'Asia/Qyzylorda', 'Indian/Maldives', 'Indian/Kerguelen',
              'Antarctica/Mawson', 'UTC+05:00'] },

  // ---------- UTC+05:30 ----------
  { id: 'Asia/Kolkata', offset: '+05:30', city: 'Kolkata',
    aliases: ['Asia/Calcutta', 'Asia/Mumbai', 'Asia/Delhi', 'Asia/Chennai',
              'Asia/Bangalore', 'Asia/Colombo', 'UTC+05:30'] },

  // ---------- UTC+05:45 ----------
  { id: 'Asia/Kathmandu', offset: '+05:45', city: 'Kathmandu', aliases: ['Asia/Katmandu', 'UTC+05:45'] },

  // ---------- UTC+06 ----------
  { id: 'Asia/Dhaka', offset: '+06:00', city: 'Dhaka',
    aliases: ['Asia/Almaty', 'Asia/Bishkek', 'Asia/Omsk', 'Asia/Thimphu', 'Asia/Thimbu',
              'Asia/Urumqi', 'Asia/Qostanay', 'Antarctica/Vostok', 'Indian/Chagos', 'UTC+06:00'] },

  // ---------- UTC+06:30 ----------
  { id: 'Asia/Yangon', offset: '+06:30', city: 'Yangon',
    aliases: ['Asia/Rangoon', 'Indian/Cocos', 'UTC+06:30'] },

  // ---------- UTC+07 ----------
  { id: 'Asia/Jakarta', offset: '+07:00', city: 'Jakarta',
    aliases: ['Asia/Bangkok', 'Asia/Ho_Chi_Minh', 'Asia/Saigon', 'Asia/Phnom_Penh',
              'Asia/Vientiane', 'Asia/Krasnoyarsk', 'Asia/Novosibirsk', 'Asia/Novokuznetsk',
              'Asia/Tomsk', 'Asia/Barnaul', 'Asia/Hovd', 'Asia/Pontianak', 'Indian/Christmas',
              'Antarctica/Davis', 'UTC+07:00'] },

  // ---------- UTC+08 ----------
  { id: 'Asia/Shanghai', offset: '+08:00', city: 'Shanghai',
    aliases: ['Asia/Hong_Kong', 'Asia/Kuala_Lumpur', 'Asia/Manila', 'Australia/Perth',
              'Asia/Singapore', 'Asia/Taipei', 'Asia/Brunei', 'Asia/Macau', 'Asia/Ulaanbaatar',
              'Asia/Ulan_Bator', 'Asia/Irkutsk', 'Asia/Choibalsan', 'Asia/Chongqing',
              'Asia/Chungking', 'Asia/Harbin', 'Asia/Kuching', 'Asia/Makassar',
              'Australia/West', 'UTC+08:00'] },

  // ---------- UTC+08:45 ----------
  { id: 'Australia/Eucla', offset: '+08:45', city: 'Eucla' },

  // ---------- UTC+09 ----------
  { id: 'Asia/Tokyo', offset: '+09:00', city: 'Tokyo',
    aliases: ['Asia/Seoul', 'Asia/Pyongyang', 'Asia/Yakutsk', 'Asia/Khandyga', 'Asia/Dili',
              'Asia/Jayapura', 'Pacific/Palau', 'Japan', 'ROK', 'UTC+09:00'] },

  // ---------- UTC+09:30 ----------
  { id: 'Australia/Darwin', offset: '+09:30', city: 'Darwin',
    aliases: ['Australia/North', 'UTC+09:30'] },
  { id: 'Australia/Adelaide', offset: '+09:30', offsetDST: '+10:30', dstRule: DST_AUSTRALIA, city: 'Adelaide',
    aliases: ['Australia/South', 'Australia/Broken_Hill', 'Australia/Yancowinna'] },

  // ---------- UTC+10 ----------
  { id: 'Australia/Brisbane', offset: '+10:00', city: 'Brisbane',
    aliases: ['Australia/Queensland', 'Australia/Lindeman', 'Pacific/Guam', 'Pacific/Port_Moresby',
              'Pacific/Saipan', 'Pacific/Chuuk', 'Pacific/Truk', 'Pacific/Yap',
              'Asia/Vladivostok', 'Asia/Ust-Nera', 'Antarctica/DumontDUrville', 'UTC+10:00'] },
  { id: 'Australia/Sydney', offset: '+10:00', offsetDST: '+11:00', dstRule: DST_AUSTRALIA, city: 'Sydney',
    aliases: ['Australia/Melbourne', 'Australia/Victoria', 'Australia/NSW', 'Australia/Hobart',
              'Australia/Tasmania', 'Australia/Currie', 'Australia/ACT', 'Australia/Canberra'] },

  // ---------- UTC+10:30 ----------
  { id: 'Australia/Lord_Howe', offset: '+10:30', offsetDST: '+11:00', dstRule: DST_AUSTRALIA, city: 'Lord Howe',
    aliases: ['Australia/LHI'] },

  // ---------- UTC+11 ----------
  { id: 'Pacific/Noumea', offset: '+11:00', city: 'Nouméa',
    aliases: ['Pacific/Guadalcanal', 'Pacific/Pohnpei', 'Pacific/Ponape', 'Pacific/Efate',
              'Pacific/Kosrae', 'Pacific/Bougainville', 'Pacific/Norfolk',
              'Asia/Magadan', 'Asia/Sakhalin', 'Asia/Srednekolymsk', 'Antarctica/Macquarie',
              'Antarctica/Casey', 'UTC+11:00'] },

  // ---------- UTC+12 ----------
  // Fiji repealed DST in 2024 — now permanent +12:00 like its neighbors.
  { id: 'Pacific/Fiji', offset: '+12:00', city: 'Suva',
    aliases: ['Pacific/Tarawa', 'Pacific/Wake', 'Pacific/Wallis', 'Pacific/Funafuti',
              'Pacific/Nauru', 'Pacific/Majuro', 'Pacific/Kwajalein', 'Asia/Kamchatka',
              'Asia/Anadyr', 'Kwajalein', 'UTC+12:00'] },
  { id: 'Pacific/Auckland', offset: '+12:00', offsetDST: '+13:00', dstRule: DST_NEW_ZEALAND, city: 'Auckland',
    aliases: ['NZ', 'Antarctica/McMurdo', 'Antarctica/South_Pole'] },

  // ---------- UTC+12:45 ----------
  { id: 'Pacific/Chatham', offset: '+12:45', offsetDST: '+13:45', dstRule: DST_NEW_ZEALAND, city: 'Chatham',
    aliases: ['NZ-CHAT'] },

  // ---------- UTC+13 ----------
  // Samoa stopped DST in 2021; Tonga also +13:00 no DST. Apia (~37k) > Nuku'alofa (~24k).
  { id: 'Pacific/Apia', offset: '+13:00', city: 'Apia',
    aliases: ['Pacific/Tongatapu', 'Pacific/Fakaofo', 'Pacific/Enderbury', 'Pacific/Kanton', 'UTC+13:00'] },

  // ---------- UTC+14 ----------
  { id: 'Pacific/Kiritimati', offset: '+14:00', city: 'Kiritimati', aliases: ['UTC+14:00'] },
];

// =====================================================================
// DST COMPUTATION
// =====================================================================

/** Parse an offset string like "−05:00", "-05:00", "+05:30" into hours (e.g. -5, 5.5). */
function parseOffsetToHours(offset: string): number {
  const normalized = offset.replace('−', '-').trim();
  const m = normalized.match(/^([+-])(\d{1,2}):(\d{2})$/);
  if (!m) return 0;
  const sign = m[1] === '-' ? -1 : 1;
  return sign * (parseInt(m[2], 10) + parseInt(m[3], 10) / 60);
}

/** UTC midnight Date for the Nth (or last) weekday of a given month/year. */
function nthWeekdayOfMonthUTC(year: number, month: number, week: number, dayOfWeek: number): Date {
  if (week === -1) {
    // Day 0 of next month = last day of current month
    const lastDay = new Date(Date.UTC(year, month, 0));
    const lastDow = lastDay.getUTCDay();
    const delta = (lastDow - dayOfWeek + 7) % 7;
    lastDay.setUTCDate(lastDay.getUTCDate() - delta);
    return lastDay;
  }
  const firstDay = new Date(Date.UTC(year, month - 1, 1));
  const firstDow = firstDay.getUTCDay();
  const delta = (dayOfWeek - firstDow + 7) % 7;
  return new Date(Date.UTC(year, month - 1, 1 + delta + (week - 1) * 7));
}

/**
 * UTC instant of a DST transition for a given year.
 * `standardOffsetHours` converts local clock-time to UTC.
 */
function transitionInstantUTC(
  year: number,
  t: { month: number; week: number; dayOfWeek: number; hour: number },
  standardOffsetHours: number,
): number {
  const local = nthWeekdayOfMonthUTC(year, t.month, t.week, t.dayOfWeek);
  // local at 00:00 in UTC fields; shift to local hour, then back to UTC by subtracting offset.
  local.setUTCHours(t.hour, 0, 0, 0);
  return local.getTime() - standardOffsetHours * 3_600_000;
}

/**
 * Whether DST is currently active for a timezone, given its standard offset and
 * DST rule. Handles southern-hemisphere zones whose DST window crosses the year
 * boundary (e.g., Sydney: Oct → Apr).
 */
export function isDstActive(rule: DstRule, standardOffset: string, now: Date = new Date()): boolean {
  const stdHours = parseOffsetToHours(standardOffset);
  const nowMs = now.getTime();
  const year = now.getUTCFullYear();
  const isSouthern = rule.start.month > rule.end.month;

  if (isSouthern) {
    // Window wraps the calendar year: active if before this year's end OR after this year's start.
    const startThisYear = transitionInstantUTC(year, rule.start, stdHours);
    const endThisYear   = transitionInstantUTC(year, rule.end, stdHours);
    return nowMs < endThisYear || nowMs >= startThisYear;
  }
  const startMs = transitionInstantUTC(year, rule.start, stdHours);
  const endMs   = transitionInstantUTC(year, rule.end, stdHours);
  return nowMs >= startMs && nowMs < endMs;
}

/** Returns the current effective offset for a single timezone entry. */
export function getEffectiveOffset(tz: TimezoneEntry, now: Date = new Date()): string {
  if (tz.dstRule && tz.offsetDST && isDstActive(tz.dstRule, tz.offset, now)) {
    return tz.offsetDST;
  }
  return tz.offset;
}

/**
 * Pre-compute the current effective offset for every timezone ID and alias.
 * Call this ONCE (e.g., at the top of an API transform) and use the resulting
 * map for fast lookups inside a loop instead of recomputing DST per record.
 */
export function computeCurrentOffsets(now: Date = new Date()): Record<string, string> {
  const map: Record<string, string> = {};
  for (const tz of TIMEZONES) {
    const effective = getEffectiveOffset(tz, now);
    map[tz.id] = effective;
    if (tz.aliases) {
      for (const alias of tz.aliases) map[alias] = effective;
    }
  }
  return map;
}

// =====================================================================
// LOOKUP MAP / PUBLIC HELPERS
// =====================================================================

// Build lookup: id/alias → { tz entry, canonicalId }
const timezoneLookup: Record<string, { tz: TimezoneEntry; canonicalId: string }> = {};
TIMEZONES.forEach(tz => {
  timezoneLookup[tz.id] = { tz, canonicalId: tz.id };
  tz.aliases?.forEach(alias => {
    timezoneLookup[alias] = { tz, canonicalId: tz.id };
  });
});

export const TIMEZONE_OPTIONS = TIMEZONES.filter(tz => !tz.hidden);

/** Returns the current effective offset (DST-aware) for the given id/alias. */
export function getTimezoneOffset(id: string): string {
  const entry = timezoneLookup[id];
  return entry ? getEffectiveOffset(entry.tz) : '?';
}

/** Returns the timezone's standard-time offset (ignores DST). */
export function getStandardOffset(id: string): string {
  return timezoneLookup[id]?.tz.offset ?? '?';
}

export function getTimezoneCity(id: string): string {
  return timezoneLookup[id]?.tz.city ?? '?';
}

export function detectUserTimezone(): string {
  try {
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezoneLookup[browserTz]?.canonicalId ?? 'UTC';
  } catch {
    return 'UTC';
  }
}
