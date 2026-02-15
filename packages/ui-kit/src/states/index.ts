import { buttonStates } from "./ButtonStates";
import { cardStates } from "./CardStates";
import { checkboxStates } from "./CheckboxStates";
import { dividerStates } from "./DividerStates";
import { iconStates } from "./IconStates";
import { imageStates } from "./ImageStates";
import { inputStates } from "./InputStates";
import { linkStates } from "./LinkStates";
import { logoStates } from "./LogoStates";
import { modalStates } from "./ModalStates";
import { pageNumberStates } from "./PageNumberStates";
import { paginationStates } from "./PaginationStates";
import { searchInputStates } from "./SearchInputStates";
import { sortIndicatorStates } from "./SortIndicatorStates";
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
	logo: logoStates,
	modal: modalStates,
	spinner: spinnerStates,
	text: textStates,
	toast: toastStates,
	pageNumber: pageNumberStates,
	pagination: paginationStates,
	icon: iconStates,
	image: imageStates,
	sortIndicator: sortIndicatorStates,
} as const;
