export const buttonStates = {
	Default: {
		text: "Добавить",
		variant: "blue",
		showIcon: true,
		iconName: "plus_circle",
		badgeLabel: "NEW",
		showBadgeLabel: true,
		badgeCount: 17,
		showBadgeCount: true,
	},
	WithIcon: {
		text: "Обновить",
		variant: "blue",
		showIcon: true,
		iconName: "refresh",
	},
	Secondary: {
		text: "Подробнее",
		variant: "secondary",
		showIcon: false,
	},
	IconOnly: {
		variant: "icon",
		showIcon: true,
		iconName: "more_horizontal",
	},
	EdgeCaseLongText: {
		text: "Очень длинное название действия",
		variant: "blue",
		showIcon: false,
		badgeCount: 999,
		showBadgeCount: true,
	},
} as const;
