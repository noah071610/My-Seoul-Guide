import { PathObj } from "../types";

export const useCalcCenter = (path: PathObj[]) => {
  let maxY = Number.MIN_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let minX = Number.MAX_SAFE_INTEGER;
  path.forEach((v) => {
    maxY = Math.max(maxY, v.lat);
    maxX = Math.max(maxX, v.lng);
    minY = Math.min(minY, v.lat);
    minX = Math.min(minX, v.lng);
  });
  return { lat: minY + (maxY - minY) / 2, lng: minX + (maxX - minX) / 2 };
};
