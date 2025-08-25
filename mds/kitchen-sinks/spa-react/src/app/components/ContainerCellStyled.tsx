import React, { FC } from "react";

interface ContainerCellProps {
    rowData: Record<string, never>;
    cellName: string;
}

const ContainerCell: FC<ContainerCellProps> = ({ rowData, cellName }) => {
    const containerCell: React.CSSProperties = {
        background: "pink",
        color: "black"
    };

    return (
        <div style={containerCell}>
            {rowData[cellName]}
        </div>
    );
};

export default ContainerCell;