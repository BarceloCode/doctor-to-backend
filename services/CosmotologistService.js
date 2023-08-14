const CosmotologistSch = require("../models/CosmotologistModel");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });

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
      location: req.body.location,
      birthday: req.body.birthday,
      gender: req.body.gender,
      role: req.body.role,
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

module.exports = {
  create,
};
