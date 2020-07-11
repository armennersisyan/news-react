export const strSlice = (str, len = 70) => {
  if (!str) return;
  if (str.length > len + 5) {
    return str.substring(0, len) + '...'
  } return str
};

export const sortOptions = [
  {
    name: 'Published At',
    id: 'publishedAt',
  },
  {
    name: 'Relevancy',
    id: 'relevancy',
  },
  {
    name: 'Popularity',
    id: 'popularity',
  },
];
