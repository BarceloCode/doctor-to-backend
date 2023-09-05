const mongoose = require("mongoose");
const apoitmentSch = require("../models/ApointmentModel");
const consultingRoomSch = require("../models/ConsultingRoomModel");
const expedientSch = require("../models/ExpedientModel");
const historySch = require("../models/HistoryModel");
const machineSch = require("../models/MachineModel");
const patientSch = require("../models/PatientModel");
const productSch = require("../models/ProductsModel");
const treatmentSch = require("../models/TreatmentModel");
const cosmetologistUser = require("../models/CosmetologistModel");
const clinicSch = require("../models/ClinicModel");
const businessUnitSchema = require("../models/BusinessUnitModel");
const cosmetologistApointmentSch = require("../models/CosmetologistApointments");

const db = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });
// Conecta a la base de datos
db.connect();
// HASHING PASSWORD
const salt = parseInt(process.env.SALT_KEY);
const secretpassword = process.env.CANDY;
const hash = bcrypt.hashSync(secretpassword, salt);

const machine = [
  {
    _id: "64f7aa9a71b725ba01ed51e1",
    name: "Láser fraccional CO2",
    description:
      "Utilizado para el rejuvenecimiento de la piel y el tratamiento de cicatrices, estrías y arrugas.",
  },
  {
    _id: "64f7aa9a71b725ba01ed51e2",
    name: "Ultrasonido focalizado de alta intensidad (HIFU)",
    description: "Para el levantamiento no quirúrgico de la piel.",
  },
];
const consultingRoom = [
  {
    _id: "64f7aa9a71b725ba01ed51e3",
    name: "CONSULTORIO:1",
    machines: {
      _id: "64f7aa9a71b725ba01ed51e1",
      _id: "64f7aa9a71b725ba01ed51e2",
    },
  },
];
const clinic = [
  {
    _id: "64f7aa9a71b725ba01ed51e4",
    name: "Dermacare",
    address: "Av. Mexico 1234, Guadalajara, Mexico",
    description:
      "En Dermacare, entendemos que tu piel es un reflejo de tu salud y belleza interior. Somos una clínica dermatológica de renombre que se dedica a cuidar y mejorar la salud de tu piel. Nuestro equipo de dermatólogos altamente calificados y comprometidos está aquí para ayudarte a alcanzar y mantener una piel radiante y saludable",
    worktime: {
      start: "08:00:00 am",
      end: "20:00:00 pm",
      days: "Lunes a Viernes",
      consultingRoom: "64f7aa9a71b725ba01ed51e3",
    },
    phone: "3344566598",
  },
];
const product = [
  {
    _id: "64f7aa9a71b725ba01ed51e5",
    productName: "Dermacream 500ml",
    productPrice: 100,
    stock: 500,
  },
  {
    _id: "64f7aa9a71b725ba01ed51e6",
    productName: "Sunprotector 500ml",
    productPrice: 234,
    stock: 500,
  },
];
const treatment = [
  {
    _id: "64f7aa9a71b725ba01ed51e7",
    treatmentName: "Tratamiento de Acné",
    description:
      "Nuestro tratamiento de acné incluye limpieza facial profunda, aplicación de productos especializados y terapia láser para reducir las espinillas y mejorar la textura de la piel.",
    price: 150,
    product: "64f7aa9a71b725ba01ed51e5",
  },
  {
    _id: "64f7aa9a71b725ba01ed51e8",
    treatmentName: "Tratamiento de Rejuvenecimiento Facial",
    description:
      "Nuestro tratamiento de rejuvenecimiento facial combina técnicas avanzadas de microagujas y terapia de luz pulsada intensa (IPL) para reducir las arrugas, mejorar la elasticidad de la piel y restaurar un aspecto más joven.",
    price: 250,
    product: "64f7aa9a71b725ba01ed51e6",
  },
];
const businessunit = [
  {
    _id: "64f7aa9a71b725ba01ed51e9",
    name: "Solo piel y cuidado",
    clinic: "64f7aa9a71b725ba01ed51e4",
    treatment: {
      _id: "64f7aa9a71b725ba01ed51e5",
      _id: "64f7aa9a71b725ba01ed51e8",
    },
  },
];
const cosmetologist = [
  {
    _id: "64f7aa9a71b725ba01ed51ea",
    name: "Sandra Aide",
    full_lastname: "Gonzalez Perez",
    email: "sandra@usc.com",
    password: hash,
    phone: "3300003699",
    birthday: "1991-12-17",
    gender: "Female",
    permissions: {
      role: "administrator",
      read: true,
      edit: true,
      delete: true,
    },
    worktime: {
      start: "1970-01-01T08:30:00",
      end: "1970-01-01T20:30:00",
    },
    workdays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    businessUnit: "64f7aa9a71b725ba01ed51e9",
  },
];
const patient = [
  {
    _id: "64f7aa9a71b725ba01ed51eb",
    name: "Juan Pérez Gomez",
    gender: "Male",
    age: "35",
    curp: "PERJ830101HDFXXX01",
    birthdate: "1983-01-01",
    civilstatus: "Casado",
    religion: "Católico",
    ocupation: "Ingeniero",
    address: "Calle Principal #123, Ciudad XYZ",
    email: "juan.perez@example.com",
    phone: "5555555555",
    emergencyContact: "María Pérez",
    bloodType: "O+",
  },
];
const expedient = [
  {
    _id: "64f7aa9a71b725ba01ed51ec",
    patient: "64f7aa9a71b725ba01ed51eb",
    familyHistory: [
      {
        familyMember: "Padre",
        diabetes: "Sí",
        hypertension: "No",
        cancer: "No",
        othersDiseases: "N/A",
      },
      {
        familyMember: "Madre",
        diabetes: "No",
        hypertension: "Sí",
        cancer: "No",
        othersDiseases: "N/A",
      },
    ],
    pathologicalHistory: [
      {
        mellitusDiabetes: "No",
        arterialHypertension: "Sí",
        endocrinolgicalDiseases: "No",
        psychiatricDiseases: "No",
        autoimmuneDiseases: "No",
        vih: "No",
        herpesLabialis: "Sí",
        herpesZoster: "No",
        bloodTransfusions: "No",
        trauma: "Sí",
        fractures: "No",
        hospitalizations: "No",
        previousSurgeries: "No",
        hepatitis: "No",
        cancer: "No",
        epilepsy: "No",
        allergies: ["Polen", "Penicilina"],
        evolution: "N/A",
        medicalTreatment: "Sí",
        others: "N/A",
        bloodPhobia: "No",
        needlePhobia: "Sí",
        fainting: "No",
        takingMedication: "Sí",
        bruises: "No",
        tanningBed: "No",
        localAnesthesia: "No",
        anesthesiaProblems: "No",
        vaccinationsReceived: "Sí",
        infections: "No",
        medicaltreatmentReceived: "No",
        doExcerice: "Sí",
        followDiet: "No",
      },
    ],
    adictions: [
      {
        doyouSmoke: "Sí",
        haveAddictions: "No",
        drinksAlcohol: "Sí",
      },
    ],
    gynecobstetricHistory: [
      {
        pregnant: "No",
        menarcaNo: "No",
        fum: "No",
        mentrualRythim: "Regular",
        fup: "No",
        g: "2",
        a: "0",
        a: "1",
        anticonceptiveMethod: "Pastillas anticonceptivas",
      },
    ],
    solarProtection: [
      {
        solarExposition: "Sí",
        expositionTime: "2 horas al día",
        usersolarProtection: "Sí",
        brand: "Eucerin",
        fps: "SPF 50",
      },
    ],
  },
];
const apointment = [
  {
    _id: "64f7aa9a71b725ba01ed51ed",
    date: "2023-09-15T10:00:00Z",
    description: "Consulta para revisión de tratamiento de acné.",
    status: {
      confirmationPending: true,
      confirmedbyuser: false,
      cancelledByUser: false,
      cancelledbydoctor: false,
      rescheduled: false,
      notassisted: false,
      approved: false,
      inprogress: false,
      finished: false,
    },
    cosmetologist: "64f7aa9a71b725ba01ed51ea",
    patient: "64f7aa9a71b725ba01ed51eb",
    treatment: ["64f7aa9a71b725ba01ed51e7", "64f7aa9a71b725ba01ed51e8"],
  },
];
const history = [
  {
    _id: "64f7aa9a71b725ba01ed51ee",
    patient: "64f7aa9a71b725ba01ed51eb",
    treatment: [
      {
        name: "64f7aa9a71b725ba01ed51e7",
        cosmetologist: "64f7aa9a71b725ba01ed51ea",
        date: "2023-09-15T10:00:00Z",
      },
      {
        name: "64f7aa9a71b725ba01ed51e8",
        cosmetologist: "64f7aa9a71b725ba01ed51ea",
        date: "2023-09-15T10:00:00Z",
      },
    ],
  },
];
const cosmetologistApointment = [
  {
    _id: "64f7ac5405cfd2d4444fd579",
    cosmetologist: "64f7aa9a71b725ba01ed51ea",
    apointment: "64f7aa9a71b725ba01ed51ed",
  },
];

