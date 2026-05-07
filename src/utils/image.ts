const DEFAULT_BACKEND_PUBLIC_ORIGIN = "https://rs0hfx59-8002.asse.devtunnels.ms";

const LOCAL_BACKEND_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

export const resolveImageUrl = (imageUrl?: string | null): string => {
	if (!imageUrl) return "";

	// Keep data/blob/static-relative URLs unchanged.
	if (
		imageUrl.startsWith("data:") ||
		imageUrl.startsWith("blob:") ||
		imageUrl.startsWith("/")
	) {
		return imageUrl;
	}

	try {
		const parsed = new URL(imageUrl);

		if (!LOCAL_BACKEND_HOSTS.has(parsed.hostname)) {
			return imageUrl;
		}

		const publicOrigin =
			process.env.NEXT_PUBLIC_BACKEND_PUBLIC_ORIGIN ||
			DEFAULT_BACKEND_PUBLIC_ORIGIN;
		const publicBase = new URL(publicOrigin);

		// Rebuild URL from public origin to avoid keeping localhost port (e.g. :8002).
		return `${publicBase.origin}${parsed.pathname}${parsed.search}${parsed.hash}`;
	} catch {
		// Handle relative paths by prepending the backend origin
		if (!imageUrl.includes("://")) {
			const publicOrigin =
				process.env.NEXT_PUBLIC_BACKEND_PUBLIC_ORIGIN ||
				DEFAULT_BACKEND_PUBLIC_ORIGIN;
			return `${publicOrigin}/media/${imageUrl}`;
		}
		return imageUrl;
	}
};

export const shouldBypassImageOptimization = (imageUrl?: string | null): boolean => {
	if (!imageUrl) return false;

	return imageUrl.startsWith("http://") || imageUrl.startsWith("https://");
};

export const appendImageVersion = (
	imageUrl?: string | null,
	version?: string | number
): string => {
	if (!imageUrl) return "";
	if (imageUrl.startsWith("data:") || imageUrl.startsWith("blob:")) return imageUrl;

	if (version === undefined || version === null) return imageUrl;

	const separator = imageUrl.includes("?") ? "&" : "?";
	return `${imageUrl}${separator}v=${encodeURIComponent(String(version))}`;
};
