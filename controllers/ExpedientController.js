const ExpedientModel = require("../models/ExpedientModel");

module.exports = {

    create: async(req, res) =>{
    try{
        let expedientExists = await ExpedientModel.findOne({patient: req.body.patient});
        if (expedientExists) return res.json({ success: false, result: "Expedient already exists"});        

        let expediente = new ExpedientModel({ 
            patient: req.body.patient,           
            familyHistory: [{
                familyMember: req.body.familyMember,
                diabetes: req.body.diabetes,
                hypertension: req.body.hypertension,
                autoimmuneDiseasesF: req.body.autoimmuneDiseasesF,
                cancerF: req.body.cancerF,
                othersDiseasesF: req.body.othersDiseasesF
            }],
            pathologicalHistory: [{
                mellitusDiabetes: req.body.mellitusDiabetes,
                arterialHypertension: req.body.arterialHypertension,
                endocrinolgicalDiseases: req.body.endocrinolgicalDiseases,
                psychiatricDiseases: req.body.psychiatricDiseases,
                autoimmuneDiseases: req.body.autoimmuneDiseases,
                vih: req.body.vih,
                herpesLabialis: req.body.herpesLabialis,
                herpesZoster: req.body.herpesZoster,
                bloodTransfusions: req.body.bloodTransfusions,
                trauma: req.body.trauma,
                fractures: req.body.fractures,
                hospitalizations: req.body.hospitalizations,
                previousSurgeries: req.body.previousSurgeries,
                hepatitis: req.body.hepatitis,
                cancer: req.body.cancer,
                epilepsy: req.body.epilepsy,
                allergies: req.body.allergies,
                evolution: req.body.evolution,
                medicalTreatment: req.body.medicalTreatment,
                bloodPhobia: req.body.bloodPhobia,
                needlePhobia: req.body.needlePhobia,
                fainting: req.body.fainting,
                takingMedication: req.body.takingMedication,
                bruises: req.body.bruises,
                tanningBed: req.body.tanningBed,
                localAnesthesia: req.body.localAnesthesia,
                anesthesiaProblems: req.body.anesthesiaProblems,
                vaccinationsReceived: req.body.vaccinationsReceived,
                infections: req.body.infections,
                medicaltreatmentReceived: req.body.medicaltreatmentReceived,
                doExcerice: req.body.doExcerice,
                followDiet: req.body.followDiet,
                others: req.body.others
            }],
            adictions: [{
                doyouSmoke: req.body.doyouSmoke,
                haveAddictions: req.body.haveAddictions,
                drinksAlcohol: req.body.drinksAlcohol
            }],
            gynecobstetricHistory: [{
                pregnant: req.body.pregnant,
                mernacoNo: req.body.mernacoNo,
                fum: req.body.fum,
                menstrualRythim: req.body.menstrualRythim,
                fup: req.body.fup,
                g: req.body.g,
                p: req.body.p,
                a: req.body.a,
                c: req.body.c,
                anticonceptiveMethod: req.body.anticonceptiveMethod,
            }],
            solarProtection: [{
                solarExposition: req.body.solarExposition,
                expositionTime: req.body.expositionTime,
                usersolarProtection: req.body.usersolarProtection,
                brand: req.body.brand,
                fps: req.body.fps
            }],
            consultReason:[{
                motive: req.body.motive,
                other: req.body.other
            }], 
            previousTreatments:[{
                procedure: req.body.procedure,
                product: req.body.product,
                date: req.body.date
            }],
            physicalExam:  [{
                fitzpatrick: req.body.fitzpatrick,
                glogau: req.body.glogau,
                skinType: req.body.skinType,
                faceType: req.body.faceType,
                dermatologicalLesions: req.body.dermatologicalLesions                 
            }],
            habitusExterior: [{
                patientCondition: req.body.patientCondition,
                constitution: req.body.constitution,
                conformation: req.body.conformation,
                attitude: req.body.attitude,
                facies: req.body.facies,
                anormalMovements: req.body.anormalMovements,
                gear: req.body.gear,
                stateofConsciousness: req.body.stateofConsciousness,
                notes: req.body.notes
            }],
            vitalSigns:[{
                fc: req.body.fc,
                fr: req.body.fr,
                ta: req.body.ta,
                temperature: req.body.temperature,
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
        const { id } = req.params;
        let expediente = await ExpedientModel.findByIdAndUpdate(req.params.id,{ 
            patient: req.body.patient,           
            familyHistory: [{
                familyMember: req.body.familyMember,
                diabetes: req.body.diabetes,
                hypertension: req.body.hypertension,
                autoimmuneDiseasesF: req.body.autoimmuneDiseasesF,
                cancerF: req.body.cancerF,
                othersDiseasesF: req.body.othersDiseasesF
            }],
            pathologicalHistory: [{
                mellitusDiabetes: req.body.mellitusDiabetes,
                arterialHypertension: req.body.arterialHypertension,
                endocrinolgicalDiseases: req.body.endocrinolgicalDiseases,
                psychiatricDiseases: req.body.psychiatricDiseases,
                autoimmuneDiseases: req.body.autoimmuneDiseases,
                vih: req.body.vih,
                herpesLabialis: req.body.herpesLabialis,
                herpesZoster: req.body.herpesZoster,
                bloodTransfusions: req.body.bloodTransfusions,
                trauma: req.body.trauma,
                fractures: req.body.fractures,
                hospitalizations: req.body.hospitalizations,
                previousSurgeries: req.body.previousSurgeries,
                hepatitis: req.body.hepatitis,
                cancer: req.body.cancer,
                epilepsy: req.body.epilepsy,
                allergies: req.body.allergies,
                evolution: req.body.evolution,
                medicalTreatment: req.body.medicalTreatment,
                bloodPhobia: req.body.bloodPhobia,
                needlePhobia: req.body.needlePhobia,
                fainting: req.body.fainting,
                takingMedication: req.body.takingMedication,
                bruises: req.body.bruises,
                tanningBed: req.body.tanningBed,
                localAnesthesia: req.body.localAnesthesia,
                anesthesiaProblems: req.body.anesthesiaProblems,
                vaccinationsReceived: req.body.vaccinationsReceived,
                infections: req.body.infections,
                medicaltreatmentReceived: req.body.medicaltreatmentReceived,
                doExcerice: req.body.doExcerice,
                followDiet: req.body.followDiet,
                others: req.body.others
            }],
            adictions: [{
                doyouSmoke: req.body.doyouSmoke,
                haveAddictions: req.body.haveAddictions,
                drinksAlcohol: req.body.drinksAlcohol
            }],
            gynecobstetricHistory: [{
                pregnant: req.body.pregnant,
                mernacoNo: req.body.mernacoNo,
                fum: req.body.fum,
                menstrualRythim: req.body.menstrualRythim,
                fup: req.body.fup,
                g: req.body.g,
                p: req.body.p,
                a: req.body.a,
                c: req.body.c,
                anticonceptiveMethod: req.body.anticonceptiveMethod,
            }],
            solarProtection: [{
                solarExposition: req.body.solarExposition,
                expositionTime: req.body.expositionTime,
                usersolarProtection: req.body.usersolarProtection,
                brand: req.body.brand,
                fps: req.body.fps
            }],
            consultReason:[{
                motive: req.body.motive,
                other: req.body.other
            }], 
            previousTreatments:[{
                procedure: req.body.procedure,
                product: req.body.product,
                date: req.body.date
            }],
            physicalExam:  [{
                fitzpatrick: req.body.fitzpatrick,
                glogau: req.body.glogau,
                skinType: req.body.skinType,
                faceType: req.body.faceType,
                dermatologicalLesions: req.body.dermatologicalLesions                 
            }],
            habitusExterior: [{
                patientCondition: req.body.patientCondition,
                constitution: req.body.constitution,
                conformation: req.body.conformation,
                attitude: req.body.attitude,
                facies: req.body.facies,
                anormalMovements: req.body.anormalMovements,
                gear: req.body.gear,
                stateofConsciousness: req.body.stateofConsciousness,
                notes: req.body.notes
            }],
            vitalSigns:[{
                fc: req.body.fc,
                fr: req.body.fr,
                ta: req.body.ta,
                temperature: req.body.temperature,
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
        return res.status(200).send(expediente)
        /*},{
            new: true
        })
        if(!expediente){
            return res.status(400).send("Expedient does not exists")
        }*/
    }catch(error){
        return res.status(400).send(error)
    }
    
  },

    retrieve: async (req, res) =>{
        try{
            await ExpedientModel.find({})
            .populate({
                path: "patient",
                select: { _id: 0, name: 1, birthdate: 1}                
            })
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
            const findPatient = await ExpedientModel.findOne({ 
                patient: req.body.patient
            }).populate({
                path: "patient",
                select: { _id: 0, name: 1, birthdate: 1}                
            })        
            if(!findPatient) return res.status(400).send("Expedient does not exists")            
            
            res.json({ success: true, result: findPatient});
        }catch(error){
            return res.status(400).send(error)
        }
    },
    
    delete: async (req, res) => {
        try{
            const { id } = req.params;
            ExpedientModel
            .deleteMany({ _id: id})
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error}));
        }catch(error){
            return res.status(400).send(error)
        }
    },     

}