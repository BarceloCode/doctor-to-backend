const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PathologicalModel = new Schema({
        diabetesMellitus: String,
        arterialHypertension: String,
        endocrinologicalDiseases: String,        
        diseasesAutoimmune: String, 
        vih: String,
        herpes: String,
        bloodTransfusions: String,
        trauma: String,
        fracture: String,
        hospitalizations: String,
        previousSurgeries: String,
        hepatitis: String,
        cancer: String,
        epilepsy: String,
        allergies: String,
        others: String,
        doyouSmoke: String,
        howMany: String,
        adictions: [{
            adiction: String, 
            whichOne: String
        }],
        drinksAlcohol:[{
            drinks: String,
            often: String
        }],
        bloodPhobia: [{
            answer: String, 
        }],
        fainting: String,
        medicines: String,
        bruises: String,
        anesthesia: String,
        anesthesiaProblems: [{
            answer: String,
            problem: String
        }],
        vaccines: [{
            answer: String,
            which: String
        }],
        infections: [{
            answer: String,
            which: String
        }],
        medicalTreatment: [{
            answer: String,
            which: String
        }],
        exercise: [{
            answer: String,
            type: String
        }],
        diet: [{
            answer: String,
            which: String
        }]       
});

module.exports = mongoose.model('pathological', PathologicalModel);