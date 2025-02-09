import React from "react";
import { Image } from "../../App.types";

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const handleClick = () => {
    onClick(image);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Image description not available"}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default ImageCard;
