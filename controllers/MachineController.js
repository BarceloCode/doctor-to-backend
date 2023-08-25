const MachineService = require("../services/MachineService");



async function getAllMachine(req, res) {
    try {
      const Machine = await MachineService.retrive(req, res);
      res.status(200).json(Machine);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

async function createMachine(req, res) {
  try {
    const Machine = await MachineService.create(req, res);
    res.status(201).json(Machine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}



async function updateMachine(req, res) {
  try {
    const Machine = await MachineService.update(req, res);
    res.status(200).json(Machine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteMachine(req, res) {
  try {
    const Machine = await MachineService.softDelete(req, res);
    res.status(200).json(Machine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function undoDeleteMachine(req, res) {
  try {
    const Machine = await MachineService.UndosoftDelete(req, res);
    res.status(200).json(Machine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
  createMachine,
  getAllMachine,
  updateMachine,
  deleteMachine,
  undoDeleteMachine,
};
