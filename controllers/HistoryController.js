const HistoryModel = require("../models/HistoryModel");
const TreatmentModel = require("../models/TreatmentModel");

module.exports = {

    create: async(req, res) =>{

        let history = new HistoryModel({
            patient: req.body.patient,
            treatment: req.body.treatment,
            fecha: req.body.fecha
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
       await HistoryModel.findOne({patient: req.body.patient})
            .populate("patient")
            .populate("treatment")
                .then((data) => {
                    TreatmentModel.findOne({_id: data.treatment._id})
                    .populate("product")
                        .then(result => res.json( {success: true, result: data}))
                })
                .catch((error) => res.json(error));
    },
    


}