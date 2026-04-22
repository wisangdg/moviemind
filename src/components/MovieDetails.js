import { useState, useEffect } from "react";
import { ArrowLeft, Star, Clock, Calendar, CheckCircle } from "lucide-react";
import StarRating from "./StarRating";
import { Loader } from "./UI";
import { useKey } from "../hooks/useKey";
import { motion } from "framer-motion";

const KEY = process.env.REACT_APP_OMDB_API_KEY;

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Runtime: runtime,
    Genre: genre,
  } = movie;

  const isPosterAvailable = poster && poster !== "N/A";
  const placeholderImg = "https://via.placeholder.com/300x450?text=No+Poster";

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster: isPosterAvailable ? poster : placeholderImg,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]) || 0,
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok) throw new Error("Failed to fetch movie details");

          const data = await res.json();
          setMovie(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <motion.div
      className="details"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className="details-backdrop"
            style={{
              backgroundImage: `url(${
                isPosterAvailable ? poster : placeholderImg
              })`,
            }}
          >
            <div className="backdrop-overlay"></div>
          </div>
          
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              <ArrowLeft size={24} />
            </button>
            <img
              src={isPosterAvailable ? poster : placeholderImg}
              alt={`${title} poster`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <div className="details-meta">
                <p>
                  <Calendar size={16} /> {released}
                </p>
                <p>
                  <Clock size={16} /> {runtime}
                </p>
              </div>
              <p className="genre">{genre}</p>
              <p className="imdb-rating">
                <Star size={18} fill="#facc15" color="#facc15" />
                <span>{imdbRating} IMDb Rating</span>
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <motion.button
                      className="btn-add"
                      onClick={handleAdd}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      + Add to list
                    </motion.button>
                  )}
                </>
              ) : (
                <div className="watched-status">
                  <CheckCircle size={24} color="#10b981" />
                  <p>You rated this movie {watchedUserRating} / 10</p>
                </div>
              )}
            </div>
            <div className="plot">
              <h3>Plot</h3>
              <p>
                <em>{plot}</em>
              </p>
            </div>
            <div className="cast-crew">
              <p><strong>Starring:</strong> {actors}</p>
              <p><strong>Directed by:</strong> {director}</p>
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
}
