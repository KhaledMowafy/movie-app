import { Link } from "react-router-dom";
import type { Movie } from "../../domain/entities/Movies";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="rounded-2xl overflow-hidden shadow hover:shadow-md transition">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.title} className="w-full aspect-[2/3] object-cover" loading="lazy" />
        ) : (
          <div className="w-full aspect-[2/3] grid place-items-center text-sm text-gray-500">No poster</div>
        )}
        <div className="p-3">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-gray-500">{movie.year ?? "—"}</p>
        </div>
      </div>
    </Link>
  );
}
