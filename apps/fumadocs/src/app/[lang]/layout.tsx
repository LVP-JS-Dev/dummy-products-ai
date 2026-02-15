import { defineI18nUI } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";

import "../global.css";

import { i18n } from "@/lib/I18n";

const inter = Inter({
  subsets: ["latin"],
});

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: "English",
    },
    ru: {
      displayName: "Русский",
      search: "Поиск",
      searchNoResult: "Ничего не найдено",
      toc: "Содержание",
      tocNoHeadings: "Нет заголовков",
      lastUpdate: "Последнее обновление",
      chooseLanguage: "Язык",
      nextPage: "Следующая",
      previousPage: "Предыдущая",
      chooseTheme: "Тема",
      editOnGithub: "Редактировать на GitHub",
    },
  },
});

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const safeLang = i18n.languages.includes(lang) ? lang : i18n.defaultLanguage;

  return (
    <html className={inter.className} lang={safeLang} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider i18n={provider(safeLang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
