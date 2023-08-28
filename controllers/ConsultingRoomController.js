const ConsultingRoomServices = require("../services/ConsultingRoomService");



async function getAllConsultingRoom(req, res) {
    try {
      const ConsultingRoom = await ConsultingRoomServices.retrive(req, res);
      res.status(200).json(ConsultingRoom);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

async function createConsultingRoom(req, res) {
  try {
    const ConsultingRoom = await ConsultingRoomServices.create(req, res);
    res.status(201).json(ConsultingRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}



async function updateConsultingRoom(req, res) {
  try {
    const ConsultingRoom = await ConsultingRoomServices.update(req, res);
    res.status(200).json(ConsultingRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteConsultingRoom(req, res) {
  try {
    const ConsultingRoom = await ConsultingRoomServices.softDelete(req, res);
    res.status(200).json(ConsultingRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function undoDeleteConsultingRoom(req, res) {
  try {
    const ConsultingRoom = await ConsultingRoomServices.UndosoftDelete(req, res);
    res.status(200).json(ConsultingRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
  createConsultingRoom,
  getAllConsultingRoom,
  updateConsultingRoom,
  deleteConsultingRoom,
  undoDeleteConsultingRoom,
};
