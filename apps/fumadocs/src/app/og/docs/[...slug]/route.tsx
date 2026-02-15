import { generate as DefaultImage } from "fumadocs-ui/og";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { i18n } from "@/lib/I18n";
import { getPageImage, source } from "@/lib/Source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">
) {
  const { slug } = await params;
  const [maybeLocale, ...rest] = slug;
  const hasLocale = i18n.languages.includes(maybeLocale);
  const locale = hasLocale ? maybeLocale : i18n.defaultLanguage;
  const pageSlugs = (hasLocale ? rest : slug).slice(0, -1);

  const page = source.getPage(pageSlugs, locale);
  if (!page) {
    notFound();
  }

  return new ImageResponse(
    <DefaultImage
      description={page.data.description}
      site="My App"
      title={page.data.title}
    />,
    {
      width: 1200,
      height: 630,
    }
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
