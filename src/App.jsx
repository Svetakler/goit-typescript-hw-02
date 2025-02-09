import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { toast } from "react-hot-toast";
import styles from "./App.module.css";

const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "_c9_GckBhklfBcXGMCCGqBpTNwYz-72qnm1CRXrbTgE";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchImages = async (query, page) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          query,
          page,
          per_page: 12,
          client_id: ACCESS_KEY,
        },
      });
      setImages((prev) => [...prev, ...response.data.results]);
      setPage((prev) => prev + 1);
    } catch (error) {
      setError("Something went wrong, please try again.");
      toast.error("Error fetching images.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (query) => {
    setQuery(query);
    setImages([]);
    setPage(1);
    fetchImages(query, 1);
  };

  const handleLoadMore = () => {
    fetchImages(query, page);
  };

  const handleOpenModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageSelect={handleOpenModal} />
      {images.length > 0 && (
        <div className={styles.centered}>
          {loading ? <Loader /> : <LoadMoreBtn onClick={handleLoadMore} />}
        </div>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={modalImage}
      />
    </div>
  );
};

export default App;
