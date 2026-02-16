import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions } from "@/lib/LayoutShared";

export default function Layout({ children }: LayoutProps<"/[lang]">) {
	return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
