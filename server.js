const express = require("express"); 
const bodyParser = require("body-parser"); 
const cors = require("cors");
const mongoose = require("mongoose");  

require("dotenv").config(); 
let port = process.env.PORT || 3001;

//Initiering av app
const app = express(); 
app.use(bodyParser.json());
app.use(cors()); 

//Anlut till databas 
mongoose.set("strictQuery", false); 
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB");
}).catch((error) => {
    console.error("Något gick fel med anslutningen"); 
}); 

//Routing FULL CURD
app.get("/api", (req,res)=>{
    res.json({message:"Välkommen till mitt API"})
}); 

app.get("/api/menu", (req, res) => {
    res.json({message: "Menyn som finns sparad skrivs ut"})
}); 

app.post("/api/menu", (req, res)=> {
    res.json({message: "menyn uppdateras(ska vara skyddad!)"}); 
})

app.put("/api/menu", (req, res)=> {
    res.json({message: "Uppdaterar menyn(ska vara skyddad!)"}); 
})

app.delete("/api/menu", (req, res) => {
    res.json({message: "Tar bort sak från menyn(ska vara skyddad!)"});
}); 

//Startar servern på angiven port
app.listen(port, ()=>{
    console.log(`Servern är startad på port ${port}`)
}); 