import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginRedoc } from "@kubb/plugin-redoc";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";

export default defineConfig({
	root: ".",
	input: {
		path: "./dummyjson.openapi.yaml",
	},
	output: {
		path: "./generated",
		clean: true,
		format: false,
		lint: false,
	},
	plugins: [
		pluginOas(),
		pluginTs({
			output: {
				path: "models",
			},
		}),
		pluginClient({
			client: "fetch",
			baseURL: "https://dummyjson.com",
			bundle: true,
			output: {
				path: "clients",
			},
		}),
		pluginReactQuery({
			client: {
				client: "fetch",
				baseURL: "https://dummyjson.com",
				bundle: true,
			},
			output: {
				path: "hooks",
			},
		}),
		pluginZod({
			output: {
				path: "zod",
			},
		}),
		pluginRedoc(),
	],
});
