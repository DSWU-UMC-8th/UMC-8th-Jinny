import { useParams } from "react-router-dom";
import { MovieDetailResponse } from "../types/detail";
import { CastResonse } from "../types/credit";
import LoadingSpinner from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

  const { data: movie, isPending, isError } = useCustomFetch<MovieDetailResponse>(detailUrl, "ko-KR");
  const { data: cast } = useCustomFetch<CastResonse>(creditUrl, "ko-KR");
  console.log(cast);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다😮</span>
      </div>
    );
  }

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      <div
        className="bg-cover bg-center h-100 opacity-80 relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.poster_path})`,
        }}
      >
        {!isPending && <div className="absolute w-full h-100 bg-gradient-to-r from-black to-white-500 z-10" />}

        <div className="relative z-20 w-150 p-10 text-base/7 gap-3 flex flex-col justify-center h-full">
          <h1 className="text-4xl font-bold text-white">{movie?.title}</h1>
          <h3 className="text-sm text-white">평균 {movie?.vote_average?.toFixed(2)}</h3>
          <h3 className="text-sm text-white">{movie?.release_date?.slice(0, 4)}</h3>
          <h3 className="text-sm text-white">{movie?.runtime}분</h3>
          <h2 className="text-3xl text-white mt-3">{movie?.tagline}</h2>
          <p className="text-base text-white mt-3 line-clamp-5">{movie?.overview}</p>
        </div>
      </div>

      <div>
        {!isPending && <h3 className="text-3xl pl-10 mt-4">감독/출연</h3>}
        <div className="p-10 grid gap-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 place-items-start">
          {cast?.cast.map((cast) => {
            return (
              <div className="flex flex-col items-center text-center" key={cast.id}>
                <div className="w-[120px] h-[120px] overflow-hidden rounded-full" key={cast.id}>
                  {cast.profile_path === null ? (
                    <div className="bg-gray-200 w-full h-full"></div>
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      className="object-cover w-full h-full"
                      alt="프로필 이미지"
                    />
                  )}
                </div>
                <h3 className="text-sm">{cast.name}</h3>
                <h3 className="text-sm">{cast.original_name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MovieDetailPage;
