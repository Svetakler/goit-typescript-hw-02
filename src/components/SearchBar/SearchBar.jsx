import { useState } from "react";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast.error("Please enter a search term.");
      return;
    }

    onSubmit(trimmedQuery);
  };

  return (
    <header className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <FaSearch size={20} />
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
