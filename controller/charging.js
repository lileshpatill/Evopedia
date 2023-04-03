const charge = async (req, res, next) => {
  console.log("Charging on....!");
  console.log(req.url);
  res.render("charging-station/charging");
};

module.exports = { charge };
