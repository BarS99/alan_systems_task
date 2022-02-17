export const timestampToDate = (timestamp) => {
  if (isNaN(timestamp)) return null;

  return new Date(timestamp * 1000).toLocaleString();
};

export const timestampToIsoDate = (timestamp) => {
  if (isNaN(timestamp)) return null;
  return new Date(timestamp * 1000).toISOString();
};
