const express = require('express');
const path = require("path")

const port = process.env.PORT || 3000;
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get("/", (reg,res ) => {
  const arr = [{ id: 1, usename: 'dog',message: 'wuff'}, { id: 2 ,usename: 'dog',message: 'wow'}, { id: 3,usename: 'lary',message: 'The Bird'}];
  res.render("pages/index",
    {data: [arr]});
})

app.get("/add-entry", (reg,res ) => {
  res.render("pages/add-entry");
  }
)

app.listen(port,() =>{
  console.log("ḑer server läuft auf port: ${port}");
})
// Do it!
