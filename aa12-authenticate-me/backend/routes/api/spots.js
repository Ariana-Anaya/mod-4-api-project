/*
1. Import required modules:
   - express
   - Sequelize models (Spot, SpotImage, User, Review, Booking)
   - Authentication middleware (requireAuth)
   - Validation utilities (check, handleValidationErrors)
   - Sequelize operators (Op)
   */
const express = require('express')
const { Spot, SpotImage, User, Review, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check, handleValidationErrors } = require('express-validator');
const { Op } = require('sequelize');

//2. Create router object
const router = express.Router();

/* 3. Define validation middleware:
   - validateSpot: Validates all spot fields
   - validateQueryFilters: Validates query parameters for pagination and filtering */

   const validateSpot = [
   check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Please provide a Name not exceeding 50 characters'),
   check('description')
    .exists({ checkFalsy: true })
    .isLength({ min: 10 })
    .withMessage('Description is required with at least 10 characters'),
   check('address')
    .exists({ checkFalsy: true })
    .withMessage('Address is required'),
   check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
   check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
   check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
   check('price')
    .exists({ checkFalsy: true })
    .isDecimal()
    .isFloat({ min: 1})
    .withMessage('Price must be a positive number'),
   check('lat')
    .exists({ checkFalsy: true })
    .isDecimal()
    .isFloat({ min: -90, max: 90})
    .withMessage('Lattitude must be between -90 and 90'),
   check('lng')
    .exists({ checkFalsy: true })
    .isDecimal()
    .isFloat({ min: -180, max: 180})
    .withMessage('Longitude must be between -90 and 90'),
    handleValidationErrors
];

/* 4. Implement GET /api/spots:
   - Apply validateQueryFilters middleware
   - Parse query parameters with defaults (page=1, size=20)
   - Build filtering conditions based on query parameters
   - Calculate pagination (limit, offset)
   - Query database for spots with filters, pagination, and calculations
   - Format response with proper data types
   - Return JSON response with spots, page, and size */
   const validateQueryFilters = [
      check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Pae number should be 1 or greater'),
      check('size')
        .optional()
        .isInt({ min: 20 })
        .withMessage('Size must be 20 or greater'),
      handleValidationErrors
    ];

 
 router.get('/', validateQueryFilters, async (req, res) => {
   let { page = 1, size = 20, city, state, country } = req.query;
 
   page = parseInt(page);
   size = parseInt(size);
 
   const limit = size;
   const offset = (page - 1) * size;
 
   const filters = {};
   if (city) filters.city = city;
   if (state) filters.state = state;
   if (country) filters.country = country;
   if (price) filters.price = price;

   
 
   const spots = await Spot.findAll({
     where: filters,
     limit,
     offset
   });
 
   res.json({
     Spots: spots,
     page,
     size
   });
 });
 
 /*5. Implement GET /api/spots/current:
   - Apply requireAuth middleware
   - Get current user ID from request
   - Query database for spots owned by current user
   - Format response with proper data types
   - Return JSON response with spots*/


router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const spots = await Spot.findAll({
     where: {
       ownerId: userId,
     },
   });
 
   const formattedSpots = spots.map(spot => ({
     id: spot.id,
     name: spot.name,
     description: spot.description,
     address: spot.address,
     city: spot.city,
     state: spot.state,
     country: spot.country,
     lat: spot.lat,
     lng: spot.lng,
     price: spot.price,
   }));
 
   return res.json({ spots: formattedSpots });
 });
  /*6. Implement GET /api/spots/:id:
   - Extract spot ID from request parameters
   - Query database for spot with details
   - Check if spot exists, return 404 if not
   - Format response with proper data types
   - Return JSON response with spot details*/

