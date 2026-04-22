import { useRef } from "react";
import { Search as SearchIcon, Film } from "lucide-react";
import { useKey } from "../hooks/useKey";

export function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export function Logo() {
  return (
    <div className="logo">
      <Film size={32} className="logo-icon" />
      <h1>usepopcorn</h1>
    </div>
  );
}

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <div className="search-container">
      <SearchIcon size={20} className="search-icon" />
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </div>
  );
}

export function NumResults({ movies }) {
  if (!movies) {
    return <p className="num-results">No results found</p>;
  }
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
