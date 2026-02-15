export const imageStates = {
	Content: {
		src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
		alt: "Ноутбук на рабочем столе",
		width: 320,
		height: 200,
		loading: "lazy",
		decoding: "async",
		objectFit: "cover",
	},
	Decorative: {
		src: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=800&q=80",
		decorative: true,
		width: 320,
		height: 200,
		loading: "lazy",
		decoding: "async",
		objectFit: "cover",
	},
	WithFallback: {
		src: "https://example.invalid/image.png",
		fallbackSrc:
			"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
		alt: "Fallback image",
		width: 320,
		height: 200,
		loading: "lazy",
		decoding: "async",
		objectFit: "cover",
	},
} as const;
