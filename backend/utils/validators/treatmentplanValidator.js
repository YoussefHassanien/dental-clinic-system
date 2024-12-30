const {check} = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Treatmentplan = require('../../models/treatmentplanModel');
const Appointment = require('../../models/appointmentModel'); // Adjust the path as necessary

exports.createTreatmentplanValidator = [
    check('name')
        .notEmpty()
        .withMessage('Treatment name must be specified')
        .isLength({min: 3})
        .withMessage('Treatment name is too short')
        .isLength({max: 100})
        .withMessage('Treatment name is too long')
        .custom((value) =>
            Treatmentplan.findOne({name: value}).then((Treatmentplan) => {
                if (Treatmentplan) {
                    return Promise.reject('this Treatmentplan already exists');
                }
            }),
    check('appointmentId')
        .notEmpty()
        .withMessage('appointment ID must be specified')
        .isMongoId()
        .withMessage('Invalid appointment ID format')
        .custom(async (value) => {
            const appointment = await Appointment.findById(value);
            if (!appointment) {
                throw new Error('Appointment ID does not exist');
            }
        })
    ),
    check('description')
        .notEmpty()
        .withMessage('Description must be specified')
        .isLength({min: 10, max: 500})
        .withMessage('Description must be between 10 and 500 characters long'),
    check('startdate')
        .notEmpty()
        .withMessage('Start date must be specified')
        .isISO8601()
        .withMessage('Invalid date format')
        .custom((value) => {
            const today = new Date();
            const startDate = new Date(value);
            if (startDate <= today) {
                throw new Error('Start date must be after today');
            }
            return true;
        }),
    check('enddate')
        .notEmpty()
        .withMessage('End date must be specified')
        .isISO8601()
        .withMessage('Invalid date format'),
    validatorMiddleware,
];
exports.getTreatmentplanValidator = [
    check('id')
        .notEmpty()
        .withMessage('Treatmentplan ID must be specified')
        .isMongoId()
        .withMessage('Invalid Treatmentplan ID format'),
    validatorMiddleware,
];

exports.updateTreatmentplanValidator = [
    check('name')   
        .optional()
        .isLength({min: 3})
        .withMessage('Treatment name is too short')
        .isLength({max: 100})
        .withMessage('Treatment name is too long')
        .custom((value) =>
            Treatmentplan.findOne({name: value}).then((Treatmentplan) => {
                if (Treatmentplan) {
                    return Promise.reject('this Treatmentplan already exists');
                }
            })),
    check('appointmentId')
        .optional()
        .isMongoId()
        .withMessage('Invalid appointment ID format')
        .custom(async (value) => {
            const appointment = await Appointment.findById(value);
            if (!appointment) {
                throw new Error('Appointment ID does not exist');
            }
        }),
    check('description')    
        .optional()
        .isLength({min: 10, max: 500})
        .withMessage('Description must be between 10 and 500 characters long'),
    check('startdate')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format')
        .custom((value) => {
            const today = new Date();
            const startDate = new Date(value);
            if (startDate <= today) {
                throw new Error('Start date must be after today');
            }
            return true;
        }),
    check('enddate')    
        .optional()
        .isISO8601()
        .withMessage('Invalid date format'),
    validatorMiddleware,
];

exports.deleteTreatmentplanValidator = [
    check('id')
        .notEmpty()
        .withMessage('Treatmentplan ID must be specified')
        .isMongoId()
        .withMessage('Invalid Treatmentplan ID format'),
    validatorMiddleware,
];

