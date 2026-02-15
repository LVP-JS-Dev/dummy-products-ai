export const searchInputStates = {
	Default: {
		placeholder: "Найти",
		value: "",
		state: "inactive",
		showIcon: true,
	},
	Active: {
		placeholder: "Найти",
		value: "USB",
		state: "active",
		showIcon: true,
	},
	Disabled: {
		placeholder: "Найти",
		value: "",
		state: "disabled",
		showIcon: true,
	},
} as const;
