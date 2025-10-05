import type { Movie } from "../../domain/entities/Movies";

type OmdbSearchItem = {
  imdbID: string; Title: string; Year?: string; Poster?: string;
};

type OmdbDetail = OmdbSearchItem & {
  Genre?: string;
  Response?: "True" | "False";
  Error?: string;
};

export function mapSearch(items: OmdbSearchItem[]): Movie[] {
  return items.map(i => ({
    id: i.imdbID,
    title: i.Title,
    year: i.Year,
    posterUrl: i.Poster && i.Poster !== "N/A" ? i.Poster : undefined,
  }));
}

export function mapDetail(d: OmdbDetail): Movie {
  return {
    id: d.imdbID,
    title: d.Title,
    year: d.Year,
    genre: d.Genre,
    posterUrl: d.Poster && d.Poster !== "N/A" ? d.Poster : undefined,
  };
}
