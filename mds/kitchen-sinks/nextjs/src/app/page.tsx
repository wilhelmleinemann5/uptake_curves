import Link from 'next/link';
import '@maersk-global/fonts/maeu/fonts.css';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import '@maersk-global/mds-foundations/css/foundations.css';

import { Icon } from './components/Icon';
import { LoadingIndicator } from './components/LodaingIndicator';
import { TextAndIcon } from './components/TextAndIcon';
import { Button } from './components/Button';
import { Label } from './components/Label';
import { Hint } from './components/Hint';
import { Error } from './components/Error';
import { Card } from './components/Card';
import { Tag } from './components/Tag';
import { Checkbox } from './components/Checkbox';
import { Radio } from './components/Radio';
import { Switch } from './components/Switch';
import { CheckboxGroup } from './components/CheckboxGroup';
import { RadioGroup } from './components/RadioGroup';
import { SwitchGroup } from './components/SwitchGroup';
import { ListItem } from './components/ListItem';
import { Option } from './components/Option';
import { List } from './components/List';
import { ButtonGroup } from './components/ButtonGroup';
import { SegmentedControl } from './components/SegmentedControl';
import { Notification } from './components/Notification';
import { Toast } from './components/Toast';
import { Pagination } from './components/Pagination';
import { TabBar } from './components/TabBar';
import { Modal } from './components/Modal';
import { Popover } from './components/Popover';
import { PickerItem } from './components/PickerItem';
import { Picker } from './components/Picker';
import { TimePicker } from './components/TimePicker';
import { MonthYearPicker } from './components/MonthYearPicker';
import { Calendar } from './components/Calendar';
import { Menu } from './components/Menu';
import { Tooltip } from './components/Tooltip';
import { Avatar } from './components/Avatar';
import { Input } from './components/Input';
import { NumberStepper } from './components/NumberStepper';
import { Textarea } from './components/Textarea';
import { SelectNative } from './components/SelectNative';
import { InputDate } from './components/InputDate';
import { InputTime } from './components/InputTime';
import { DateRange } from './components/DateRange';
import { FileUpload } from './components/FileUpload';
import { Select } from './components/Select';
import { MultiSelect } from './components/MultiSelect';
import { Typeahead } from './components/Typeahead';
import { Table } from './components/Table';
import { StepIndicator } from './components/StepIndicator';
import { Dialog } from './components/Dialog';
import { LinkButton } from './components/LinkButton';
import { Drawer } from './components/Drawer';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { ThemeSwitch } from './components/ThemeSwitch';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Badge } from './components/Badge';
import { TypeaheadMultiSelect } from './components/TypeaheadMultiSelect';
import { InputGroup } from './components/InputGroup';
//%%COMPONENT_IMPORT%%

