const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpedientModel = new Schema({
    patient: { 
            type: Schema.Types.ObjectId, ref: 'patient',
            required: true,
        },
    familyHistory: [{
            familyMember: {
                type: String,                 
                default: "N/A"
            },
            diabetes: {
                type: String,
                default: "N/A"                 
            },
            hypertension: {
                type: String, 
                default: "N/A"
            },
            autoimmuneDiseasesF: {
                type: String,
                default: "N/A"
            },
            cancerF: {
                type: String, 
                default: "N/A"
            },
            othersDiseasesF: {
                type: String, 
                default: "N/A"
            }
        }],
    pathologicalHistory: [{
            mellitusDiabetes: {
                type: String,
                default: "N/A"
            },
            arterialHypertension: {
                type: String,
                default: "N/A"
            },
            endocrinolgicalDiseases: {
                type: String, 
                default: "N/A"
            },
            psychiatricDiseases: {
                type: String, 
                default: "N/A"
            },
            autoimmuneDiseases: {
                type: String, 
                default: "N/A"
            },
            vih: {
                type: String, 
                default: "N/A"
            },
            herpesLabialis: {
                type: String, 
                default: "N/A"
            },
            herpesZoster: {
                type: String, 
                default: "N/A"
            },
            bloodTransfusions: {
                type: String,
                default: "N/A"
            },
            trauma: {
                type: String,
                default: "N/A"
            },
            fractures: {
                type: String, 
                default: "N/A"
            },
            hospitalizations: {
                type: String, 
                default: "N/A"
            },
            previousSurgeries: {
                type: String, 
                default: "N/A"
            },
            hepatitis: {
                type: String, 
                default: "N/A"
            },
            cancer: {
                type: String, 
                default: "N/A"
            },
            epilepsy: {
                type: String, 
                default: "N/A"
            },
            allergies: [{
                type: String,
                default: "N/A"
            }],
            evolution: {
                type: String, 
                default: "N/A"
            },
            medicalTreatment: {
                type: String, 
                default: "N/A"
            },
            bloodPhobia: {
                type: String, 
                default: "N/A"
            },
            needlePhobia: {
                type: String, 
                default: "N/A"
            },
            fainting: {
                type: String, 
                default: "N/A"
            },
            takingMedication: {
                type: String, 
                default: "N/A"
            },
            bruises: {
                type: String, 
                default: "N/A"
            },
            tanningBed: {
                type: String, 
                default: "N/A"
            },
            localAnesthesia: {
                type: String, 
                default: "N/A"
            },
            anesthesiaProblems: {
                type: String, 
                default: "N/A"
            },
            vaccinationsReceived: {
                type: String, 
                default: "N/A"
            },
            infections: {
                type: String, 
                default: "N/A"
            },
            medicaltreatmentReceived: {
                type: String, 
                default: "N/A"
            },
            doExcerice: {
                type: String, 
                default: "N/A"
            },          
            followDiet: {
                type: String, 
                default: "N/A"
            },
            others: {
                type: String, 
                default: "N/A"
            },
        }],
    adictions: [{
            doyouSmoke: {
                type: String, 
                default: "N/A"
            },
            haveAddictions:{
                type: String, 
                default: "N/A"
            },
            drinksAlcohol:{
                type: String, 
                default: "N/A"
            }
        }],
    gynecobstetricHistory: [{
        pregnant: {
            type: String, 
            default: "N/A"
        },
        menarcaNo: {
            type: String, 
            default: "N/A"
        },
        fum: {
            type: String, 
            default: "N/A"
        },
        menstrualRythim: {
            type: String,
            default: "N/A"
        },
        fup: {
            type: String, 
            default: "N/A"
        },
        g: {
            type: String, 
            default: "N/A"
        },
        a: {
            type: String, 
            default: "N/A"
        },
        a: {
            type: String,
            default: "N/A"
        },
        anticonceptiveMethod: {
            type: String, 
            default: "N/A"
        }        
    }],
    solarProtection: [{
        solarExposition: {
            type: String, 
            default: "N/A"
        },
        expositionTime: {
            type: String, 
            default: "N/A"
        },
        usersolarProtection: {
            type: String, 
            default: "N/A"
        },
        brand: {
            type: String, 
            default: "N/A"
        },
        fps: {
            type: String, 
            default: "N/A"
        }
    }],
    consultReason:[{
        motive: {
            type: String,
            default: "N/A"
        },
        other:{
            type: String,
            default: "N/A"
        }
    }],
    previousTreatments: [{
        procedure: {
            type: String,
            default: "N/A"
        },
        product: {
            type: String, 
            default: "N/A"
        },
        date: {
            type: String, 
            default: "N/A"
        }
    }],
    physicalExam: [{
        fitzpatrick: {
            type: String, 
            default: "N/A"
        },
        glogau: {
            type: String, 
            default: "N/A"
        },
        skinType: {
            type: String,
            default: "N/A"
        },
        faceType: {
            type: String,
            default: "N/A"
        },
        dermatologicalLesions: {
            type: String,
            deafult: "N/A"
        }
    }],
    habitusExterior: [{
        patientCondition: {
            type: String, 
            default: "N/A"
        },
        constitution: {
            type: String,
            default: "N/A"
        },
        conformation: {
            type: String,
            default: "N/A"
        },
        attitude: {
            type: String,
            default: "N/A"
        },
        facies: {
            type: String,
            default: "N/A"
        },
        anormalMovements: {
            type: String,
            default: "N/A"
        },
        gear: {
            type: String,
            default: "N/A"
        },
        stateofConsciousness: {
            type: String,
            default: "N/A"
        },
        notes: {
            type: String,
            default: "N/A"
        }
    }],
    vitalSigns: [{
        fc: {
            type: String,
            default: "N/A"
        },
        fr: {
            type: String,
            default: "N/A"
        },
        ta: {
            type: String,
            default: "N/A"
        },
        temperature: {
            type: String,
            default: "N/A"
        },
        weight: {
            type: String,
            default: "N/A"
        },
        size: {
            type: String,
            default: "N/A"
        },
        imc: {
            type: String,
            default: "N/A"
        }
    }]        
});

const Expedient = mongoose.model("expedient", ExpedientModel);
module.exports = Expedient;
