import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const rowExpansionTemplate = `<body class="mds">
  <div class="mds-table mds-table--zebra-stripes-with-expand mds-table--scrollable">
    <table>
      <thead>
        <tr>
          <th aria-hidden="true"></th>
          <th>Name</th>
          <th>Last port</th>
          <th class="mds-text-right">Built (year)</th>
          <th class="mds-text-right">Length (m)</th>
          <th class="mds-text-right">Capacity (TEU)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <mc-button
              class="mds-table__expanded-row__trigger"
              hiddenlabel
              disablediconslot
              disabledlabelslot
              variant="plain"
              padding="none"
              label="expand"
              icon="chevron-down"
            ></mc-button>
          </td>
          <td>Mary Maersk</td>
          <td>Busan</td>
          <td class="mds-text-right">2013</td>
          <td class="mds-text-right">399</td>
          <td class="mds-text-right">18,270</td>
        </tr>
        <tr class="mds-table__expanded-row mds-table__expanded-row--hidden">
          <td colspan="6">
            <div>expanded content</div>
          </td>
        </tr>
        <tr>
          <td>
            <mc-button
              class="mds-table__expanded-row__trigger"
              hiddenlabel
              disablediconslot
              disabledlabelslot
              variant="plain"
              padding="none"
              label="expand"
              icon="chevron-down"
            ></mc-button>
          </td>
          <td>Madrid Maersk</td>
          <td>Shanghai</td>
          <td class="mds-text-right">2017</td>
          <td class="mds-text-right">399</td>
          <td class="mds-text-right">19,630</td>
        </tr>
        <tr class="mds-table__expanded-row mds-table__expanded-row--hidden">
          <td colspan="6">
            <div>expanded content</div>
          </td>
        </tr>
        <tr>
          <td>
            <mc-button
              class="mds-table__expanded-row__trigger"
              hiddenlabel
              disablediconslot
              disabledlabelslot
              variant="plain"
              padding="none"
              label="expand"
              icon="chevron-down"
            ></mc-button>
          </td>
          <td>Gerner Maersk</td>
          <td>Rotterdam</td>
          <td class="mds-text-right">2008</td>
          <td class="mds-text-right">367</td>
          <td class="mds-text-right">9,038</td>
        </tr>
        <tr class="mds-table__expanded-row mds-table__expanded-row--hidden">
          <td colspan="6">
            <div>expanded content</div>
          </td>
        </tr>
        <tr>
          <td>
            <mc-button
              class="mds-table__expanded-row__trigger"
              hiddenlabel
              disablediconslot
              disabledlabelslot
              variant="plain"
              padding="none"
              label="expand"
              icon="chevron-down"
            ></mc-button>
          </td>
          <td>Emma Maersk</td>
          <td>Los Angeles</td>
          <td class="mds-text-right">2006</td>
          <td class="mds-text-right">398</td>
          <td class="mds-text-right">15,550</td>
        </tr>
        <tr class="mds-table__expanded-row mds-table__expanded-row--hidden">
          <td colspan="6">
            <div>expanded content</div>
          </td>
        </tr>
        <tr>
          <td>
            <mc-button
              class="mds-table__expanded-row__trigger"
              hiddenlabel
              disablediconslot
              disabledlabelslot
              variant="plain"
              padding="none"
              label="expand"
              icon="chevron-down"
            ></mc-button>
          </td>
          <td>Johannes Maersk</td>
          <td>Yokohama</td>
          <td class="mds-text-right">2001</td>
          <td class="mds-text-right">216</td>
          <td class="mds-text-right">283</td>
        </tr>
        <tr class="mds-table__expanded-row mds-table__expanded-row--hidden">
          <td colspan="6">
            <div>expanded content</div>
          </td>
        </tr>
        <tr>
          <td>
            <mc-button
              class="mds-table__expanded-row__trigger"
              hiddenlabel
              disablediconslot
              disabledlabelslot
              variant="plain"
              padding="none"
              label="expand"
              icon="chevron-down"
            ></mc-button>
          </td>
          <td>Svendborg Maersk</td>
          <td>Manila</td>
          <td class="mds-text-right">1998</td>
          <td class="mds-text-right">347</td>
          <td class="mds-text-right">8,160</td>
        </tr>
        <tr class="mds-table__expanded-row mds-table__expanded-row--hidden">
          <td colspan="6">
            <div>expanded content</div>
          </td>
        </tr>
        <tr>
          <td>
            <mc-button
              class="mds-table__expanded-row__trigger"
              hiddenlabel
              disablediconslot
              disabledlabelslot
              variant="plain"
              padding="none"
              label="expand"
              icon="chevron-down"
            ></mc-button>
          </td>
          <td>Tove Maersk</td>
          <td>Santos</td>
          <td class="mds-text-right">1992</td>
          <td class="mds-text-right">162</td>
          <td class="mds-text-right">1,446</td>
        </tr>
        <tr class="mds-table__expanded-row mds-table__expanded-row--hidden">
          <td colspan="6">
            <div>expanded content</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>`;

export const preview = [
  {
    label: 'JavaScript/HTML',
    template: `
${rowExpansionTemplate}

<script>
  const toggleExpanded = (buttonEl) => {
    const currentRowEl = buttonEl.parentNode.parentNode;
    const relatedRowEl = getRelatedRow(currentRowEl);

    if (relatedRowEl) {
      relatedRowEl?.classList.toggle('mds-table__expanded-row--hidden');
      relatedRowEl?.classList.toggle('mds-table__expanded-row--visible');
      buttonEl.classList.toggle('mds-table__expanded-row__trigger--expanded');
    }
  };

  const getRelatedRow = (startEl) => {
    if (!startEl.nextSibling) {
      return;
    }
    const returnEl = startEl.nextSibling;
    if (returnEl.nodeName === 'TR') {
      return returnEl;
    }
    return getRelatedRow(returnEl);
  };

  document.querySelectorAll('mc-button').forEach((buttonEl) =>
    buttonEl.addEventListener('click', (e) => {
      toggleExpanded(e.target);
    }),
  );
</script>
  `,
    language: 'javascript',
  } as IMcCCode,
];
