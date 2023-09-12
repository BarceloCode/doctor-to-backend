const ApointmentMgnmtService = require("../services/ApointmentManagment");

async function findCosmetologistByTreatment(req, res) {
  try {
    const Apointment =
      await ApointmentMgnmtService.findCosmetologistByTreatment(req, res);
    res.status(Apointment.status).json(Apointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAvaibleApointmentDates(req, res) {
  try {
    const AvaibleApointmentDates =
      await ApointmentMgnmtService.getAvailableDates(req);
    res.status(AvaibleApointmentDates.status).json(AvaibleApointmentDates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
//  async function getOneByid(req, res){
//   try {
//     const Apointment = await ApointmentService.retriveOne(req, res);
//     res.status(200).json(Apointment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
//  }

// async function createApointment(req, res) {
//   try {
//     const Apointment = await ApointmentService.create(req, res);
//     res.status(201).json(Apointment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// async function updateApointment(req, res) {
//   try {
//     const Apointment = await ApointmentService.update(req, res);
//     res.status(200).json(Apointment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// async function deleteApointment(req, res) {
//   try {
//     const Apointment = await ApointmentService.softDelete(req, res);
//     res.status(200).json(Apointment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }
// async function undoDeleteApointment(req, res) {
//   try {
//     const Apointment = await ApointmentService.UndosoftDelete(req, res);
//     res.status(200).json(Apointment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

module.exports = {
  //   createApointment,
  findCosmetologistByTreatment,
  getAvaibleApointmentDates,
  //   getOneByid,
  //   updateApointment,
  //   deleteApointment,
  //   undoDeleteApointment,
};
