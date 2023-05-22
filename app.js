

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//MongoDB with the help of mongoose
  mongoose.connect('mongodb+srv://new-user:08cgt7hNen0eX2Rz@todo.388n0tg.mongodb.net/todo?retryWrites=true&w=majority');
  
  const itemsSchema = new mongoose.Schema({
    name: String
  });

  const Item = mongoose.model('Item', itemsSchema);
  const listSchema = new mongoose.Schema({
    name: String,
    items:[itemsSchema]
  });
    const List = mongoose.model('List', listSchema);
 

   
  app.get("/", function(req, res) {
   
    const day = date.getDate();
    Item.find({}).then(function (items) {
      res.render("list", {listTitle: day, newListItems: items});
      });

  });
  


  

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  Item.insertMany({name:itemName});
  res.redirect("/");
});


/////DELETE an Item 
app.post("/delete",function(req,res){
  console.log(req.body.checkbox);
 
  const id=req.body.checkbox;
        Item.deleteOne({ _id:id}).then(function(){
          console.log("Data deleted"); // Success
            res.redirect("/");
      }).catch(function(error){
          console.log(error); // Failure
      });  
    
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
