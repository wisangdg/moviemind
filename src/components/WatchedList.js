import { Star, Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const average = (arr) => {
  if (arr.length === 0) return null;
  return arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
};

export function WatchedSummary({ watched }) {
  const imdbRatings = watched
    .map((movie) => movie.imdbRating)
    .filter(Number.isFinite);
  const userRatings = watched
    .map((movie) => movie.userRating)
    .filter(Number.isFinite);
  const runtimes = watched
    .map((movie) => movie.runtime)
    .filter(Number.isFinite);

  const avgImdbRating = average(imdbRatings);
  const avgUserRating = average(userRatings);
  const avgRuntime = average(runtimes);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div className="summary-stats">
        <p>
          <span className="emoji">#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <Star size={16} fill="#facc15" color="#facc15" />
          <span>
            {avgImdbRating !== null ? avgImdbRating.toFixed(2) : "N/A"}
          </span>
        </p>
        <p>
          <Star size={16} fill="#60a5fa" color="#60a5fa" />
          <span>
            {avgUserRating !== null ? avgUserRating.toFixed(2) : "N/A"}
          </span>
        </p>
        <p>
          <Clock size={16} color="#a78bfa" />
          <span>
            {avgRuntime !== null ? avgRuntime.toFixed(0) : "N/A"} min
          </span>
        </p>
      </div>
    </div>
  );
}

export function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list list-watched">
      <AnimatePresence>
        {watched.map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            onDeleteWatched={onDeleteWatched}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-stats">
          <p>
            <Star size={14} fill="#facc15" color="#facc15" />
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <Star size={14} fill="#60a5fa" color="#60a5fa" />
            <span>{movie.userRating}</span>
          </p>
          <p>
            <Clock size={14} color="#a78bfa" />
            <span>{movie.runtime} min</span>
          </p>
        </div>
      </div>
      <button
        className="btn-delete"
        aria-label={`Delete ${movie.title}`}
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        <Trash2 size={16} />
      </button>
    </motion.li>
  );
}
