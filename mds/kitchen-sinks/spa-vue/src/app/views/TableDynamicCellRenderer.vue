<script setup lang="ts">
import '@maersk-global/mds-components-core/mc-table';
import { defineAsyncComponent } from 'vue';

const cellRendererList: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  containerCell: defineAsyncComponent({
    loader: () => import('../components/ContainerCell.vue'),
    loadingComponent: () => 'loading...',
  }),
  containerCellStyled: defineAsyncComponent({
    loader: () => import('../components/ContainerCellStyled.vue'),
    loadingComponent: () => 'loading...',
  }),
};

const columns = [
  {
    id: 'shipper',
    label: 'Shipper',
    align: 'left',
    sortDisabled: true,
    width: '250px',
  },
  {
    id: 'container',
    label: 'Container',
    align: 'left',
    sortDisabled: true,
  },
  {
    id: 'flagged',
    label: 'Flagged',
    align: 'left',
    sortDisabled: true,
  },
];
const data = [
  {
    id: 1,
    container: 'cell component',
    flagged: false,
    shipper: 'Ma',
    cellRenderers: [
      {
        cellName: 'container',
        cellRenderer: 'containerCell',
      },
    ],
  },
  {
    id: 2,
    container: 'styled cell component',
    flagged: true,
    shipper: 'Va',
    cellRenderers: [
      {
        cellName: 'container',
        cellRenderer: 'containerCellStyled',
      },
    ],
  },
  {
    id: 3,
    container: 'Default fallback cell',
    flagged: false,
    shipper: 'Ad',
  },
  {
    id: 4,
    container: 'cell component',
    flagged: false,
    shipper: 'Loading shipper cell with containerCell component!',
    cellRenderers: [
      {
        cellName: 'shipper',
        cellRenderer: 'containerCell',
      },
    ],
  },
];
</script>
<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <mc-table
      nowrap
      fit="small"
      disableoverflow
      horizontallinestyle="solid"
      verticallinestyle="solid"
      :data="data"
      :columns="columns"
    >
      <!--begin::tableHeaderGroup dynamic cell renderer content-->
      <template v-for="row in data" :key="row.id">
        <template v-for="cellRendererObject in row.cellRenderers || []" :key="cellRendererObject.cellName">
          <div :slot="`${row.id}_${cellRendererObject.cellName}`">
            <component
              :is="cellRendererList[cellRendererObject.cellRenderer]"
              :row-data="row"
              :cell-name="cellRendererObject.cellName"
            />
          </div>
        </template>
      </template>
      <!--end::tableHeaderGroup dynamic cell renderer content-->
    </mc-table>
  </section>
</template>
