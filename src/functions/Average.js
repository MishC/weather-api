export const Average = (list) => {
  return list.reduce((prev, curr) => prev + curr, 0) / list.length;
};
