export const cardStates = {
  Default: {
    size: "default",
    outlined: true,
    elevated: true,
    title: "Добро пожаловать",
    description: "Пожалуйста, авторизируйтесь",
  },
  Compact: {
    size: "sm",
    outlined: true,
    elevated: false,
    title: "Компактная карточка",
  },
  Flat: {
    size: "default",
    outlined: false,
    elevated: false,
    title: "Плоская карточка",
  },
} as const;
