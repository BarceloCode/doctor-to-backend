const HistoryModel = require("../models/HistoryModel");
const response = require("../helpers/responses");

async function createHsitory (req, res){
    try {
        const historyExist = await HistoryModel.findOne({ patient: req.body.patient});              
        if(!historyExist){               
            const dataToSave = req.body;          
            const history = new HistoryModel(dataToSave);               
                await history
                .save()
                .then((result) => {
                    response.sendCreated(res, result)
                })            
            }else{             
                const treatmentExists = historyExist.treatment;                              
                const { treatment } = req.body;                                 
                let updateHistory = await HistoryModel.findOneAndUpdate({patient: req.body.patient},{                          
                  treatment: treatmentExists.concat(treatment)  
                })                
                return response.sendSuccess(res, updateHistory)                      
            }   
    } catch (error) {
        return response.sendError(res, error.message);
    }
}


async function getHistory (req, res) {
    try {
        const History = await HistoryModel.find({})
        .populate({
            path: "patient",                    
          })
          .populate({
            path: "treatment",
            populate: { path: "treatment",
            select: { treatmentName: 1}},                   
          })
          .populate({
            path: "treatment",
            populate: { path: "cosmetologist",
            select: { name: 1, full_lastname: 1}}
          });
        if(History) return response.sendSuccess(res, History)    
    } catch (error) {
        return response.sendError(res, error.message);
    }
}

async function detailsHistory (req, res) {
    try {
        const { id } = req.body;
        await HistoryModel.findOne({ _id: id})
        .then((result) =>{
            response.sendSuccess(res, result)
        })
    } catch (error) {
        return response.sendError(res, error.message);
    }
}

async function deleteHistory (req, res) {
    try {
        const { id } = req.params;
        const History = await HistoryModel.deleteMany({ _id: id})
        if(History) return response.sendSuccess(res, History)
    } catch (error) {
        return response.sendError(res, error.message);
    }
}

module.exports = { createHsitory, getHistory, detailsHistory, deleteHistory }