import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import EmptyState from "../components/EmptyState";
import { useDebouncedValue } from "../../application/hooks/useDebounceValue";
import { useUseCase } from "../../application/hooks/useUseCase";
import { useCases } from "../../application/di/containers";
import type { Movie } from "../../domain/entities/Movies";
import { memoryCache } from "../../application/cache/memoryCache";

function OmdbLogo() {
  return (
    <div className="inline-flex items-center rounded mr-3 bg-[#f5c518] px-2.5 py-1.5 text-black font-extrabold tracking-wide">
      OMDb{" "}
    </div>
  );
}

export default function SearchPage() {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 450);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Movie[]>([]);

  const runner = useMemo(() => {
    return async (signal: AbortSignal, query: string) => {
      setError(null);
      if (!query) return [];
      const cacheKey = `search:${query.toLowerCase()}`;
      if (memoryCache.has(cacheKey)) return memoryCache.get<Movie[]>(cacheKey)!;

      setLoading(true);
      try {
        const data = await useCases.searchMovies.execute(query, signal);
        memoryCache.set(cacheKey, data);
        return data;
      } finally {
        setLoading(false);
      }
    };
  }, []);

  useUseCase(runner, [debounced], setResults, (e) => {
    const msg = (e as Error)?.message ?? "Something went wrong.";
    setError(
      /limit|try again/i.test(msg)
        ? "API limit reached. Please try again in a minute."
        : msg
    );
  });

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100">
      
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#121317]/80 backdrop-blur supports-[backdrop-filter]:bg-[#121317]/70">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <OmdbLogo />
          <div className="flex-1">
            <div className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2">
              <SearchBar
                value={q}
                onChange={setQ}
                placeholder="Search OMDb… movies, shows, and more"
              />
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-3 text-sm">
            <a className="hover:text-white/90 text-white/70" href="#">
              Movies
            </a>
            <a className="hover:text-white/90 text-white/70" href="#">
              TV
            </a>
            <a className="hover:text-white/90 text-white/70" href="#">
              Celebs
            </a>
            <button className="rounded-md bg-white/10 px-3 py-1.5 text-white hover:bg-white/15">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 min-h-[65vh]">
        {error && (
          <div className="mb-4 rounded-lg border border-red-400/30 bg-red-900/20 text-red-200 px-4 py-3">
            {error}
          </div>
        )}
        {!loading && !error && !q && (
          <div className="mb-4">
            <EmptyState message="Type a title to start searching." />
          </div>
        )}
        {loading && <div className="mt-2 text-white/60">Searching…</div>}

        <section className="mt-4 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {!loading &&
            results.map((m) => (
              <div
                key={m.id}
                className="rounded-xl bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition shadow-sm hover:shadow"
              >
                <MovieCard movie={m} />
              </div>
            ))}
        </section>

        {!loading && q && results.length === 0 && !error && (
          <div className="mt-12 text-center text-white/60">
            No results found.
          </div>
        )}
      </main>

      <footer className="mt-10 border-t border-white/10 py-6 text-center text-sm text-white/50">
        Made with React 19.1 • OMDb • Tailwind
      </footer>
    </div>
  );
}
