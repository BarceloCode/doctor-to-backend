const HistoryService = require("../services/HistoryService");

async function createHsitory (req, res){
  try {
    const History = await HistoryService.createHsitory(req, res);
    return History;
  } catch (error) {
    return res.status(400).json({ message: error.message})
  }
}

async function getHistory (req, res){
  try {
    const History = await HistoryService.getHistory(req, res);
    return History
  } catch (error) {
    return res.status(400).json({ message: error.message})
  }
}

async function detailHistory (req, res){
  try {
    const History = await HistoryService.detailsHistory(req, res);
    return History;
  } catch (error) {
    return res.status(400).json({ message: error.message})
  }
}

async function deleteHsitory (req, res){
  try {
    const History = await HistoryService.deleteHistory(req, res);
    return History;
  } catch (error) {
    return res.status(400).json({ message: error.message})
  }
}

module.exports = { createHsitory, getHistory, detailHistory, deleteHsitory }