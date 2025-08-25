/* eslint-disable */
import { html } from 'lit';
import { McTable } from '../src';
import '../src';
import data, { dataWithSelectDisabled, Vessel } from '../stories/data';
import defaultColumns, { HeaderGroupsColumns } from '../stories/columns';
import { ColumnSorter, TableColumn } from '../src/lib/types';
import { McCheckbox } from '@maersk-global/mds-components-core-checkbox';
import { McButton } from '@maersk-global/mds-components-core-button';

const getFill = (status: string): string => {
  switch (status) {
    case 'On schedule':
      return 'green';
    case 'Delayed':
      return 'red';
    case 'Stalled':
      return 'yellow';
    default:
      return 'gray';
  }
};

const getSlot = ($el: any): any => {
  return $el[0].querySelector('slot').assignedElements({ flatten: true })[0];
};

const getSvg = (slot: any): any => {
  return slot.querySelector('circle');
};

const dataCopy = structuredClone(data);

context('mc-table', () => {
  describe('mounting and passing props', () => {
    beforeEach(() => {
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any}></mc-table>`).as('mc-table');
    });
    it('mounts', () => {
      cy.get('@mc-table');
    });
    it('passes the data', () => {
      cy.get('@mc-table').find('tr').eq(1).find('td').as('tr');
      cy.get('@tr').eq(0).should('contain.text', '1');
      cy.get('@tr').eq(1).should('contain.text', 'Madrid Maersk');
      cy.get('@tr').eq(2).should('contain.text', 'Container ship');
      cy.get('@tr').eq(3).should('contain.text', '2017');
      cy.get('@tr').eq(4).should('contain.text', '399');
      cy.get('@tr').eq(5).should('contain.text', '19630');
    });
    it('autogenerates column names when column not passed', () => {
      cy.get('@mc-table').find('tr').eq(0).find('th').as('tr');
      cy.get('@tr').eq(0).should('contain.text', 'id');
      cy.get('@tr').eq(1).should('contain.text', 'name');
      cy.get('@tr').eq(2).should('contain.text', 'type');
      cy.get('@tr').eq(3).should('contain.text', 'built');
      cy.get('@tr').eq(4).should('contain.text', 'length');
      cy.get('@tr').eq(5).should('contain.text', 'capacity');
    });
    it('it sets the custom column names', () => {
      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).columns = defaultColumns;
        cy.get('@mc-table').find('tr').eq(0).find('th').as('tr');
        cy.get('@tr').eq(0).should('contain.text', 'Name');
        cy.get('@tr').eq(1).should('contain.text', 'Last port');
        cy.get('@tr').eq(2).should('contain.text', 'Built (year)');
        cy.get('@tr').eq(3).should('contain.text', 'Length (m)');
        cy.get('@tr').eq(4).should('contain.text', 'Capacity (TEU)');
      });
    });
    it('does not break if data is null', () => {
      const oldTable = document.querySelector('mc-table');
      oldTable?.remove();
      cy.mount<McTable>(html`<mc-table .data=${null}></mc-table>`).as('mc-table');
      cy.get('@mc-table').find('thead').find('tr').should('exist');
    });
  });
});
describe('passing custom components', () => {
  beforeEach(() => {
    cy.mount<McTable>(
      html`<mc-table sortdisabled .data=${dataCopy as any} .columns=${defaultColumns}>
        ${data.map(
          (row) =>
            html` <div slot="${row.id}_name">
              <svg height="50" width="50">
                <circle cx="25" cy="25" r="5" fill=${getFill(row.status)} />
              </svg>
              ${row.name}
            </div>`,
        )}</mc-table
      >`,
    ).as('mc-table');
  });
  it('mounts', () => {
    cy.get('@mc-table');
  });
  it('shows custom component in the name column', () => {
    cy.get('@mc-table')
      .find('tr')
      .eq(1)
      .find('td')
      .eq(0)
      .then(($el) => {
        const slot = getSlot($el);
        cy.get(slot).should('contain.text', 'Madrid Maersk');
        cy.get(getSvg(slot)).should('have.attr', 'fill', 'green');
      });
    cy.get('@mc-table')
      .find('tr')
      .eq(2)
      .find('td')
      .eq(0)
      .then(($el) => {
        const slot = getSlot($el);
        cy.get(slot).should('contain.text', 'Mary Maersk');
        cy.get(getSvg(slot)).should('have.attr', 'fill', 'red');
      });
    cy.get('@mc-table')
      .find('tr')
      .eq(3)
      .find('td')
      .eq(0)
      .then(($el) => {
        const slot = getSlot($el);
        cy.get(slot).should('contain.text', 'Gerner Maersk');
        cy.get(getSvg(slot)).should('have.attr', 'fill', 'green');
      });
    cy.get('@mc-table')
      .find('tr')
      .eq(4)
      .find('td')
      .eq(0)
      .then(($el) => {
        const slot = getSlot($el);
        cy.get(slot).should('contain.text', 'Emma Maersk');
        cy.get(getSvg(slot)).should('have.attr', 'fill', 'green');
      });
    cy.get('@mc-table')
      .find('tr')
      .eq(5)
      .find('td')
      .eq(0)
      .then(($el) => {
        const slot = getSlot($el);
        cy.get(slot).should('contain.text', 'Johannes Maersk');
        cy.get(getSvg(slot)).should('have.attr', 'fill', 'yellow');
      });
    cy.get('@mc-table')
      .find('tr')
      .eq(6)
      .find('td')
      .eq(0)
      .then(($el) => {
        const slot = getSlot($el);
        cy.get(slot).should('contain.text', 'Svendborg Maersk');
        cy.get(getSvg(slot)).should('have.attr', 'fill', 'green');
      });
    cy.get('@mc-table')
      .find('tr')
      .eq(7)
      .find('td')
      .eq(0)
      .then(($el) => {
        const slot = getSlot($el);
        cy.get(slot).should('contain.text', 'Tove Maersk');
        cy.get(getSvg(slot)).should('have.attr', 'fill', 'gray');
      });
  });
});

describe('custom templates', () => {
  it('should render custom cell template', () => {
    const columns: TableColumn[] = [
      {
        id: 'status',
        label: 'Status',
        cellTemplate: (details) => details.html`
            <div data-cy="status-cell">
              <mc-tag appearance="success">${details.value}</mc-tag>
            </div>
          `,
      },
    ];

    cy.mount<McTable>(html`<mc-table .data=${dataCopy} .columns=${columns}></mc-table>`);

    cy.get('[data-cy="status-cell"]')
      .should('exist')
      .find('mc-tag')
      .should('contain.text', dataCopy[0].status)
      .should('be.visible');
  });

  it('should render custom header template', () => {
    const columns: TableColumn[] = [
      {
        id: 'name',
        label: 'Vessel Name',
        headerTemplate: (details) => details.html`
            <div data-cy="name-header" class="mds-flex mds-gap-100 mds-items-center">
              ${details.column.label}
              <mc-button
                icon="ship"
                variant="plain"
                padding="none"
                fit="small"
                label="View vessel details"
              ></mc-button>
            </div>
          `,
      },
    ];

    cy.mount<McTable>(html`<mc-table .data=${dataCopy} .columns=${columns}></mc-table>`);

    cy.get('[data-cy="name-header"]')
      .should('exist')
      .and('contain.text', 'Vessel Name')
      .find('mc-button')
      .should('exist')
      .and('be.visible');
  });

  it('should handle conditional rendering in cell template', () => {
    const columns: TableColumn[] = [
      {
        id: 'status',
        label: 'Status',
        cellTemplate: (details) => {
          let appearance;
          switch (details.value) {
            case 'On schedule':
              appearance = 'success';
              break;
            case 'Delayed':
              appearance = 'warning';
              break;
            default:
              appearance = 'neutral';
          }
          return details.html`
              <mc-tag data-cy="status-tag" appearance="${appearance}">${details.value}</mc-tag>
            `;
        },
      },
    ];

    cy.mount<McTable>(html`<mc-table sortdisabled .data=${dataCopy} .columns=${columns}></mc-table>`);

    // Verify each status has correct appearance
    cy.get('[data-cy="status-tag"]').should('have.length', 7);
    cy.get('[data-cy="status-tag"]').eq(0).should('have.attr', 'appearance', 'success').and('be.visible');
    cy.get('[data-cy="status-tag"]').eq(1).should('have.attr', 'appearance', 'warning').and('be.visible');
    cy.get('[data-cy="status-tag"]').eq(2).should('have.attr', 'appearance', 'success').and('be.visible');
    cy.get('[data-cy="status-tag"]').eq(3).should('have.attr', 'appearance', 'success').and('be.visible');
    cy.get('[data-cy="status-tag"]').eq(4).should('have.attr', 'appearance', 'neutral').and('be.visible');
    cy.get('[data-cy="status-tag"]').eq(5).should('have.attr', 'appearance', 'success').and('be.visible');
    cy.get('[data-cy="status-tag"]').eq(6).should('have.attr', 'appearance', 'neutral').and('be.visible');
  });
});

describe('sorting', () => {
  it('sorts by the first column if no `sortdefaultcolumnid` is provided', () => {
    cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns}></mc-table>`).as('mc-table');
    const sortedByName = [
      'Emma Maersk',
      'Gerner Maersk',
      'Johannes Maersk',
      'Madrid Maersk',
      'Mary Maersk',
      'Svendborg Maersk',
      'Tove Maersk',
    ];

    cy.get('@mc-table')
      .find('[data-cy*="header"]')
      .first()
      .find('[data-cy="sort-button"]')
      .find('mc-icon')
      .should('have.attr', 'icon', 'arrow-up');

    cy.get('@mc-table')
      .find('[data-cy*="header"]')
      .first()
      .invoke('index')
      .then((index) => {
        cy.get('tbody')
          .find('tr')
          .each(($row, i) => {
            cy.wrap($row)
              .find('td')
              .eq(index)
              .invoke('text')
              .then((text) => {
                expect(sortedByName[i]).to.equal(text.trim());
              });
          });
      });
  });

  it('sorts by the column based on `sortdefaultcolumnid`', () => {
    cy.mount<McTable>(
      html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} sortdefaultcolumnid="built"></mc-table>`,
    ).as('mc-table');

    const sortedByBuilt = ['1992', '1998', '2001', '2006', '2008', '2013', '2017'];

    cy.get('@mc-table')
      .find('[data-cy*="header"]')
      .eq(2)
      .invoke('index')
      .then((index) => {
        cy.get('tbody')
          .find('tr')
          .each(($row, i) => {
            cy.wrap($row)
              .find('td')
              .eq(index)
              .invoke('text')
              .then((text) => {
                expect(sortedByBuilt[i]).to.equal(text.trim());
              });
          });
      });

    cy.get('@mc-table')
      .find('[data-cy*="header"]')
      .eq(2)
      .find('[data-cy="sort-button"]')
      .find('mc-icon')
      .should('have.attr', 'icon', 'arrow-up');
  });

  it('prevents the table from sorting by default on the initial load when the `sortdisableoninitialload` prop is set to true', () => {
    cy.mount<McTable>(
      html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} sortdisableoninitialload></mc-table>`,
    ).as('mc-table');
    const sortedByName = [
      'Madrid Maersk',
      'Mary Maersk',
      'Gerner Maersk',
      'Emma Maersk',
      'Johannes Maersk',
      'Svendborg Maersk',
      'Tove Maersk',
    ];

    cy.get('@mc-table')
      .find('[data-cy*="header"]')
      .first()
      .find('[data-cy="sort-button"]')
      .find('mc-icon')
      .should('have.attr', 'icon', 'arrows-down-up');

    cy.get('@mc-table')
      .find('[data-cy*="header"]')
      .first()
      .invoke('index')
      .then((index) => {
        cy.get('tbody')
          .find('tr')
          .each(($row, i) => {
            cy.wrap($row)
              .find('td')
              .eq(index)
              .invoke('text')
              .then((text) => {
                expect(sortedByName[i]).to.equal(text.trim());
              });
          });
      });

    it('sorts by the column based on `sortdefaultcolumnid` and `sortdefaultdirection`', () => {
      cy.mount<McTable>(
        html`<mc-table
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          sortdefaultcolumnid="built"
          sortdefaultdirection="descending"
        ></mc-table>`,
      ).as('mc-table');

      const sortedByBuiltDescending = ['2017', '2013', '2008', '2006', '2001', '1998', '1992'];

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .eq(2)
        .invoke('index')
        .then((index) => {
          cy.get('tbody')
            .find('tr')
            .each(($row, i) => {
              cy.wrap($row)
                .find('td')
                .eq(index)
                .invoke('text')
                .then((text) => {
                  expect(sortedByBuiltDescending[i]).to.equal(text.trim());
                });
            });
        });
      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .eq(2)
        .find('[data-cy="sort-button"]')
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrow-down');
    });
    //regression test for https://github.com/Maersk-Global/mds/issues/3185
    it('sorts by the column based on `sortdefaultcolumnid` even when first column has sortDisabled set to true', () => {
      const columnsWithFirstColSortDisabled = defaultColumns.map((col) => {
        if (col.id === 'name') {
          return { ...col, sortDisabled: true };
        }
        return col;
      });
      cy.mount<McTable>(
        html`<mc-table
          .data=${dataCopy as any}
          .columns=${columnsWithFirstColSortDisabled}
          sortdefaultcolumnid="built"
        ></mc-table>`,
      ).as('mc-table');

      const sortedByBuilt = ['1992', '1998', '2001', '2006', '2008', '2013', '2017'];

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .eq(2)
        .invoke('index')
        .then((index) => {
          cy.get('tbody')
            .find('tr')
            .each(($row, i) => {
              cy.wrap($row)
                .find('td')
                .eq(index)
                .invoke('text')
                .then((text) => {
                  expect(sortedByBuilt[i]).to.equal(text.trim());
                });
            });
        });

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .eq(2)
        .find('[data-cy="sort-button"]')
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrow-up');
    });

    it('should not dispatch initial sortchange event if the data was not loaded yet and sortmanual is true', () => {
      cy.mount<McTable>(
        html`<mc-table
          .columns=${defaultColumns}
          sortmanual
          sortdefaultcolumnid="built"
          sortdefaultdirection="descending"
        ></mc-table>`,
      ).as('mc-table');

      const sortHandler = cy.stub().as('sortmanualSortHandler');

      cy.get('@mc-table').then(($el) => {
        const mcTable = $el[0] as McTable;
        mcTable.addEventListener('sortchange', sortHandler);
      });

      cy.get('@sortmanualSortHandler').should('not.have.been.called');

      cy.get<McTable>('@mc-table').then(($el) => {
        $el[0].data = dataCopy;
      });

      cy.get('@sortmanualSortHandler').should('not.have.been.called');

      cy.get('@mc-table').find('[data-cy*="header"]').eq(2).realClick();

      cy.get('@sortmanualSortHandler').should('have.been.calledOnce');
    });

    it('sorts using a custom column sorting function', () => {
      const customColumns = [...defaultColumns.filter((col) => col.id !== 'capacity')];
      const capacityColumn = {
        id: 'capacity',
        label: 'Capacity (TEU)',
        tabularFigures: true,
        sorter: ((a: number, b: number) => a - b) as ColumnSorter,
      };
      customColumns.push(capacityColumn);

      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${customColumns}></mc-table>`).as('mc-table');

      const sortedByCapacity = data.sort((a, b) => a.capacity - b.capacity).map((item) => item.capacity);

      cy.get('@mc-table').find('[data-cy*="header"]').last().realClick();

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .last()
        .invoke('index')
        .then((index) => {
          cy.get('tbody')
            .find('tr')
            .each(($row, i) => {
              cy.wrap($row)
                .find('td')
                .eq(index)
                .invoke('text')
                .then((text) => {
                  expect(sortedByCapacity[i]).to.equal(+text.trim());
                });
            });
        });
      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .eq(4)
        .find('[data-cy="sort-button"]')
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrow-up');
    });

    it('dispatches a `sortchange` event with column details and sorting direction', () => {
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns}></mc-table>`).as('mc-table');

      const sortHandler = cy.stub().as('sortHandler');

      cy.get('@mc-table').then(($el) => {
        const mcTable = $el[0];
        mcTable.addEventListener('sortchange', sortHandler);
        cy.get('@mc-table').find('[data-cy*="header"]').first().realClick();
        cy.get('@mc-table').find('[data-cy*="header"]').first().realClick();
      });

      cy.get('@sortHandler').should((sortHandler) => {
        expect(sortHandler).to.be.calledTwice;

        const firstCall = sortHandler.getCall(0);
        const firstCallDetail = firstCall.args[0]?.detail;

        expect(firstCallDetail).to.have.property('column', 'name');
        expect(firstCallDetail).to.have.property('direction', 'descending');

        const secondCall = sortHandler.getCall(1);
        const secondCallDetail = secondCall.args[0]?.detail;

        expect(secondCallDetail).to.have.property('column', 'name');
        expect(secondCallDetail).to.have.property('direction', 'ascending');
      });
    });

    it('does not dispatch a `sortchange` event if the column has sortDisabled set to true and data is async', () => {
      const columnsWithSortDisabled = [
        {
          id: 'name',
          label: 'Name',
          sortDisabled: true,
        },
        {
          id: 'lastPort',
          label: 'Last port',
        },
      ];
      cy.mount<McTable>(html`<mc-table .columns=${columnsWithSortDisabled}></mc-table>`).as('mc-table');

      const sortHandler = cy.stub().as('sortHandler');

      cy.get('@mc-table').then(($el) => {
        const mcTable = $el[0] as McTable;
        mcTable.addEventListener('sortchange', sortHandler);
        cy.wait(200).then(() => {
          mcTable.data = dataCopy;
        });
      });

      cy.get('@sortHandler').should('not.have.been.called');

      // Verify that no sorting indicators are visible on the first column
      cy.get('@mc-table').find('[data-cy*="header"]').first().find('[data-cy="sort-button"]').should('not.exist');

      // Verify that sorting is still possible on non-disabled columns
      cy.get('@mc-table').find('[data-cy*="header"]').eq(1).find('[data-cy="sort-button"]').should('exist').click();

      cy.get('@sortHandler').should('have.been.calledOnce');
    });

    it('does not sort the data by default when `sortmanual` is true', () => {
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} sortmanual></mc-table>`).as(
        'mc-table',
      );

      const initialOrder = [
        'Madrid Maersk',
        'Mary Maersk',
        'Gerner Maersk',
        'Emma Maersk',
        'Johannes Maersk',
        'Svendborg Maersk',
        'Tove Maersk',
      ];

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .first()
        .invoke('index')
        .then((index) => {
          cy.get('tbody')
            .find('tr')
            .each(($row, i) => {
              cy.wrap($row)
                .find('td')
                .eq(index)
                .invoke('text')
                .then((text) => {
                  expect(initialOrder[i]).to.equal(text.trim());
                });
            });
        });
    });

    it('does not sort the data and does not display the direction arrows when `sortdisabled` is true', () => {
      cy.mount<McTable>(
        html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} sortdisabled></mc-table>`,
      ).as('mc-table');

      const initialOrder = [
        'Madrid Maersk',
        'Mary Maersk',
        'Gerner Maersk',
        'Emma Maersk',
        'Johannes Maersk',
        'Svendborg Maersk',
        'Tove Maersk',
      ];

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .first()
        .invoke('index')
        .then((index) => {
          cy.get('tbody tr').each(($row, rowIndex) => {
            cy.wrap($row)
              .find(`td:nth-child(${index + 1})`)
              .invoke('text')
              .then((text) => {
                const name = text.trim();
                expect(name).to.equal(initialOrder[rowIndex]);
              });
          });
        });

      const headerTexts = ['Name', 'Last port', 'Built (year)', 'Length (m)', 'Capacity (TEU)'];

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .each(($header, index) => {
          cy.wrap($header).find('button').should('not.exist');

          cy.wrap($header).should('contain.text', headerTexts[index]);
        });
    });

    it('renders arrow icons indicating column sorting direction', () => {
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns}></mc-table>`).as('mc-table');

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .first()
        .find('button')
        .realClick()
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrow-down');

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .first()
        .find('button')
        .realClick()
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrow-up');

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .eq(1)
        .find('button')
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrows-down-up');
    });

    it('renders arrow icons indicating column sorting direction when sortmanual is true and sortdefaultcolumnid is provided', () => {
      cy.mount<McTable>(
        html`<mc-table
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          sortdefaultcolumnid="name"
          sortdefaultdirection="ascending"
          sortmanual
        ></mc-table>`,
      ).as('mc-table');

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .first()
        .find('button')
        .realClick()
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrow-down');

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .first()
        .find('button')
        .realClick()
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrow-up');

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .eq(1)
        .find('button')
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrows-down-up');
    });

    it('renders correct arrow icons when data is loaded async', () => {
      cy.mount<McTable>(
        html`<mc-table
          .columns=${defaultColumns}
          sortdefaultcolumnid="name"
          sortdefaultdirection="ascending"
          sortmanual
        ></mc-table>`,
      ).as('mc-table');

      cy.get<McTable>('@mc-table').then(($el) => {
        $el[0].data = dataCopy;
      });

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .first()
        .find('button')
        .realClick()
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrow-down');
    });

    it('does not render arrow icons indicating column sorting direction when `sortdisabled` is set to true', () => {
      cy.mount<McTable>(
        html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} sortdisabled></mc-table>`,
      ).as('mc-table');

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .each(($header) => {
          cy.wrap($header)
            .find('mc-icon[icon="arrow-up"], mc-icon[icon="arrow-down"], mc-icon[icon="arrows-down-up"]')
            .should('not.exist');
        });
    });

    it('does not sort on header click when `sortdisabled` is set to true', () => {
      cy.mount<McTable>(
        html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} sortdisabled></mc-table>`,
      ).as('mc-table');

      const sortHandler = cy.stub().as('sortHandler');

      cy.get('@mc-table').then(($el) => {
        const mcTable = $el[0];
        mcTable.addEventListener('sortchange', sortHandler);

        cy.get('@mc-table').find('[data-cy*="header"]').first().realClick();
      });

      cy.get('@sortHandler').should('not.have.been.called');

      const initialDataOrder = [...dataCopy];

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .first()
        .invoke('index')
        .then((index) => {
          cy.get('tbody')
            .find('tr')
            .each(($row, i) => {
              cy.wrap($row)
                .find('td')
                .eq(index)
                .invoke('text')
                .then((text) => {
                  expect(initialDataOrder[i]['name']).to.equal(text.trim());
                });
            });
        });
    });

    it('renders "arrow-up" icon when `sortmanual` is true and `sortdefaultdirection` is "ascending"', () => {
      cy.mount<McTable>(
        html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} sortmanual sortdefaultdirection="ascending">
        </mc-table>`,
      ).as('mc-table');

      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .first()
        .find('[data-cy="sort-button"]')
        .find('mc-icon')
        .should('have.attr', 'icon', 'arrow-up');
    });
  });
  describe('pagination', () => {
    it('shows all rows when currentpage is not specified', () => {
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} sortdisabled></mc-table>`).as('mc-table');

      cy.get('@mc-table')
        .find('tr')
        .then(($tr) => {
          expect($tr.length).to.equal(dataCopy.length + 1); // plus 1 for header row
        });
    });

    it('shows specific number of rows based on recordsperpage', () => {
      const recordsPerPage = 3;
      const currentPage = 1;
      cy.mount<McTable>(
        html`<mc-table
          .data=${dataCopy as any}
          currentpage="${currentPage}"
          recordsperpage="${recordsPerPage}"
          sortdisabled
        ></mc-table>`,
      ).as('mc-table');

      cy.get('@mc-table')
        .find('tr')
        .then(($tr) => {
          expect($tr.length).to.equal(recordsPerPage + 1); // plus 1 for header row
        });
    });

    it('shows the correct page when currentpage is specified', () => {
      const recordsPerPage = 3;
      const currentPage = 2;
      cy.mount<McTable>(
        html`<mc-table
          .data=${dataCopy as any}
          .recordsperpage=${recordsPerPage}
          .currentpage=${currentPage}
          sortdisabled
        ></mc-table>`,
      ).as('mc-table');

      cy.get('@mc-table')
        .find('tr')
        .then(($tr) => {
          expect($tr.length).to.equal(recordsPerPage + 1); // plus 1 for header row
        });

      cy.get('@mc-table')
        .find('tr')
        .eq(1) // Skip header row
        .find('td')
        .first()
        .invoke('text')
        .then((text) => {
          // Check that the first record on the page is the one expected
          expect(text.trim()).to.equal(String((currentPage - 1) * recordsPerPage + 1));
        });
    });
    it('displays all data when currentpage is <1', () => {
      cy.mount<McTable>(
        html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} currentpage=${-1} sortdisabled></mc-table>`,
      ).as('mc-table');

      const allData = [
        'Madrid Maersk',
        'Mary Maersk',
        'Gerner Maersk',
        'Emma Maersk',
        'Johannes Maersk',
        'Svendborg Maersk',
        'Tove Maersk',
      ];

      cy.get('@mc-table')
        .find('tbody')
        .find('tr')
        .then(($rows) => {
          expect($rows).to.have.length(allData.length);
          $rows.each((index, row) => {
            cy.wrap(row).find('td').eq(0).should('contain.text', allData[index]);
          });
        });
    });
    it('gets visible rows when the getVisibleRows method is called', () => {
      cy.mount<McTable>(
        html`<mc-table
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          currentpage=${1}
          recordsperpage="3"
          sortdisabled
        ></mc-table>`,
      ).as('mc-table');
      cy.get('mc-table').then(($table) => {
        expect($table[0].getVisibleRows()).to.have.length(3);
        $table[0].recordsperpage = 6;
        cy.wait(200);
        cy.get('mc-table').then(($nextTable) => {
          expect($nextTable[0].getVisibleRows()).to.have.length(6);
        });
      });
    });
    it('gets visible rows when the getVisibleRows method is called and data is null at first render', () => {
      cy.mount<McTable>(html`<mc-table currentpage=${1} recordsperpage="3" sortdisabled></mc-table>`).as('mc-table');

      cy.get('mc-table').then(($table) => {
        const table = $table[0] as McTable;
        table.data = dataCopy;
        table.columns = defaultColumns;
        expect(table.getVisibleRows()).to.have.length(3);
        table.recordsperpage = 6;
        cy.wait(200);
        cy.get('mc-table').then(($nextTable) => {
          expect($nextTable[0].getVisibleRows()).to.have.length(6);
        });
      });
    });
    it('scrolls to top when resetscrollonpagechange is set to true and page changes', () => {
      cy.mount<McTable>(
        html`<mc-table
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          currentpage=${1}
          recordsperpage="3"
          resetscrollonpagechange
          height="100px"
          sortdisabled
        ></mc-table>`,
      ).as('mc-table');

      cy.get('@mc-table').find('.mds-table').scrollTo('bottom');
      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).currentpage = 2;
      });
      cy.get('@mc-table').find('.mds-table').should('have.prop', 'scrollTop', 0);
    });
    it('returns a correct page count when calling getPageCount function', () => {
      cy.mount<McTable>(html`<mc-table currentpage=${1} recordsperpage="3" sortdisabled></mc-table>`).as('mc-table');

      cy.get('@mc-table').then(($el) => {
        const table = $el[0] as McTable;
        table.data = dataCopy;
        table.columns = defaultColumns;
        expect(($el[0] as McTable).getPageCount()).to.equal(3);
        const evenLengthData = dataCopy.slice(0, 6);
        table.data = evenLengthData;
        expect(($el[0] as McTable).getPageCount()).to.equal(2);
      });
    });
  });
  describe('row selection', () => {
    beforeEach(() => {
      cy.mount<McTable>(
        html`<mc-table id="table" select .data=${dataCopy as any} .columns=${defaultColumns}></mc-table>`,
      ).as('mc-table');
    });

    const firstRowCheckbox = (): Cypress.Chainable<JQuery<McCheckbox>> =>
      cy.get('@mc-table').find('tbody').find('tr').first().find('mc-checkbox');
    const headerCheckbox = (): Cypress.Chainable<JQuery<McCheckbox>> =>
      cy.get('@mc-table').find('thead').find('tr').find('mc-checkbox');
    const allRowCheckboxes = (): Cypress.Chainable<JQuery<McCheckbox>> =>
      cy.get('@mc-table').find('tbody').find('tr').find('mc-checkbox');

    it('selects a row when clicking the mc-checkbox', () => {
      firstRowCheckbox().click();
      firstRowCheckbox().should('have.attr', 'checked');
    });

    it('deselects a row when clicking the mc-checkbox again', () => {
      firstRowCheckbox().click();
      firstRowCheckbox().click();
      firstRowCheckbox().should('not.have.attr', 'checked');
    });

    it('selects all rows when clicking the mc-checkbox in the header', () => {
      headerCheckbox().click();
      allRowCheckboxes().should('have.attr', 'checked');
    });

    it('deselects all rows when clicking the mc-checkbox in the header again', () => {
      headerCheckbox().click();
      headerCheckbox().click();
      allRowCheckboxes().should('not.have.attr', 'checked');
    });

    it('sets the header checkbox to undetermined when any row is selected', () => {
      firstRowCheckbox().click();
      headerCheckbox().should('have.attr', 'indeterminate');
    });

    it('preselects specified rows using the `selected` property', () => {
      const preselectedRows = dataCopy.filter((row) => row.id !== 1 && row.id !== 4);
      const preselectedIndexes = [1, 2, 4, 5, 6];
      const notSelectedIndexes = [0, 3];
      const oldTable = document.querySelector('#table');
      oldTable?.remove();

      cy.mount<McTable>(
        html`<mc-table
          select
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          .selected=${preselectedRows}
        ></mc-table>`,
      ).as('mc-table-row-selector');

      preselectedIndexes.forEach((index) => {
        cy.get('@mc-table-row-selector')
          .find('tbody')
          .find('tr')
          .eq(index)
          .find('mc-checkbox')
          .should('have.attr', 'checked');
      });

      notSelectedIndexes.forEach((index) => {
        cy.get('@mc-table-row-selector')
          .find('tbody')
          .find('tr')
          .eq(index)
          .find('mc-checkbox')
          .should('not.have.attr', 'checked');
      });
    });

    it('Does not crash when selected is an array with empty string', () => {
      cy.mount<McTable>(
        html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} select .selected=${['']}></mc-table>`,
      ).as('mc-table');
      cy.get('@mc-table').find('tbody').find('tr').first().find('mc-checkbox').should('exist');
    });

    it('sets the correct CSS class on a selected row', () => {
      firstRowCheckbox().click();
      cy.get('@mc-table').find('tbody').find('tr').first().should('have.class', 'mds_table__row--selected');
      cy.get('@mc-table').find('tbody').find('tr').eq(1).should('not.have.class', 'mds_table__row--selected');
    });

    it('select only per page rows', () => {
      const recordsPerPage = 3;
      const currentPage = 1;

      const oldTable = document.querySelector('#table');
      oldTable?.remove();

      cy.mount<McTable>(
        html`<mc-table
          .data=${dataCopy as any}
          .recordsperpage=${recordsPerPage}
          .currentpage=${currentPage}
          select
        ></mc-table>`,
      ).as('mc-table');

      headerCheckbox().click();
      allRowCheckboxes().should('have.attr', 'checked');

      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).currentpage = 2;
      });

      allRowCheckboxes().should('not.have.attr', 'checked');
    });

    it('resets the selection state using resetRowSelection public method', () => {
      firstRowCheckbox().click();
      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).resetRowSelection();
      });
      allRowCheckboxes().should('not.have.attr', 'checked');
    });

    it('maintains checked status of disabled rows when using select/deselect all', () => {
      const preselectedRows = dataCopy.filter((row) => row.id !== 1 && row.id !== 4);
      const oldTable = document.querySelector('#table');
      oldTable?.remove();

      const selectChangeHandler = cy.stub().as('selectChangeHandler');

      cy.mount<McTable>(
        html`<mc-table
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          select
          .selectrowdisabled=${(row: Vessel) => row.id === 5}
          .selected=${preselectedRows}
          @selectchange=${selectChangeHandler}
        ></mc-table>`,
      ).as('mc-table-disabled-rows');

      const headerCheckbox = () => cy.get('@mc-table-disabled-rows').find('thead').find('tr').find('mc-checkbox');
      const getRowCheckbox = (id: number) =>
        cy.get('@mc-table-disabled-rows').find(`tbody tr[data-cy="${id}"]`).find('mc-checkbox');

      getRowCheckbox(5).should('have.attr', 'disabled');
      getRowCheckbox(5).should('have.attr', 'checked');

      headerCheckbox()
        .click()
        .then(() => {
          expect(selectChangeHandler).to.be.calledTwice;
          const eventDetail = selectChangeHandler.getCall(1).args[0].detail;
          expect(eventDetail).to.deep.equal(dataCopy);
        });

      getRowCheckbox(5).should('have.attr', 'disabled');
      getRowCheckbox(5).should('have.attr', 'checked');

      headerCheckbox()
        .click()
        .then(() => {
          expect(selectChangeHandler).to.be.calledThrice;
          const eventDetail = selectChangeHandler.getCall(2).args[0].detail;
          expect(eventDetail).to.deep.equal([dataCopy[4]]);
        });

      getRowCheckbox(5).should('have.attr', 'disabled');
      getRowCheckbox(5).should('have.attr', 'checked');
    });

    it('emits rowselected event when a row is selected', () => {
      const rowSelectedHandler = cy.stub().as('rowSelectedHandler');
      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).addEventListener('rowselected', rowSelectedHandler);
      });
      firstRowCheckbox()
        .click()
        .then(() => {
          expect(rowSelectedHandler).to.be.calledOnce;
          const eventDetail = rowSelectedHandler.getCall(0).args[0].detail;
          expect(eventDetail).to.equal(dataCopy[3]);
        });
    });

    it('emits rowdeselected event when a row is deselected', () => {
      const rowDeselectedHandler = cy.stub().as('rowDeselectedHandler');
      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).addEventListener('rowdeselected', rowDeselectedHandler);
      });
      firstRowCheckbox().click();
      firstRowCheckbox()
        .click()
        .then(() => {
          const eventDetail = rowDeselectedHandler.getCall(0).args[0].detail;
          expect(eventDetail).to.equal(dataCopy[3]);
        });
    });

    it('emits rowselected for all rows when header checkbox is clicked', () => {
      const rowSelectedHandler = cy.stub().as('rowSelectedHandler');
      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).addEventListener('rowselected', rowSelectedHandler);
      });
      headerCheckbox()
        .click()
        .then(() => {
          expect(rowSelectedHandler).to.have.callCount(7);
          dataCopy.forEach((row) => {
            cy.get('@rowSelectedHandler').should('have.been.calledWithMatch', {
              detail: row,
            });
          });
        });
    });

    it('emits rowdeselected for all rows when header checkbox is clicked twice', () => {
      const rowDeselectedHandler = cy.stub().as('rowDeselectedHandler');
      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).addEventListener('rowdeselected', rowDeselectedHandler);
      });
      headerCheckbox().click();
      headerCheckbox().click();
      cy.get('@rowDeselectedHandler').should('have.callCount', 7);
      dataCopy.forEach((row) => {
        cy.get('@rowDeselectedHandler').should('have.been.calledWithMatch', {
          detail: row,
        });
      });
    });

    describe('disable row selection on particular row', () => {
      it('does not disable any row selections by default', () => {
        allRowCheckboxes().should('not.have.attr', 'disabled');
      });
      it('disables row selection passed in the data with selectDisabled property to true', () => {
        cy.get('@mc-table').then(($el) => {
          ($el[0] as McTable).data = dataWithSelectDisabled;
        });
        cy.get('@mc-table').find('tbody').find('tr').eq(6).find('mc-checkbox').should('have.attr', 'disabled');
        //check that other checkboxes are not disabled
        cy.get('@mc-table')
          .find('tbody')
          .find('tr')
          .each(($row, index) => {
            if (index !== 6) {
              cy.wrap($row).find('mc-checkbox').should('not.have.attr', 'disabled');
            }
          });
      });
      it('disables row selection on rows that meet the condition passed in selectrowdisabled', () => {
        cy.get('@mc-table').then(($el) => {
          ($el[0] as McTable).selectrowdisabled = (row: Vessel) => row.status === 'On schedule';
        });
        cy.get('@mc-table')
          .find('tbody')
          .find('tr')
          .each(($row, index) => {
            if ([0, 1, 3, 5].includes(index)) {
              cy.wrap($row).find('mc-checkbox').should('have.attr', 'disabled');
            }
          });
        //check that other checkboxes are not disabled
        cy.get('@mc-table')
          .find('tbody')
          .find('tr')
          .each(($row, index) => {
            if (![0, 1, 3, 5].includes(index)) {
              cy.wrap($row).find('mc-checkbox').should('not.have.attr', 'disabled');
            }
          });
      });

      it('does not select rows with selectDisabled property when using select all checkbox', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();

        // Create a new table with dataWithSelectDisabled
        cy.mount<McTable>(
          html`<mc-table .data=${dataWithSelectDisabled as any} .columns=${defaultColumns} select></mc-table>`,
        ).as('mc-table-select-disabled');

        const headerCheckbox = () => cy.get('@mc-table-select-disabled').find('thead').find('tr').find('mc-checkbox');
        const getRowCheckbox = (id: number) =>
          cy.get('@mc-table-select-disabled').find(`tbody tr[data-cy="${id}"]`).find('mc-checkbox');

        // Verify row with id=7 is disabled
        getRowCheckbox(7).should('have.attr', 'disabled');
        getRowCheckbox(7).should('not.have.attr', 'checked');

        // Click select all checkbox
        headerCheckbox().click();

        // Verify that all rows except the disabled one are selected
        for (let i = 1; i <= 6; i++) {
          getRowCheckbox(i).should('have.attr', 'checked');
        }

        // Verify that the disabled row is not selected
        getRowCheckbox(7).should('have.attr', 'disabled');
        getRowCheckbox(7).should('not.have.attr', 'checked');

        // Deselect all rows
        headerCheckbox().click();

        // Verify that all rows except the disabled one are deselected
        for (let i = 1; i <= 6; i++) {
          getRowCheckbox(i).should('not.have.attr', 'checked');
        }

        // Verify that the disabled row is still in its original state
        getRowCheckbox(7).should('have.attr', 'disabled');
        getRowCheckbox(7).should('not.have.attr', 'checked');
      });

      it('disables select all checkbox when all rows are disabled', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        // Test data where all rows have selectDisabled: true
        const allDisabledData = data.map((vessel) => ({ ...vessel, selectDisabled: true }));
        
        cy.mount<McTable>(
          html`<mc-table .data=${allDisabledData as any} .columns=${defaultColumns} select></mc-table>`,
        ).as('mc-table-all-disabled');

        const headerCheckbox = () => cy.get('@mc-table-all-disabled').find('thead').find('tr').find('mc-checkbox');
        
        // Verify that the header checkbox is disabled when all rows are disabled
        headerCheckbox().should('have.attr', 'disabled');
      });

      it('disables select all checkbox when all rows are disabled via selectrowdisabled function', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        // Function that disables all rows
        const disableAllRows = () => true;
        
        cy.mount<McTable>(
          html`<mc-table .data=${data as any} .columns=${defaultColumns} select .selectrowdisabled=${disableAllRows}></mc-table>`,
        ).as('mc-table-function-disabled');

        const headerCheckbox = () => cy.get('@mc-table-function-disabled').find('thead').find('tr').find('mc-checkbox');
        
        // Verify that the header checkbox is disabled when all rows are disabled via function
        headerCheckbox().should('have.attr', 'disabled');
      });

      it('enables select all checkbox when some rows are disabled but not all', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        // Test data where only some rows have selectDisabled: true
        const someDisabledData = data.map((vessel, index) => ({
          ...vessel,
          selectDisabled: index < 3 // Only first 3 rows disabled
        }));
        
        cy.mount<McTable>(
          html`<mc-table .data=${someDisabledData as any} .columns=${defaultColumns} select></mc-table>`,
        ).as('mc-table-some-disabled');

        const headerCheckbox = () => cy.get('@mc-table-some-disabled').find('thead').find('tr').find('mc-checkbox');
        
        // Verify that the header checkbox is NOT disabled when some rows are selectable
        headerCheckbox().should('not.have.attr', 'disabled');
      });

      it('does not render header checkbox when select is false', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(
          html`<mc-table .data=${data as any} .columns=${defaultColumns}></mc-table>`,
        ).as('mc-table-no-select');

        // Verify that no checkbox is rendered in header when select=false
        cy.get('@mc-table-no-select').find('thead').find('tr').find('mc-checkbox').should('not.exist');
      });
    });

    it('handles selection state correctly when data changes with selected prop', () => {
      // Initial setup with first set of rows and all selected
      const initialRows = dataCopy.slice(0, 3);
      cy.get('@mc-table').then(($table) => {
        const table = $table[0] as McTable;
        table.data = initialRows;
        table.selected = initialRows; // Select all initial rows
      });

      // Verify initial selection with proper waiting
      cy.get('@mc-table')
        .find('tbody tr mc-checkbox')
        .should('have.length', 3)
        .should(($checkboxes) => {
          $checkboxes.each((_, checkbox) => {
            expect(checkbox).to.have.attr('checked');
          });
        });

      // Change to second set of rows
      const secondSetRows = dataCopy.slice(3, 6);
      cy.get('@mc-table').then(($table) => {
        const table = $table[0] as McTable;
        table.data = secondSetRows;
        table.selected = secondSetRows; // Select all new rows
      });

      // Verify new selection with proper waiting
      cy.get('@mc-table')
        .find('tbody tr mc-checkbox')
        .should('have.length', 3)
        .should(($checkboxes) => {
          $checkboxes.each((_, checkbox) => {
            expect(checkbox).to.have.attr('checked');
          });
        });
    });
  });
  describe('row expansion', () => {
    beforeEach(() => {
      cy.mount<McTable>(
        html`<mc-table id="table" expand .data=${dataCopy as any} .columns=${defaultColumns}></mc-table>`,
      ).as('mc-table');
    });

    const expansionButtonInRow = (id: number): Cypress.Chainable<JQuery<McButton>> =>
      cy.get('@mc-table').find(`tbody tr[data-cy="${id}"]`).find('mc-button');

    const expansionContentInRow = (id: number): Cypress.Chainable<JQuery> =>
      cy.get('@mc-table').find(`[slot="${id}_expanded"]`);

    const expansionRow = (id: number): Cypress.Chainable<JQuery> =>
      cy.get('@mc-table').find(`tbody tr[data-cy="${id}_expanded_row"]`);

    it('by default, does not render any expansion buttons', () => {
      dataCopy.forEach((row) => {
        expansionButtonInRow(row.id).should('not.exist');
      });
    });

    it('renders the expansion button when the content is provided', () => {
      dataCopy.forEach((row) => {
        cy.get('@mc-table').invoke('append', `<div slot="${row.id}_expanded">Expansion content</div>`);
        expansionButtonInRow(row.id).should('exist');
      });
    });

    it('removes the expansion button when the content for it is removed from the DOM', () => {
      cy.get('@mc-table').invoke('append', `<div slot="3_expanded">Expansion content</div>`);
      expansionButtonInRow(3).should('exist');

      cy.get('@mc-table')
        .find(`div[slot="${3}_expanded"]`)
        .then(($div) => $div.remove());

      expansionButtonInRow(3).should('not.exist');
    });

    it('opens the row and content is correct when the expansion button is clicked', () => {
      dataCopy.forEach((row) => {
        cy.get('@mc-table').invoke('append', `<div slot="${row.id}_expanded">Expansion content</div>`);
        expansionButtonInRow(row.id).click({ force: true });
        expansionContentInRow(row.id).should('contain', 'Expansion content');
      });
    });

    it("closes the row if it's already open when the expansion button is clicked", () => {
      dataCopy.forEach((row) => {
        cy.get('@mc-table').invoke('append', `<div slot="${row.id}_expanded">Expansion content</div>`);
        expansionButtonInRow(row.id).click();
        expansionContentInRow(row.id).should('contain', 'Expansion content');

        expansionButtonInRow(row.id).click();
        expansionContentInRow(row.id).should('not.be.visible');
      });
    });

    it('expands specified rows on render when passing data to the `expandopened` property', () => {
      const expandedRows = dataCopy.filter((row) => row.id === 1);
      cy.get('@mc-table').then(($table) => {
        ($table[0] as McTable).expandopened = expandedRows;
      });
      cy.get('@mc-table').invoke('append', `<div slot="1_expanded">Expansion content</div>`);
      expansionContentInRow(1).should('contain', 'Expansion content');
      expansionButtonInRow(1).should('be.visible');
    });

    it('sets the `mds-table__expanded-row--no-padding` class on the expanded row when `expandpadding === none`', () => {
      dataCopy.forEach((row) => {
        cy.get('@mc-table').invoke('append', `<div slot="${row.id}_expanded">Expansion content</div>`);
        expansionRow(row.id).should('not.have.class', 'mds-table__expanded-row--no-padding');
      });
      cy.get('@mc-table').then(($table) => {
        ($table[0] as McTable).expandpadding = 'none';
      });
      dataCopy.forEach((row) => {
        cy.get('@mc-table').invoke('append', `<div slot="${row.id}_expanded">Expansion content</div>`);
        expansionRow(row.id).should('have.class', 'mds-table__expanded-row--no-padding');
      });
    });

    it('sets the correct colspan on the expanded row', () => {
      cy.get('@mc-table').invoke('append', `<div slot="1_expanded">Expansion content</div>`);
      expansionButtonInRow(1).click({ force: true });
      expansionRow(1).find('td').should('have.attr', 'colspan', '6');

      cy.get('@mc-table').then(($table) => {
        ($table[0] as McTable).select = true;
      });
      expansionRow(1).find('td').should('have.attr', 'colspan', '7');
    });

    it('emits rowexpanded event when a row is expanded', () => {
      cy.get('@mc-table').invoke('append', `<div slot="1_expanded">Expansion content</div>`);
      const rowExpandedHandler = cy.stub().as('rowExpandedHandler');
      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).addEventListener('rowexpanded', rowExpandedHandler);
      });
      expansionButtonInRow(1).click();
      cy.get('@rowExpandedHandler').should('be.calledOnce');
      cy.get('@rowExpandedHandler').should('be.calledWithMatch', {
        detail: dataCopy[0],
      });
    });

    it('emits rowcollapsed event when a row is collapsed', () => {
      cy.get('@mc-table').invoke('append', `<div slot="1_expanded">Expansion content</div>`);
      const rowCollapsedHandler = cy.stub().as('rowCollapsedHandler');
      cy.get('@mc-table').then(($el) => {
        ($el[0] as McTable).addEventListener('rowcollapsed', rowCollapsedHandler);
      });
      expansionButtonInRow(1).click();
      expansionButtonInRow(1).click();
      cy.get('@rowCollapsedHandler').should('be.calledOnce');
      cy.get('@rowCollapsedHandler').should('be.calledWithMatch', {
        detail: dataCopy[0],
      });
    });
  });
  describe('sticky', () => {
    describe('column', () => {
      const stickyColumns: TableColumn[] = [
        {
          id: 'name',
          label: 'Name',
          noWrap: true,
          sticky: true,
        },
        {
          id: 'built',
          label: 'Built (year)',
          width: '200px',
          tabularFigures: true,
          sticky: 'left',
        },
        {
          id: 'length',
          label: 'Length (m)',
          dataType: {
            type: 'number',
          },
          sticky: 'right',
        },
        {
          id: 'capacity',
          label: 'Capacity (TEU)',
          dataType: {
            type: 'number',
          },
        },
        {
          id: 'lastPort',
          label: 'Last port',
        },
      ];
      const stickyColIds = ['name', 'built', 'length'];
      beforeEach(() => {
        cy.mount<McTable>(
          html`<mc-table id="table" select .data=${dataCopy as any} .columns=${stickyColumns}></mc-table>`,
        ).as('mc-table');
      });
      const firstLeftStickyColumn = (): Cypress.Chainable<JQuery<HTMLElement>> =>
        cy.get('@mc-table').find('thead').find('th[data-sticky="left"]').first();
      const firstRightStickyColumn = (): Cypress.Chainable<JQuery<HTMLElement>> =>
        cy.get('@mc-table').find('thead').find('th[data-sticky="right"]').first();
      const allLeftStickyColumns = (): Cypress.Chainable<JQuery<HTMLElement>> =>
        cy.get('@mc-table').find('thead').find('th[data-sticky="left"]');
      const allRightStickyColumns = (): Cypress.Chainable<JQuery<HTMLElement>> =>
        cy.get('@mc-table').find('thead').find('th[data-sticky="right"]');
      const allStickyColumns = (): Cypress.Chainable<JQuery<HTMLElement>> =>
        cy.get('@mc-table').find('thead').find('th[data-sticky="left"], th[data-sticky="right"]');
      const cellsForHeader = (id: string): Cypress.Chainable<JQuery<HTMLElement>> =>
        cy.get('@mc-table').find(`tbody td[data-header-id="${id}"]`);
      const headerById = (id: string): Cypress.Chainable<JQuery<HTMLElement>> =>
        cy.get('@mc-table').find(`thead th[data-cy="header-${id}"]`);

      it('does not apply position sticky to the column cells when sticky is not set', () => {
        headerById('capacity').should('not.have.css', 'position', 'sticky');
        headerById('lastPort').should('not.have.css', 'position', 'sticky');
      });

      it('applies sticky left column styles when sticky is set to "left" or true', () => {
        headerById('built').should('have.css', 'position', 'sticky');
        headerById('built').should('have.css', 'left');
        headerById('built').should('have.css', 'zIndex', '12');

        headerById('name').should('have.css', 'position', 'sticky');
        headerById('name').should('have.css', 'left');
        headerById('name').should('have.css', 'zIndex', '12');
      });

      it('applies position sticky to the column cells when sticky is set', () => {
        stickyColIds.forEach((id) => {
          headerById(id).should('have.css', 'position', 'sticky');
        });
      });

      it('applies position sticky to the column cells when sticky is set to true', () => {
        allStickyColumns().then(($stickyColumns) => {
          const headerIds = $stickyColumns.toArray().map((col) => col.getAttribute('data-cy')?.split('-')[1]);
          headerIds.forEach((id) => {
            cellsForHeader(id ?? '').should('have.css', 'position', 'sticky');
          });
        });
      });

      it('calculates offset of the sticky columns correctly', () => {
        firstLeftStickyColumn().should('have.css', 'left', '0px');
        firstRightStickyColumn().should('have.css', 'right', '0px');

        allLeftStickyColumns().then(($leftStickyColumns) => {
          $leftStickyColumns.toArray().forEach((col, i) => {
            if (i === 0) {
              return;
            }
            expect(parseFloat(col.style.left)).to.be.greaterThan(0);
          });
        });

        allRightStickyColumns().then(($rightStickyColumns) => {
          $rightStickyColumns.toArray().forEach((col, i) => {
            if (i === 0) {
              return;
            }
            expect(parseFloat(col.style.right)).to.be.greaterThan(0);
          });
        });
      });

      it('sets row selector as sticky when select and selectsticky are true', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(
          html`<mc-table id="table" select selectsticky .data=${dataCopy as any} .columns=${stickyColumns}></mc-table>`,
        ).as('mc-table');

        cy.get('@mc-table').find('th[data-cy="header-row-selector"]').should('have.css', 'position', 'sticky');
        cy.get('@mc-table').find('th[data-cy="header-row-selector"]').should('have.css', 'left', '0px');
      });

      it('sets row expander as sticky when expand and expandsticky are true', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(
          html`<mc-table id="table" expand expandsticky .data=${dataCopy as any} .columns=${stickyColumns}
            ><div slot="1_expanded"></div
          ></mc-table>`,
        ).as('mc-table');

        cy.get('@mc-table').find('th[data-cy="header-row-expander"]').should('have.css', 'position', 'sticky');
        cy.get('@mc-table').find('th[data-cy="header-row-expander"]').should('have.css', 'left', '0px');
      });

      it('sets row selector and expander as sticky when select, selectsticky, expand and expandsticky are true', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(
          html`<mc-table
            id="table"
            select
            selectsticky
            expand
            expandsticky
            .data=${dataCopy as any}
            .columns=${stickyColumns}
            ><div slot="1_expanded"></div
          ></mc-table>`,
        ).as('mc-table');

        cy.get('@mc-table').find('th[data-cy="header-row-selector"]').should('have.css', 'position', 'sticky');
        cy.get('@mc-table').find('th[data-cy="header-row-selector"]').should('have.css', 'left', '0px');
        cy.get('@mc-table').find('th[data-cy="header-row-expander"]').should('have.css', 'position', 'sticky');
        cy.get('@mc-table')
          .find('th[data-cy="header-row-expander"]')
          .should(($expander) => {
            const left = parseFloat($expander.css('left'));
            expect(left).to.be.greaterThan(0);
          });
      });

      it('calculates the correct sticky styles for footers', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(
          html`<mc-table id="table" footer .data=${dataCopy as any} .columns=${stickyColumns}
            ><div slot="name_footer">name</div>
            <div slot="built_footer">built</div>
            <div slot="lestPort_footer">last port</div>
          </mc-table>`,
        ).as('mc-table');

        cy.get('@mc-table').find('tfoot').find('td[id="name_footer_cell"]').should('have.css', 'position', 'sticky');
        cy.get('@mc-table').find('tfoot').find('td[id="name_footer_cell"]').should('have.css', 'left', '0px');

        cy.get('@mc-table').find('tfoot').find('td[id="built_footer_cell"]').should('have.css', 'position', 'sticky');
        cy.get('@mc-table')
          .find('tfoot')
          .find('td[id="built_footer_cell"]')
          .should(($built) => {
            const left = parseFloat($built.css('left'));
            expect(left).to.be.greaterThan(0);
          });

        cy.get('@mc-table')
          .find('tfoot')
          .find('td[id="lastPort_footer_cell"]')
          .should('not.have.css', 'position', 'sticky');
      });

      it('sets the correct zIndex for headers and footers when headersticky and footersticky are true', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(
          html`<mc-table id="table" footer headersticky footersticky .data=${dataCopy as any} .columns=${stickyColumns}
            ><div slot="name_footer">name</div>
            <div slot="built_footer">built</div>
            <div slot="lestPort_footer">last port</div>
          </mc-table>`,
        ).as('mc-table');

        cy.get('@mc-table').find('thead').find('th[data-cy="header-name"]').should('have.css', 'zIndex', '12');
        cy.get('@mc-table').find('tfoot').find('td[id="name_footer_cell"]').should('have.css', 'zIndex', '12');

        cellsForHeader('name').should('have.css', 'zIndex', '10');

        cy.get('@mc-table').find('thead').find('th[data-cy="header-capacity"]').should('have.css', 'zIndex', '11');
      });

      it('ensures sticky column headers have higher z-index than non-sticky column headers', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(html`<mc-table id="table" .data=${dataCopy as any} .columns=${stickyColumns}></mc-table>`).as(
          'mc-table',
        );

        // Check that sticky headers have higher z-index
        cy.get('@mc-table').find('thead').find('th[data-sticky="left"]').should('have.css', 'z-index', '12');
        cy.get('@mc-table').find('thead').find('th[data-sticky="right"]').should('have.css', 'z-index', '12');

        headerById('capacity').should('have.css', 'z-index', 'auto');
        headerById('lastPort').should('have.css', 'z-index', 'auto');
      });

      it('prevents non-sticky headers from overlapping sticky headers during scroll', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();

        // Configure columns with appropriate widths to ensure we can scroll horizontally
        const scrollableColumnsConfig: TableColumn[] = [
          {
            id: 'name',
            label: 'Name',
            width: '150px',
            sticky: 'left',
          },
          {
            id: 'built',
            label: 'Built (year)',
            width: '150px',
          },
          {
            id: 'length',
            label: 'Length (m)',
            width: '150px',
          },
          {
            id: 'capacity',
            label: 'Capacity (TEU)',
            width: '150px',
          },
          {
            id: 'lastPort',
            label: 'Last port',
            width: '150px',
          },
        ];

        cy.mount<McTable>(
          html`<mc-table
            id="table"
            .data=${dataCopy as any}
            .columns=${scrollableColumnsConfig}
            style="width: 300px; overflow: auto;"
          ></mc-table>`,
        ).as('mc-table');

        // Verify sticky header has higher z-index before scrolling
        headerById('name').should('have.css', 'z-index', '12');
        headerById('built').should('have.css', 'z-index', 'auto');

        // Scroll horizontally
        cy.get('@mc-table').find('div[data-cy="table-wrapper"]').scrollTo('right');

        // Verify sticky header still has higher z-index after scrolling
        // This ensures the sticky header doesn't get overlapped by non-sticky headers
        headerById('name').should('have.css', 'z-index', '12');
      });

      it('sets the select and expand sticky styles when columns are not provided', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(
          html`<mc-table id="table" select selectsticky expand expandsticky .data=${dataCopy as any}
            ><div slot="1_expanded"></div
          ></mc-table>`,
        ).as('mc-table');

        cy.get('@mc-table').find('th[data-cy="header-row-selector"]').should('have.css', 'position', 'sticky');
        cy.get('@mc-table').find('th[data-cy="header-row-selector"]').should('have.css', 'left', '0px');
        cy.get('@mc-table').find('th[data-cy="header-row-expander"]').should('have.css', 'position', 'sticky');
        cy.get('@mc-table')
          .find('th[data-cy="header-row-expander"]')
          .should(($expander) => {
            const left = parseFloat($expander.css('left'));
            expect(left).to.be.greaterThan(0);
          });
      });

      it('sets the correct top position for sticky headers when headersticky is true and there are multiple groups of headers', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(
          html`<mc-table
            id="table"
            headersticky
            .data=${dataCopy as any}
            .columns=${HeaderGroupsColumns as TableColumn[]}
          ></mc-table>`,
        ).as('mc-table');

        let firstHeaderHeight = 0;

        //check that the first row of headers has top:0 and check the height of first level of rows.
        cy.get('@mc-table')
          .find('thead')
          .find('tr')
          .first()
          .find('th')
          .each(($header) => {
            if (!firstHeaderHeight) {
              firstHeaderHeight = $header[0].getBoundingClientRect().height;
            }
            cy.wrap($header).should('have.css', 'top', '0px');
          });

        //The second level of rows should have top equal to the height of the first level of rows
        cy.get('@mc-table')
          .find('thead')
          .find('tr')
          .eq(1)
          .find('th')
          .each(($header) => {
            cy.wrap($header).should('have.css', 'top', '40px');
          });
      });
      it('sets the sticky column styles correctly when a row is added dynamically', () => {
        const newRow = {
          id: 8,
          name: 'Vessel 8',
          built: 2000,
          length: 300,
          capacity: 1000,
          lastPort: 'Rotterdam',
        };
        cy.get('@mc-table').then(($table) => {
          ($table[0] as McTable).data = [...dataCopy, newRow];
        });

        cy.get('@mc-table')
          .find('[data-id="8_name"]')
          .then(($cell) => {
            cy.wrap($cell).should('have.css', 'position', 'sticky');
            cy.wrap($cell).should('have.css', 'left', '0px');
          });

        cy.get('@mc-table')
          .find('[data-id="8_built"]')
          .then(($cell) => {
            cy.wrap($cell).should('have.css', 'position', 'sticky');
            //check that the left position is greater than 0
            const left = parseFloat($cell.css('left'));
            expect(left).to.be.greaterThan(0);
          });

        cy.get('@mc-table')
          .find('[data-id="8_length"]')
          .then(($cell) => {
            cy.wrap($cell).should('have.css', 'position', 'sticky');
            cy.wrap($cell).should('have.css', 'right', '0px');
          });
      });
      it('sets the correct z-index to the header when a header slot is present and the header is hovered', () => {
        const oldTable = document.querySelector('#table');
        oldTable?.remove();
        cy.mount<McTable>(html`
          <mc-table .data=${dataCopy as any} .columns=${defaultColumns}>
            <div slot="name_header">Custom Header</div>
          </mc-table>
        `).as('mc-table');

        // Check initial z-index with header slot
        cy.get('@mc-table').find('[data-cy="header-name"]').should('have.css', 'z-index', '13');

        // Trigger hover and check z-index
        cy.get('@mc-table').find('[data-cy="header-name"]').trigger('mouseenter').should('have.css', 'z-index', '14');

        // Trigger mouseleave and check z-index returns to slot content z-index after delay
        cy.get('@mc-table').find('[data-cy="header-name"]').trigger('mouseleave');

        // Wait for the setTimeout to complete
        cy.wait(150);

        cy.get('@mc-table').find('[data-cy="header-name"]').should('have.css', 'z-index', '13');
      });
    });

    describe('header and footer', () => {
      it('adds the mds-table--header-sticky class to the table wrapper when headersticky is true', () => {
        cy.mount<McTable>(
          html`<mc-table id="table" .data=${dataCopy as any} .columns=${defaultColumns} headersticky></mc-table>`,
        ).as('mc-table');

        cy.get('@mc-table').find('div[data-cy="table-wrapper"]').should('have.class', 'mds-table--header-sticky');
      });

      it('adds the mds-table--footer-sticky class to the table wrapper when footersticky is true', () => {
        cy.mount<McTable>(
          html`<mc-table id="table" .data=${dataCopy as any} .columns=${defaultColumns} footersticky></mc-table>`,
        ).as('mc-table');

        cy.get('@mc-table').find('div[data-cy="table-wrapper"]').should('have.class', 'mds-table--footer-sticky');
      });
    });
  });
  describe('hidecolumns', () => {
    it('hides specified columns', () => {
      const columnsToHide = ['length', 'capacity'];

      cy.mount<McTable>(
        html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} .hidecolumns=${columnsToHide}></mc-table>`,
      ).as('mc-table');

      columnsToHide.forEach((columnId) => {
        cy.get('@mc-table').find('thead').find(`th[data-cy=header-${columnId}]`).should('not.exist');
      });
    });

    it('shows non-hidden columns', () => {
      const columnsToHide = ['length', 'capacity'];
      const shownColumns = defaultColumns.filter((column) => !columnsToHide.includes(column.id));

      cy.mount<McTable>(
        html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} .hidecolumns=${columnsToHide}></mc-table>`,
      ).as('mc-table');

      shownColumns.forEach((column) => {
        cy.get('@mc-table').find('thead').find(`th[data-cy=header-${column.id}]`).should('be.visible');
      });
    });
  });
  describe('row click', () => {
    it('emits "rowclick" event when a row is clicked', () => {
      const rowClickSpy = cy.spy().as('rowClickSpy');

      cy.mount<McTable>(
        html`<mc-table
          @rowclick=${(): void => rowClickSpy()}
          .data=${dataCopy as any}
          .columns=${defaultColumns}
        ></mc-table>`,
      ).as('mc-table');

      cy.get('@mc-table')
        .find('tbody')
        .find('tr')
        .first()
        .click({ force: true })
        .then(() => {
          expect(rowClickSpy).to.be.calledOnce;
        });
    });
    it('does not emit row click event when row select or expand trigger is clicked', () => {
      const rowClickSpy = cy.spy().as('rowClickSpy');

      cy.mount<McTable>(
        html`<mc-table
          @rowclick=${(): void => rowClickSpy()}
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          select
          expand
        >
        </mc-table>`,
      ).as('mc-table');

      dataCopy.forEach((row) => {
        cy.get('@mc-table').invoke('append', `<div slot="${row.id}_expanded">Expansion content</div>`);
      });

      cy.get('@mc-table')
        .find('tbody')
        .find('tr')
        .first()
        .find('mc-checkbox')
        .click({ force: true })
        .then(() => {
          expect(rowClickSpy).to.not.be.called;
        });

      cy.get('@mc-table')
        .find('tbody')
        .find('tr')
        .first()
        .find('mc-button')
        .click({ force: true })
        .then(() => {
          expect(rowClickSpy).to.not.be.called;
        });
    });

    it('does not emit rowclick event when rowClickDisabled is true on a column', () => {
      const rowClickSpy = cy.spy().as('rowClickSpy');
      const columns = [
        { id: 'name', label: 'Name' },
        {
          id: 'status',
          label: 'Status',
        },
        {
          id: 'favourite',
          label: '',
          sortDisabled: true,
          rowClickDisabled: true,
        },
      ];

      cy.mount<McTable>(
        html`<mc-table @rowclick=${(): void => rowClickSpy()} .data=${data} .columns=${columns as TableColumn[]}>
          ${data.map(
            (row) => html` <mc-button icon="star" hiddenlabel slot="${row.id}_favourite">Favourite</mc-button>`,
          )}
        </mc-table>`,
      ).as('mc-table');

      // Test clicking mc-button in favourite column - should not trigger row click
      cy.get('@mc-table')
        .find('tbody tr')
        .first()
        .find('td')
        .last() // favourite column
        .then(($td) => {
          const slot = $td[0].querySelector('slot');
          const button = slot?.assignedElements()[0] as HTMLElement;
          cy.wrap(button).click({ force: true });
        })
        .then(() => {
          expect(rowClickSpy).to.not.be.called;
        });

      // Test that clicking the name column triggers the row click event
      cy.get('@mc-table')
        .find('tbody tr')
        .first()
        .find('td')
        .eq(0) // name column
        .click({ force: true })
        .then(() => {
          expect(rowClickSpy).to.be.calledOnce;
        });
    });
  });
  describe('footer', () => {
    const footerCellWithId = (id: string): Cypress.Chainable<JQuery> =>
      cy.get('@mc-table').find(`tfoot td[id="${id}_footer_cell"]`);

    it('renders the colspanned footer when only one column has footerColspan defined', () => {
      cy.mount<McTable>(
        html`<mc-table
          footer
          .data=${dataCopy as any}
          .columns=${defaultColumns.map((col, index) => (index === 0 ? { ...col, footerColspan: 3 } : col))}
          ><div slot="name_footer">Name footer</div>
          <div slot="capacity_footer">Capacity footer</div>
          <div slot="length_footer">Length footer</div>
        </mc-table>`,
      ).as('mc-table');

      footerCellWithId('name').should('have.attr', 'colspan', '3');
      footerCellWithId('built').should('not.exist');
      footerCellWithId('lastPort').should('not.exist');
      footerCellWithId('length').should('exist');
      footerCellWithId('capacity').should('exist');
    });

    it('renders the colspanned footer when multiple columns have footerColspan defined', () => {
      cy.mount<McTable>(
        html`<mc-table
          footer
          .data=${dataCopy as any}
          .columns=${defaultColumns.map((col, index) => {
            if (index === 0) {
              return { ...col, footerColspan: 3 };
            }

            if (index === 3) {
              return { ...col, footerColspan: 2 };
            }
            return col;
          })}
          ><div slot="name_footer">Name footer</div>
          <div slot="capacity_footer">Capacity footer</div>
          <div slot="length_footer">Length footer</div>
        </mc-table>`,
      ).as('mc-table');

      footerCellWithId('name').should('have.attr', 'colspan', '3');
      footerCellWithId('length').should('have.attr', 'colspan', '2');
      footerCellWithId('lastPort').should('not.exist');
      footerCellWithId('built').should('not.exist');
      footerCellWithId('capacity').should('not.exist');
    });
    describe('disableplaceholderfooters', () => {
      const columns = defaultColumns.map((col, index) => {
        if (index === 0) {
          return { ...col, footerColspan: 3 };
        }

        if (index === 3) {
          return { ...col, footerColspan: 2 };
        }
        return col;
      });
      const assert = (nameColspan: number, lengthColspan: number): void => {
        footerCellWithId('name').should('have.attr', 'colspan', nameColspan);
        footerCellWithId('length').should('have.attr', 'colspan', lengthColspan);
        footerCellWithId('lastPort').should('not.exist');
        footerCellWithId('built').should('not.exist');
        footerCellWithId('capacity').should('not.exist');
      };
      it('adds one to colspan of the first footerColspan column when select is true', () => {
        cy.mount<McTable>(
          html`<mc-table footer select disableplaceholderfooters .data=${dataCopy as any} .columns=${columns}
            ><div slot="name_footer">Name footer</div>
            <div slot="capacity_footer">Capacity footer</div>
            <div slot="length_footer">Length footer</div>
          </mc-table>`,
        ).as('mc-table');

        assert(4, 2);
      });
      it('adds one to colspan of the first footerColspan column when expand is true', () => {
        cy.mount<McTable>(
          html`<mc-table footer expand disableplaceholderfooters .data=${dataCopy as any} .columns=${columns}
            ><div slot="name_footer">Name footer</div>
            <div slot="capacity_footer">Capacity footer</div>
            <div slot="length_footer">Length footer</div>
          </mc-table>`,
        ).as('mc-table');

        assert(4, 2);
      });
      it('adds two to colspan of the first footerColspan column when select and expand are true', () => {
        cy.mount<McTable>(
          html`<mc-table footer select disableplaceholderfooters expand .data=${dataCopy as any} .columns=${columns}
            ><div slot="name_footer">Name footer</div>
            <div slot="capacity_footer">Capacity footer</div>
            <div slot="length_footer">Length footer</div>
          </mc-table>`,
        ).as('mc-table');

        assert(5, 2);
      });
    });

    it('renders all footers if no footerColspan is defined', () => {
      cy.mount<McTable>(
        html`<mc-table footer .data=${dataCopy as any} .columns=${defaultColumns}
          ><div slot="name_footer">Name footer</div>
          <div slot="capacity_footer">Capacity footer</div>
          <div slot="length_footer">Length footer</div>
        </mc-table>`,
      ).as('mc-table');

      footerCellWithId('name').should('exist');
      footerCellWithId('lastPort').should('exist');
      footerCellWithId('built').should('exist');
      footerCellWithId('length').should('exist');
      footerCellWithId('capacity').should('exist');
    });
  });
  describe('renderAsHeader', () => {
    it('renders cells in a column as headers when readerAsHeader is true in column definition ', () => {
      const columns = defaultColumns.map((col) => {
        return col.id === 'name' ? { ...col, renderAsHeader: true } : { ...col };
      });
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${columns}> </mc-table>`).as('mc-table');

      //find all cells in the first column
      cy.get('@mc-table')
        .find('tbody tr')
        .then(($rows) => {
          cy.wrap($rows).each((row) => {
            cy.wrap(row).children().first().should('have.prop', 'tagName', 'TH');
          });
        });
    });
  });
  describe('value formatting', () => {
    const columns: TableColumn[] = [
      { id: 'name', label: 'Name' },
      {
        id: 'latitude',
        label: 'Latitude (to 3dp)',
        dataType: { type: 'number', options: { maximumFractionDigits: 3 } },
      },
      {
        id: 'longitude',
        label: 'Longitude (to 4dp)',
        dataType: {
          type: 'number',
          formatter: (cellValue: unknown) => `${Number(cellValue).toFixed(4)}°`,
        },
      },
      {
        id: 'price',
        label: 'Price (DKK)',
        align: 'center',
        tabularFigures: false,
        dataType: { type: 'number', options: { style: 'currency', currency: 'DKK' } },
      },
      { id: 'short', label: 'Short', dataType: { type: 'string' } },
    ];

    const data = [
      {
        id: 1,
        name: 'Emma Maersk',
        latitude: 11.1626327,
        longitude: -68.7259306,
        price: 4637.49,
        short: 'EM',
      },
      {
        id: 2,
        name: 'Gerner Maersk',
        latitude: 60.3641945,
        longitude: 15.7292196,
        price: 699.73,
        short: 'GM',
      },
      {
        id: 3,
        name: 'Johannes Maersk',
        latitude: 52.0108,
        longitude: 86.5467,
        price: 7148.57,
        short: 'JM',
      },
      {
        id: 4,
        name: 'Madrid Maersk',
        latitude: 21.238501,
        longitude: -77.5246795,
        price: 4840.12,
        short: 'MM',
      },
      {
        id: 5,
        name: 'Mary Maersk',
        latitude: 40.2367283,
        longitude: 44.6917527,
        price: 533.35,
        short: 'MM',
      },
    ];

    const getColumnCell = (columnIndex: number): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('@mc-table').find('tbody').find('tr').find('td').eq(columnIndex);

    const getHeaderCell = (columnIndex: number): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('@mc-table').find('thead').find('tr').find('th').eq(columnIndex);

    const getFooterCell = (columnIndex: number): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('@mc-table').find('tfoot').find('tr').find('td').eq(columnIndex);

    beforeEach(() => {
      cy.mount<McTable>(
        html`<mc-table .data=${data as any} .columns=${columns} footer>
          <div slot="price_footer">Footer for <i>id: price</i></div>
        </mc-table>`,
      ).as('mc-table');
    });

    it('formats the value when the column has a dataType `type` set as number', () => {
      getColumnCell(1).should('contain.text', '11.163');
    });

    it('styles the column when the column has a dataType `type` set as number', () => {
      getColumnCell(1)
        .should('have.class', 'mds-table__cell--text-right')
        .should('have.class', 'mds-table__cell--tabular-figures');
    });

    it('does not apply default styling or data formatting when no dataType is specified', () => {
      getColumnCell(0)
        .should('not.have.class', 'mds-table__cell--text-right')
        .should('not.have.class', 'mds-table__cell--tabular-figures')
        .should('contain.text', 'Emma Maersk');
    });

    it('does not apply default styling or data formatting when the type is `string`', () => {
      getColumnCell(4)
        .should('not.have.class', 'mds-table__cell--text-right')
        .should('not.have.class', 'mds-table__cell--tabular-figures')
        .should('contain.text', 'EM');
    });

    it('formats the value using provided Intl options', () => {
      getColumnCell(3).should('contain.text', 'DKK');
    });

    it('formats the value using the provided formatter function', () => {
      getColumnCell(2).should('contain.text', '-68.7259°');
    });

    it('overrides the default `align` formatting when using type `number` when align is specified on the column level', () => {
      getColumnCell(3)
        .should('not.have.class', 'mds-table__cell--text-right')
        .should('have.class', 'mds-table__cell--text-center');
    });

    it('overrides the default `tabularFigures` formatting when using type `number` when tabularFigures is specified on the column level', () => {
      getColumnCell(3).should('not.have.class', 'mds-table__cell--tabular-figures');
    });

    it('aligns the header to the right when using type `number`', () => {
      getHeaderCell(1)
        .should('have.class', 'mds-table__cell--text-right')
        .find('button')
        .should('have.class', 'items-right');
    });

    it('overrides the default header alignment when using `align` property and dataType type `number`', () => {
      getHeaderCell(3)
        .should('have.class', 'mds-table__cell--text-center')
        .find('button')
        .should('have.class', 'items-center');
    });

    it('aligns the footer to the right when using type `number`', () => {
      getFooterCell(1).should('have.class', 'mds-table__cell--text-right');
    });

    it('overrides the default footer alignment when using `align` property and dataType type `number`', () => {
      getFooterCell(3).should('have.class', 'mds-table__cell--text-center');
    });
  });
  describe('header slot', () => {
    const columns: TableColumn[] = [
      {
        id: 'name',
        label: 'Name',
      },
      {
        id: 'built',
        label: 'Built (year)',
        sortDisabled: true,
      },
      {
        id: 'speed',
        label: 'Speed',
        dataType: { type: 'number' },
      },
      {
        id: 'length',
        label: 'Length (m)',
        dataType: { type: 'number' },
      },
    ];

    const speedHeader = 'Vessel speed';
    const builtHeader = 'Vessel built year';
    beforeEach(() => {
      cy.mount<McTable>(
        html` <mc-table .data=${data} .columns=${columns}>
          <div slot="speed_header">${speedHeader}</div>
          <div slot="built_header">${builtHeader}</div>
        </mc-table>`,
      ).as('mc-table');
    });

    it('renders header slot inside a button when sorting is enabled', () => {
      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .eq(2)
        .find('[data-cy="sort-button"]')
        .then(($button) => {
          const slot = $button[0].querySelector('slot') as HTMLSlotElement;
          expect(slot.assignedElements()[0].textContent).to.equal(speedHeader);
        });
    });
    it('renders header slot inside a td when sorting is disabled', () => {
      cy.get('@mc-table')
        .find('[data-cy*="header"]')
        .eq(1)
        .then(($td) => {
          const slot = $td[0].querySelector('slot') as HTMLSlotElement;
          expect(slot.assignedElements()[0].textContent).to.equal(builtHeader);
        });

      cy.get('@mc-table').find('[data-cy*="header"]').eq(1).find('[data-cy="sort-button"]').should('not.exist');
    });
  });
  describe('state slot', () => {
    beforeEach(() => {
      cy.mount<McTable>(html`<mc-table id="table" .data=${dataCopy as any} .columns=${defaultColumns}></mc-table>`).as(
        'mc-table',
      );
    });

    const stateSlotWrapper = (): Cypress.Chainable<JQuery> =>
      cy.get('@mc-table').find('tbody tr td[data-cy="state-slot-wrapper"]');

    const stateSlotElement = (): Cypress.Chainable<JQuery> =>
      cy.get('@mc-table').find('tbody tr td[data-cy="state-slot-wrapper"]').find('slot[name="state"]');

    it('should not render the state slot by default', () => {
      stateSlotWrapper().should('not.exist');
    });

    it('should render the state slot when provided', () => {
      cy.get('@mc-table').invoke('append', `<mc-loading-indicator slot="state"></mc-loading-indicator>`);
      stateSlotElement().should('exist');
    });

    it('should set the height of the state slot wrapper when provided', () => {
      cy.get('@mc-table').invoke('append', `<mc-loading-indicator slot="state"></mc-loading-indicator>`);
      cy.get('@mc-table').then(($table) => {
        ($table[0] as McTable).stateslotheight = '200px';
      });
      stateSlotWrapper().should(($el) => {
        expect($el[0].style.height).to.eq('200px');
      });
    });

    it('should not render data rows when state slot is supplied', () => {
      cy.get('@mc-table').find('tbody').find('tr').should('exist');
      cy.get('@mc-table').invoke('append', `<mc-loading-indicator slot="state"></mc-loading-indicator>`);
      cy.get('@mc-table').find('tbody').find('tr:not(:has(td[data-cy="state-slot-wrapper"]))').should('not.exist');
    });

    it('should center the slot content', () => {
      cy.get('@mc-table').invoke('append', `<mc-loading-indicator slot="state"></mc-loading-indicator>`);
      stateSlotWrapper().should('have.css', 'text-align', 'center');
    });

    it('should have a correct colspan when select is enabled', () => {
      cy.get('@mc-table').invoke('append', `<div slot="state">loading...</div>`);
      cy.get('@mc-table').find('tbody tr td[data-cy="state-slot-wrapper"]').should('have.attr', 'colspan', '5');
      cy.get('@mc-table').then(($table) => {
        ($table[0] as McTable).select = true;
      });
      cy.get('@mc-table').find('tbody tr td[data-cy="state-slot-wrapper"]').should('have.attr', 'colspan', '6');
    });

    it('should have a correct colspan when using header groups', () => {
      const oldTable = document.querySelector('#table');
      oldTable?.remove();

      cy.mount<McTable>(
        html`<mc-table
          id="table"
          .data=${dataCopy as any}
          .columns=${HeaderGroupsColumns as TableColumn[]}
        ></mc-table>`,
      ).as('mc-table');

      cy.get('@mc-table').invoke('append', `<div slot="state">loading...</div>`);
      cy.get('@mc-table').find('tbody tr td[data-cy="state-slot-wrapper"]').should('have.attr', 'colspan', '9');
    });
  });
  describe('column description', () => {
    const columnsWithDescription: TableColumn[] = defaultColumns.map((col, i) => {
      return i === 0 ? { ...col, description: 'Name of the vessel' } : { ...col };
    });

    beforeEach(() => {
      cy.mount<McTable>(
        html`<mc-table id="table" .data=${dataCopy as any} .columns=${columnsWithDescription}></mc-table>`,
      ).as('mc-table');
    });

    const headerWithId = (colId: string): Cypress.Chainable<JQuery> => {
      return cy.get('@mc-table').find(`th[data-cy="header-${colId}"]`);
    };

    it('should render tooltip for header cell with description', () => {
      headerWithId('name').trigger('mouseenter').find('mc-tooltip').should('exist');
    });

    it('should not render tooltip for header cell without description', () => {
      headerWithId('built').trigger('mouseenter').find('mc-tooltip').should('not.exist');
    });

    it('should display correct description in tooltip', () => {
      headerWithId('name').trigger('mouseenter').find('mc-tooltip').should('contain', 'Name of the vessel');
    });
  });
  describe('subDataLabel & subDataKey', () => {
    const columnsWithSubadata: TableColumn[] = defaultColumns.map((col, i) => {
      return i === 0 ? { ...col, subDataLabel: 'Built year', subDataKey: 'built' } : { ...col };
    });

    beforeEach(() => {
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${columnsWithSubadata}></mc-table>`).as(
        'mc-table',
      );
    });

    const headerWithId = (colId: string): Cypress.Chainable<JQuery> => {
      return cy.get('@mc-table').find(`th[data-cy="header-${colId}"]`);
    };

    it('Does not render subDataLabel and subDataKey by default', () => {
      headerWithId('lastPort').find("[data-cy='sub-data-label']").should('not.exist');
      cy.get('@mc-table')
        .find('tbody tr')
        .each(($row) => {
          cy.wrap($row)
            .find('td:nth-child(2)')
            .then(($cell) => {
              cy.wrap($cell).find("[data-cy='sub-data-property']").should('not.exist');
            });
        });
    });

    it('renders subDataLabel in a column header', () => {
      headerWithId('name').find("[data-cy='sub-data-label']").should('exist');
      headerWithId('name').find("[data-cy='sub-data-label']").should('contain', 'Built year');
    });

    it('renders subDataKey in a column cells', () => {
      cy.get('@mc-table')
        .find('tbody tr')
        .each(($row) => {
          cy.wrap($row)
            .find('td:nth-child(1)')
            .then(($cell) => {
              cy.wrap($cell).find("[data-cy='sub-data-property']").should('exist');
            });
        });
    });
  });
  describe('customstyles', () => {
    const styles = `
    .mds-table .row-4 td {
        background-color: var(--mds_brand_appearance_success_weak_background-color);
      }
    `;
    beforeEach(() => {
      cy.mount<McTable>(
        html`<mc-table .data=${dataCopy as any} .columns=${defaultColumns} .customstyles=${styles}></mc-table>`,
      ).as('mc-table');
    });

    it('should attach custom styles to table root', () => {
      cy.get('@mc-table').find('style').should('contain', styles);
    });

    it('should apply custom styles to table content', () => {
      cy.get('@mc-table')
        .find('tbody tr')
        .eq(0)
        .get('td')
        .should(($td) => {
          const style = window.getComputedStyle($td[0]);
          const cssVarValue = style.getPropertyValue('--mds_brand_appearance_success_weak_background-color');
          expect(cssVarValue).to.not.be.null;
          expect(cssVarValue).to.not.be.empty;
        });
    });
  });
  describe('verticalAlign', () => {
    const columnsWithVerticalAlign: TableColumn[] = defaultColumns.map((col, i) => {
      return i === 0 ? { ...col, verticalAlign: 'bottom' } : { ...col };
    });

    beforeEach(() => {
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${columnsWithVerticalAlign}></mc-table>`).as(
        'mc-table',
      );
    });

    it('applies vertical alignment to the specified column', () => {
      cy.get('@mc-table')
        .find('thead')
        .find('th[data-cy="header-name"]')
        .should('have.css', 'vertical-align', 'bottom');

      cy.get('@mc-table')
        .find('tbody')
        .find('tr')
        .each(($row) => {
          cy.wrap($row).find('td[data-header-id="name"]').should('have.css', 'vertical-align', 'bottom');
        });
    });
  });
  describe('Spans', () => {
    const defaultColumns = [
      { id: 'name', label: 'Name' },
      { id: 'built', label: 'Built' },
      { id: 'length', label: 'Length' },
    ];

    it('should handle cell-level rowspan', () => {
      const spans = [
        {
          cellDataKey: '2_name',
          rowspan: 2,
        },
      ];

      cy.mount<McTable>(
        html`<mc-table
          verticallinestyle="solid"
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          .spans=${spans}
        ></mc-table>`,
      ).as('mc-table');

      // Check if the cell with rowspan has the correct attribute
      cy.get('@mc-table').find('tbody tr[data-cy="2"] td[data-header-id="name"]').should('have.attr', 'rowspan', '2');
    });

    it('should handle cell-level colspan', () => {
      const spans = [
        {
          cellDataKey: '1_name',
          colspan: 2,
        },
      ];

      cy.mount<McTable>(
        html`<mc-table
          verticallinestyle="solid"
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          .spans=${spans}
          sortdisabled
        ></mc-table>`,
      );

      // Check if the cell has colspan attribute
      cy.get('tbody tr').first().find('td').first().should('have.attr', 'colspan', '2');

      // Check if the next cell is not rendered
      cy.get('tbody tr').first().find('td').should('have.length', 2); // 3 columns - 1 hidden + colspan
    });

    it('should handle column-level rowspan', () => {
      const columnsWithSpans = [
        { id: 'name', label: 'Name', rowspan: 2 },
        { id: 'built', label: 'Built' },
        { id: 'length', label: 'Length' },
      ];

      cy.mount<McTable>(
        html`<mc-table verticallinestyle="solid" .data=${dataCopy as any} .columns=${columnsWithSpans}></mc-table>`,
      );

      // Check if all cells in the name column have rowspan
      cy.get('tbody tr td').first().should('have.attr', 'rowspan', '2');
      cy.get('tbody tr').eq(2).find('td').first().should('have.attr', 'rowspan', '2');
    });

    it('should handle column-level colspan', () => {
      const columnsWithSpans = [
        { id: 'name', label: 'Name', colspan: 2 },
        { id: 'built', label: 'Built' },
        { id: 'length', label: 'Length' },
      ];

      cy.mount<McTable>(
        html`<mc-table verticallinestyle="solid" .data=${dataCopy as any} .columns=${columnsWithSpans}></mc-table>`,
      );

      // Check if all cells in the name column have colspan
      cy.get('tbody tr td').first().should('have.attr', 'colspan', '2');
      cy.get('tbody tr').eq(1).find('td').first().should('have.attr', 'colspan', '2');
    });

    it('should handle both rowspan and colspan simultaneously', () => {
      const spans = [
        {
          cellDataKey: '1_name',
          colspan: 2,
          rowspan: 2,
        },
      ];

      cy.mount<McTable>(
        html`<mc-table
          verticallinestyle="solid"
          sortdisabled
          .data=${dataCopy as any}
          .columns=${defaultColumns}
          .spans=${spans}
        ></mc-table>`,
      );

      // Check if the cell has both span attributes
      cy.get('tbody tr')
        .first()
        .find('td')
        .first()
        .should('have.attr', 'colspan', '2')
        .should('have.attr', 'rowspan', '2');

      // Check if the appropriate cells are hidden
      cy.get('tbody tr').first().find('td').should('have.length', 2); // 3 - 1 hidden by colspan
      cy.get('tbody tr').eq(1).find('td').should('have.length', 1); // 3 - 2 hidden by rowspan and colspan
    });
  });

  describe('cell value rendering with truthy/falsy values', () => {
    const columns = [
      { id: 'boolVal', label: 'Boolean' },
      { id: 'numVal', label: 'Number' },
      { id: 'nullVal', label: 'Null' },
      { id: 'undefinedVal', label: 'Undefined' },
      { id: 'emptyVal', label: 'Empty' },
      {
        id: 'templateVal',
        label: 'Template',
        cellTemplate: ({ html }) => html`<span class="custom-template">Custom</span>`,
      },
    ];

    const testData = [
      {
        id: 1,
        boolVal: true,
        numVal: 0,
        nullVal: null,
        undefinedVal: undefined,
        emptyVal: '',
        templateVal: 'ignored due to template',
      },
    ];

    beforeEach(() => {
      cy.mount<McTable>(html`<mc-table .data=${testData} .columns=${columns}></mc-table>`).as('mc-table');
    });

    it('renders boolean values correctly', () => {
      cy.get('@mc-table')
        .find('tbody tr td')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal('true');
        });
    });

    it('renders number 0 correctly', () => {
      cy.get('@mc-table')
        .find('tbody tr td')
        .eq(1)
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal('0');
        });
    });

    it('renders null as empty', () => {
      cy.get('@mc-table')
        .find('tbody tr td')
        .eq(2)
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal('');
        });
    });

    it('renders undefined as empty', () => {
      cy.get('@mc-table')
        .find('tbody tr td')
        .eq(3)
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal('');
        });
    });

    it('renders empty string as empty', () => {
      cy.get('@mc-table')
        .find('tbody tr td')
        .eq(4)
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal('');
        });
    });

    it('renders template results correctly', () => {
      cy.get('@mc-table')
        .find('tbody tr td')
        .eq(5)
        .find('.custom-template')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal('Custom');
        });
    });

    it('handles false boolean values correctly', () => {
      //remove old table
      const table = document.querySelector('mc-table');
      if (table) {
        table.remove();
      }
      const falseData = [
        {
          id: 1,
          boolVal: false,
          numVal: 0,
          nullVal: null,
          undefinedVal: undefined,
          emptyVal: '',
          templateVal: 'ignored',
        },
      ];

      cy.mount<McTable>(html`<mc-table .data=${falseData} .columns=${columns}></mc-table>`).as('mc-table-false');

      cy.get('@mc-table-false')
        .find('tbody tr td')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal('false');
        });
    });
  });
  describe('column width ', () => {
    it('sets the width of the column when width is specified in the column definition', () => {
      const columns = [
        { id: 'name', label: 'Name', width: '200px' },
        { id: 'built', label: 'Built' },
        { id: 'length', label: 'Length' },
      ];

      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${columns}></mc-table>`).as('mc-table');

      cy.get('@mc-table').find('thead th[data-cy="header-name"]').should('have.css', 'width', '200px');
    });
    it('sets the min width of the column on mobile devices', () => {
      const columns = [
        { id: 'name', label: 'Name', width: { min: '100px', max: '400px' } },
        { id: 'built', label: 'Built' },
        { id: 'length', label: 'Length' },
      ];
      cy.viewport(400, 800);
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${columns}></mc-table>`).as('mc-table');

      cy.get('@mc-table')
        .find('thead th[data-cy="header-name"]')
        .invoke('css', 'width')
        .then((cssWidth) => {
          const numericWidth = parseFloat(cssWidth);
          expect(numericWidth).to.be.greaterThan(100);
        });
    });

    it('sets the max width of the column on desktop devices', () => {
      const columns = [
        { id: 'name', label: 'Name', width: { min: '300px', max: '1000px' } },
        { id: 'built', label: 'Built' },
        { id: 'length', label: 'Length' },
      ];

      cy.viewport(1280, 720);
      cy.mount<McTable>(html`<mc-table .data=${dataCopy as any} .columns=${columns}></mc-table>`).as('mc-table');

      cy.get('@mc-table').find('thead th[data-cy="header-name"]').should('have.css', 'width', '1000px');
    });
  });

  describe('Column Truncation', () => {
    beforeEach(() => {
      const columns = [
        {
          id: 'name',
          label: 'Name',
          truncate: true,
        },
        {
          id: 'lastPort',
          label: 'Last port',
        },
        {
          id: 'capacity',
          label: 'Capacity',
        },
        {
          id: 'built',
          label: 'Built',
        },
      ];

      cy.mount<McTable>(html`<mc-table .data=${dataCopy} .columns=${columns}></mc-table>`).as('mc-table');
    });

    it('should display truncated text with tooltip on hover for the 6th cell in the Name column', () => {
      cy.get('td[data-id="6_name"]')
        .eq(0)
        .should('have.css', 'text-overflow', 'ellipsis')
        .trigger('hover')
        .then(() => {
          cy.get('@mc-table')
            .find('mc-tooltip')
            .should('exist')
            .should('be.visible')
            .should('contain.text', 'Svendborg Maersk');

          cy.get('td[data-id="6_name"]')
            .eq(0)
            .find('div[slot="trigger"]')
            .should('have.css', 'text-overflow', 'ellipsis');
        });
    });
    it('should verify that the 1st cell in the Last Port column does not display truncated text', () => {
      cy.get('td[data-id="4_lastPort"]').eq(0).should('not.have.css', 'text-overflow', 'ellipsis');
    });
  });
});
