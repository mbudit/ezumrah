export interface Country {
  name: string;
  code: string;
}

export interface RecentSearch {
  id: string;
  city: string;
  country: string;
  subtext: string;
}

export interface UmrahFormOptions {
  countries: Country[];
  recentSearches: RecentSearch[];
  popularCities: string[];
  departureMonths: string[];
  costRanges: string[];
}
