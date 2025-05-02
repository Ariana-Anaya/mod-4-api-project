const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const {
  isLoggedIn,
  prepareSubqStatement,
  createReviewValidation
} = require('../../utils/endpoint-validation');
const { Review, Spot, SpotImage, ReviewImage, User, sequelize } = require('../../db/models');

// GET /api/reviews/current
router.get('/current', requireAuth, isLoggedIn, async (req, res, next) => {
  const subq = prepareSubqStatement();
  subq.previewImage = `(
    SELECT "url" FROM "${subq.schema}SpotImages" AS "SpotImage"
    WHERE "SpotImage"."preview" = true
    AND "SpotImage"."spotId" = "Spot"."id"
    LIMIT 1
  )`;

  try {
    const reviews = await Review.findAll({
      where: { userId: req.user.id },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        {
          model: Spot,
          attributes: {
            exclude: ['description', 'createdAt', 'updatedAt'],
            include: [[sequelize.literal(subq.statement('previewImage')), 'previewImage']]
          }
        },
        { model: ReviewImage, attributes: ['id', 'url'] }
      ]
    });

    res.status(200).json({ Reviews: reviews });
  } catch (err) {
    err.title = "Couldn't get all reviews";
    next(err);
  }
});

// POST /api/reviews/:reviewId/images
router.post('/:reviewId/images', requireAuth, isLoggedIn, async (req, res, next) => {
  const { reviewId } = req.params;
  const { url } = req.body;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const imageCount = await ReviewImage.count({ where: { reviewId } });
    if (imageCount >= 10) {
      return res.status(403).json({ message: "Maximum number of images reached" });
    }

    const reviewImage = await ReviewImage.create({ reviewId, url });
    res.status(201).json({ id: reviewImage.id, url: reviewImage.url });
  } catch (err) {
    err.title = "Couldn't add image to review";
    next(err);
  }
});

// PUT /api/reviews/:reviewId
router.put('/:reviewId', requireAuth, isLoggedIn, createReviewValidation, async (req, res, next) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;

  try {
    const foundReview = await Review.findByPk(reviewId);
    if (!foundReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (foundReview.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    foundReview.review = review;
    foundReview.stars = stars;
    await foundReview.save();

    res.status(200).json(foundReview);
  } catch (err) {
    err.title = "Couldn't edit review";
    next(err);
  }
});

// DELETE /api/reviews/:reviewId
router.delete('/:reviewId', requireAuth, isLoggedIn, async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await review.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    err.title = "Couldn't delete review";
    next(err);
  }
});

module.exports = router;
