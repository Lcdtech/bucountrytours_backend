const Joi = require('joi');

const createPermissionSchema = Joi.object({
    boardId: Joi.string().uuid().optional(), 
    permissions: Joi.string().uuid().optional(), 
    name: Joi.string().optional(),
    details: Joi.string().optional(),
    status: Joi.boolean().optional(),
    isDelete: Joi.boolean().optional(),
});

const updatePermissionSchema = Joi.object({
    boardId: Joi.string().uuid().optional(), 
    permissions: Joi.string().uuid().optional(), 
    name: Joi.string().optional(),
    details: Joi.string().optional(),
    status: Joi.boolean().optional(),
    isDelete: Joi.boolean().optional(),
});

module.exports = {
    createPermissionSchema,
    updatePermissionSchema,
};
