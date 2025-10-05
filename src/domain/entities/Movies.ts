export type MovieId = string;

export interface Movie {
  id: MovieId;
  title: string;
  year?: string;
  genre?: string;
  posterUrl?: string;
}
