import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { i18n } from "@/lib/I18n";

export function baseOptions(): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: "My App",
    },
  };
}
