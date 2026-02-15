export const textStates = {
	Heading: {
		as: "h2",
		variant: "heading",
		content: "Заголовок",
	},
	Body: {
		as: "p",
		variant: "body",
		content: "Основной текст",
	},
	Muted: {
		as: "span",
		variant: "muted",
		content: "Вспомогательный текст",
	},
} as const;
