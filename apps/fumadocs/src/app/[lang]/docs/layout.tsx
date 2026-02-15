import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { baseOptions } from "@/lib/LayoutShared";
import { source } from "@/lib/Source";

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params;
  return (
    <DocsLayout tree={source.getPageTree(lang)} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
