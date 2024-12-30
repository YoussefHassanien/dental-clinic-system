const{check} = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Contactus = require('../../models/contactusModel');

exports.createContactusValidator = [
    check('name')
    .notEmpty()
    .withMessage('name required')
    .isLength({min: 2})
    .withMessage('name is too short')
    .isLength({max: 60})
    .withMessage('name is too long')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
      }),
    check('email')
    .notEmpty()
    .withMessage('email required')
    .isEmail()
    .withMessage('invalid email'),
    check('message')
    .notEmpty()
    .withMessage('message required'),
    check('subject')
    .notEmpty()
    .withMessage('subject required'),
    validatorMiddleware,
];
exports.getContactusValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid contactus ID format'),
    validatorMiddleware,
];
exports.updateContactusValidator = [
    check('name')
    .optional()
    .notEmpty()
    .withMessage('name required')
    .isLength({min: 2})
    .withMessage('name is too short')
    .isLength({max: 60})
    .withMessage('name is too long')
    .custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
      }),
    check('email')
    .optional()
    .notEmpty()
    .withMessage('email required')
    .isEmail()
    .withMessage('invalid email'),
    check('message')
    .optional()
    .notEmpty()
    .withMessage('message required'),
    check('subject')
    .optional()
    .notEmpty()
    .withMessage('subject required'),
    validatorMiddleware,
];

exports.deleteContactusValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid contactus ID format'),
    validatorMiddleware,
];
