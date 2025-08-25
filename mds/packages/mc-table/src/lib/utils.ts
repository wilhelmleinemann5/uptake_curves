/* eslint-disable */
export const getDataForColumn = (data: any[], columnId: string): any[] => {
  return data.map((row) => row[columnId]);
};
