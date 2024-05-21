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

//importera routes 
const authentication = require('./routes/authentication'); 
app.use("/api/auth", authentication); 

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
app.get("/api/menu", async (req, res) => {
    try{
        let result = await MenuItem.find({})

        return res.json(result); 

    } catch(error) {
        return res.status(500).json(error); 
    }
}); 

//lägg till nya menyalternativ
app.post("/api/menu", async (req, res)=> {
    try {
        let result = await MenuItem.create(req.body); 

        return res.json("Ny rätt tillagd" + result)

    } catch(error){

        return res.json(error); 
    }
}); 

//uppdatera menyalternativ genom _id
app.put("/api/menu", async (req, res)=> {
    try{
        let id = req.body._id;

        let result = await MenuItem.updateOne({_id: id}, {$set: req.body}); 

        return res.json(result); 

    } catch(error){
        return res.status(500).json(error); 
    }
})

//ta bort menyalternativ genom _id
app.delete("/api/menu", async (req, res) => {
    try{
        let id = req.body._id; 

        let result = await MenuItem.deleteOne({_id: id}); //tar bort med ID

        return res.json(result); 

    } catch(error) {

        return res.status(500).json(error); 
    }
}); 

//Startar servern på angiven port
app.listen(port, ()=>{
    console.log(`Servern är startad på port ${port}`)
}); 