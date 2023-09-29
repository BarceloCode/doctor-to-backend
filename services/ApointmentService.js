const ApointmentSchema = require("../models/ApointmentModel");
const CosmetologistApointmentSchema = require("../models/CosmetologistApointments");
const moment = require("moment-timezone");
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
const response = require("../helpers/responses");
moment.tz.setDefault(process.env.TZ);
require("dotenv").config({ path: "../.env" });

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
          select: {
            cosmetologist: 0,
            deleted: 0,
            deletedAt: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
          populate: {
            path: "treatment",
            select: { __v: 0 },
            populate: { path: "product" },
            select: {
              deleted: 0,
              deletedAt: 0,
              createdAt: 0,
              updatedAt: 0,
              __v: 0,
            },
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

    if (!Apointment || Apointment.length === 0) {
      return response.sendNotFound(res);
    }
    console.log(Apointment);
    const filteredApointments = Apointment.docs.map((apointment) => {
      const { deleted, deletedAt, createdAt, updatedAt, __v, ...filteredData } =
        apointment.toObject();
      return filteredData;
    });
    const {
      page,
      totalDocs,
      limit,
      totalPages,
      paginingCounter,
      prevPage,
      nextPage,
    } = Apointment;
    return response.sendCoustom(
      res,
      {
        data: filteredApointments[0],
        page: page,
        totalDocs: totalDocs,
        limit: limit,
        totalPages: totalPages,
        paginingCounter: paginingCounter,
        prevPage: prevPage,
        nextPage: nextPage,
      },
      true,
      "Success",
      200
    );
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
    return response.sendError(res, error);
  }
}

async function create(req, res) {
  try {
    const Apointment = await ApointmentSchema.create(req.body);
    const CosmeApoint = await HandleCosmetologistApointments(
      Apointment.cosmetologist,
      Apointment._id,
      res
    );

    if (Apointment && CosmeApoint) {
      return response.sendCreated(res, CosmeApoint);
    }
  } catch (error) {
    throw new Error("Error, please check your request");
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

async function HandleCosmetologistApointments(
  cosmetologist_id,
  apointment_id,
  res
) {
  try {
    const CosmeApoint = await CosmetologistApointmentSchema.create({
      cosmetologist: cosmetologist_id,
      apointment: apointment_id,
    });
    const { cosmetologist, _id, apointment } = CosmeApoint;
    if (CosmeApoint) {
      return response.sendCreated(res, {
        id: _id,
        cosmetologist: cosmetologist,
        apointment: apointment,
      });
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