export default function Index() {
  return (
    <div className="mds-layout" suppressHydrationWarning={true}>
      <TopBar></TopBar>
      <SideBar>
        <nav role="navigation" aria-label="side navigation">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </SideBar>
      <main className="mds-page mds-container">
        <div className="mds-grid mds-grid-cols-2">
          <div>
            <h6>Icon:</h6>
            <Icon />
          </div>
          <div>
            <h6>Loading Indicator:</h6>
            <LoadingIndicator />
          </div>
          <div>
            <h6>Text and Icon:</h6>
            <TextAndIcon />
          </div>
          <div>
            <h6>Button:</h6>
            <Button />
          </div>
          <div>
            <h6>Label:</h6>
            <Label />
          </div>
          <div>
            <h6>Hint:</h6>
            <Hint />
          </div>
          <div>
            <h6>Error:</h6>
            <Error />
          </div>
          <div>
            <h6>Card:</h6>
            <Card />
          </div>
          <div>
            <h6>Tag:</h6>
            <Tag />
          </div>
          <div>
            <h6>Checkbox:</h6>
            <Checkbox />
          </div>
          <div>
            <h6>Radio:</h6>
            <Radio />
          </div>
          <div>
            <h6>Switch:</h6>
            <Switch />
          </div>
          <div>
            <h6>CheckboxGroup:</h6>
            <CheckboxGroup />
          </div>
          <div>
            <h6>RadioGroup:</h6>
            <RadioGroup />
          </div>
          <div>
            <h6>SwitchGroup:</h6>
            <SwitchGroup />
          </div>
          <div>
            <h6>ListItem:</h6>
            <ListItem />
          </div>
          <div>
            <h6>Option:</h6>
            <Option />
          </div>
          <div>
            <h6>List:</h6>
            <List />
          </div>
          <div>
            <h6>ButtonGroup:</h6>
            <ButtonGroup />
          </div>
          <div>
            <h6>SegmentedControl:</h6>
            <SegmentedControl />
          </div>
          <div>
            <h6>Notification:</h6>
            <Notification />
          </div>
          <div>
            <h6>Toast:</h6>
            <Toast />
          </div>
          <div>
            <h6>Pagination:</h6>
            <Pagination />
          </div>
          <div>
            <h6>TabBar:</h6>
            <TabBar />
          </div>
          <div>
            <h6>Modal:</h6>
            <Modal />
          </div>
          <div>
            <h6>Popover:</h6>
            <Popover />
          </div>
          <div>
            <h6>PickerItem:</h6>
            <PickerItem />
          </div>
          <div>
            <h6>Picker:</h6>
            <Picker />
          </div>
          <div>
            <h6>TimePicker:</h6>
            <TimePicker />
          </div>
          <div>
            <h6>MonthYearPicker:</h6>
            <MonthYearPicker />
          </div>
          <div>
            <h6>Calendar:</h6>
            <Calendar />
          </div>
          <div>
            <h6>Menu:</h6>
            <Menu />
          </div>
          <div>
            <h6>Tooltip:</h6>
            <Tooltip />
          </div>
          <div>
            <h6>Avatar:</h6>
            <Avatar />
          </div>
          <div>
            <h6>Input:</h6>
            <Input />
          </div>
          <div>
            <h6>NumberStepper:</h6>
            <NumberStepper />
          </div>
          <div>
            <h6>Textarea:</h6>
            <Textarea />
          </div>
          <div>
            <h6>SelectNative:</h6>
            <SelectNative />
          </div>
          <div>
            <h6>InputDate:</h6>
            <InputDate />
          </div>
          <div>
            <h6>InputTime:</h6>
            <InputTime />
          </div>
          <div>
            <h6>DateRange:</h6>
            <DateRange />
          </div>
          <div>
            <h6>FileUpload:</h6>
            <FileUpload />
          </div>
          <div>
            <h6>Select:</h6>
            <Select />
          </div>
          <div>
            <h6>MultiSelect:</h6>
            <MultiSelect />
          </div>
          <div>
            <h6>Typeahead:</h6>
            <Typeahead />
          </div>
          <div>
            <h6>Table:</h6>
            <Table />
          </div>
          <div>
            <h6>StepIndicator:</h6>
            <StepIndicator />
          </div>
          <div>
            <h6>LinkButton:</h6>
            <LinkButton />
          </div>
          <div>
            <h6>Dialog:</h6>
            <Dialog />
          </div>
          <div>
            <h6>Drawer:</h6>
            <Drawer />
          </div>
          <div>
            <h6>ThemeSwitch:</h6>
            <ThemeSwitch />
          </div>
          <div>
            <h6>ProgressIndicator:</h6>
            <ProgressIndicator />
          </div>
          <div>
            <h6>Badge:</h6>
            <Badge />
          </div>
        </div>
        <div>
          <h6>TypeaheadMultiSelect:</h6>
          <TypeaheadMultiSelect />
        </div>
        <div>
          <h6>InputGroup:</h6>
          <InputGroup />
        </div>
        {/* %%COMPONENT_HTML%% */}
        <footer>Next.js code examples</footer>
      </main>
    </div>
  );
}
