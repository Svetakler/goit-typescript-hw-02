import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Image } from "../../App.types";

interface ImageGalleryProps {
  images: Image[];
  onImageSelect: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageSelect,
}) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.galleryItem}>
          <ImageCard image={image} onClick={() => onImageSelect(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
