const HistoryModel = require("../models/HistoryModel");
const TreatmentModel = require("../models/TreatmentModel");
const mongoose = require("mongoose");

module.exports = {

    create: async (req, res) => {

        let historyExist = await HistoryModel.findOne({ patient: req.body.patient});
        if(!historyExist){
            let history = new HistoryModel({
                patient: req.body.patient,
                treatment: req.body.treatment
                });
        
                await history
                .save()
                .then((result) => {
                    res.json({ success: true, result: result });
                })
                .catch((err) => {
                    res.json({ success: false, result: err });
                });
            }            
            let history = HistoryModel({
                treatment: 
                    req.body.treatment                
            });
            let pushTreatment = history.treatment;
            
            historyExist.treatment.push(pushTreatment);
            historyExist.save();
            res.json(historyExist);        
    },


    retrieve: async (req, res) => {
        await HistoryModel.find()
        .populate("patient")
        .populate("treatment")
        .then((result) => {
            res.json({ success: true, result: result });
        })
        .catch((err) => {
            res.json({ success: false, result: err });
        });
    },

    retrieveOne: async (req, res) => {
        try {
        const history = await HistoryModel.findById({ _id: req.body._id    })
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

    update: async(req, res) =>{

        let history = await HistoryModel.findByIdAndUpdate(req.body._id,{
            patient: req.body.patient,
            treatment: req.body.treatment        
        },{
            new: true
        })
        if(!history) {
            return res.status(400).send("History does not exists")
        }
        res.status(200).send(history)
    },

    delete: async(req, res) =>{
        const { id_patient } = req.body;
            HistoryModel
                .deleteMany({patient: id_patient})
                .then((data) => res.json(data))
                .catch((error) => res.json(error))
    }
};
