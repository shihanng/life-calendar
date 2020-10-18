export const generateDataArray = (
  lowerBound: number,
  upperBound: number,
  bins: number,
  start: number,
  end: number
): number[] => {
  const total = upperBound - lowerBound + 1;
  const nPerBin = total / bins;

  const startAt = start / nPerBin;
  const endAt = end / nPerBin;

  const startIdx = Math.ceil(startAt) - 1;
  const endIdx = Math.ceil(endAt) - 1;

  const startVal = (startAt % 1.0) * 100;
  const endVal = (endAt % 1.0) * 100;

  const leftData = new Array<number>(startIdx - lowerBound + 1).fill(0);
  const rightData = new Array<number>(bins - endIdx - 1).fill(0);
  const midData = new Array<number>(endIdx - startIdx - 1).fill(100);

  return [
    ...leftData,
    startVal ? startVal : 100,
    ...midData,
    endVal ? endVal : 100,
    ...rightData,
  ];
};
