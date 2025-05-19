import { useSelector } from "react-redux";
import TileImage from "../TileImage";
import "./Gallery.css";

const Gallery = () => {
  const imagesArr = useSelector(
    (state) => state.spots.currentSpotDetails?.SpotImages
  );

  if (imagesArr?.length === 0) {
    return;
  }

  const sortedImages = imagesArr?.toSorted((imageObjA) => {
    if (imageObjA.preview) {
      return -1;
    }
    return 1;
  });

  return (
    <div className="gallery flex-container">
      {sortedImages && (
        <>
          <TileImage
            containerClasses="gallery-featured"
            imageSrc={sortedImages[0]?.url}
            imageAltText="featured image for this spot"
          />

          <div className="additional-image-grid">
            {sortedImages.map((additionalImage, index) => {
              return (
                index > 0 &&
                additionalImage && (
                  <TileImage
                    key={additionalImage.id}
                    containerClasses="additional-image"
                    imageSrc={additionalImage.url}
                    imageAltText="additional image of this spot"
                  />
                )
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