router.get('/:id', async (req, res) => {
   const { id } = req.params;
 
   const spot = await Spot.findByPk(id);
 
   if (!spot) {
     return res.status(404).json({ error: 'Spot not found' });
   }
 
   const formattedSpot = {
     id: spot.id,
     name: spot.name,
     description: spot.description,
     address: spot.address,
     city: spot.city,
     state: spot.state,
     country: spot.country,
     lat: spot.lat,
     lng: spot.lng,
     price: spot.price,
   };
 
   return res.json({ spot: formattedSpot });
 });
 

/* 7. Implement POST /api/spots:
   - Apply requireAuth and validateSpot middleware
   - Extract spot data from request body
   - Create new spot with current user as owner
   - Format response with proper data types
   - Return 201 status with JSON response*/

router.post(
   '/', requireAuth,  validateSpot, async (req, res) => {
     const { name, description, address, city, state, country, price, lat, lng } = req.body;

       const spot = await Spot.create({
      ownerId: req.user.id, 
         name, description, address, city, state, country, price,  
       });
 
       return res.status(201).json({
         spot: {
           id: spot.id,
           ownerId: spot.ownerId,
            name: spot.name,
           description: spot.description,
           address: spot.address,
           city: spot.city,
           state: spot.state,
           country: spot.country,
           price: spot.price,
           lat: spot.lat,
           lng: spot.lng,
         },
       });
     } 
   
 );
 /*8. Implement POST /api/spots/:id/images:
   - Apply requireAuth middleware
   - Extract spot ID and image data
   - Check if spot exists, return 404 if not
   - Check if current user is owner, return 403 if not
   - Create new spot image
   - Return 201 status with JSON response*/
router.post( '/:id/images', requireAuth, async (req, res) => {
     const spotId = req.params.id;
     const { imageUrl } = req.body;
 
     const spot = await Spot.findByPk(spotId);
 
     if (!spot) {
       return res.status(404).json({ error: 'Spot does not exist' });
     }
 
     if (spot.ownerId !== req.user.id) {
       return res.status(403).json({ error: 'Not permitted' });
     }
 
     const spotImage = await SpotImage.create({
       spotId,
       imageUrl
     });
 
     return res.status(201).json({
       id: spotImage.id,
       spotId: spotImage.spotId,
       imageUrl: spotImage.imageUrl,
     });
   }
 );

/*9. Implement PUT /api/spots/:id:
   - Apply requireAuth and validateSpot middleware
   - Extract spot ID and updated data
   - Check if spot exists, return 404 if not
   - Check if current user is owner, return 403 if not
   - Update spot with new data
   - Format response with proper data types
   - Return JSON response with updated spot*/
router.put('/:id', requireAuth, validateSpot, async (req, res) => {
     const spotId = req.params.id;
     const { name, description, address, city, state, country, price, lat, lng } = req.body;
 
     const spot = await Spot.findByPk(spotId);
 
     if (!spot) {
       return res.status(404).json({ error: 'Spot does not exist' });
     }
 
     if (spot.ownerId !== req.user.id) {
       return res.status(403).json({ error: 'Not permitted' });
     }
 
     const updatedSpot = await spot.update({
       name,
       description,
       address,
       city,
       state,
       country,
       price,
       lat,
       lng
     });
 
     return res.status(200).json(updatedSpot);
   }
 );
/*10. Implement DELETE /api/spots/:id:
    - Apply requireAuth middleware
    - Extract spot ID
    - Check if spot exists, return 404 if not
    - Check if current user is owner, return 403 if not
    - Delete spot
    - Return success message*/

router.delete('/:id', requireAuth, async (req, res) => {
   const spotId = req.params.id;
   const userId = req.user.id; 
 
   const spot = await Spot.findByPk(spotId);
   if (!spot) {
     return res.status(404).json({ error: 'Spot does not exiat' });
   }
  
   if (spot.ownerId !== userId) {
   return res.status(403).json({ error: 'Not permitted' });
   }
   await spot.destroy();
    return res.json({ message: 'Spot deleted' });
 });
 

 
 module.exports = router;
 
