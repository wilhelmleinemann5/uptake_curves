import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { LoadingIndicator } from '../components/loading-indicator.component';
import { Icon } from '../components/icon.component';
import { TextAndIcon } from '../components/text-and-icon.component';
import { Button } from '../components/button.component';
import { LinkButton } from '../components/link-button.component';
import { Label } from '../components/label.component';
import { Hint } from '../components/hint.component';
import { Error } from '../components/error.component';
import { Card } from '../components/card.component';
import { Tag } from '../components/tag.component';
import { Checkbox } from '../components/checkbox.component';
import { Radio } from '../components/radio.component';
import { Switch } from '../components/switch.component';
import { CheckboxGroup } from '../components/checkbox-group.component';
import { RadioGroup } from '../components/radio-group.component';
import { SwitchGroup } from '../components/switch-group.component';
import { ListItem } from '../components/list-item.component';
import { Option } from '../components/option.component';
import { List } from '../components/list.component';
import { ButtonGroup } from '../components/button-group.component';
import { SegmentedControl } from '../components/segmented-control.component';
import { Notification } from '../components/notification.component';
import { Toast } from '../components/toast.component';
import { Pagination } from '../components/pagination.component';
import { TabBar } from '../components/tab-bar.component';
import { Modal } from '../components/modal.component';
import { Popover } from '../components/popover.component';
import { PickerItem } from '../components/picker-item.component';
import { Picker } from '../components/picker.component';
import { TimePicker } from '../components/time-picker.component';
import { MonthYearPicker } from '../components/month-year-picker.component';
import { Calendar } from '../components/calendar.component';
import { Menu } from '../components/menu.component';
import { Tooltip } from '../components/tooltip.component';
import { Avatar } from '../components/avatar.component';
import { Input } from '../components/input.component';
import { NumberStepper } from '../components/number-stepper.component';
import { Textarea } from '../components/textarea.component';
import { SelectNative } from '../components/select-native.component';
import { InputDate } from '../components/input-date.component';
import { InputTime } from '../components/input-time.component';
import { DateRange } from '../components/date-range.component';
import { FileUpload } from '../components/file-upload.component';
import { Select } from '../components/select.component';
import { MultiSelect } from '../components/multi-select.component';
import { Typeahead } from '../components/typeahead.component';
import { TypeaheadMultiSelect } from '../components/typeahead-multi-select.component';
import { Table } from '../components/table.component';
import { StepIndicator } from '../components/step-indicator.component';
import { Dialog } from '../components/dialog.component';
import { Drawer } from '../components/drawer.component';
import { TopBar } from '../components/top-bar.component';
import { SideBar } from '../components/side-bar.component';
import { ThemeSwitch } from '../components/theme-switch.component';
import { ProgressIndicator } from '../components/progress-indicator.component';
import { Badge } from '../components/badge.component';
import { InputGroup } from '../components/input-group.component';
//%%COMPONENT_IMPORT%%

@Component({
  standalone: true,
  imports: [
    Icon,
    TextAndIcon,
    LoadingIndicator,
    Button,
    LinkButton,
    Label,
    Hint,
    Error,
    Card,
    Tag,
    Checkbox,
    Radio,
    Switch,
    CheckboxGroup,
    RadioGroup,
    SwitchGroup,
    ListItem,
    Option,
    List,
    ButtonGroup,
    SegmentedControl,
    Notification,
    Toast,
    Pagination,
    TabBar,
    Modal,
    Popover,
    PickerItem,
    Picker,
    TimePicker,
    MonthYearPicker,
    Calendar,
    Menu,
    Tooltip,
    Avatar,
    Input,
    NumberStepper,
    Textarea,
    SelectNative,
    InputDate,
    InputTime,
    DateRange,
    FileUpload,
    Select,
    MultiSelect,
    Typeahead,
    TypeaheadMultiSelect,
    Table,
    StepIndicator,
    Dialog,
    Drawer,
    TopBar,
    SideBar,
    ThemeSwitch,
    ProgressIndicator,
    Badge,
    InputGroup,
    /*%%COMPONENT_IMPORT_LIST%%*/
  ],
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
