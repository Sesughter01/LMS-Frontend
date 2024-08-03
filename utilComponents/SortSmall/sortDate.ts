export const sortByDate = (dateA: string, dateB: string) => {
  const timestampA = new Date(dateA).getTime();
  const timestampB = new Date(dateB).getTime();

  return timestampA - timestampB;
};
