const { Recurrence } = require('../models');

const createRecurrence = async (data) => {
    try {
        const recurrence = await Recurrence.create(data);
        return recurrence;
    } catch (error) {
        throw new Error(error.message);
    }
};
const updateRecurrenceById = async (id, updateData) => {
    try {
        const recurrence = await Recurrence.findByPk(id);
        if (!recurrence) {
            throw new Error('Recurrence not found');
        }

        await recurrence.update(updateData);
        return recurrence;
    } catch (error) {
        throw new Error(error.message);
    }
};
const getRecurrenceById = async (id) => {
    try {
        
        const recurrence = await Recurrence.findByPk(id);
        if (!recurrence) {
            throw new Error('Recurrence not found');
        }
        return recurrence;
    } catch (error) {
        throw new Error(error.message);
    }
};
const getAllRecurrences = async () => {
    try {
        
        const recurrences = await Recurrence.findAll({ where: { status: true || 1  } })
        return recurrences;
    } catch (error) {
        throw new Error(error.message);
    }
};
const deleteRecurrenceById = async (id) => {
    try {
       
        const recurrence = await Recurrence.findByPk(id);
        if (!recurrence) {
            throw new Error('Recurrence not found');
        }

        await recurrence.update({ status: false }, {
            where: { id }
          }); 
        return recurrence;
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    createRecurrence,
    updateRecurrenceById,
    getRecurrenceById,
    getAllRecurrences,
    deleteRecurrenceById
};
