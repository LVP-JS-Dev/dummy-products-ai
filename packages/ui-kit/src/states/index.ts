import { buttonStates } from "./ButtonStates";
import { cardStates } from "./CardStates";
import { checkboxStates } from "./CheckboxStates";
import { dividerStates } from "./DividerStates";
import { iconStates } from "./IconStates";
import { imageStates } from "./ImageStates";
import { inputStates } from "./InputStates";
import { linkStates } from "./LinkStates";
import { pageNumberStates } from "./PageNumberStates";
import { paginationStates } from "./PaginationStates";
import { searchInputStates } from "./SearchInputStates";
import { spinnerStates } from "./SpinnerStates";
import { textStates } from "./TextStates";
import { toastStates } from "./ToastStates";

export const states = {
  button: buttonStates,
  card: cardStates,
  searchInput: searchInputStates,
  checkbox: checkboxStates,
  divider: dividerStates,
  input: inputStates,
  link: linkStates,
  text: textStates,
  toast: toastStates,
  spinner: spinnerStates,
  image: imageStates,
  pageNumber: pageNumberStates,
  pagination: paginationStates,
  icon: iconStates,
} as const;
