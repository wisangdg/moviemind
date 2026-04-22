import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  const placeholderImg = "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : placeholderImg}
        alt={`${movie.Title} poster`}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <Calendar size={16} />
            <span>{movie.Year}</span>
          </p>
        </div>
      </div>
    </motion.li>
  );
}
