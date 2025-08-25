import React, { FormEvent } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import axios from 'axios';

import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McTypeahead } from '@maersk-global/mds-react-wrapper/components-core/mc-typeahead';
import { IMcTypeaheadOptionSelectedDetail } from '@maersk-global/mds-components-core/mc-typeahead/types';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';

import { countries } from './countries';

const queryClient = new QueryClient();

const getCities = (searchText: string) => {
  return axios
    .get(
      `https://secure.geonames.org/searchJSON?name_startsWith=${searchText}&featureCode=PPL&maxRows=10&startRow=0&username=jhaddorp`,
    )
    .then((res) => {
      return res.data;
    });
};

const TypeaheadInternal = () => {
  const initCityBorn = 'Warszawa';
  const initCityLiving = 'Copenhagen';

  const [countryBorn, setCountryBorn] = React.useState<string>('Poland');
  const [cityBorn, setCityBorn] = React.useState<string>(initCityBorn);
  const [countryLiving, setCountryLiving] = React.useState<string>('Denmark');
  const [cityLiving, setCityLiving] = React.useState<string>('Copenhagen');
  const cityBornQuery = useQuery({
    queryKey: ['cityBornQuery', cityBorn],
    queryFn: () => getCities(cityBorn),
    enabled: !!cityBorn && cityBorn !== initCityBorn,
  });

  const cityLivingQuery = useQuery({
    queryKey: ['cityLivingQuery', cityLiving],
    queryFn: () => getCities(cityLiving),
    enabled: !!cityLiving && cityLiving !== initCityLiving,
  });

  return (
    <div className="mds-grid mds-grid-cols-1">
      <div>
        <McTypeahead
          name="countryBorn"
          label="Which country were you born"
          placeholder="Start typing city name"
          value={countryBorn}
          search={(event: CustomEvent<string>) => {
            setCountryBorn(event.detail);
          }}
          optionselected={(event: CustomEvent<any>) => {
            setCountryBorn(event.detail.label);
          }}
          data={countries.map((country) => ({ label: country.label, value: country.label }))}
        ></McTypeahead>
        <McTypeahead
          name="cityBorn"
          label="Which city were you born"
          placeholder="Start typing city name"
          loading={cityBornQuery.isLoading}
          value={cityBorn}
          search={(event: CustomEvent) => {
            setCityBorn(event.detail);
          }}
          optionselected={(event: CustomEvent) => {
            setCityBorn(event.detail.label);
          }}
          data={cityBornQuery.data?.geonames.map((city: any) => ({
            label: city.name,
            value: city.name,
            sublabel: city.countryName,
          }))}
        ></McTypeahead>
        <McTypeahead
          name="countryLiving"
          label="Which country do you currently live"
          placeholder="Start typing city name"
          value={countryLiving}
          search={(event: CustomEvent<string>) => {
            setCountryLiving(event.detail);
          }}
          optionselected={(event: CustomEvent<any>) => {
            setCountryLiving(event.detail.label);
          }}
        >
          {countries.map((country: any) => (
            <McOption key={country.value} value={country.label}>
              <i>{country.label}</i>
            </McOption>
          ))}
        </McTypeahead>
        <McTypeahead
          name="cityLiving"
          label="Which city do you currently live"
          placeholder="Start typing city name"
          loading={cityLivingQuery.isLoading}
          value={cityLiving}
          search={(event: CustomEvent<string>) => {
            setCityLiving(event.detail);
          }}
          optionselected={(event: CustomEvent<IMcTypeaheadOptionSelectedDetail>) => {
            if (event.detail) {
              setCityLiving(event.detail?.label);
            }
          }}
        >
          {cityLivingQuery.data?.geonames.map((city: any) => (
            <McOption key={city.geonameId} value={city.name} sublabel={city.countryName}>
              <i>{city.name}</i>
            </McOption>
          ))}
        </McTypeahead>
      </div>
      <McButton label="Submit" click={() => console.log('click', cityBorn, cityLiving)}></McButton>
      <McButton label="Change country" appearance="neutral" click={() => setCountryBorn('Germany')}></McButton>
      <McButton
        label="Change country option"
        appearance="neutral"
        click={() => countries.push({ label: 'Test', value: 'test' })}
      ></McButton>
      <br />
      <br />
      <McButton label="Clear country born" appearance="neutral" click={() => setCountryBorn('')}></McButton>
      <McButton label="Clear city born" appearance="neutral" click={() => setCityBorn('')}></McButton>
      <McButton label="Clear country living" appearance="neutral" click={() => setCountryLiving('')}></McButton>
      <McButton label="Clear city living" appearance="neutral" click={() => setCityLiving('')}></McButton>
    </div>
  );
};

const Typeahead = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TypeaheadInternal />
      </QueryClientProvider>
    </>
  );
};

export default Typeahead;
