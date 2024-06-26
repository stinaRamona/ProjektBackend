const express = require("express"); 
const bodyParser = require("body-parser"); 
const cors = require("cors");
const mongoose = require("mongoose"); 
const jwt = require("jsonwebtoken");  

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
app.post("/api/menu", authenticateToken, async (req, res)=> {
    try {
        let result = await MenuItem.create(req.body); 

        return res.json("Ny rätt tillagd" + result)

    } catch(error){

        return res.json(error); 
    }
}); 

//uppdatera menyalternativ genom _id
app.put("/api/menu:_id", authenticateToken, async (req, res)=> {
    try{
        let id = req.params._id;

        let result = await MenuItem.updateOne({_id: id}, {$set: req.body}); 

        return res.json(result); 

    } catch(error){
        return res.status(500).json(error); 
    }
})

//ta bort menyalternativ genom _id
app.delete("/api/menu:_id", authenticateToken, async (req, res) => {
    try{
        let id = req.params._id; 

        let result = await MenuItem.deleteOne({_id: id}); //tar bort med ID

        return res.json(result); 

    } catch(error) {

        return res.status(500).json(error); 
    }
}); 

//middleware för att kontrollera JWT 
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if(token == null){
        res.status(401).json({message: "Du har inte tillgång till denna sida. Token saknas."}); 
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err){
            return res.status(403).json({message: "Ogiltigt token!"}); 
        }

        console.log("Token verified. Username:", username);
        req.username = username; //kan behöva lägga till .username för att det ska fungera
        next();
    })

}

//Startar servern på angiven port
app.listen(port, ()=>{
    console.log(`Servern är startad på port ${port}`)
}); 