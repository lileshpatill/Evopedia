const express = require("express");
const router = require.Router()
router.get('/' , (req,res) => {

})
router.post("/LogIn", (req,res) => {
    console.log(req.body);
    res.json({message:req.body});
  });
  module.exports= router;
  
  app.listen(3000);
  