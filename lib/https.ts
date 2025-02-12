type FetchOptions = GetFetchOption | PostFetchOption;

type GetFetchOption = Omit<RequestInit, "body"> & {
	method: "GET" | "HEAD" | "OPTIONS";
};

type PostFetchOption = RequestInit & {
	method: "POST" | "PUT" | "PATCH" | "DELETE";
	body: BodyInit;
};

class HttpsError extends Error {
	public status: number;
	public statusText: string;
	public response?: unknown;

	constructor(
		message: string,
		status: number,
		statusText: string,
		response?: unknown,
	) {
		super(message);
		this.status = status;
		this.statusText = statusText;
		this.response = response;
	}
}

type CacheEntry<T> = {
	data: T;
	timestamp: number;
};

class HttpsClient<T> {
	/**
	 * Created by : Clement Femi Bazuaye
	 * Github: https://github.com/dev-bazz
	 * LinkedIn: https://www.linkedin.com/in/devbazz/
	 * Email: bazuaye50@gmail.com
	 */
	private url: string;
	private options: FetchOptions;
	private params?: Record<string, string>;
	private debug: boolean;
	private maxRetries = 3;
	private retryDelay = 1000; // in milliseconds
	private timeout = 5000; // default timeout in milliseconds
	private cacheDuration = 300000; // default cache duration in milliseconds (5 minutes)
	private cache = new Map<string, CacheEntry<T>>();
	private transformer?: (data: T) => T;
	private onError?: (error: HttpsError) => void;
	private customLogger?: (message: string, data?: unknown) => void;

	constructor(
		url: string,
		options: FetchOptions,
		params?: Record<string, string>,
		debug = false,
	) {
		this.url = url;
		this.options = options;
		this.params = params;
		this.debug = debug;
	}

	/** Set the cache duration in milliseconds */
	public setCacheDuration(duration: number) {
		this.cacheDuration = duration;
	}

	/** Set cache for specific request data with timestamp */
	public setCache(key: string, data: T) {
		this.cache.set(key, { data, timestamp: Date.now() });
	}

	/** Retrieve cached data if not expired */
	public getCache(key: string): T | undefined {
		const cacheEntry = this.cache.get(key);
		if (cacheEntry) {
			const isExpired = Date.now() - cacheEntry.timestamp > this.cacheDuration;
			if (!isExpired) {
				return cacheEntry.data;
			}
			this.cache.delete(key);
		}
		return undefined;
	}

	/** Enable or disable debugging dynamically */
	public setDebugMode(debug: boolean) {
		this.debug = debug;
	}

	/** Set query parameters dynamically */
	public setParams(params: Record<string, string>) {
		this.params = { ...this.params, ...params };
	}

	/** Set custom headers */
	public setHeaders(headers: Record<string, string>) {
		this.options.headers = {
			...this.options.headers,
			...headers,
		};
	}

	/** Main request method with retries, timeout, and caching */
	public async request(): Promise<T> {
		let modifiedUrl = this.url;

		// Append query parameters if applicable
		if (
			this.params &&
			(this.options.method === "GET" || this.options.method === "HEAD")
		) {
			const urlParams = new URLSearchParams(this.params);
			// biome-ignore lint/style/useTemplate: <explanation>
			modifiedUrl += "?" + urlParams.toString();
		}

		// Generate cache key based on the URL and options
		const cacheKey = modifiedUrl + JSON.stringify(this.options);

		// Check cache
		const cachedData = this.getCache(cacheKey);
		if (cachedData) {
			if (this.debug) this.log("Cache hit for URL:", modifiedUrl);
			return cachedData;
		}

		if (this.debug) this.logRequestInfo(modifiedUrl);

		try {
			const res = await this.requestWithRetry(
				modifiedUrl,
				this.options,
				this.maxRetries,
			);

			if (this.debug) this.logResponseInfo(res);

			if (!res.ok) {
				// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
				let errorResponse;
				try {
					errorResponse = await res.json();
				} catch {
					errorResponse = await res.text(); // Fallback for non-JSON responses
				}
				const error = new HttpsError(
					errorResponse.message || "API Error",
					res.status,
					res.statusText,
					errorResponse,
				);
				if (this.onError) this.onError(error);
				throw error;
			}

			const data: T = await res.json();
			const transformedData = this.transformer ? this.transformer(data) : data;

			// Cache the result with the unique cache key
			this.setCache(cacheKey, transformedData);

			return transformedData;
		} catch (error) {
			if (this.debug) this.logError(error);
			throw error instanceof HttpsError
				? error
				: new Error("Unknown error occurred during fetch");
		}
	}

	/** Recursive retry logic with delay */
	private async requestWithRetry(
		url: string,
		options: FetchOptions,
		retries: number,
	): Promise<Response> {
		try {
			return await this.fetchWithTimeout(url, options, this.timeout);
		} catch (error) {
			if (retries > 0) {
				await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
				return this.requestWithRetry(url, options, retries - 1);
			}
			throw error;
		}
	}

	/** Request with timeout support */
	private async fetchWithTimeout(
		url: string,
		options: FetchOptions,
		timeout: number,
	): Promise<Response> {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);
		try {
			const response = await fetch(url, {
				...options,
				signal: controller.signal,
			});
			return response;
		} finally {
			clearTimeout(id);
		}
	}

	/** Utility method to log request details */
	private logRequestInfo(url: string): void {
		this.log("Request URL:", url);
		this.log("Request Method:", this.options.method);
		this.log("Request Headers:", this.options.headers);
		this.log("Request Params:", this.params || "No Params");
		if ("body" in this.options) {
			this.log("Request Body:", this.options.body);
		}
	}

	/** Utility method to log response details */
	private async logResponseInfo(res: Response): Promise<void> {
		this.log("Response Status:", res.status);

		// Convert headers to an object for logging
		const headersObj: Record<string, string> = {};
		res.headers.forEach((value, key) => {
			headersObj[key] = value;
		});
		this.log("Response Headers:", headersObj);

		try {
			const json = await res.clone().json();
			this.log("Response JSON:", json);
		} catch {
			this.log("Response is not JSON or could not be parsed");
		}
	}

	/** Utility method to log error details */
	private logError(error: unknown): void {
		if (error instanceof HttpsError) {
			this.log(
				`HttpsError: ${error.message}, Status: ${error.status}, StatusText: ${error.statusText}`,
			);
			if (error.response) this.log("Error Response:", error.response);
		} else if (error instanceof Error) {
			this.log("Error:", error.message);
		} else {
			this.log("Unknown error occurred");
		}
	}

	/** Log message using the custom logger if provided, else default to console.log */
	private log(message: string, data?: unknown): void {
		if (this.customLogger) {
			this.customLogger(message, data);
		} else {
			console.log(message, data);
		}
	}
}
