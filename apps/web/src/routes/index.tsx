import { createFileRoute, redirect } from "@tanstack/react-router";

import { loadAuthSession } from "@/auth/Session";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		const session = loadAuthSession();
		throw redirect({ to: session ? "/products" : "/login" });
	},
	component: () => null,
});
