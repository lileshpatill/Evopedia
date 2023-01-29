const { response, Router } = require("express");
const express = require("express");
const router = express.Router()
const path = require("path");
const app = express();
app.use('/public',express.static('public'));
app.set("engine", "ejs");
app.get("/", function(req,res){
  res.render("frontend.ejs",{"name":"Lilesh"});
});
  app.get("/LogIn", function(req,res){
    res.render("login form.ejs",{"name":"form"});
});
app.get("/aboutus", function(req,res){
  res.render("aboutus.ejs",{"name":"aboutus"});
});

router.post("/LogIn", (req,res) => {
  console.log(req.body);
  res.json({message:req.body});
});
module.exports= router;

app.listen(3000);
