const Joi = require('joi');

const createProductSchema = Joi.object({
  productId: Joi.string().uuid().optional().allow(null), 
  code: Joi.string().required(),
  title: Joi.string().required(),
  productStatus: Joi.string().valid('Active', 'Inactive').required(),
  images: Joi.array().items(Joi.string().uri()),
  destinations: Joi.string().allow(null),
  types: Joi.string().allow(null),
  themes: Joi.string().allow(null),
  categories: Joi.string().allow(null),
  times: Joi.string().allow(null),
  pickupPlaces: Joi.string().allow(null),
  dropoffPlaces: Joi.string().allow(null),
  locations: Joi.string().allow(null),
  languagesTour: Joi.string().allow(null),
  videoLink: Joi.string().uri().optional(),
  status: Joi.boolean().optional(),
  languages: Joi.string().allow(null),
  cancellationPolicies: Joi.string().allow(null),
  whatToBring: Joi.string().allow(null),
  tasks: Joi.string().allow(null),
  ageRanges: Joi.string().allow(null),
  exclusions: Joi.string().allow(null),
  inclusions: Joi.string().allow(null),
  resources: Joi.string().allow(null),
  rates: Joi.string().allow(null),
});
const updateProduct = Joi.object({
  code: Joi.string().optional(),
  title: Joi.string().optional(),
  status: Joi.string().valid('Active', 'Inactive').optional(),
  images: Joi.array().items(Joi.string().uri()),
  destinations: Joi.string().allow(null),
  types: Joi.string().allow(null),
  themes: Joi.string().allow(null),
  categories: Joi.string().allow(null),
  times: Joi.string().allow(null),
  pickupPlaces: Joi.string().allow(null),
  dropoffPlaces: Joi.string().allow(null),
  locations: Joi.string().allow(null),
  languagesTour: Joi.string().allow(null),
  status: Joi.boolean().optional(),
  videoLink: Joi.string().uri().optional(),
  languages: Joi.string().allow(null),
  cancellationPolicies: Joi.string().allow(null),
  whatToBring: Joi.string().allow(null),
  tasks: Joi.string().allow(null),
  ageRanges: Joi.string().allow(null),
  exclusions: Joi.string().allow(null),
  inclusions: Joi.string().allow(null),
  resources: Joi.string().allow(null),
  rates: Joi.string().allow(null),
});
module.exports = {
  createProductSchema,
  updateProduct
};
