import React, { FormEvent } from 'react';

import { McMultiChoiceFieldsetChangeDetail } from '@maersk-global/mds-components-core/mc-multi-choice-fieldset/types';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McCheckbox } from '@maersk-global/mds-react-wrapper/components-core/mc-checkbox';
import { McCheckboxGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-checkbox-group';
import { McInput } from '@maersk-global/mds-react-wrapper/components-core/mc-input';
import { McIcon } from '@maersk-global/mds-react-wrapper/components-core/mc-icon';
import { McDateRange } from '@maersk-global/mds-react-wrapper/components-core/mc-date-range';
import { McInputDate } from '@maersk-global/mds-react-wrapper/components-core/mc-input-date';
import { McInputTime } from '@maersk-global/mds-react-wrapper/components-core/mc-input-time';
import { McModal } from '@maersk-global/mds-react-wrapper/components-core/mc-modal';
import { McMultiSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-multi-select';
import { McNumberStepper } from '@maersk-global/mds-react-wrapper/components-core/mc-number-stepper';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';
import { McRadio } from '@maersk-global/mds-react-wrapper/components-core/mc-radio';
import { McRadioGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-radio-group';
import { McSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-select';
import { McSelectNative } from '@maersk-global/mds-react-wrapper/components-core/mc-select-native';
import { McStepIndicator } from '@maersk-global/mds-react-wrapper/components-core/mc-step-indicator';
import { McSwitch } from '@maersk-global/mds-react-wrapper/components-core/mc-switch';
import { McSwitchGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-switch-group';
import { McTextarea } from '@maersk-global/mds-react-wrapper/components-core/mc-textarea';
import { McTooltip } from '@maersk-global/mds-react-wrapper/components-core/mc-tooltip';

import { countries } from './countries';
import { Fit } from '@maersk-global/mds-shared-types';
import { IDateRangeValue } from '@maersk-global/mds-components-core/mc-date-range/types';
import {
  IMcSelectNativeChangeDetail,
  McSelectNativeOptions,
  SelectOption,
} from '@maersk-global/mds-components-core/mc-select-native/types';

interface IUserForm {
  name: string;
  address: string;
  countryLiving: string;
  countryLivingPast: any;
  countryBorn: any;
  birthday: string;
  birthtime: string;
  genders: McMultiChoiceFieldsetChangeDetail;
  hobbies: McMultiChoiceFieldsetChangeDetail;
  hobbyTime?: number;
  comments: string;
  employed: McMultiChoiceFieldsetChangeDetail;
  skills: McMultiChoiceFieldsetChangeDetail;
  company: string;
  experience: number;
  terms: boolean;
  travelPeriod?: IDateRangeValue;
  uploadedFiles: any;
}

const selectedValuesFromForm = (userForm: any, fit: Fit) => {
  return (
    <div id="test">
      <div id="summary">
        <div>
          <p>Name: {userForm.name}</p>
          <p>Country name: {userForm.country}</p>
          <p>Birthday: {userForm.birthday}</p>
          <p>Gender: {userForm.genders}</p>
          <p>Hobbies: {userForm.hobbies}</p>
          <p>Comments: {userForm.comments}</p>
          <p>Is Employed? {userForm.employed}</p>
          <p>Skills: {userForm.skills}</p>
          <p>Company: {userForm.company}</p>
          <p>Agreed to the terms? {userForm.terms ? 'agreed' : 'not agreed'}</p>
        </div>
      </div>
    </div>
  );
};

const handleSubmit = (event: FormEvent) => {
  event.preventDefault();
  alert('Form was submitted');
};

const Form = () => {
  const [userForm, setUserForm] = React.useState<IUserForm>({
    name: 'Jane Doe',
    address: 'Angleton Road 1',
    countryLiving: 'DK',
    countryLivingPast: ['DK', 'PL'],
    countryBorn: [{ label: 'Poland', value: 'PL' }],
    birthday: '1990-01-30',
    birthtime: '23:35',
    genders: ['Female'],
    hobbies: ['Music', 'Art', 'Movies'],
    hobbyTime: 4,
    comments: '',
    employed: '1',
    skills: [],
    company: '',
    experience: 3,
    terms: false,
    travelPeriod: undefined,
    uploadedFiles: null,
  });
  const [currentindex, setCurrentIndex] = React.useState<number>(0);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [fit, setFit] = React.useState<Fit>('medium');

  const genderOptions = ['Female', 'Male', 'Non-binary', 'Transgender', 'Intersex', 'I prefer not to say'];
  const hobbiesOptions = ['Sport', 'Music', 'Art', 'Movies', 'Gaming', 'Books'];
  const skillsOptions = ['Javascript', 'React', 'Angular', 'VueJS', 'Go'];
  const stepIndicatorLabels = ['Personal', 'Interests', 'Work'];

  return (
    <div className="mds-grid mds-grid-cols-1">
      <div className="mds-flex mds-gap-400">
        <McButton label="small" click={() => setFit('small')}></McButton>
        <McButton label="medium" click={() => setFit('medium')}></McButton>
        <McButton label="large" click={() => setFit('large')}></McButton>
      </div>
      <McStepIndicator
        style={{ display: 'block', width: '80%', margin: '0 auto' }}
        currentindex={currentindex}
        labels={stepIndicatorLabels}
        fit={fit}
      />
      <form id="info" onSubmit={(e) => handleSubmit(e)}>
        {currentindex === 0 && (
          <div id="Personal" className="mds-grid mds-grid-cols-2">
            <McInput
              name="name"
              label="Name"
              placeholder="Write your full name"
              fit={fit}
              input={(event: Event) => {
                if (event) {
                  const value = (event?.target as HTMLInputElement).value;
                  console.log(value);
                  setUserForm({ ...userForm, name: value });
                }
              }}
            >
              <span slot="hint">Enter your name and surname</span>
            </McInput>
            <McDateRange
              name="travelPeriod"
              fromlabel="Checkin date"
              tolabel="Checkout date"
              fit={fit}
              input={(event: Event) => {
                if (event) {
                  const value = (event?.target as HTMLInputElement).value as IDateRangeValue;
                  console.log(value);
                  setUserForm({ ...userForm, travelPeriod: value });
                }
              }}
            ></McDateRange>
            <McInput
              name="address"
              placeholder="Write your address"
              fit={fit}
              input={(event: Event) => {
                if (event) {
                  const value = (event?.target as HTMLInputElement).value;
                  console.log(value);
                  setUserForm({ ...userForm, address: value });
                }
              }}
            >
              <span slot="label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Street
                <McTooltip v-if="showTooltip">
                  <McIcon slot="trigger" icon="info-circle"></McIcon>
                  <span>The HTML content of the tooltip</span>
                </McTooltip>
              </span>
              <span slot="hint">Enter your address</span>
            </McInput>
            <McSelectNative
              name="countryBorn"
              label="Nationality"
              placeholder="Country of birth"
              value={userForm.countryBorn}
              options={countries}
              fit={fit}
              change={(event: CustomEvent<IMcSelectNativeChangeDetail>) => {
                console.log('country selected: ', event.detail);
                setUserForm({
                  ...userForm,
                  countryBorn: event.detail.selectedOptions.map((option) => `${(option as SelectOption).value}`),
                });
              }}
            />
            <McSelect
              name="countryLiving"
              label="Country of living"
              placeholder="Select country"
              value={userForm.countryLiving}
              fit={fit}
              optionselected={(event: CustomEvent) => {
                setUserForm({
                  ...userForm,
                  countryLiving: event.detail.value,
                });
              }}
            >
              {countries &&
                countries.map((country) => (
                  <McOption key={country.value} value={country.value}>
                    {country.label}
                  </McOption>
                ))}
            </McSelect>
            <McMultiSelect
              name="countryLivingPast"
              label="Where did you live before"
              placeholder="Select country"
              value={userForm.countryLivingPast}
              fit={fit}
              input={(event: Event) => {
                const value = (event.target as any).value;
                setUserForm({
                  ...userForm,
                  countryLivingPast: value,
                });
              }}
            >
              {countries &&
                countries.map((country) => (
                  <McOption key={country.value} value={country.value}>
                    {country.label}
                  </McOption>
                ))}
            </McMultiSelect>
            <McInputDate
              name="birthday"
              label="Birth date"
              activedate="2022-10-01"
              fit={fit}
              value={userForm.birthday}
              input={(event: Event) => {
                const value = (event.target as HTMLInputElement).value;
                if (value) {
                  setUserForm({ ...userForm, birthday: value });
                }
              }}
            >
              <span slot="hint">Select your birth date</span>
            </McInputDate>
            <McInputTime
              name="birthtime"
              label="Birth time"
              fit={fit}
              value={userForm.birthtime}
              input={(event: Event) => {
                const value = (event.target as HTMLInputElement).value;
                if (value) {
                  setUserForm({ ...userForm, birthtime: value });
                }
              }}
            >
              <span slot="hint">Select your birth time</span>
            </McInputTime>
            <McCheckboxGroup
              legend="Gender"
              fit={fit}
              change={(event: CustomEvent<McMultiChoiceFieldsetChangeDetail>) => {
                console.log(`gender changed!`, event.detail);
                setUserForm({ ...userForm, genders: event.detail });
              }}
              value={userForm.genders}
            >
              {genderOptions.map((gender, i) => (
                <McCheckbox key={i} name="gender" value={gender} label={gender} fit={fit} />
              ))}
              <span slot="hint">Choose as many as you like</span>
            </McCheckboxGroup>
            <div className="mds-flex mds-grid-col-span-2 mds-gap-400">
              <McButton click={() => setCurrentIndex(1)} variant="filled" trailingicon="chevron-right" fit={fit}>
                Next step
              </McButton>
            </div>
          </div>
        )}
        {currentindex === 1 && (
          <div id="Interests" className="mds-grid mds-grid-cols-2">
            <div>
              <McSwitchGroup
                legend="What are you hobbies?"
                fit={fit}
                change={(event: CustomEvent<McMultiChoiceFieldsetChangeDetail>) => {
                  console.log(`hobby changed!`, event.detail);
                  setUserForm({ ...userForm, hobbies: event.detail });
                }}
                value={userForm.hobbies}
              >
                {hobbiesOptions.map((hobby, i) => (
                  <McSwitch key={i} name="hobby" label={hobby} value={hobby} fit={fit} />
                ))}
                <span slot="hint">Please select as many as you like</span>
              </McSwitchGroup>
            </div>
            <div>
              <McNumberStepper
                name="hobbyTime"
                label="How many hours do you spend daily on your hobbies?"
                placeholder="Select hours"
                fit={fit}
                input={(event: Event) => {
                  const inputElement = event.target as HTMLInputElement;
                  console.log(inputElement.value);
                  setUserForm({ ...userForm, hobbyTime: Number(inputElement.value) });
                }}
              />
            </div>
            <div>
              <McTextarea
                name="comments"
                label="Comment"
                placeholder="Describe what you do in your spare time"
                rows={5}
                maxlength={500}
                fit={fit}
                input={(event: Event) => {
                  const inputElement = event.target as HTMLInputElement;
                  console.log(inputElement.value);
                  setUserForm({ ...userForm, comments: inputElement.value });
                }}
              ></McTextarea>
            </div>
            <div className="mds-flex mds-grid-col-span-2 mds-gap-400">
              <McButton click={() => setCurrentIndex(0)} variant="outlined" icon="chevron-left" fit={fit}>
                Previous step
              </McButton>
              <McButton click={() => setCurrentIndex(2)} variant="filled" trailingicon="chevron-right" fit={fit}>
                Next step
              </McButton>
            </div>
          </div>
        )}
        {currentindex === 2 && (
          <div id="Work" className="mds-grid mds-grid-cols-2">
            <div>
              <McRadioGroup
                change={(event: CustomEvent<McMultiChoiceFieldsetChangeDetail>) => {
                  console.log(`employment status changed!`, event.detail);
                  setUserForm({ ...userForm, employed: event.detail });
                }}
                legend="Are you currently employed?"
                fit={fit}
                value={userForm.employed}
              >
                <McRadio name="employed" value="1" label="Yes" fit={fit}></McRadio>
                <McRadio name="employed" value="0" label="No" fit={fit}></McRadio>
              </McRadioGroup>
            </div>
            <div>
              <McInput
                name="company"
                label="Company"
                placeholder="Write where you work"
                fit={fit}
                input={(event: InputEvent) => {
                  const value = (event.target as HTMLInputElement).value;
                  if (value) {
                    setUserForm({ ...userForm, company: value });
                  }
                }}
              >
                <span slot="hint">Enter company name</span>
              </McInput>
              <div></div>{' '}
              <McSelectNative
                name="skills"
                placeholder="Select your skills"
                variant="multiple"
                fit={fit}
                options={skillsOptions}
                change={(event: CustomEvent<IMcSelectNativeChangeDetail>) => {
                  console.log('skills selected: ', event.detail);
                  setUserForm({
                    ...userForm,
                    skills: event.detail.selectedOptions,
                  });
                }}
              ></McSelectNative>
            </div>
            <div>
              <McTooltip fit={fit}>
                <McCheckbox
                  slot="trigger"
                  name="terms"
                  value="agreed"
                  label="I agree to the terms & conditions"
                  fit={fit}
                  change={(event: Event) => {
                    if (event) {
                      const checkbox = event.target as HTMLInputElement;
                      console.log(`agreed status changed!`, checkbox.checked);
                      setUserForm({ ...userForm, terms: checkbox.checked });
                    }
                  }}
                >
                  <span slot="hint">
                    You might like to read our full <a href="https://designsystem.maersk.com">terms & conditions</a>
                  </span>
                </McCheckbox>
                <span>You need to agree to the terms and condition</span>
              </McTooltip>
            </div>
            <div className="mds-flex mds-grid-col-span-2 mds-gap-400">
              <McButton click={() => setCurrentIndex(1)} variant="outlined" icon="chevron-left" fit={fit}>
                Previous step
              </McButton>
              <McButton
                type="submit"
                click={() => setDialogOpen(true)}
                variant="filled"
                trailingicon="chevron-right"
                fit={fit}
              >
                Send your application
              </McButton>
            </div>
          </div>
        )}
        <McModal {...(dialogOpen ? { open: true } : {})} heading="Summary of information you entered" fit="medium">
          {selectedValuesFromForm(userForm, fit)}
          <McButton
            slot="primaryAction"
            dialogaction="ok"
            click={() => setDialogOpen(false)}
            variant="filled"
            fit={fit}
          >
            Submit
          </McButton>
          <McButton
            slot="secondaryAction"
            dialogaction="cancel"
            click={() => setDialogOpen(false)}
            variant="outlined"
            fit={fit}
          >
            Cancel
          </McButton>
        </McModal>
      </form>
    </div>
  );
};

export default Form;
