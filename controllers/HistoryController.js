const TreatmentModel = require("../models/TreatmentModel");
const HistoryModel = require('../models/HistoryModel');

const mongoose = require("mongoose");

module.exports = {

    create: async (req, res) => {
      try {
      const historyExist = await HistoryModel.findOne({ patient: req.body.patient});              
        if(!historyExist){     
          
          const dataToSave = req.body;          
            const history = new HistoryModel(dataToSave);               
                await history
                .save()
                .then((result) => {
                    res.json({ success: true, result: result });
                })
                .catch((err) => {
                    res.json({ success: false, result: err });
                });              
            }else{             
                const treatmentExists = historyExist.treatment;                              
                const { treatment } = req.body;                                 
                let updateHistory = await HistoryModel.findOneAndUpdate({patient: req.body.patient},{                          
                  treatment: treatmentExists.concat(treatment)  
                })
                return res.status(200).send(updateHistory);                      
            }   
            /*const treatmentExists = historyExist.treatment;          
            let history = await HistoryModel.findOneAndUpdate({patient: req.body.patient},{
                treatment: req.body.treatment.concat(treatmentExists)                
            });            
            return res.status(200).send(history);*/
      }catch (error){
          res.send(error);
      }
        
    },

    retrieve: async (req, res) => {
      try{
        await HistoryModel.find()
        .populate("patient")                    
        .then((result) => {
            res.json({ success: true, result: result });
        })
        .catch((err) => {
            res.json({ success: false, result: err });
        });
      }catch (error){
        return res.status(400).send(error);
      }
       
    },

  retrieveOne: async (req, res) => {
    try {
      const history = await HistoryModel.findById({ _id: req.body._id })
        .populate("patient")
        .populate("treatment");
  
      if (!history) {
        return res.json({ success: false, message: "Historia no encontrada" });
      }
  
      // Tratamiento con datos poblados
      const treatment = history.treatment;
      
      // Ahora, poblamos el campo 'product' en 'treatment'
      await TreatmentModel.populate(treatment, { path: "product" });
  
      res.json({ success: true, result: { history } });
    } catch (error) {
      res.json(error);
    }
  },

  delete: async(req, res) =>{
    try{
      HistoryModel
        .deleteMany({_id: req.body._id})
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
      }
      catch (error){
         return res.status(400).send(error);
      }
  },

  update: async (req, res) =>{
        let history = await HistoryModel.findByIdAndUpdate(req.body._id,{
            patient: req.body.patient,
            treatment: req.body.treatment
        },{
            new: true
        })
        if(!history){
            return res.json({ success: false, result: "History does not exists with that ID"})
        }res.status(200).send(history);
  }

};
