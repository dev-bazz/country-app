type FetchOptions = getFetchOption | postFetchOption;

type getFetchOption = Omit<RequestInit, "body"> & {
  method: "GET" | "HEAD" | "OPTIONS";
}

type postFetchOption = RequestInit & {
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  body: BodyInit
}

export class HttpsError<T> extends Error {
  res: T;

  constructor( message: string, res: T, name?: string, cause?: string ) {
    super( message );
    this.name = name || "HttpsError";
    this.res = res;
    this.cause = cause || "Unknown cause";
  }
}

export async function https<T> (
  url: string,
  options: FetchOptions,
  params?: Record<string, string>,
): Promise<T> {
  let modifiedUrl = url;
  if ( params ) {
    if ( options.method === "GET" || options.method === "HEAD" ) {
      const urlParams = new URLSearchParams( params );
      modifiedUrl += `?${ urlParams.toString() }`;
    }
  }

  try {
    const res = await fetch( modifiedUrl, options );
    if ( !res.ok ) {
      const response = await res.json();
      // Throw the custom HttpsError
      throw new HttpsError(
        res.statusText ?? res.status,
        response,
        res.statusText,
      );
    }

    const data: T = await res.json();
    return data;
  } catch ( error ) {
    if ( error instanceof HttpsError ) {
      throw error;
    }
    if ( error instanceof Error ) {
      throw error;
    }
    throw new Error( "Unknown error occurred during fetch" );
  }
}
