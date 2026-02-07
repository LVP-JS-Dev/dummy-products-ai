export const checkboxStates = {
  Default: {
    checked: false,
    label: "Выбрать",
  },
  Checked: {
    checked: true,
    label: "Выбрано",
  },
  Disabled: {
    checked: false,
    label: "Недоступно",
    disabled: true,
  },
} as const;
