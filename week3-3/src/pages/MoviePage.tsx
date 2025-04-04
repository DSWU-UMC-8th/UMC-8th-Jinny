import axios from "axios";
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  //1. 로딩 상태
  const [isPending, setIsPending] = useState(false);

  //2. 에러 상태
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);

      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, []);

  // if (!isPending) {
  //   return <LoadingSpinner />;
  // }

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다😮</span>
      </div>
    );
  }

  return (
    <>
      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MoviePage;
