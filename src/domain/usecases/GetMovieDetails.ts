import type { MovieRepository } from "../repositories/MovieRepository";
import type { Movie } from "../entities/Movies";

export class GetMovieDetails {
    private readonly repo: MovieRepository;
   constructor(repo: MovieRepository) {
     this.repo = repo;
   }
  async execute(id: string, signal?: AbortSignal): Promise<Movie | null> {
    return this.repo.getById(id, signal);
  }
}
