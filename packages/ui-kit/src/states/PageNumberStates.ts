export const pageNumberStates = {
	Default: {
		value: 1,
		selected: false,
	},
	Selected: {
		value: 2,
		selected: true,
	},
	Disabled: {
		value: 3,
		selected: false,
		disabled: true,
	},
} as const;
