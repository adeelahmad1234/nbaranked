// ISO 3166-1 alpha-2 codes for the countries represented in the current player pool.
// Extend this map if the roster in players.js ever grows to include new nationalities.
export const COUNTRY_CODES = {
  USA: 'us',
  Greece: 'gr',
  Serbia: 'rs',
  Slovenia: 'si',
  Cameroon: 'cm',
  Canada: 'ca',
  France: 'fr',
  Lithuania: 'lt',
  Australia: 'au',
  Germany: 'de',
  Turkey: 'tr',
  Israel: 'il',
  England: 'gb-eng',
  Finland: 'fi',
};

export function flagUrl(countryCode, size = 'w40') {
  return `https://flagcdn.com/${size}/${countryCode}.png`;
}
