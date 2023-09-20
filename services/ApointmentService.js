const ApointmentSchema = require("../models/ApointmentModel");
const CosmetologistApointmentSchema = require("../models/CosmetologistApointments");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

async function retrive(req) {
  try {
    const options = {
      page: req.body.page,
      limit: 5,
      collation: {
        locale: "en",
      },
      populate: {
        path: "apointment",
        select: { cosmetologist: 0 },
        populate: {
          path: "treatment",
          populate: { path: "product" },
        },
      },
      populate: {
        path: "cosmetologist",
        select: {
          name: 1,
          full_lastname: 1,
          email: 1,
          phone: 1,
          businessUnit: 1,
        },
        populate: { path: "businessUnit", select: { name: 1, address: 1 } },
      },
    };
    const Apointment = await CosmetologistApointmentSchema.paginate(
      {},
      options
    );

    if (!Apointment || Apointment.deleted || Apointment.length === 0) {
      return {
        message: "Apointment not found",
        error: true,
        error: error.message,
      };
    }
    return {
      message: "Apointment found!",
      error: false,
      Apointments: Apointment,
    };
  } catch (error) {
    return { message: error.message, error: "Apointment not found" };
  }
}
async function retriveOne(req) {
  try {
    const Apointment = await CosmetologistApointmentSchema.findById({
      _id: req.body._id,
      deleted: false,
    })
      .populate({
        path: "apointment",
        select: { cosmetologist: 0 },
        populate: {
          path: "patient",
        },
      })
      .populate({
        path: "apointment",
        select: { cosmetologist: 0 },
        populate: {
          path: "treatment",
          populate: { path: "product" },
        },
      })
      .populate({
        path: "cosmetologist",
        select: {
          name: 1,
          full_lastname: 1,
          email: 1,
          phone: 1,
          businessUnit: 1,
        },
        populate: { path: "businessUnit", select: { name: 1, address: 1 } },
      });

    if (!Apointment) {
      return {
        message: "Apointment not found",
        error: true,
        status: 404,
      };
    }

    if (Apointment.deleted) {
      return {
        message: "Apointment is deleted",
        error: true,
        status: 404,
      };
    }
    return {
      message: "Apointment found!",
      error: false,
      data: Apointment,
      status: 200,
    };
  } catch (error) {
    return { message: error.message, error: "Apointment Error", status: 403 };
  }
}

async function create(req) {
  try {
    const Apointment = await ApointmentSchema.create({
      date: req.body.date,
      description: req.body.description,
      cosmetologist: req.body.cosmetologist,
      patient: req.body.patient,
      treatment: req.body.treatment,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    const CosmeApoint = HandleCosmetologistApointments(
      Apointment.cosmetologist,
      Apointment._id
    );

    if (Apointment && CosmeApoint) {
      return CosmeApoint;
    }
  } catch (error) {
    return {
      message: "Can't create",
      error: true,
      error: error.message,
    };
  }
}

async function update(req) {
  try {
    const findApointment = await ApointmentSchema.findById({
      _id: req.body._id,
    }).select("_id deleted");
    const { description, cosmetologist, treatment } = req.body;
    if (!findApointment || findApointment.deleted) {
      return { message: "Apointment not found", error: true };
    }
    const update = {
      set: {
        description: description,
        cosmetologist: cosmetologist,
        treatment: treatment,
      },
    };
    const result = await ApointmentSchema.updateOne(findApointment, update);
    if (result) {
      return { message: "Updated succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function softDelete(req) {
  try {
    const finduser = await ApointmentSchema.findOne({
      email: req.body.email,
    }).select("email deleted");

    if (!finduser || finduser.deleted || req.body.email == finduser.email) {
      return { message: "User not found", error: true };
    }
    const update = {
      set: {
        deleted: true,
        deletedAt: currentTime,
      },
    };
    const result = await ApointmentSchema.updateOne(finduser, update);
    if (result) {
      return { message: "Deleted succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}
async function UndosoftDelete(req) {
  try {
    const finduser = await ApointmentSchema.findOne({
      email: req.body.email,
    }).select("email deleted");

    if (!finduser) {
      return { message: "User not found", error: true };
    }
    const update = {
      set: {
        deleted: false,
        deletedAt: null,
      },
    };
    const result = await ApointmentSchema.updateOne(finduser, update);
    if (result) {
      return { message: "Restored succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function HandleCosmetologistApointments(cosmetologist_id, apointment_id) {
  try {
    const CosmeApoint = await CosmetologistApointmentSchema.create({
      cosmetologist: cosmetologist_id,
      apointment: apointment_id,
    });
    if (CosmeApoint) {
      return CosmeApoint;
    }
  } catch (error) {
    return { message: error.message, error: true };
  }
}

module.exports = {
  create,
  retrive,
  retriveOne,
  update,
  softDelete,
  UndosoftDelete,
  HandleCosmetologistApointments,
};
