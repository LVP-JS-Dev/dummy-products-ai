import { buttonStates } from "./ButtonStates";
import { checkboxStates } from "./CheckboxStates";
import { iconStates } from "./IconStates";
import { pageNumberStates } from "./PageNumberStates";
import { paginationStates } from "./PaginationStates";
import { searchInputStates } from "./SearchInputStates";
import { sortIndicatorStates } from "./SortIndicatorStates";

export const states = {
  button: buttonStates,
  searchInput: searchInputStates,
  checkbox: checkboxStates,
  pageNumber: pageNumberStates,
  pagination: paginationStates,
  icon: iconStates,
  sortIndicator: sortIndicatorStates,
} as const;
