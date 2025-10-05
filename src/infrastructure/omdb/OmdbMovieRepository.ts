import type { MovieRepository } from "../../domain/repositories/MovieRepository";
import type { Movie } from "../../domain/entities/Movies";
import { env } from "../config/env";
import { getJSON } from "../http/httpClient";
import { mapDetail, mapSearch } from "./omdbMapper";

export class OmdbMovieRepository implements MovieRepository {
  private base = env.omdbBaseUrl;
  private key = env.omdbApiKey;

  async searchByTitle(title: string, signal?: AbortSignal): Promise<Movie[]> {
    const url = `${this.base}?apikey=${this.key}&s=${encodeURIComponent(title)}`;
    const data = await getJSON<any>(url, { signal });
    if (data?.Response === "False") {
      // Handle throttling or missing
      if (/limit|too many|maximum/i.test(data?.Error ?? "")) {
        throw new Error("OMDb request limit reached. Please try again later.");
      }
      return [];
    }
    return mapSearch(data.Search ?? []);
  }

  async getById(id: string, signal?: AbortSignal): Promise<Movie | null> {
    const url = `${this.base}?apikey=${this.key}&i=${encodeURIComponent(id)}`;
    const data = await getJSON<any>(url, { signal });
    if (data?.Response === "False") return null;
    return mapDetail(data);
  }
}
