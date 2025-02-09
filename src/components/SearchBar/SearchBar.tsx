import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast.error("Please enter a search term.");
      return;
    }

    onSubmit(trimmedQuery);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="query"
            value={query}
            onChange={handleInputChange}
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
