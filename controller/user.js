const user = require("../models/user.js");

const getUser = (req, res) => {
  console.log("Calling get now");
  console.log(user);
  user.find().then((Users) => {
    res.json({ Users });
  });
};
const getUserById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  user
    .findById(id)
    .then((Users) => {
      res.status(200).json({ Users });
    })
    .catch((err) => {
      res.status(400).json({ error: err.mesage });
    });
};
const createUser = (req, res) => {
  console.log("In for creation");
  const data = req.body;
  console.log(data);
  user
    .create(data)
    .then((User) => {
      res.status(201).json({ User });
    })
    .catch((err) => {
      res.status(400).json({ error: err.mesage });
    });
};
const updateUser = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  user
    .findOneAndUpdate({ _id: id }, { $set: data }, { new: true })
    .then((updated) => {
      res.json({ user: updated });
    });
};

const deleteUser = (req, res) => {
  res.json([1, 2, 3, 4, 5, 655]);
};

module.exports = { getUser, getUserById, createUser, updateUser, deleteUser };
