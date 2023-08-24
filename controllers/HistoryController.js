const HistoryModel = require("../models/HistoryModel");
const { json } = require("body-parser");
var mongoose = require("mongoose");
const PatientModel = require("../models/PatientModel");
const TreatmentModel = require("../models/TreatmentModel");

module.exports = {

    create: async(req, res) =>{

        let history = new HistoryModel({
            patient: req.body.patient,
            treatment: req.body.treatment
        })

        await history.save()
            .then(result =>{
                res.json({ success: true, result: result})
            })
            .catch(err => {
                res.json({ success: false, result: err})
            })
    },
    
    retrieve: async(req, res) =>{
        await HistoryModel.find()
        .populate("patient")
        .populate("treatment")
            .then(result =>{
                res.json({ success: true, result: result})
            })
            .catch(err =>{
                res.json({ success: false, result: err})
            })
    },

    retrieveOne: async (req, res) =>{
        const { patient, id_treatment } = req.body;
        const id_patient = await PatientModel.findById(patient);
        
        if(!patient){
            return res.status(400).json({
                message: "Patient does not exists"
            })
        }else{
            return res.status(200).send(id_patient);
        }


    },
    


}