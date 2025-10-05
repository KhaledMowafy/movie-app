import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import type { Movie } from "../../domain/entities/Movies";
import { useUseCase } from "../../application/hooks/useUseCase";
import { useCases } from "../../application/di/containers";

export default function DetailsPage() {
  const { id = "" } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runner = useMemo(() => {
    return (signal: AbortSignal, movieId: string) =>
      useCases.getMovieDetails.execute(movieId, signal);
  }, []);

  useUseCase(runner, [id], setMovie, (e) => setError((e as Error).message));

  if (error) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <Link to="/" className="text-indigo-600">&larr; Back</Link>
        <div className="mt-4 text-red-700 bg-red-50 p-3 rounded">{error}</div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <Link to="/" className="text-indigo-600">&larr; Back</Link>
        <div className="mt-4 text-gray-500">Loading…</div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-indigo-600">&larr; Back to results</Link>
      <div className="mt-4 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {movie.posterUrl
            ? <img src={movie.posterUrl} alt={movie.title} className="rounded-2xl shadow w-full" />
            : <div className="aspect-[2/3] rounded-2xl bg-gray-100 grid place-items-center">No poster</div>}
        </div>
        <div className="md:col-span-2 space-y-2">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-600">Year: {movie.year ?? "—"}</p>
          <p className="text-gray-600">Genre: {movie.genre ?? "—"}</p>
        </div>
      </div>
    </main>
  );
}
