const PatientModel = require("../models/PatientModel");
const Validate = require("../validations/PatienValidation")

module.exports = {
    create: async (req, res) =>{
    try{
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
    }catch (error){
        return res.status(400).send(error);
    }                

},

update: async (req, res) =>{
    try{
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
    }catch (error){
        return res.status(400).send(error)
    }        
  },   

retrieve: async (req, res) =>{
    try{
        await PatientModel.find()
        .then(result =>{
            if(!result) res.json({success: false, result: "No results found"});            

            res.json({ succes: true, result: result});
        })
        .catch(err => res.json({success: false, rsult: err}));
    }catch (error){
        return res.status(400).send(error)
    }
    
},

retrieveOne: async (req, res) =>{
    try{
        PatientModel.findById({_id: req.body._id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    }catch (error){
        return res.status(400).send(error)
    }
},

delete: async (req, res) => {
    try{
        const { id } = req.params;
        PatientModel
      .deleteMany({ _id: id})
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error}));
    }catch (error){
        return res.status(400).send(error)
    }
}

}