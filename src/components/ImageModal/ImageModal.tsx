import Modal from "react-modal";
import styles from "./ImageModal.module.css";
Modal.setAppElement("#root");
import { Image } from "../../App.types";

interface User {
  name: string;
  links: {
    html: string;
  };
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  const { urls, alt_description, user, likes, description } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.content}>
        <img
          src={urls.regular}
          alt={alt_description || "Image"}
          className={styles.image}
        />
        <div className={styles.info}>
          <h2>{alt_description || "No description available"}</h2>
          {description && <p className={styles.description}>{description}</p>}
          <p>
            <strong>Author:</strong> {user?.name}
          </p>
          <p>
            <strong>Likes:</strong> {likes}
          </p>
          <p>
            <strong>Portfolio:</strong>{" "}
            <a
              href={user?.links.html}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
