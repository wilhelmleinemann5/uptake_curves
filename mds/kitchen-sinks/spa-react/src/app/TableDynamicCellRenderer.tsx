import React, { FC, Suspense, lazy } from "react";

import { McTable } from '@maersk-global/mds-react-wrapper/components-core/mc-table';

const ContainerCell = lazy(() => import("./components/ContainerCell"));
const ContainerCellStyled = lazy(() => import("./components/ContainerCellStyled"));

const cellRendererList: Record<string, FC<any>> = {
  containerCell: ContainerCell,
  containerCellStyled: ContainerCellStyled,
};

const columns = [
  {
    id: "shipper",
    label: "Shipper",
    sortDisabled: true,
    width: "250px"
  },
  {
    id: "container",
    label: "Container",
    sortDisabled: true
  },
  {
    id: "flagged",
    label: "Flagged",
    sortDisabled: true
  },
];

const data = [
  {
    id: 1,
    container: "cell component",
    flagged: false,
    shipper: "Ma",
    cellRenderers: [
      {
        cellName: "container",
        cellRenderer: "containerCell",
      },
    ],
  },
  {
    id: 2,
    container: "styled cell component",
    flagged: true,
    shipper: "Va",
    cellRenderers: [
      {
        cellName: "container",
        cellRenderer: "containerCellStyled",
      },
    ],
  },
  {
    id: 3,
    container: "Default fallback cell",
    flagged: false,
    shipper: "Ad",
  },
  {
    id: 4,
    container: "cell component",
    flagged: false,
    shipper: "Loading shipper cell with containerCell component!",
    cellRenderers: [
      {
        cellName: "shipper",
        cellRenderer: "containerCell",
      },
    ],
  },
];

const TableDynamicCellRenderer: FC = () => {
  return (
        <McTable
            nowrap
            fit="small"
            disableoverflow
            horizontallinestyle="solid"
            verticallinestyle="solid"
            data={data}
            columns={columns}
        >
          {data.map((row) =>
              (row.cellRenderers || []).map((cellRendererObject) => {
                const RendererComponent =
                    cellRendererList[cellRendererObject.cellRenderer];
                return (
                    <div key={`${row.id}_${cellRendererObject.cellName}`} slot={`${row.id}_${cellRendererObject.cellName}`}>
                      <Suspense fallback={<div>Loading...</div>}>
                        {RendererComponent ? (
                            <RendererComponent
                                rowData={row}
                                cellName={cellRendererObject.cellName}
                            />
                        ) : (
                            <div>No Renderer Found</div>
                        )}
                      </Suspense>
                    </div>
                );
              })
          )}
        </McTable>
  );
};

export default TableDynamicCellRenderer;