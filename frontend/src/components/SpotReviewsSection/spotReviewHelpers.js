export const spotBelongsToCurrentUser = (userId, ownerId) => {
  return userId === ownerId;
};

export const userHasReviewedThisSpot = (reviewsArr, userId) => {
  return reviewsArr.some((spotReview) => {
    return spotReview.userId === userId;
  });
};
