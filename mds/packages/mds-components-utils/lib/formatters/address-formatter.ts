/**
 * Takes multiple address items and returns them as a single string with line breaks
 * @param buildingNo
 * @param streetName
 * @param city
 * @param postalCode
 * @param country
 * @param isCompact if true, should not have <br /> tags between lines
 */
export const addressFormatter = (
  buildingNo: string,
  streetName: string,
  city: string,
  postalCode: string,
  country: string,
  isCompact = false
): string => {
  let firstLine: string;
  if (buildingNo && streetName) {
    firstLine = `${buildingNo} ${streetName}`;
  } else if (buildingNo) {
    firstLine = buildingNo;
  } else {
    firstLine = streetName || '';
  }

  return [firstLine, city, postalCode, country].filter(Boolean).join(`, ${isCompact ? '' : '<br />'}`);
};
