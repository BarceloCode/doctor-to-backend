const ExpedientModel = require("../models/ExpedientModel");

module.exports = {

    create: async(req, res) =>{
    try{
        let expediente = new ExpedientModel({ 
            patient: req.body.patient,           
            familyHistory: [{
                family: req.body.family,
                diabetes: req.body.diabetes,
                hypertension: req.body.hypertension,
                autoimmuneDiseases: req.body.autoimmuneDiseases,
            }],
            pathologicalHistory: [{
                diabetesMellitus: req.body.diabetesMellitus,
                arterialHypertension: req.body.arterialHypertension,
                endocrinologicalDiseases: req.body.endocrinologicalDiseases,
                diseasesAutoimmune: req.body.diseasesAutoimmune,
                vih: req.body.vih,
                herpes: req.body.herpes ,
                bloodTransfusions: req.body.bloodTransfusions,
                trauma: req.body.trauma,
                fracture: req.body.fracture,
                hospitalizations: req.body.hospitalizations,
                previousSurgeries: req.body.previousSurgeries,
                hepatitis: req.body.hepatitis,
                cancer: req.body.cancer,
                epilepsy: req.body.epilepsy,
                allergies: req.body.allergies,
                others: req.body.others,
                doyouSmoke: req.body.doyouSmoke,
                howMany : req.body.howMany,        
                adictions: req.body.adictions,
                whichOne: req.body.whichOne,
                drinkAlcohol: req.body.drinkAlcohol,
                alchohol: req.body.alchohol,
                bloodPhobia: req.body.bloodPhobia,
                needlePhobia: req.body.needlePhobia,            
                fainting: req.body.fainting,
                medicines: req.body.medicines,
                medicineName: req.body.medicineName,
                bruises: req.body.bruises,
                tanningbed: req.body.tanningbed,
                anesthesia: req.body.anesthesia,
                anesthesiaProblems: req.body.anesthesiaProblems,
                problem: req.body.problem,
                vaccine: req.body.vaccine,
                vaccineName: req.body.vaccineName,
                infections: req.body.infections,
                infectionName: req.body.infectionName,
                medicalTreatment: req.body.medicalTreatment,
                treatment: req.body.treatment,
                excercise: req.body.excercise,
                typeof: req.body.typeof,                
            }],
            gynecologistsHistory: [{
                pregnant: req.body.pregnant,
                mernacoNo: req.body.mernacoNo,
                fum: req.body.fum,
                menstrualrhythm: req.body.menstrualrhythm,
                fup: req.body.fup,
                g: req.body.g,
                p: req.body.p,
                a: req.body.a,
                c: req.body.c,
                contraceptivemethod: req.body.contraceptivemethod,
            }],
            solarProtection: [{
                solarExposition: req.body.solarExposition,
                time: req.body.time,
                usesolarProtection: req.body.usesolarProtection,
                brand: req.body.brand,
                fps: req.body.fps
            }],
            consultReason: req.body.consultReason,
            other: req.body.other,
            previousTreatments:[{
                procedure: req.body.procedure,
                product: req.body.product,
                applicationDate: req.body.applicationDate
            }],
            physicalExam:  [{
                flitzpatrick: req.body.flitzpatrick,
                glogau: req.body.glogau,
                typeSkin: req.body.typeSkin,
                typeFace: req.body.typeFace,
                dermatologicallesions: req.body.dermatologicallesions,
                lesion: req.body.lesion,
                lesionType: req.body.lesionType,
                location: req.body.location,                    
            }],
            habitusExterior: [{
                patientCondition: req.body.patientCondition,
                constituion: req.body.constituion,
                confirmation: req.body.confirmation,
                attitude: req.body.attitude,
                facies: req.body.facies,
                anormalMovements: req.body.anormalMovements,
                gear: req.body.gear,
                consciousness: req.body.consciousness,
                others1: req.body.others1
            }],
            vitalSigns:[{
                fc: req.body.fc,
                ta: req.body.ta,
                temp: req.body.temp,
                weight: req.body.weight,
                size: req.body.size,
                imc: req.body.imc
            }]
        })

        await expediente.save()
        .then(result => {
            res.json({ success: true, result: result });
          })
          .catch(err => {
            res.json({ success: false, result: err });
          });
    }catch(error){
        return res.status(400).send(error)
    }
    },

    
update: async (req, res) =>{
    
    try{
        let expediente = await ExpedientModel.findByIdAndUpdate(req.body._id,{
            patient: req.body.patient,           
            familyHistory: [{
                family: req.body.family,
                diabetes: req.body.diabetes,
                hypertension: req.body.hypertension,
                autoimmuneDiseases: req.body.autoimmuneDiseases,
            }],
            pathologicalHistory: [{
                diabetesMellitus: req.body.diabetesMellitus,
                arterialHypertension: req.body.arterialHypertension,
                endocrinologicalDiseases: req.body.endocrinologicalDiseases,
                diseasesAutoimmune: req.body.diseasesAutoimmune,
                vih: req.body.vih,
                herpes: req.body.herpes ,
                bloodTransfusions: req.body.bloodTransfusions,
                trauma: req.body.trauma,
                fracture: req.body.fracture,
                hospitalizations: req.body.hospitalizations,
                previousSurgeries: req.body.previousSurgeries,
                hepatitis: req.body.hepatitis,
                cancer: req.body.cancer,
                epilepsy: req.body.epilepsy,
                allergies: req.body.allergies,
                others: req.body.others,
                doyouSmoke: req.body.doyouSmoke,
                howMany : req.body.howMany,        
                adictions: req.body.adictions,
                whichOne: req.body.whichOne,
                drinkAlcohol: req.body.drinkAlcohol,
                alchohol: req.body.alchohol,
                bloodPhobia: req.body.bloodPhobia,
                needlePhobia: req.body.needlePhobia,            
                fainting: req.body.fainting,
                medicines: req.body.medicines,
                medicineName: req.body.medicineName,
                bruises: req.body.bruises,
                tanningbed: req.body.tanningbed,
                anesthesia: req.body.anesthesia,
                anesthesiaProblems: req.body.anesthesiaProblems,
                problem: req.body.problem,
                vaccine: req.body.vaccine,
                vaccineName: req.body.vaccineName,
                infections: req.body.infections,
                infectionName: req.body.infectionName,
                medicalTreatment: req.body.medicalTreatment,
                treatment: req.body.treatment,
                excercise: req.body.excercise,
                typeof: req.body.typeof,                
            }],
            gynecologistsHistory: [{
                pregnant: req.body.pregnant,
                mernacoNo: req.body.mernacoNo,
                fum: req.body.fum,
                menstrualrhythm: req.body.menstrualrhythm,
                fup: req.body.fup,
                g: req.body.g,
                p: req.body.p,
                a: req.body.a,
                c: req.body.c,
                contraceptivemethod: req.body.contraceptivemethod,
            }],
            solarProtection: [{
                solarExposition: req.body.solarExposition,
                time: req.body.time,
                usesolarProtection: req.body.usesolarProtection,
                brand: req.body.brand,
                fps: req.body.fps
            }],
            consultReason: req.body.consultReason,
            other: req.body.other,
            previousTreatments:[{
                procedure: req.body.procedure,
                product: req.body.product,
                applicationDate: req.body.applicationDate
            }],
            physicalExam:  [{
                flitzpatrick: req.body.flitzpatrick,
                glogau: req.body.glogau,
                typeSkin: req.body.typeSkin,
                typeFace: req.body.typeFace,
                dermatologicallesions: req.body.dermatologicallesions,
                lesion: req.body.lesion,
                lesionType: req.body.lesionType,
                location: req.body.location,                    
            }],
            habitusExterior: [{
                patientCondition: req.body.patientCondition,
                constituion: req.body.constituion,
                confirmation: req.body.confirmation,
                attitude: req.body.attitude,
                facies: req.body.facies,
                anormalMovements: req.body.anormalMovements,
                gear: req.body.gear,
                consciousness: req.body.consciousness,
                others1: req.body.others1
            }],
            vitalSigns:[{
                fc: req.body.fc,
                ta: req.body.ta,
                temp: req.body.temp,
                weight: req.body.weight,
                size: req.body.size,
                imc: req.body.imc
            }]
        },{
            new: true
        })
        if(!expediente){
            return res.status(400).send("Expedient does not exists")
        }
        res.status(200).send(expediente);
    }catch(error){
        return res.status(400).send(error)
    }
    
  },

    retrieve: async (req, res) =>{
        try{
            await ExpedientModel.find({})
            .populate('patient')
            .then(result =>{
                if(!result) res.json({success: false, result: "No results found"});            
    
                res.json({ succes: true, result: result});
            })
            .catch(err => res.json({success: false, rsult: err}));
        }catch(error){
            return res.status(400).send(error)
        }
    },

    retrieveOne: async (req, res) =>{
        try{
            ExpedientModel.find({patient: req.body.patient})
            .populate('patient')
            .then((data) => res.json(data))
            .catch((error) => res.json({message: error, result: "Patient does not exist"}));
        }catch(error){
            return res.status(400).send(error)
        }
    },
    

    delete: async (req, res) => {
        try{
            ExpedientModel
            .deleteMany({ _id: req.body._id})
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error}));
        }catch(error){
            return res.status(400).send(error)
        }
    },     

}