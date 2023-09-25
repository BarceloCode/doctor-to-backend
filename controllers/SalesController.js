const SalesService = require("../services/SalesService");

async function createSale(req, res){
    try {
        const Sales = await SalesService.create(req, res);
        return res.status(200).json(Sales);
    } catch (error) {
        return { 
            message: "Internal server error",
            error: error
        }
    }
}

async function getDoctorsales (req, res) {
    try {
        const Sales = await SalesService.retrieve(req, res);
        return res.status(200).json(Sales)
    } catch (error) {
        return {
            message: "Internal server error",
            error: error
        }
    }
}

async function viewCash (req, res) {
    try {
        const Sales = await SalesService.cashregister(req, res);
        return res.status(200).json(Sales);
    } catch (error) {
        return {
            message: "Internal server error",
            error: error
        }
    }
}

module.exports = { createSale, getDoctorsales, viewCash }