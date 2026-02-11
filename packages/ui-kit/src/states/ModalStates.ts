export const modalStates = {
  DefaultOpen: {
    open: true,
    title: "Modal title",
    description: "Optional helper text that explains what this modal is for.",
    size: "md",
    dismissible: true,
    closeAriaLabel: "Close dialog",
  },
  NonDismissible: {
    open: true,
    title: "Non-dismissible modal",
    description: "Escape and backdrop click are disabled in this state.",
    size: "md",
    dismissible: false,
  },
  LongContent: {
    open: true,
    title: "Long content modal",
    description:
      "This state is used to validate wrapping behavior for long description text in the header area.",
    size: "lg",
    dismissible: true,
  },
} as const;
