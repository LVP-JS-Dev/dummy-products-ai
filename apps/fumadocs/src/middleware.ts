import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";

import { i18n } from "@/lib/I18n";

export default createI18nMiddleware(i18n);

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|og|llms\\.txt|llms-full\\.txt).*)"],
};
