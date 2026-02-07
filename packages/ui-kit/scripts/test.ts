import { buttonContract } from "../src/contracts/button.contract";
import { searchInputContract } from "../src/contracts/search-input.contract";
import { checkboxContract } from "../src/contracts/checkbox.contract";
import { pageNumberContract } from "../src/contracts/page-number.contract";
import { iconContract } from "../src/contracts/icon.contract";
import { states } from "../src/states";

const suites = [
  { name: "button", contract: buttonContract, items: states.button },
  { name: "searchInput", contract: searchInputContract, items: states.searchInput },
  { name: "checkbox", contract: checkboxContract, items: states.checkbox },
  { name: "pageNumber", contract: pageNumberContract, items: states.pageNumber },
  { name: "icon", contract: iconContract, items: states.icon },
];

let hasError = false;

for (const suite of suites) {
  const entries = Object.entries(suite.items);

  if (entries.length < 3) {
    console.error(`State set '${suite.name}' must have at least 3 states.`);
    hasError = true;
  }

  for (const [stateName, value] of entries) {
    const result = suite.contract.safeParse(value);
    if (!result.success) {
      console.error(`State '${suite.name}.${stateName}' failed validation:`);
      console.error(result.error.format());
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log("All states are valid.");
