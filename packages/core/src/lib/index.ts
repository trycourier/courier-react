export const getDateDiff = (date?: number) => {
  if (!date) {
    return;
  }

  const now = new Date().getTime();
  const dateDiff = now - date;

  // if datediff is 0, return 1 so we can do "!datediff"
  return Math.max(dateDiff, 1);
};
