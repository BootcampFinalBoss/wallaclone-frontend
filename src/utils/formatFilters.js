import removeEmptyFields from './removeEmptyFields';

const formatFilters = (filters) => {
  if (filters.tags)
    filters.tags = filters.tags.map((tag) => tag.toLowerCase()).join(',');
  if (filters.price) filters.price = `${filters.price[0]}-${filters.price[1]}`;
  return removeEmptyFields(filters);
};

export default formatFilters;
