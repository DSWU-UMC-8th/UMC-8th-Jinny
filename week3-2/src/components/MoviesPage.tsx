import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // 응답에 대한 타입 정의
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      console.log(data);
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <ul>
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h1>{movie.title}</h1>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
