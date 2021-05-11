import { PathObj } from "./../@store/store";

export const useCalcCenter = (path: PathObj[]) => {
  let maxY = Number.MIN_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let minX = Number.MAX_SAFE_INTEGER;
  path.forEach((v) => {
    let calcMaxY = Math.max(maxY, v.lat);
    let calcMaxX = Math.max(maxX, v.lng);
    let calcMinY = Math.min(minY, v.lat);
    let calcMinX = Math.min(minX, v.lng);
    maxY = calcMaxY;
    maxX = calcMaxX;
    minY = calcMinY;
    minX = calcMinX;
  });
  let centerY = minY + (maxY - minY) / 2;
  let centerX = minX + (maxX - minX) / 2;
  return { lat: centerY, lng: centerX };
};
