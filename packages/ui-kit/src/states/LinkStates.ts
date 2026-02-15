export const linkStates = {
	Default: {
		href: "/register",
		text: "Создать",
	},
	External: {
		href: "https://example.com/docs",
		text: "Документация",
		target: "_blank",
	},
	Disabled: {
		href: "https://example.com/disabled",
		text: "Недоступно",
		disabled: true,
	},
} as const;
