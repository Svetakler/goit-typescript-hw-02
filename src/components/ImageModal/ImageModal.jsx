import Modal from "react-modal";
import PropTypes from "prop-types";
import styles from "./ImageModal.module.css";
Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
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
            <strong>Author:</strong> {user.name}
          </p>
          <p>
            <strong>Likes:</strong> {likes}
          </p>
          <p>
            <strong>Portfolio:</strong>{" "}
            <a href={user.links.html} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object,
};

export default ImageModal;
