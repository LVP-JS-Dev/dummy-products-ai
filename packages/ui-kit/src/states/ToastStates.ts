export const toastStates = {
  Success: {
    tone: "success",
    title: "Готово",
    description: "Данные сохранены",
    dismissible: true,
    showIcon: true,
  },
  Error: {
    tone: "error",
    title: "Ошибка",
    description: "Не удалось сохранить",
    dismissible: true,
    showIcon: true,
  },
  Loading: {
    tone: "loading",
    title: "Загрузка",
    description: "Подождите",
    showIcon: true,
  },
} as const;
