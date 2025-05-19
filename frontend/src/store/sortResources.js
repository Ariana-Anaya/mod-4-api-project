const sortByMostRecent = (resources) => {
  const newestOnesFirst = resources.sort((reviewA, reviewB) => {
    const dateOfOne = new Date(reviewA.updatedAt);
    const dateOfTwo = new Date(reviewB.updatedAt);
    const timeOfOne = dateOfOne.getTime();
    const timeOfTwo = dateOfTwo.getTime();
    return timeOfTwo - timeOfOne;
  });
  return newestOnesFirst;
};

export default sortByMostRecent;
