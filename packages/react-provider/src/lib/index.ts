export const getDateDiff = (date?: number) => {
  if (!date) {
    return;
  }

  const now = new Date().getTime();
  return date ? now - date : undefined;
};
