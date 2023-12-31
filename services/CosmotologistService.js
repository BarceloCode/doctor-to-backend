const CosmotologistSch = require("../models/CosmetologistModel");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
const jwt = require("jsonwebtoken");

async function login(req) {
  try {
    const user = await CosmotologistSch.findOne({
      email: req.body.email,
    }).select("email password deleted isOnline");
    if (!user || user.deleted) {
      return {
        error: true,
        msg: "User/email or password not valid, try again",
      };
    }

    const isPasswordValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        error: true,
        msg: "User/email or password not valid, try again",
      };
    }

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.EXPIRE_SECRET,
    });

    //function to put online the cosmotologist
    handleOnline(user);

    return {
      error: false,
      msg: "Welcome",
      user: user.username,
      id: user._id,
      token,
      expiresIn: process.env.EXPIRE_SECRET,
    };
  } catch (err) {
    return { error: true, msg: err.message };
  }
}

async function create(req) {
  try {
    const email = await CosmotologistSch.findOne({ email: req.body.email });
    if (email) {
      return { message: "Email already exists" };
    }

    if (req.body.password !== req.body.passwordconfirmation) {
      return { error: "The password do not match" };
    }
    const hash = await bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.SALT_KEY)
    );
    const NewCosmotologist = CosmotologistSch.create({
      name: req.body.name,
      full_lastname: req.body.full_lastname,
      email: req.body.email,
      password: hash,
      passwordconfirmation: req.body.passwordconfirmation,
      phone: req.body.phone,
      birthday: req.body.birthday,
      gender: req.body.gender,
      businessUnit: req.body.businessUnit,
      worktime: {
        start: req.body.worktime.start,
        end: req.body.worktime.end,
      },
      workdays: {
        monday: req.body.workdays.monday,
        tuesday: req.body.workdays.tuesday,
        wednesday: req.body.workdays.wednesday,
        thursday: req.body.workdays.thursday,
        friday: req.body.workdays.friday,
        saturday: req.body.workdays.saturday,
        sunday: req.body.workdays.sunday,
      },
    });
    if (NewCosmotologist) {
      return { message: "Created succesfully", error: false };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Can't create new Cosmotologist",
      error: true,
      error: error.message,
    };
  }
}

async function retrive(req) {
  try {
    const options = {
      page: req.body.page,
      limit: 1,
      collation: {
        locale: "en",
      },
      select: {
        password: 0,
        permissions: 0,
        __v: 0,
        deleted: 0,
        deletedAt: 0,
      },
      populate: {
        path: "businessUnit",
        populate: {
          path: "clinic",
          populate: {
            path: "consultingRoom",
          },
        },
        populate: {
          path: "treatment",
        },
      },
    };
    const user = await CosmotologistSch.paginate({}, options);
    if (!user || user.deleted) {
      return {
        message: "User not found",
        error: true,
        error: error.message,
      };
    }
    return {
      message: "User found",
      error: false,
      user: user,
      worktime: user.formatDate,
    };
  } catch (error) {
    return { message: error.message, error: "User not found" };
  }
}

async function update(req) {
  try {
    const finduser = await CosmotologistSch.findOne({
      email: req.params.email,
    }).select("email deleted");
    const { name, full_lastname, phone, birthday, gender, businessUnit } =
      req.body;
    if (!finduser || finduser.deleted) {
      return { message: "User not found", error: true };
    }
    const update = {
      $set: {
        name: name,
        full_lastname: full_lastname,
        phone: phone,
        businessUnit: businessUnit,
        birthday: birthday,
        gender: gender,
      },
    };
    const result = await CosmotologistSch.updateOne(finduser, update);
    if (result) {
      return { message: "Updated succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function updateWorktimeAndDays(req) {
  try {
    const finduser = await CosmotologistSch.findOne({
      email: req.params.email,
    }).select("email deleted");
    const data = req.body;

    if (!finduser || finduser.deleted) {
      return { message: "User not found", error: true };
    }
    const start = moment(req.body.start);
    const end = moment(req.body.end);

    // Calcular la diferencia en horas
    const hoursDifference = end.diff(start, "hours");

    // Redondear hacia abajo para obtener la cantidad de espacios
    const availableSpaces = Math.floor(hoursDifference);
    const update = {
      $set: {
        worktime: {
          start: data.start,
          end: data.end,
        },
        workdays: {
          monday: data.monday,
          tuesday: data.tuesday,
          wednesday: data.wednesday,
          thursday: data.thursday,
          friday: data.friday,
          saturday: data.saturday,
          sunday: data.sunday,
        },
        availableSpaces: availableSpaces,
      },
    };
    const result = await CosmotologistSch.updateOne(finduser, update);
    if (result) {
      return { message: "Updated succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function softDelete(req) {
  try {
    const finduser = await CosmotologistSch.findOne({
      email: req.body.email,
    }).select("email deleted");

    if (!finduser || finduser.deleted || req.body.email == finduser.email) {
      return { message: "User not found", error: true };
    }
    const update = {
      $set: {
        deleted: true,
        deletedAt: currentTime,
      },
    };
    const result = await CosmotologistSch.updateOne(finduser, update);
    if (result) {
      return { message: "Deleted succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}
async function UndosoftDelete(req) {
  try {
    const finduser = await CosmotologistSch.findOne({
      email: req.body.email,
    }).select("email deleted");

    if (!finduser) {
      return { message: "User not found", error: true };
    }
    const update = {
      $set: {
        deleted: false,
        deletedAt: null,
      },
    };
    const result = await CosmotologistSch.updateOne(finduser, update);
    if (result) {
      return { message: "Restored succesfully", error: false };
    }
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function handleOnline(user) {
  try {
    const update = {
      $set: {
        isOnline: true,
      },
    };

    await CosmotologistSch.updateOne(user, update);
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function handleOffline(req) {
  try {
    const update = {
      $set: {
        isOnline: false,
      },
    };
    const user = await CosmotologistSch.findOne({ email: req.body.email });
    await CosmotologistSch.findOneAndUpdate(user, update);
    return { message: "Offline" };
  } catch (error) {
    return { message: "Error", error: error.message };
  }
}

async function handlePermissions(req, res) {
  try {
    const meID = req.header("meID");
    const user = await CosmotologistSch.findOne({
      _id: meID,
    }).select("permissions deleted");
    if (!user || user.deleted) {
      return user;
    }
    return user;
  } catch (error) {
    return res.status(404).send({ message: "User not found" });
  }
}

module.exports = {
  login,
  create,
  retrive,
  update,
  updateWorktimeAndDays,
  softDelete,
  UndosoftDelete,
  handleOnline,
  handleOffline,
  handlePermissions,
};
