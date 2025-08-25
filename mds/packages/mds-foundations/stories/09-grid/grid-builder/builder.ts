import { IMcCCodePreview, IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../story-utils';

type Breakpoint = 'xs' | 'sm' | 'md';
type Breakpoints = {
  label: string;
  value: Breakpoint;
  columns: number;
};
type CellStyles = {
  position?: string | null;
  zIndex?: string | null;
  left?: number | null;
  top?: number | null;
  width?: number | null;
  height?: number | null;
};
type GridItem = {
  id: string;
  text: string;
  breakpoint: Breakpoint;
  col: number;
  colSpan: number;
  row: number;
  rowSpan: number;
};
type GridItemHologram = {
  id: string;
  breakpoint: Breakpoint;
  col: number;
  row: number;
  assignedId: string;
  available: boolean;
};
type Rows = {
  md: number;
  sm: number;
  xs: number;
};

const INIT_COLS = 12;
const INIT_ROWS = 4;
export const MAX_ROWS = 24;

let grid: GridItem[] = [];
let gridHologram: GridItemHologram[] = [];

let gridWrapper, gridDisplay, gridDisplayHologram, codeOutput, editDialog, editDialogInput;
let selectedCell: HTMLElement | null = null;
let hoveredCell: HTMLElement | null = null;
let editedCell: HTMLElement | null = null;
let isResizing = false;
let isHandleActive = false;
let initialMouseX = 0;
let initialMouseY = 0;
let initialWidth = 0;
let initialHeight = 0;
let initialOffsetX = 0;
let initialOffsetY = 0;
const rowHeight = 56;
let cols = INIT_COLS;
export let rows: Rows = { md: INIT_ROWS, sm: INIT_ROWS, xs: INIT_ROWS };
let gap = 0;
let breakpoint: Breakpoint = 'md';
let cellCount = 0;

const code: IMcCCode[] = [
  {
    label: 'HTML',
    template: `<div class="mds-grid"></div>`,
    language: 'javascript',
  },
];

export const breakpoints: Breakpoints[] = [
  {
    label: '12 columns (1025px +)',
    value: 'md',
    columns: 12,
  },
  {
    label: '6 columns (641 - 1024)',
    value: 'sm',
    columns: 6,
  },
  {
    label: '2 columns (0 - 640)',
    value: 'xs',
    columns: 2,
  },
];

export const initGridBuilder = () => {
  gridWrapper = document.getElementById('grid-wrapper');
  gridDisplayHologram = document.getElementById('grid-display-hologram');
  gridDisplay = document.getElementById('grid-display');
  codeOutput = document.getElementById('generated-code') as IMcCCodePreview;
  editDialog = document.getElementById('edit-dialog') as IMcDialog;
  editDialogInput = document.getElementById('edit-dialog-input') as IMcInput;
  generateGridHologramData();
  generateGrid();
  updateGeneratedCode();
};

const generateGridHologramData = () => {
  breakpoints.forEach((b) => {
    for (let i = 1; i <= rows[b.value] * b.columns; i++) {
      const hologram = {
        id: `${b.value}-${i}`,
        breakpoint: b.value,
        col: ((i - 1) % b.columns) + 1,
        row: Math.ceil(i / b.columns),
        available: true,
        assignedId: '',
      };
      gridHologram.push(hologram);
    }
  });
};

const generateGrid = () => {
  resetGridElements();
  generateGridHologram();
  getGridGapSize();
  setGridHologramHeight();
};

const generateGridHologram = () => {
  if (!gridDisplayHologram) return;

  // Generate grid items
  gridHologram
    .filter((item) => item.breakpoint === breakpoint)
    .forEach((item) => {
      const divHologram = document.createElement('div');
      divHologram.classList.add('grid-item-hologram');
      divHologram.textContent = '+';
      divHologram.id = item.id;
      divHologram.addEventListener('click', selectCell); // Select cell on click
      divHologram.addEventListener('dragover', onHologramDragOver);
      divHologram.addEventListener('mouseover', onHologramMouseOver);
      divHologram.addEventListener('mouseout', onHologramMouseOut);
      gridDisplayHologram?.appendChild(divHologram);
    });
};

// Function to select a cell
const selectCell = (event) => {
  cellCount++;
  const activeCell = event.currentTarget;
  const cellId = `GI-${cellCount}`;
  const cellText = `${cellCount}`;
  const hologramItem: GridItemHologram = gridHologram.find((item) => item.id === activeCell.id) as GridItemHologram;

  // Create cell
  const div = document.createElement('div');
  div.id = cellId;
  breakpoints.forEach((b) => {
    let data: GridItem | null = null;
    let dataHologram: GridItemHologram | null = null;

    if (breakpoint === b.value) {
      data = {
        id: cellId,
        text: cellText,
        breakpoint: b.value,
        col: hologramItem.col ?? 1,
        colSpan: 1,
        row: hologramItem.row ?? 1,
        rowSpan: 1,
      };
      dataHologram = { ...hologramItem, assignedId: cellId, available: false };
    } else {
      const available = gridHologram.find((item) => item.available && item.breakpoint === b.value);
      if (available) {
        data = {
          id: cellId,
          text: cellText,
          breakpoint: b.value,
          col: available?.col ?? 1,
          colSpan: 1,
          row: available?.row ?? 1,
          rowSpan: 1,
        };
        dataHologram = { ...available, assignedId: cellId, available: false };
      } else {
        rows[b.value]++;
        addRows(rows[b.value], b.value);
        generateGridHologram();
        getGridGapSize();
        setGridHologramHeight();
        updateGeneratedCode();
        document.getElementById(`rows-${b.value}`)?.setAttribute('value', rows[b.value].toString());

        const available = gridHologram.find(
          (item) => item.available && item.breakpoint === b.value && item.row === rows[b.value] && item.col === 1,
        );
        if (available) {
          data = {
            id: cellId,
            text: cellText,
            breakpoint: b.value,
            col: 1,
            colSpan: 1,
            row: rows[b.value],
            rowSpan: 1,
          };
          dataHologram = {
            ...available,
            assignedId: cellId,
            available: false,
          };
        }
      }
    }
    if (data && dataHologram) {
      const indexGridItemHologram = gridHologram.findIndex((item) => item.id === dataHologram?.id);
      gridHologram.splice(indexGridItemHologram, 1);
      gridHologram.push(dataHologram);
      const indexGridItem = gridHologram.findIndex((item) => item.id === dataHologram?.id);
      grid.splice(indexGridItem, 1);
      grid.push(data);
      addCssClasses(div);
    }
  });

  const text = document.createElement('span');
  text.textContent = cellText;
  div.appendChild(text);

  // Add cell settings button
  const settingsMenu = createCellSettingsMenu(div);
  div.appendChild(settingsMenu);

  // Add a handle for resizing the cell
  const resizeHandle = createResizeHandle(div);
  div.appendChild(resizeHandle);

  // Add event listeners for dragging the cell
  div.setAttribute('draggable', 'true');
  div.addEventListener('dragstart', onDragStart);
  div.addEventListener('drag', onDrag);
  div.addEventListener('dragend', onDragEnd);
  // Add the cell to the grid display
  gridDisplay?.appendChild(div);

  updateGeneratedCode();
};

// Resizing cell
const startResize = (event, cell) => {
  isResizing = true;

  selectedCell = cell;
  if (selectedCell) {
    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', endResize);
    initialMouseX = event.clientX;
    initialMouseY = event.clientY;
    const cellRect = selectedCell.getBoundingClientRect();

    if (gridDisplay) {
      initialOffsetX = cellRect.left - gridDisplay.getBoundingClientRect().left;
      initialOffsetY = cellRect.top - gridDisplay.getBoundingClientRect().top;
    }
    initialWidth = selectedCell.offsetWidth;
    initialHeight = selectedCell.offsetHeight;

    selectedCell?.classList.add('active');

    // Make the item absolute
    setCellStyles(selectedCell, {
      position: 'absolute',
      zIndex: '1000',
      left: initialOffsetX,
      top: initialOffsetY,
      width: initialWidth,
      height: initialHeight,
    });

    // Add event listeners to grid-item-hologram cells for hover effect
    document.addEventListener('mousemove', (event) => {
      if (isResizing) {
        const hologramCells = document.querySelectorAll('.grid-item-hologram');
        hologramCells.forEach((cell) => {
          const cellRect = cell.getBoundingClientRect();
          const selectedCellRect = selectedCell?.getBoundingClientRect();
          const hologramItem = gridHologram.find((h) => h.id === cell.id);
          const hologramItemIndex = gridHologram.findIndex((h) => h.id === cell.id);
          if (
            hologramItem &&
            selectedCellRect &&
            selectedCellRect.left < cellRect.right &&
            selectedCellRect.right > cellRect.left &&
            selectedCellRect.top < cellRect.bottom &&
            selectedCellRect.bottom > cellRect.top
          ) {
            cell.classList.add('active');
            const hologramData = {
              ...hologramItem,
              assignedId: selectedCell ? selectedCell.id : '',
              available: false,
            };
            gridHologram.splice(hologramItemIndex, 1);
            gridHologram.push(hologramData);
          } else {
            cell.classList.remove('active');
          }
        });
      }
    });
  }
};

const onResize = (event) => {
  if (!isResizing || !isHandleActive) return;

  const dx = event.clientX - initialMouseX;
  const dy = event.clientY - initialMouseY;
  if (selectedCell) {
    selectedCell.style.width = `${initialWidth + dx}px`;
    selectedCell.style.height = `${initialHeight + dy}px`;
  }
};

const endResize = () => {
  isResizing = false;
  isHandleActive = false;
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', endResize);
  if (selectedCell) {
    const cellRect = selectedCell.getBoundingClientRect();
    const gridRect = gridDisplayHologram.getBoundingClientRect();

    // Calculate the grid start position for rows and columns
    const startCol = Math.floor((cellRect.left - gridRect.left) / (gridRect.width / cols)) + 1;
    const startRow = Math.floor((cellRect.top - gridRect.top) / (gridRect.height / rows[breakpoint])) + 1;

    // Calculate the grid spans
    const initColSpan = Math.ceil(selectedCell.offsetWidth / (gridRect.width / cols));
    const colSpan = initColSpan > cols ? cols : initColSpan;
    const initRowSpan = Math.ceil(selectedCell.offsetHeight / (gridRect.height / rows[breakpoint]));
    const rowSpan = initRowSpan > rows[breakpoint] ? rows[breakpoint] : initRowSpan;

    // Check if there is already a cell in the spanned area
    const cells = document.querySelectorAll('.grid-item');
    let canResize = true;

    cells.forEach((cell) => {
      if (cell === selectedCell) return;
      if (selectedCell) {
        const cellRect = cell.getBoundingClientRect();
        const selectedCellRect = selectedCell.getBoundingClientRect();

        if (
          selectedCellRect.left < cellRect.right &&
          selectedCellRect.right > cellRect.left &&
          selectedCellRect.top < cellRect.bottom &&
          selectedCellRect.bottom > cellRect.top
        ) {
          canResize = false;
        }
      }
    });

    if (!canResize) {
      setCellStyles(selectedCell, { height: initialHeight });
      console.warn('No place to resize the cell');
      cleanActiveHologramCells();
      return;
    }
    const calculatedHeight = calculateHeight(rowSpan, rowHeight);

    // Reset all styles for absolute positioning
    setCellStyles(selectedCell, { height: calculatedHeight });

    // Update the grid classes
    const selectedCellData: GridItem = {
      id: selectedCell?.id,
      text: selectedCell?.textContent || '',
      breakpoint: breakpoint,
      col: startCol,
      colSpan: colSpan,
      row: startRow,
      rowSpan: rowSpan,
    };
    const indexItem = grid.findIndex((item) => item.id === selectedCell?.id && item.breakpoint === breakpoint);
    grid.splice(indexItem, 1);
    grid.push(selectedCellData);

    addCssClasses(selectedCell);
    // Update grid hologram item with new assigned id and availability
    const assignedIdHologramCells = gridHologram.filter(
      (hologram) => hologram.assignedId === selectedCellData.id && hologram.breakpoint === breakpoint,
    );
    assignedIdHologramCells.forEach((item) => {
      let hologramItemData: GridItemHologram | null = null;
      // const indexItem = gridHologram.findIndex((i) => item.id === i.id);
      if (
        selectedCellData &&
        selectedCellData.id &&
        selectedCellData.col + selectedCellData.colSpan > item.col &&
        selectedCellData.row + selectedCellData.rowSpan > item.row
      ) {
        hologramItemData = {
          ...item,
          assignedId: selectedCellData.id,
          available: false,
        };
      } else {
        hologramItemData = { ...item, assignedId: '', available: true };
      }
      gridHologram.splice(gridHologram.indexOf(item), 1);
      gridHologram.push(hologramItemData);
    });

    selectedCell = null;
    updateGeneratedCode();
  }
};

// Drag and drop cell
const onDragStart = (event: DragEvent) => {
  const target = event.target as HTMLElement;
  if (target && target.classList.contains('grid-item')) {
    selectedCell = target;
    selectedCell.classList.add('active');
    cleanActiveHologramCells();
  }
};

const onDrag = () => {
  if (!selectedCell) return;

  // Set the cell position to follow the mouse cursor
  selectedCell.style.display = 'none';
};

const onHologramDragOver = (event: DragEvent) => {
  event.preventDefault();
  const target = event.target as HTMLElement;
  if (target && target.classList.contains('grid-item-hologram')) {
    if (hoveredCell) {
      // Remove highlighting from previously hovered cell
      hoveredCell.classList.remove('active');
      hoveredCell.classList.remove('hover');
    }

    // Add highlighting to the current hovered cell
    target.classList.add('active');
    hoveredCell = target;
  }
};

const onDragEnd = () => {
  if (!selectedCell || !hoveredCell) return;
  const hoveredCellData = gridHologram.find((item) => item.id === hoveredCell?.id && item.breakpoint === breakpoint);
  const selectedCellData = grid.find((item) => item.id === selectedCell?.id && item.breakpoint === breakpoint);
  if (hoveredCellData && selectedCellData) {
    // check if there is a place for selected cell
    if (
      hoveredCellData.col + selectedCellData.colSpan - 1 > cols ||
      hoveredCellData.row + selectedCellData.rowSpan - 1 > rows[breakpoint]
    ) {
      console.warn('No place for dropping the cell');
      cleanActiveHologramCells();
    } else {
      selectedCellData.col = hoveredCellData.col;
      selectedCellData.row = hoveredCellData.row;
      grid.splice(grid.indexOf(selectedCellData), 1);
      grid.push(selectedCellData);
      addCssClasses(selectedCell);

      // reset all hologram items that were previously assigned to the dragged cell
      const hologramCellData = gridHologram.filter(
        (item) => item.assignedId === selectedCellData.id && item.breakpoint === breakpoint,
      );
      if (hologramCellData) {
        hologramCellData.forEach((element) => {
          const indexItem = gridHologram.findIndex((item) => element.id === item.id);
          const data = { ...element, assignedId: '', available: true };
          gridHologram.splice(indexItem, 1);
          gridHologram.push(data);
        });
      }
      // assign the dragged cell to the new hologram items
      gridHologram
        .filter((item) => item.breakpoint === breakpoint)
        .forEach((divHologramData) => {
          if (
            divHologramData &&
            selectedCellData &&
            selectedCellData.id &&
            divHologramData.col < selectedCellData.col + selectedCellData.colSpan &&
            divHologramData.col >= selectedCellData.col &&
            divHologramData.row < selectedCellData.row + selectedCellData.rowSpan &&
            divHologramData.row >= selectedCellData.row
          ) {
            const data = { ...divHologramData, assignedId: selectedCellData.id, available: false };
            gridHologram.splice(gridHologram.indexOf(divHologramData), 1);
            gridHologram.push(data);
          }
        });
    }
  }

  // Remove highlight from the hovered and dragged cell
  if (hoveredCell) {
    hoveredCell.classList.remove('active');
  }
  if (selectedCell) {
    selectedCell.style.display = '';
    selectedCell.classList.remove('active');
  }

  // reset the dragged and hovered cell
  selectedCell = null;
  hoveredCell = null;

  updateGeneratedCode();
};

// Utils classes
const createCellSettingsMenu = (div: HTMLElement) => {
  const settingsMenu = document.createElement('mc-menu') as IMcMenu;
  settingsMenu.className = 'settings-menu';
  settingsMenu.trigger = 'click';
  // trigger button
  const triggerButton = document.createElement('mc-button') as IMcButton;
  triggerButton.slot = 'trigger';
  triggerButton.label = 'Delete cell';
  triggerButton.hiddenlabel = true;
  triggerButton.fit = 'small';
  triggerButton.icon = 'ellipsis-vertical';
  triggerButton.appearance = 'neutral';
  triggerButton.variant = 'plain';
  triggerButton.padding = 'compact';
  settingsMenu.appendChild(triggerButton);
  // menu items
  const menuItem = document.createElement('mc-list') as IMcMenuItem;
  const menuItemEdit = document.createElement('mc-list-item') as IMcListItem;
  menuItemEdit.label = 'Edit';
  menuItemEdit.icon = 'pencil';
  menuItemEdit.addEventListener('click', () => editCell(div));
  menuItem.appendChild(menuItemEdit);
  const menuItemDelete = document.createElement('mc-list-item') as IMcListItem;
  menuItemDelete.label = 'Delete';
  menuItemDelete.icon = 'trash';
  menuItemDelete.addEventListener('click', (event) => removeCell(div, event));
  menuItem.appendChild(menuItemDelete);

  settingsMenu.appendChild(menuItem);
  return settingsMenu;
};

const createResizeHandle = (div: HTMLElement) => {
  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'resize-button';
  resizeHandle.innerHTML =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10L10 6M1 10L10 1" stroke="#40AB35"/></svg>';
  resizeHandle.addEventListener('mousedown', (event) => {
    event.stopPropagation();
    event.preventDefault();
    isHandleActive = true;
    startResize(event, div);
  });
  resizeHandle.addEventListener('dragstart', (event) => event.preventDefault());
  return resizeHandle;
};

const calculateHeight = (rowSpan: number, rowHeight: number): number => {
  getGridGapSize();
  return rowSpan * rowHeight + (rowSpan - 1) * gap;
};

const getGridGapSize = () => {
  const computedStyle = window.getComputedStyle(gridDisplayHologram);
  gap = parseFloat(computedStyle.getPropertyValue('row-gap'));
};

const setGridHologramHeight = () => {
  if (gridWrapper) {
    gridWrapper.style.height = `${rows[breakpoint] * rowHeight + (rows[breakpoint] - 1) * gap}px`;
  }
};

const onHologramMouseOver = (event) => {
  const target = event.target as HTMLElement;
  if (target && target.classList.contains('grid-item-hologram')) {
    target.classList.add('hover');
  }
};

const onHologramMouseOut = (event) => {
  const target = event.target as HTMLElement;
  if (target && target.classList.contains('grid-item-hologram')) {
    target.classList.remove('hover');
  }
};

export const onColumnsChange = (e: CustomEvent) => {
  const selectedBreakpoint = breakpoints[e.detail];
  cols = selectedBreakpoint ? selectedBreakpoint.columns : INIT_COLS;
  breakpoint = selectedBreakpoint ? selectedBreakpoint.value : 'md';
  gridWrapper?.classList.remove('xs', 'sm', 'md');
  gridWrapper?.classList.add(breakpoint);
  grid = sortArray(grid) as GridItem[];
  gridHologram = sortArray(gridHologram) as GridItemHologram[];
  generateGrid();
  updateGeneratedCode();
  // set each cell height based on the row span
  const gridItemsForBreakpoint = grid.filter((item) => item.breakpoint === breakpoint);
  gridItemsForBreakpoint.forEach((cell) => {
    const calculatedHeight = calculateHeight(cell.rowSpan, rowHeight);
    const div = document.getElementById(cell.id);
    if (div) {
      setCellStyles(div, { height: calculatedHeight });
    }
  });
};

const resetGridElements = () => {
  let gridRowClasses = '';
  breakpoints.forEach((b) => {
    gridRowClasses += `mds-grid-${b.value}-rows-${rows[b.value]} `;
  });
  if (gridDisplayHologram) {
    gridDisplayHologram.innerHTML = '';
    gridDisplayHologram.className = `mds-grid ${gridRowClasses}`;
    gridDisplayHologram.style.gridTemplateRows = `repeat(${rows[breakpoint]}, ${rowHeight}px)`;
  }
  if (gridDisplay) {
    gridDisplay.className = `mds-grid ${gridRowClasses}`;
    gridDisplay.style.gridTemplateRows = `repeat(${rows[breakpoint]}, ${rowHeight}px)`;
  }
};

const addRows = (rowsNumber?: number, test?: Breakpoint) => {
  const currentBreakpoint = test ? test : breakpoint;
  if (rowsNumber) {
    rows[currentBreakpoint] = rowsNumber;
  }
  // console.log('addRows', test, rows);
  resetGridElements();
  const b = breakpoints.find((b) => b.value === currentBreakpoint) ?? breakpoints[0];
  let nextIndex = gridHologram.filter((item) => item.breakpoint === b.value).length;
  for (let i = 1; i <= b.columns; i++) {
    const hologram = {
      id: `${b.value}-${i + nextIndex}`,
      breakpoint: b.value,
      col: ((i - 1) % b.columns) + 1,
      row: rows[b.value],
      available: true,
      assignedId: '',
    };
    gridHologram.push(hologram);
  }

  sortArray(gridHologram);
};

const removeRows = (rowsNumber?: number) => {
  if (rowsNumber) {
    rows[breakpoint] = rowsNumber;
  }
  resetGridElements();
  const b = breakpoints.find((b) => b.value === breakpoint) ?? breakpoints[0];
  const hologramData = gridHologram.filter((item) => item.breakpoint === b.value && item.row > rows[breakpoint]);
  hologramData.forEach((item) => {
    const gridItem = grid.filter((gridItem) => gridItem.id === item.assignedId && gridItem.breakpoint === b.value);
    if (gridItem.length > 0) {
      gridItem.forEach((gridItem) => {
        grid.splice(grid.indexOf(gridItem), 1);
        if (gridItem.breakpoint === breakpoint) {
          const cell = document.getElementById(gridItem.id);
          cell?.remove();
        }
      });
    }
    gridHologram.splice(gridHologram.indexOf(item), 1);
  });
  sortArray(gridHologram);
};

export const onRowsChange = (e: InputEvent) => {
  const rowsNumber = e.target ? parseInt((e.target as HTMLInputElement)?.value) : INIT_ROWS;
  if (rowsNumber > rows[breakpoint]) {
    addRows(rowsNumber);
  } else {
    removeRows(rowsNumber);
  }
  generateGridHologram();
  getGridGapSize();
  setGridHologramHeight();
  updateGeneratedCode();
};

export const resetGrid = () => {
  cols = INIT_COLS;
  rows = { md: INIT_ROWS, sm: INIT_ROWS, xs: INIT_ROWS };
  breakpoint = 'md';
  cellCount = 0;
  grid = [];
  gridHologram = [];
  const colsElement = document.getElementById('columns') as IMcTabBar;
  colsElement.currentindex = 0;
  breakpoints.map((b) => {
    const rowsElement = document.getElementById(`rows-${b.value}`) as HTMLInputElement;
    if (rowsElement) {
      rowsElement.value = rows[b.value].toString();
    }
  });
  // Check if there is already a cell in the spanned area
  const cells = document.querySelectorAll('.grid-item');
  cells.forEach((cell) => {
    cell.remove();
  });
  gridWrapper?.classList.remove('xs', 'sm', 'md');
  gridWrapper?.classList.add(breakpoint);
  generateGridHologramData();
  generateGrid();
  updateGeneratedCode();
};

const cleanActiveHologramCells = () => {
  const activeHologramCells = document.querySelectorAll('.grid-item-hologram.active');
  activeHologramCells.forEach((cell) => {
    cell.classList.remove('active');
  });
};

const removeCell = (cell, event) => {
  event.stopPropagation();
  const divHologramData = gridHologram.filter((hologram) => hologram.assignedId === cell.id);
  if (divHologramData.length > 0) {
    divHologramData.forEach((hologram) => {
      const gridItem = grid.find((item) => item.id === hologram.assignedId);
      if (gridItem) {
        grid.splice(grid.indexOf(gridItem), 1);
      }
      gridHologram.splice(gridHologram.indexOf(hologram), 1);
      const data = { ...hologram, assignedId: '', available: true };
      gridHologram.push(data);
    });
  }
  cleanActiveHologramCells();
  cell.remove();
  updateGeneratedCode();
};

const editCell = (cell) => {
  editedCell = cell;
  const cellData = grid.find((item) => item.id === editedCell?.id);
  if (editDialog && editDialogInput && editedCell && cellData) {
    editDialog.heading = `Edit text for the cell ${editedCell?.id.replace('GI-', '')}`;
    editDialog.open = !editDialog.open;
    editDialogInput.value = cellData.text || '';
  }
};

export const saveCellText = () => {
  if (editDialogInput && editedCell) {
    const text = editedCell.querySelector('span');
    if (text) {
      text.textContent = editDialogInput.value;
    }
    const cellData = grid.filter((item) => item.id === editedCell?.id);
    cellData.forEach((data) => {
      data.text = editDialogInput.value;
    });
    updateGeneratedCode();
  }
};

const setCellStyles = (cell, options: CellStyles, isActive?: boolean) => {
  cell.style.position = options.position || '';
  cell.style.zIndex = options.zIndex || '';
  cell.style.left = options.left ? `${options.left}px` : '';
  cell.style.top = options.top ? `${options.top}px` : '';
  cell.style.width = options.width ? `${options.width}px` : '';
  cell.style.height = options.height ? `${options.height}px` : '';
  isActive ? cell.classList.add('active') : cell.classList.remove('active');
};

const addCssClasses = (cell: HTMLElement) => {
  const cellData = grid.filter((item) => item.id === cell.id);
  cell.className = '';
  cell.classList.add('grid-item');
  cellData.forEach((data) => {
    cell.classList.add(`mds-grid-${data.breakpoint}-col-${data.col}`);
    cell.classList.add(`mds-grid-${data.breakpoint}-col-span-${data.colSpan}`);
    cell.classList.add(`mds-grid-${data.breakpoint}-row-${data.row}`);
    cell.classList.add(`mds-grid-${data.breakpoint}-row-span-${data.rowSpan}`);
  });
};

const sortArray = (array: GridItem[] | GridItemHologram[]) => {
  return array.sort((a, b) => {
    if (a.breakpoint === b.breakpoint) {
      if (a.row === b.row) {
        return a.col - b.col;
      }
      return a.row - b.row;
    }
    return a.breakpoint.localeCompare(b.breakpoint);
  });
};

// Code generator
const updateGeneratedCode = () => {
  // Reset code output
  codeOutput.code = null;

  // mds-grid start div
  const rowClasses = breakpoints.map((b) => `mds-grid-${b.value}-rows-${rows[b.value]}`).join(' ');
  let generatedCode = `${codePreviewImports}<main class="mds-container">
  <div class="mds-grid ${rowClasses}">`;
  // Add individual grid-item div
  const uniqueGridItems = Array.from(new Set(grid.map((item) => item.id))).map((id) =>
    grid.find((item) => item.id === id),
  );

  uniqueGridItems.forEach((item) => {
    const cellClasses = breakpoints
      .map((b) => {
        const cell = grid.find((cell) => cell.id === item?.id && cell.breakpoint === b.value);
        if (!cell) return '';
        const colSpan = cell.colSpan > 1 ? ` mds-grid-${cell.breakpoint}-col-span-${cell.colSpan}` : '';
        const rowSpan = cell.rowSpan > 1 ? ` mds-grid-${cell.breakpoint}-row-span-${cell.rowSpan}` : '';
        return `mds-grid-${cell.breakpoint}-col-${cell.col}${colSpan} mds-grid-${cell.breakpoint}-row-${cell.row}${rowSpan}`;
      })
      .join(' ');
    generatedCode += `
    <div class="${cellClasses}">${item?.text}</div>`;
  });
  // mds-grid end div
  generatedCode += `
  </div>
</main>`;

  code[0].template = generatedCode;
  codeOutput.code = code;
};
