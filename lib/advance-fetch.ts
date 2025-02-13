/**
 * Fetch for better Dev Experience
 * @param argsFetchDX
 */
export async function fetchDX<T>(args: argsFetchDX): Promise<T> {
	const { url, params, options } = args;
	const baseUrl = process.env.BASE_URL || "";
	const modifiedUrlWithBase =
		(url && baseUrl ? `${baseUrl}${url}` : baseUrl) || url;
	let modifiedUrl = modifiedUrlWithBase;
	console.log("modifiedUrl: ", modifiedUrl);

	if (params) {
		if (options.method === "GET" || options.method === "HEAD") {
			const urlParams = new URLSearchParams(params);
			modifiedUrl += `?${urlParams.toString()}`;
		}
	}

	try {
		const res = await fetch(modifiedUrl, options);

		if (!res.ok) {
			// Return response if success
			const errorData = await res.json();
			// throw Error
			throw new ApiError(errorData, res.status);
		}
		const data: T = await res.json();
		return data;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError({
			message: "An unexpected error occurred",
			error: error,
		});
	}
}

interface argsFetchDX {
	url: string;
	params?: Record<string, string>;
	options: FetchOptions;
}

type FetchOptions = getFetchOption | postFetchOption;
type getFetchOption = Omit<RequestInit, "body"> & {
	method: "GET" | "HEAD" | "OPTIONS";
	headers?: requestHeaderT;
};
type postFetchOption = RequestInit & {
	method: "POST" | "PUT" | "PATCH" | "DELETE";
	body: BodyInit;
	headers?: requestHeaderT;
};

type requestHeaderT = HeadersInit & {
	"Content-Type"?:
		| "application/json"
		| "application/x-www-form-urlencoded"
		| "text/plain";
	Authorization?: string;
};

class ApiError extends Error {
	constructor(
		public data: unknown,
		public status?: number,
	) {
		super(JSON.stringify(data));
		this.name = "ApiError";
	}
}
