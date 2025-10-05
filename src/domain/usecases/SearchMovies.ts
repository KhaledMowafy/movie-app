import type { MovieRepository } from "../repositories/MovieRepository";
import type { Movie } from "../entities/Movies";

export class SearchMovies {
 private readonly repo: MovieRepository;
   constructor(repo: MovieRepository) {
     this.repo = repo;
   }
  async execute(title: string, signal?: AbortSignal): Promise<Movie[]> {
    if (!title.trim()) return [];
    return this.repo.searchByTitle(title.trim(), signal);
  }
}
