import React, { useRef } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import axios from 'axios';

import { McTypeaheadMultiSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-typeahead-multi-select';
import { IMcTypeaheadOptionSelectedDetail } from '@maersk-global/mds-components-core/mc-typeahead/types';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';
import { McTag } from '@maersk-global/mds-react-wrapper/components-core/mc-tag';
import { McInputDate } from '@maersk-global/mds-react-wrapper/components-core/mc-input-date';

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
  const [city, setCity] = React.useState<string>('');
  const [selectedCities, setSelectedCities] = React.useState<any[]>([]);
  const [selectedFromDate, setSelectedFromDate] = React.useState<string>('');
  const [selectedToDate, setSelectedToDate] = React.useState<string>('');
  const typeaheadRef = useRef<any>(null);
  const initCity = 'Copenhagen';
  const cities = useQuery({
    queryKey: ['cities', city],
    queryFn: () => getCities(city),
    enabled: !!city && city !== initCity,
  });

  const handleCitySelection = (event: CustomEvent<IMcTypeaheadOptionSelectedDetail>) => {
    if (event.detail) {
      setSelectedCities((event.detail as any[]) || []);
    }
  };

  const handleDateSelection = (event: CustomEvent<string>, dateType: 'From' | 'To') => {
    if (dateType === 'From') {
      setSelectedFromDate(event.detail);
    } else if (dateType === 'To') {
      setSelectedToDate(event.detail);
    }
  };

  const removeCity = (cityToRemove: any) => {
    if (typeaheadRef.current) {
      typeaheadRef.current.removeSelectedOption(cityToRemove);
    }
  };

  return (
    <div className="mds-grid mds-grid-cols-1">
      <div className="mds-flex mds-gap-200">
        <McInputDate
          style={{ width: '200px' }}
          label="From"
          name="fromDate"
          inputdateselected={(event: CustomEvent<string>) => handleDateSelection(event, 'From')}
          value={selectedFromDate}
        />
        <McInputDate
          style={{ width: '200px' }}
          label="To"
          name="toDate"
          inputdateselected={(event: CustomEvent<string>) => handleDateSelection(event, 'To')}
          value={selectedToDate}
        />
        <McTypeaheadMultiSelect
          ref={typeaheadRef}
          style={{ width: '200px' }}
          name="city"
          label="City"
          placeholder="Start typing city name"
          loading={cities.isLoading}
          search={(event: CustomEvent<string>) => {
            setCity(event.detail);
          }}
          optionselected={handleCitySelection}
          hiddentags
        >
          {cities.data?.geonames.map((city: any) => (
            <McOption key={city.geonameId} value={city.name} sublabel={city.countryName}>
              <i>{city.name}</i>
            </McOption>
          ))}
        </McTypeaheadMultiSelect>
      </div>
      <div className="mds-flex mds-gap-200">
        {selectedFromDate && (
          <McTag withaction dismiss={() => setSelectedFromDate('')}>
            FROM: {selectedFromDate}
          </McTag>
        )}
        {selectedToDate && (
          <McTag withaction dismiss={() => setSelectedToDate('')}>
            TO: {selectedToDate}
          </McTag>
        )}
        {selectedCities.map((city, index) => (
          <McTag key={index} withaction dismiss={() => removeCity(city)}>
            CITY: {city.label} ({city.sublabel})
          </McTag>
        ))}
        {!selectedFromDate && !selectedToDate && selectedCities.length === 0 && (
          <span style={{ color: 'var(--mds_brand_appearance_neutral_weakest_text-color)', fontStyle: 'italic' }}>
            No selections made
          </span>
        )}
      </div>
    </div>
  );
};

const TypeaheadMultiSelect = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TypeaheadInternal />
      </QueryClientProvider>
    </>
  );
};

export default TypeaheadMultiSelect;
