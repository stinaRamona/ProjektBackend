//requires
const express = require("express"); 
const router = express.Router(); 
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcrypt"); 
const mongoose = require("mongoose"); 

require("dotenv").config(); 

//Anslut till databas
mongoose.set("strictQuery", false); 
mongoose.connect(process.env.DATABASE); 

const User = require("./User"); 

//Route för login för att komma åt routen för att uppdatera, lägga till och ta bort menyalternativ
router.post("/login", async (req, res)=> {
    try {
        const {username, password} = req.body; 

        if(!username || !password) {
            res.status(401).json({message: "Både användarnamn och lösenord måste anges"}); 
        }

    } catch {

    }
}); 

//exportera
module.exports = router; 