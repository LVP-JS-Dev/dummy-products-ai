import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { baseOptions } from "@/lib/LayoutShared";
import { source } from "@/lib/Source";

export default function Layout({
  children,
  params,
}: LayoutProps<"/[lang]/docs">) {
  return (
    <DocsLayout tree={source.getPageTree(params.lang)} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
