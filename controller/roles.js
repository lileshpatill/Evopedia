const Role = require("../models/roles.js");

const roles_get = (req, res) => {
  res.render("auth/roles.ejs", { name: "form" });
};

const roles_post = async (req, res, next) => {
  try {
    const role = req.body.role;
    const description = req.body.description;
    console.log(description, role);

    const roleSave = new Role({
      role_name: role,
      description: description,
    });
    const Role_Save = roleSave.save();
    console.log(Role_Save);
    res.status(201).redirect("/");
  } catch (error) {
    // res.status(400).send({ error: `Invalid  ${error}` });
    res.render("auth/roles.ejs", { error: "Invalid role!" });
  }
};

module.exports = { roles_get, roles_post };
