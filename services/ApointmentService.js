const ApointmentSchema = require("../models/ApointmentModel");
const CosmetologistApointmentSchema = require("../models/CosmetologistApointments");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
const response = require("../helpers/responses");

async function retrive(req, res) {
  try {
    const options = {
      page: req.body.page,
      limit: 5,
      collation: {
        locale: "en",
      },
      populate: [
        {
          path: "apointment",
          select: { cosmetologist: 0 },
          populate: {
            path: "treatment",
            populate: { path: "product" },
          },
        },
        {
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
      ],
    };

    const Apointment = await CosmetologistApointmentSchema.paginate(
      { deleted: false },
      options
    );

    if (!Apointment || Apointment.deleted || Apointment.length === 0) {
      return response.sendNotFound(res);
    }
    return response.sendSuccess(res, Apointment);
  } catch (error) {
    return response.sendError(res, error.message);
  }
}
async function retriveOne(req, res) {
  try {
    const Apointment = await CosmetologistApointmentSchema.findOne({
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
      return response.sendNotFound(res);
    }

    return response.sendSuccess(res, Apointment);
  } catch (error) {
    return response.sendError(res, error.message);
  }
}

async function create(req, res) {
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
      return response.sendCreated(res, CosmeApoint);
    }
  } catch (error) {
    return response.sendError(res, error.message);
  }
}

async function update(req, res) {
  try {
    const findAp = await CosmetologistApointmentSchema.findOne({
      _id: req.body._id,
      deleted: false,
    }).select({ apointment: 1, _id: 0 });

    if (!findAp) {
      return response.sendNotFound(res);
    }
    const findApointment = await ApointmentSchema.findOne({
      _id: findAp.apointment,
      deleted: false,
    }).select({ _id: 1 });
    const { description, cosmetologist, treatment } = req.body;

    if (!findApointment) {
      return response.sendNotFound(res);
    }
    const update = {
      description: description,
      cosmetologist: cosmetologist,
      treatment: treatment,
    };
    const result = await ApointmentSchema.updateOne(findApointment, update);
    const resultB = await CosmetologistApointmentSchema.updateOne(
      findAp,
      update
    );
    if (result && resultB) {
      return response.sendSuccess(res);
    }
  } catch (error) {
    return response.sendError(res, error.message);
  }
}

async function softDelete(req, res) {
  try {
    const findAp = await CosmetologistApointmentSchema.findOne({
      _id: req.body._id,
      deleted: false,
    }).select({ apointment: 1, _id: 0 });

    if (!findAp) {
      return response.sendNotFound(res);
    }
    const findApointment = await ApointmentSchema.findOne({
      _id: findAp.apointment,
      deleted: false,
    }).select({ _id: 1 });

    if (!findApointment) {
      return response.sendNotFound(res);
    }
    const update = {
      deleted: true,
      deletedAt: currentTime,
    };
    const result = await ApointmentSchema.updateOne(findApointment, update);
    const resultB = await CosmetologistApointmentSchema.updateOne(
      findAp,
      update
    );
    if (result && resultB) {
      return response.sendUpdated(res);
    }
  } catch (error) {
    return response.sendError(res, error.message);
  }
}

async function UndosoftDelete(req, res) {
  try {
    const findAp = await CosmetologistApointmentSchema.findOne({
      _id: req.body._id,
      deleted: true,
    }).select({ apointment: 1, _id: 0 });

    if (!findAp) {
      return response.sendNotFound(res);
    }
    const findApointment = await ApointmentSchema.findOne({
      _id: findAp.apointment,
      deleted: true,
    }).select({ _id: 1 });

    if (!findApointment) {
      return response.sendNotFound(res);
    }
    const update = {
      deleted: false,
      deletedAt: null,
    };
    const result = await ApointmentSchema.updateOne(findApointment, update);
    const resultB = await CosmetologistApointmentSchema.updateOne(
      findAp,
      update
    );
    if (result && resultB) {
      return response.sendUpdated(res);
    }
  } catch (error) {
    return response.sendError(res, error.message);
  }
}

async function HandleCosmetologistApointments(cosmetologist_id, apointment_id) {
  try {
    const CosmeApoint = await CosmetologistApointmentSchema.create({
      cosmetologist: cosmetologist_id,
      apointment: apointment_id,
    });
    if (CosmeApoint) {
      return response.sendCreated(res, CosmeApoint);
    }
  } catch (error) {
    return response.sendError(res, error.message);
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
