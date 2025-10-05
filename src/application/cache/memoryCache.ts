const store = new Map<string, unknown>();
export const memoryCache = {
  get<T>(k: string): T | undefined { return store.get(k) as T | undefined; },
  set<T>(k: string, v: T) { store.set(k, v); },
  has(k: string) { return store.has(k); }
};
