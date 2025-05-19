const TileImage = ({ containerClasses, imageSrc, imageAltText }) => {
  return (
    <div className={containerClasses}>
      <img src={imageSrc} alt={imageAltText} />
    </div>
  );
};

export default TileImage;
