type HttpError = { status?: number; message: string };

export async function getJSON<T>(
  url: string,
  opts: { signal?: AbortSignal } = {}
): Promise<T> {
  const res = await fetch(url, { signal: opts.signal });
  if (!res.ok) {
    const text = await res.text();
    const err: HttpError = { status: res.status, message: text || res.statusText };
    throw err;
  }
  return JSON.parse(await res.text()) as T;
}
