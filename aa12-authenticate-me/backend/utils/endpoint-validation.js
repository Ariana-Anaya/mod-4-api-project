const { checkSchema, query, validationResult } = require('express-validator');
const { handleValidationErrors } = require('./validation');
const {environment} = require('../../config');

function prepareSubqStatement() {
    const subq = {};
    if (environment === 'production') {
        subq.schema = process.env.SCHEMA + ".";
        subq.statement = (column) => `${subq.schema}"${column}"`;
    
    } else {
        subq.schema = "";
        subq.statement = (column) => `"${column}"`;
    }
    return subq;
}

const allSpotsValidation = [
    query('page')
      .optional()
      .isInt({ min: 1 }).withMessage('Page must be an integer greater than or equal to 1'),
    query('size')
      .optional()
      .isInt({ min: 1 }).withMessage('Size must be an integer greater than or equal to 1'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Validation error',
          errors: errors.array()
        });
      }
      next();
    }
  ];

const isLoggedIn = (req, res, next) => {
    if (!req.user || req.throwErr) {
        const err = new Error();
        err.title = `User not logged in`;
        err.message = `Forbidden`;
        err.status = 403;
        next(err);
    }
    next();
}

const validateQueryFilters = [
    checkSchema({
        page: {
            optional: true,
            isInt: {
                errorMessage: `Page must be an integer`,
                options: { min: 1 }
            },
            toInt: true,
        },
        size: {
            optional: true,
            isInt: {
                errorMessage: `Size must be between 1 and 20`,
                options: {gt: 1, lt: 20 }
            },
            toInt: true,
        },
        minLat: {
            optional: true,
            isFloat: {
                errorMessage: `Minimum latitude is invalid`,
                options: true
            },
            toFloat: true,
        },
        maxLat: {
            optional: true,
            isFloat: {
                errorMessage: `Maximum latitude is invalid`,
                options: true
            },
            toFloat: true
        },
        minLng: {
            optional: true,
            isFloat: {
                errorMessage: `Minimum longitude is invalid`,
                options: true
            },
            toFloat: true
        },
        maxLng: {
            optional: true,
            isFloat: {
                errorMessage: `Maximum latitude is invalid`,
                options: true
            },
            toFloat: true
        },
        minPrice: {
            optional: true,
            isFloat: {
                errorMessage: `Minimum price must be greater than or equal to 0`,
                options: {
                    min: 0
                }
            },
            isDecimal: { errorMessage: `Min price must be a number` },
            toFloat: true
        },
        maxPrice: {
            optional: true,
            isFloat: {
                errorMessage: `Maximum price must be greater than or equal to 0`,
                options: {
                    min: 0
                }
            },
            toFloat: true
        }
    }),
    handleValidationErrors
];

const validateSpot = [
    checkSchema({
        address: {
            exists: true,
            errorMessage: `Address is required`
        },
        city: {
            exists: true,
            errorMessage: `City is required`
        },
        state: {
            exists: true,
            errorMessage: `State is required`
        },
        country: {
            exists: true,
            errorMessage: `country is required`
        },
        lat: {
            isFloat: { options: { min: -90, max: 90 } },
            errorMessage: `Latitude must be between -90 and 90`
        },
        lng: {
            isFloat: { options: { min: -180, max: 180 } },
            errorMessage: `Longitude must be between -180 and 180`
        },
        name: {
            isLength: {options: {min:1, max: 50 } },
            errorMessage: `Must have a name less than 50 characters`
        },
        description: {
            exists: true,
            errorMessage: `Must have a description`
        },
        price: {
            isFloat: { options: { gt: 0 } },
            errorMessage: `price per day must be a positive number`
        }
    }),
    handleValidationErrors
];

const createSpotValidation = validateSpot;
const createReviewValidation = [
    checkSchema({
        review: {
            exists: true,
            isString: true,
            notEmpty: true,
            errorMessage: 'Review missing text'
        },
        stars: {
            isInt: {
                errorMessage: 'Stars should be between 1 and 5',
                options: { min: 1, max: 5 }
            }
        }
    }),
    handleValidationErrors
];

module.exports = {
    isLoggedIn,
    validateQueryFilters,
    validateSpot,
    allSpotsValidation,
    createSpotValidation,
    createReviewValidation
};