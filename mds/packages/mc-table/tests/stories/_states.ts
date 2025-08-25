import data from '../../stories/data';
import columns from '../../stories/columns';
import { ColumnsWithSubdata } from '../../stories/columns';

const dataSlice: Record<string, unknown>[] = data.slice(0, 4);
for (let index = 0; index < dataSlice.length; index++) {
  delete dataSlice[index].lastUpdate;
}

const spanConfigs = [
  { cellDataKey: '1_name', rowspan: 2 },
  { cellDataKey: '2_built', colspan: 2 },
];

export const states = [
  { data: dataSlice, disableoverflow: true, accessibility: true },
  { data: dataSlice, columns, accessibility: false },
  { data: dataSlice, zebrastripes: true, accessibility: false },
  { data: dataSlice, zebrastripes: true, expand: true, accessibility: false },
  // outer border
  { data: dataSlice, outerborderstyle: 'dotted', accessibility: false },
  { data: dataSlice, outerborderstyle: 'dashed', accessibility: false },
  { data: dataSlice, outerborderstyle: 'none', accessibility: false },
  // vertical lines
  { data: dataSlice, verticallinestyle: 'dotted', accessibility: false },
  { data: dataSlice, verticallinestyle: 'dashed', accessibility: false },
  { data: dataSlice, verticallinestyle: 'none', accessibility: false },
  // horizontal lines
  { data: dataSlice, horizontallinestyle: 'dotted', accessibility: false },
  { data: dataSlice, horizontallinestyle: 'dashed', accessibility: false },
  { data: dataSlice, horizontallinestyle: 'none', accessibility: false },
  // vertical align
  { data: dataSlice, verticalalign: 'top', accessibility: false },
  { data: dataSlice, verticalalign: 'baseline', accessibility: false },
  { data: dataSlice, verticalalign: 'bottom', accessibility: false },
  //row selector
  { data: dataSlice, columns, selectsticky: true, select: true, accessibility: true },
  //caption
  { data: dataSlice, caption: 'A caption to describe the table below', accessibility: true },
  {
    data: dataSlice,
    accessibility: true,
    slots: [{ name: 'caption', content: '<div slot="caption">A slot caption</div>' }],
  },
  //footer
  {
    data: dataSlice,
    accessibility: true,
    footer: true,
    slots: [
      {
        name: 'name_footer',
        content: `<div slot="name_footer">Footer for the name columns</div>`,
      },
      {
        name: 'built_footer',
        content: `<div slot="built_footer">Footer for the built columns</div>`,
      },
    ],
  },
  {
    data: dataSlice,
    accessibility: true,
    slots: [
      {
        name: 'built_header',
        content: `<div slot="built_header">
        Vessel built
        <br/>
        <span>subtext</span>
      </div>`,
      },
    ],
  },
  { data: dataSlice, headerhidden: true, accessibility: false },
  { data: dataSlice, columns: ColumnsWithSubdata, accessibility: true },
  { data: dataSlice, columns, accessibility: false, disableroundedcorners: true },
  // row width with headerhidden
  { data: dataSlice, columns, headerhidden: true, accessibility: false },
  // rowspan
  {
    data: dataSlice,
    columns: columns,
    spans: spanConfigs,
    verticallinestyle: 'solid',
    accessibility: false,
  },
];
