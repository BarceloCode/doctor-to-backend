const PatientModel = require("../models/PatientModel");
const Validate = require("../validations/PatienValidation")

module.exports = {
    create: async (req, res) =>{

        //Data validattion

        let { error } = Validate.patient(req.body);
        if (error) return res.json({ success: false, result: error.details[0].message});

        let curpExists = await PatientModel.findOne({ curp : req.body.curp });
        if (curpExists) return res.json({ success: false, result: "User already exists"});

    let patient = new PatientModel({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        curp: req.body.curp,
        birthdate: req.body.birthdate,
        civilstatus: req.body.civilstatus,
        religion: req.body.religion,
        ocupation: req.body.ocupation,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        emergencyContact: req.body.emergencyContact,
        bloodType: req.body.bloodType        
    })
    await patient.save()
    .then(result => {
      res.json({ success: true, result: result });
    })
    .catch(err => {
      res.json({ success: false, result: err });
    });

},

update: async (req, res) =>{
    
    
    let patient = await PatientModel.findByIdAndUpdate(req.body._id,{
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        curp: req.body.curp,
        birthdate: req.body.birthdate,
        civilstatus: req.body.civilstatus,
        religion: req.body.religion,
        ocupation: req.body.ocupation,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        emergencyContact: req.body.emergencyContact,
        bloodType: req.body.bloodType   
    },{
        new: true
    })
    if(!patient){
        return res.status(400).send("Patient does not exists")
    }
    res.status(200).send(patient);
  },   

retrieve: async (req, res) =>{
    await PatientModel.find()
        .then(result =>{
            if(!result) res.json({success: false, result: "No results found"});            

            res.json({ succes: true, result: result});
        })
        .catch(err => res.json({success: false, rsult: err}));
},

retrieveOne: async (req, res) =>{
    PatientModel.findById({_id: req.body._id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
},

delete: async (req, res) => {
    PatientModel
      .deleteMany({ _id: req.body._id})
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error}));
}

}