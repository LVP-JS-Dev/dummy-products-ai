import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { baseOptions } from "@/lib/LayoutShared";
import { source } from "@/lib/Source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
