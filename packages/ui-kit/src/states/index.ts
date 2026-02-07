import { buttonStates } from "./ButtonStates";
import { checkboxStates } from "./CheckboxStates";
import { iconStates } from "./IconStates";
import { pageNumberStates } from "./PageNumberStates";
import { searchInputStates } from "./SearchInputStates";

export const states = {
  button: buttonStates,
  searchInput: searchInputStates,
  checkbox: checkboxStates,
  pageNumber: pageNumberStates,
  icon: iconStates,
} as const;
