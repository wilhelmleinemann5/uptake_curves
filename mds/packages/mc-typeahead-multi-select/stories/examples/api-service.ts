export interface City {
  postalcode: string;
  name: string;
  countryCode: string;
  geonameId: number;
  lat: number;
  lng: number;
  adminCode1: string;
  adminName1: string;
  population: number;
}

export interface Option {
  value: string;
  label: string;
  sublable: string;
  id: string;
}

export class ApiServiceClass {
  public searchQuery = '';
  public startRow = 0;
  public maxRows = 10;
  public options = [];
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
        },
      );
      const data = await result.json();
      const geonames = data.geonames;
      const uniqueCity = Array.from(new Set(geonames.map((city) => city.name))).map((name) =>
        geonames.find((c) => c.name === name),
      ) as City[];
      const cities = uniqueCity.map(
        (city) =>
          ({
            value: city.name,
            label: city.name,
            sublabel: city.countryCode + ' - ' + city.adminName1,
            id: city.geonameId,
          }) as Option,
      );
      if (this.startRow === 0 || value != this.searchQuery) {
        this.options.length = 0;
      }
      this.options.push(...cities);
    }
  }
  public async loadMore(value: string): Promise<void> {
    this.options = [];
    this.startRow += this.maxRows;
    await this.search(value);
  }
}

export const apiService = new ApiServiceClass();
