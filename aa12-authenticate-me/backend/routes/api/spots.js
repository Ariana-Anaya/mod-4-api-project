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

   