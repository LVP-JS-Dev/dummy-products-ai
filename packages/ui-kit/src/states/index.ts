import { buttonStates } from "./button.states";
import { searchInputStates } from "./search-input.states";
import { checkboxStates } from "./checkbox.states";
import { pageNumberStates } from "./page-number.states";
import { iconStates } from "./icon.states";

export const states = {
  button: buttonStates,
  searchInput: searchInputStates,
  checkbox: checkboxStates,
  pageNumber: pageNumberStates,
  icon: iconStates,
} as const;
