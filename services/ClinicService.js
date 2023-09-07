const ClinicSchema = require("../models/ClinicModel");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

async function retrive() {
  try {
    const Clinic = await ClinicSchema.find();
    if (!Clinic || Clinic.deleted) {
      return {
        message: "Clinic not found",
        error: true,
        error: error.message,
      };
    }
    return {
      message: "Clinic found",
      error: false,
      Clinic: Clinic,
    };
  } catch (error) {
    return { message: "Error", error: "Clinic not found" };
  }
}

async function retriveOne(req) {
  try {
    const Clinic = await ClinicSchema.findOne({ name: req.body.name });
    if (!Clinic || Clinic.deleted) {
      return {
        message: "Clinic not found",
        error: true,
        error: error.message,
      };
    }
    return {
      message: "Clinic found",
      error: false,
      Clinic: Clinic,
    };
  } catch (error) {
    return { message: "Error", error: "Clinic not found" };
  }
}

async function retriveOnebyId(req) {
  try {
    const Clinic = await ClinicSchema.findById({ _id: req.body._id });
    if (!Clinic || Clinic.deleted) {
      return {
        message: "Clinic not found",
        error: true,
        error: error.message,
      };
    }
    return {
      message: "Clinic found",
      error: false,
      Clinic: Clinic,
    };
  } catch (error) {
    return { message: "Error", error: "Clinic not found" };
  }
}

async function create(req) {
  try {
    const Clinic = await ClinicSchema.create({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      worktime: {
        start: req.body.worktime.start,
        end: req.body.worktime.end,
        days: req.body.worktime.days,
      },
      consultingRoom: req.body.consultingRoom
    });

    if (Clinic) {
      return { message: "Created succesfully", error: false };
    }
  } catch (error) {
    return {
      message: "Can't create new Clinic",
      error: true,
      error: error.message,
    };
  }
}

async function update(req) {
  try {
    const findClinic = await ClinicSchema.findOne({
      _id: req.params.id,
    }).select("_id deleted");
    const { name, description, address, worktime } = req.body;
    if (!findClinic || findClinic.deleted) {
      return { message: "Clinic not found", error: true };
    }
    const update = {
      name: name,
      description: description,
      address: address,
      worktime: {
        start: worktime.start,
        end: worktime.end,
        days: worktime.days,
      },
    };
    const result = await ClinicSchema.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return { message: "Updated succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function softDelete(req, res) {
  try {
    const findClinic = await ClinicSchema.findOne({
      _id: req.body._id,
    }).select("_id deleted");

    if (!findClinic || findClinic.deleted) {
      return res.status(404).json({ message: "Clinic not found", error: true });
    }
    const update = {
      deleted: true,
      deletedAt: currentTime,
    };
    const result = await ClinicSchema.findByIdAndUpdate(findClinic, update);
    if (result) {
      return res
        .status(202)
        .json({ message: "Deleted succesfully", error: false });
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function UndosoftDelete(req, res) {
  try {
    const findClinic = await ClinicSchema.findOne({
      _id: req.body._id,
    }).select("_id deleted");
    if (!findClinic) {
      return res.status(404).json({ message: "Clinic not found", error: true });
    }
    const update = {
      deleted: false,
      deletedAt: null,
    };
    const result = await ClinicSchema.findByIdAndUpdate(findClinic, update);
    if (result) {
      return res
        .status(202)
        .json({ message: "Restored succesfully", error: false });
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

module.exports = {
  create,
  retrive,
  retriveOne,
  retriveOnebyId,
  update,
  softDelete,
  UndosoftDelete,
};