const seedDatabase = async () => {
  try {
    // Elimina todos los documentos existentes en la colección de usuarios
    // await cosmetologistUser.collection.drop();
    // await businessUnitSchema.collection().drop();
    // await businessUnitSchema.collection.drop();
    await historySch.collection.drop();
    await patientSch.collection.drop();
    await expedientSch.collection.drop();
    await apoitmentSch.collection.drop();
    await businessUnitSchema.collection.drop();
    await treatmentSch.collection.drop();
    await productSch.collection.drop();
    await machineSch.collection.drop();
    await consultingRoomSch.collection.drop();
    await clinicSch.collection.drop();
    await cosmetologistUser.collection.drop();
    await cosmetologistApointmentSch.collection.drop();

    //Inserta los datos a la base de datos
    await historySch.insertMany(history);
    await patientSch.insertMany(patient);
    await expedientSch.insertMany(expedient);
    await apoitmentSch.insertMany(apointment);
    await businessUnitSchema.insertMany(businessunit);
    await treatmentSch.insertMany(treatment);
    await productSch.insertMany(product);
    await machineSch.insertMany(machine);
    await consultingRoomSch.insertMany(consultingRoom);
    await clinicSch.insertMany(clinic);
    await cosmetologistUser.insertMany(cosmetologist);
    await cosmetologistApointmentSch.insertMany(cosmetologistApointment);
    console.log("Datos de muestra insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos de muestra:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
