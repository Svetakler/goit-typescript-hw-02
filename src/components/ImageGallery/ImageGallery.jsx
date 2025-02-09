import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageSelect }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.galleryItem}>
          <ImageCard image={image} onClick={onImageSelect} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
