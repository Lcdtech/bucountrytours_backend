const recurrenceService = require('../services/recurrence.service.js');

const createRecurrence = async (req, res) => {
    try {
        const data = req.body;
        const recurrence = await recurrenceService.createRecurrence(data);
        return res.status(201).json({
            success: true,
            message: 'Recurrence created successfully',
            data: recurrence,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateRecurrence = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Call the service to update the recurrence
        const updatedRecurrence = await recurrenceService.updateRecurrenceById(id, updateData);

        return res.status(200).json({
            success: true,
            message: 'Recurrence updated successfully',
            data: updatedRecurrence,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const getRecurrenceBy = async (req, res) => {
    try {
        const { id } = req.params;

        // Call the service to get the recurrence by ID
        const recurrence = await recurrenceService.getRecurrenceById(id);

        return res.status(200).json({
            success: true,
            message: 'Recurrence fetched successfully',
            data: recurrence,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
const getAllRecurrence = async (req, res) => {
    try {
        // Call the service to get all recurrences
        const recurrences = await recurrenceService.getAllRecurrences();

        return res.status(200).json({
            success: true,
            message: 'All recurrences fetched successfully',
            data: recurrences,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteRecurrence = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRecurrence = await recurrenceService.deleteRecurrenceById(id);

        return res.status(200).json({
            success: true,
            message: 'Recurrence deleted successfully',
            data: deletedRecurrence,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    createRecurrence,
    updateRecurrence,
    getRecurrenceBy,
    getAllRecurrence,
    deleteRecurrence
};
