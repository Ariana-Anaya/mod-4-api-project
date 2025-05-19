import TileImage from "../TileImage";

const ImageRow = ({ imageArr }) => {
  return (
    <div className="flex-container image-row">
      {imageArr.map((image, index) => {
        return (
          <div key={index}>
            {image && (
              <TileImage
                key={image.id}
                imageSrc={image.url}
                imageAltText="additional image of this spot"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageRow;
