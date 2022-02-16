export const timestampToDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

export const timestampToIsoDate = (timestamp) => {
  return new Date(timestamp * 1000).toISOString();
};
