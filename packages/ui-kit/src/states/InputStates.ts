export const inputStates = {
  Default: {
    label: "Логин",
    placeholder: "Введите логин",
    value: "",
    type: "text",
  },
  WithError: {
    label: "Пароль",
    placeholder: "Введите пароль",
    value: "",
    type: "password",
    error: "Обязательное поле",
  },
  Password: {
    label: "Пароль",
    placeholder: "Введите пароль",
    value: "hunter2",
    type: "password",
  },
} as const;
