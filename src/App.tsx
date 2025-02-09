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
import { Image } from "./App.types";

const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "_c9_GckBhklfBcXGMCCGqBpTNwYz-72qnm1CRXrbTgE";

interface FetchResponse {
  results: Image[];
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchImages = async (query: string, page: number): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<FetchResponse>(API_URL, {
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

  const handleSearchSubmit = (query: string): void => {
    setQuery(query);
    setImages([]);
    setPage(1);
    fetchImages(query, 1);
  };

  const handleLoadMore = (): void => {
    fetchImages(query, page);
  };

  const handleOpenModal = (image: Image): void => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
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
