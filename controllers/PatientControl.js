const PatientModel = require("../models/PatientModel");
const Validate = require("../")

module.exports = {
    create: async (req, res) =>{

        //Data validation 

        let { error } = Validate.patient(req.body);
        if(error) return res.json({ success: false, result: error.details[0].message});

        //Defining patient model from data aquired over request body

    let body =  req.body;
    let { name, age, sex, faceImage, curp, allergies, freqD, freqS, oxygen, signedletter, aditionalInfo, roadMap } = body;
    let patient = new PatientModel({
        name, 
        age, 
        sex,
        faceImage,
        curp,
        allergies, 
        freqD,
        freqS,
        oxygen,
        signedletter,
        aditionalInfo,
        roadMap
    });
    patient.save((err, patientDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            patient: patientDB
        })
    })
},

update: async (req, res) =>{
    let body =  req.body;
    let { name, age, sex, faceImage, curp, allergies, freqD, freqS, oxygen, signedletter, aditionalInfo, roadMap } = body;
    let patient = new PatientModel({
        name, 
        age, 
        sex,
        faceImage,
        curp,
        allergies, 
        freqD,
        freqS,
        oxygen,
        signedletter,
        aditionalInfo,
        roadMap
    });

    await PatientModel.update({_id: req.body._id}, patient)
    .then(patient =>{
        if(!patient) res.json({ success: false, result: "Patient does not exist"});

        reset.json(patient);
    })
    .catch(err =>{
        res.json({ succes: false, result: err});
    })
},

retrieve: async (req, res) =>{
    await PatientModel.find()
        .then(result =>{
            if(!result) res.json({success: false, result: "No results found"});
            

            res.json({ succes: true, result: result});
        })
        .carch(err => res.json({success: false, rsult: err}));
},

retrieveOne: async (req, res) =>{
    const { id } = req.params;
    PatientModel.findById({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
},

delete: async (req, res) =>{
    await PatientModel.removeAllListeners({_id: req.body._id})
        .then(result =>{
            if(!result) res.json({success: false, result: "No patient was found with the ID ${req.body.id}"});
            res.json({ success: true, result});
        })
        .catch(err => res.json({ success: false, result: err}));
    }

}