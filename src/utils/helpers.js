export const strSlice = (str, len = 70) => {
  if (!str) return;
  if (str.length > len + 5) {
    return str.substring(0, len) + '...'
  } return str
};
