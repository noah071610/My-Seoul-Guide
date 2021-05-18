export default function useExchageClac(data: number, currentExchage: number) {
  return Number(
    Math.floor(data * currentExchage)
      .toString()
      .slice(0, -1) + 0
  );
}
