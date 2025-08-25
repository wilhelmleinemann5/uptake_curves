export interface City {
  postalcode: string;
  name: string;
  countryCode: string;
  lat: number;
  lng: number;
  adminCode1: string;
  adminName1: string;
  population: number;
}

export interface Option {
  value: string;
  label: string;
  sublabel: string;
}

class ApiService {
  searchQuery = '';
  startRow = 0;
  maxRows = 10;
  public options: Option[] = [];
  public async search(value: string): Promise<void> {
    if (value != this.searchQuery || this.startRow > 0) {
      this.searchQuery = value;
      const result = await fetch(
        `https://secure.geonames.org/searchJSON?name_startsWith=${this.searchQuery}&featureCode=PPL&maxRows=${this.maxRows}&startRow=${this.startRow}&username=jhaddorp`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
          },
        }
      );
      const data = await result.json();
      const geonames = data.geonames;
      const uniqueCity = Array.from(new Set(geonames.map((city: any) => city.name))).map((name: any) =>
        geonames.find((c: any) => c.name === name)
      ) as City[];
      const cities = uniqueCity.map(
        (city) =>
          ({
            value: city.name,
            label: city.name,
            sublabel: city.countryCode + ' - ' + city.adminName1,
          } as Option)
      );
      if (this.startRow === 0 || value != this.searchQuery) {
        this.options.length = 0;
      }
      this.options.push(...cities);
    }
  }
  loadMore = (value: string): void => {
    this.startRow += this.maxRows;
    this.search(value);
  };
}

export const apiService = new ApiService();
