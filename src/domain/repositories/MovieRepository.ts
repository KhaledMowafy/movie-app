import type { Movie } from "../entities/Movies";

export interface MovieRepository {
  searchByTitle(title: string, signal?: AbortSignal): Promise<Movie[]>;
  getById(id: string, signal?: AbortSignal): Promise<Movie | null>;
}
