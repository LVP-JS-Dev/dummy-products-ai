import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions } from "@/lib/LayoutShared";

export default function Layout({ children }: LayoutProps<"/">) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
