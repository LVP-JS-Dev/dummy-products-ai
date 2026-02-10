export const paginationStates = {
  FirstPage: {
    currentPage: 1,
    totalPages: 5,
  },
  MiddlePage: {
    currentPage: 3,
    totalPages: 10,
  },
  LastPageDisabled: {
    currentPage: 10,
    totalPages: 10,
    disabled: true,
  },
} as const;
