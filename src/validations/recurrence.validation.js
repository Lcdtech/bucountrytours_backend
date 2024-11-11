const Joi = require('joi');

const createRecurrenceSchema = Joi.object({
    rule: Joi.object().optional(),
    recurrenceType: Joi.string().optional().default('OPEN'),
    maxCapacity: Joi.number().optional(),
    maxCapacityForPickup: Joi.number().optional(),
    minTotalPax: Joi.number().optional(),
    startDate: Joi.object().optional(),
    endDate: Joi.object().optional(),
    color: Joi.string().optional(),
    label: Joi.string().optional(),
    affectedStartTimes: Joi.array().optional().default([]),
    guidedLanguages: Joi.array().optional().default([]),
    bom: Joi.object().optional(),
    guidedLangs: Joi.array().optional().default([]),
});
const updateRecurrenceSchema = Joi.object({
    rule: Joi.object().optional(),
    recurrenceType: Joi.string().optional(),
    maxCapacity: Joi.number().optional(),
    maxCapacityForPickup: Joi.number().optional(),
    minTotalPax: Joi.number().optional(),
    startDate: Joi.object().optional(),
    endDate: Joi.object().optional(),
    color: Joi.string().optional(),
    label: Joi.string().optional(),
    affectedStartTimes: Joi.array().optional(),
    guidedLanguages: Joi.array().optional(),
    bom: Joi.object().optional(),
    guidedLangs: Joi.array().optional(),
});

module.exports = {
    createRecurrenceSchema,
    updateRecurrenceSchema
};
