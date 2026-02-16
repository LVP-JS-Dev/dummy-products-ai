import Link from "next/link";

const copy = {
	en: {
		title: "Hello World",
		bodyStart: "You can open",
		bodyEnd: "and see the documentation.",
	},
	ru: {
		title: "Привет, мир",
		bodyStart: "Вы можете открыть",
		bodyEnd: "и посмотреть документацию.",
	},
};

export default async function HomePage({ params }: PageProps<"/[lang]">) {
	const { lang } = await params;
	const text = copy[lang as keyof typeof copy] ?? copy.en;

	return (
		<div className="flex flex-1 flex-col justify-center text-center">
			<h1 className="mb-4 font-bold text-2xl">{text.title}</h1>
			<p>
				{text.bodyStart}{" "}
				<Link className="font-medium underline" href={`/${lang}/docs`}>
					/docs
				</Link>{" "}
				{text.bodyEnd}
			</p>
		</div>
	);
}
