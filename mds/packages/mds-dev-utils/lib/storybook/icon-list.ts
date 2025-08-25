import icons from '@maersk-global/icons/metadata/metadata.json';
export const getIconList = (excludeBlankEntry = false): string[] => {
  const iconList = icons.slice(0).map((icon) => {
    return icon.name;
  });
  if (!excludeBlankEntry) {
    iconList.unshift('');
  }
  return iconList;
};
