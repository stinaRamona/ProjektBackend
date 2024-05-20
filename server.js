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

//skapa scehma för meny
const menuSchema = new mongoose.Schema({
    dishName: {
        type: String, 
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    allergens: {
        type: String, 
        required: false
    }
}); 

//skapar en model baserat på meny schemat
const MenuItem = mongoose.model("MenuItem", menuSchema); 

//Routing FULL CURD
app.get("/api", (req,res)=>{
    res.json({message:"Välkommen till degknytets API"})
}); 

//hämta in menylaternativ
app.get("/api/menu", (req, res) => {
    try{
        result= MenuItem.find({}) // Visar alla menyalternativ

        return res.json(result); 

    } catch(error) {
        return res.status(500).json(error); 
    }
}); 

//lägg till nya menyalternativ
app.post("/api/menu", (req, res)=> {
    try {
        let result = MenuItem.create(req.body); 

        return res.json("Ny rätt tillagd" + result)

    } catch(error){

        return res.json(error); 
    }
}); 

//uppdatera menyalternativ
app.put("/api/menu", (req, res)=> {
    res.json({message: "Uppdaterar menyn(ska vara skyddad!)"}); 
})

//ta bort menyalternativ
app.delete("/api/menu", (req, res) => {
    res.json({message: "Tar bort sak från menyn(ska vara skyddad!)"});
}); 

//Startar servern på angiven port
app.listen(port, ()=>{
    console.log(`Servern är startad på port ${port}`)
}); 