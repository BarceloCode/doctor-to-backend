const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpedientModel = new Schema({
        patient: { 
            type: Schema.Types.ObjectId, ref: 'patient',
            required: true,
        },
        familyHistory: [{
            family: {
                type: String,
                required: true,
            },
            diabetes: {
                type: String,
                required: true,
            },
            hypertension: {
                type: String,
                required: true,
            }, 
            autoimmuneDiseases: {
                type: String,
                required: true,
            },
        }],
        pathologicalHistory: [{
            diabetesMellitus: {
                type: String, 
                default: 'N/A',
                required: true
            },
            arterialHypertension: {
                type: String, 
                default: 'N/A',
                required: true
            },
            endocrinologicalDiseases: {
                type: String, 
                default: 'N/A',
                required: true
            },        
            diseasesAutoimmune: {
                type: String, 
                default: 'N/A',
                required: true
            }, 
            vih: {
                type: String, 
                default: 'N/A',
                required: true
            },
            herpes: {
                type: String, 
                default: 'N/A',
                required: true
            },
            bloodTransfusions: {
                type: String, 
                default: 'N/A',
                required: true
            },
            trauma: {
                type: String, 
                default: 'N/A',
                required: true
            },
            fracture: {
                type: String, 
                default: 'N/A',
                required: true
            },
            hospitalizations: {
                type: String, 
                default: 'N/A',
                required: true
            },
            previousSurgeries: {
                type: String, 
                default: 'N/A',
                required: true
            },
            hepatitis: {
                type: String, 
                default: 'N/A',
                required: true
            },
            cancer: {
                type: String, 
                default: 'N/A',
                required: true
            },
            epilepsy: {
                type: String, 
                default: 'N/A',
                required: true
            },
            allergies: {
                type: String, 
                default: 'N/A',
                required: true
            },
            others: {
                type: String
            },
            doyouSmoke: String,
            howMany: {
                type: String, 
                default: 'N/A'
            },
            adictions: String, 
            whichOne: {
                type: String, 
                default: 'N/A'
            },
            drinkAlcohol: {
                type: String                
            }, 
            alchohol: String, 
            bloodPhobia: String,
            needlePhobia: String,         
            fainting: String,
            medicines: String,
            medicineName: {
                type: String,
                default: 'N/A'
            },
            bruises: String, 
            tanningbed: String, 
            anesthesia: String, 
            anesthesiaProblems: {
                type: String, 
                default: 'N/A'
            },
            problem: {
                type: String, 
                default: 'N/A'
            },
            vaccine: String, 
            vaccineName: {
                type: String, 
                default: 'N/A'
            },
            infections: {
                type: String,
                default: 'N/A'
            }, 
            infectionName:{
                type: String,
                default: 'N/A'
            },
            medicalTreatment: String,
            treatment: {
                type: String,
                default: 'N/A'
            },
            exercise: String, 
            typeof: {
                type: String,
                default: 'N/A'
            },            
        }],
        gynecologistsHistory: [{
            pregnant: String,
            mernacaNo: String,
            fum: String, 
            menstrualrhythm: String, 
            fup: String, 
            g: String, 
            p: String, 
            a: String, 
            c: String, 
            contraceptivemethod: String
        }],
        solarProtection: [{
            solarExposition: String,
            time: String, 
            usesolarProtection: String,
            brand: String, 
            fps: String
        }],
        consultReason: {
            type: String, 
            default: 'N/A'
        },
        other: {
            type: String, 
            default: 'N/A'
        },
        previousTreatments: [{
            procedure: String,
            product: String, 
            applicationDate: String
        }],        
        physicalExam: [{
            flitzpatrick: String,
            glogau: String,
            typeSkin: String,
            typeFace: String,
            dermatologicallesions: {
                type: String, 
                default: 'N/A'
            },
            lesion: {
                type: String, 
                default: 'N/A'
            }, 
            lesionType: {
                type: String,
                default: 'N/A'
            },
            location: {
                type: String, 
                default: 'N/A'
            },            
        }],
        habitusExterior: [{
            patientCondition: String,
            constitution: String,
            conformation: String, 
            attitude: String,
            facies: String, 
            anormalMovements: String, 
            gear: String,
            consciousness: String,
            others1: String,                 
        }],
        vitalSigns: [{
            fc: String,
            ta: String,
            temp: String,
            weight: String, 
            size: String,
            imc: String
        }]            
});

module.exports = mongoose.model('expedient', ExpedientModel);