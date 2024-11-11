const Joi = require('joi');

const createAvailabilitySchema = Joi.object({
  date: Joi.array().items(Joi.string()).optional(),
  startTime: Joi.array().items(Joi.string()).optional(),
  dateAndTime: Joi.array().items(Joi.string()).optional(),
  time: Joi.string().optional(),
  recurrenceRuleIds: Joi.array().items(Joi.string()).optional(),
  total: Joi.number().optional(),
  pickupTotal: Joi.number().optional(),
  minimum: Joi.number().optional(),
  booked: Joi.number().optional(),
  pickupBooked: Joi.number().optional(),
  available: Joi.number().optional(),
  pickupAvailable: Joi.number().optional(),
  pickupAllotment: Joi.boolean().optional(),
  freeSale: Joi.boolean().optional(),
  closed: Joi.boolean().optional(),
  unavailable: Joi.boolean().optional(),
  guidedLanguages: Joi.string().optional(),
  status: Joi.boolean().default(true),
});
const updateAvailabilitySchema = Joi.object({
    date: Joi.array().items(Joi.string()).optional(),
    startDate: Joi.array().items(Joi.string()).optional(),
    dateAndTime: Joi.array().items(Joi.string()).optional(),
    time: Joi.string().optional(),
    recurrenceRuleIds: Joi.array().items(Joi.string()).optional(),
    total: Joi.number().optional(),
    pickupTotal: Joi.number().optional(),
    minimum: Joi.number().optional(),
    booked: Joi.number().optional(),
    pickupBooked: Joi.number().optional(),
    available: Joi.number().optional(),
    pickupAvailable: Joi.number().optional(),
    pickupAllotment: Joi.boolean().optional(),
    freeSale: Joi.boolean().optional(),
    closed: Joi.boolean().optional(),
    unavailable: Joi.boolean().optional(),
    guidedLanguages: Joi.string().optional(),
    status: Joi.boolean().optional(),
  });
  
module.exports = {
  createAvailabilitySchema,
  updateAvailabilitySchema
};
