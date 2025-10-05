import { OmdbMovieRepository } from "../../infrastructure/omdb/OmdbMovieRepository";
import { SearchMovies } from "../../domain/usecases/SearchMovies";
import { GetMovieDetails } from "../../domain/usecases/GetMovieDetails";

const movieRepo = new OmdbMovieRepository();

export const useCases = {
  searchMovies: new SearchMovies(movieRepo),
  getMovieDetails: new GetMovieDetails(movieRepo),
};
