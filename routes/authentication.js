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

const User = require('../models/User'); 

//registrering av ny användare 
router.post("/register", async (req, res) => {
    try {
        const {username, password} = req.body; 

        if(!username || !password) {
            res.status(401).json({message: "Både användarnamn och lösenord måste anges"}); 
        }

        //sparar användare 
        const user = new User({username, password}); 
        await user.save(); 
        res.status(201).json({message: "Användare skapad"}); 

    } catch(error) {
        res.status(500).json({Error: "Server error"}); 
    }
})

//Route för login för att komma åt routen för att manipulera menyn
router.post("/login", async (req, res)=> {
    try {
        const {username, password} = req.body; 

        if(!username || !password) {
            res.status(401).json({message: "Både användarnamn och lösenord måste anges"}); 
        } 

        const user = await User.findOne({ username }); 
        if(!user){
            return res.status(401).json({Error: "Fel användarnamn eller lösenord"}); 
        }

        const isPasswordMatch = await user.comparePassword(password); 
        if(!isPasswordMatch){
            return res.status(401).json({Error: "Fel användarnamn eller lösenord"});
        } else {
            res.json({message: "Du loggas in"}); 
        }

    } catch(error) {
        res.status(500).json({Error: "Server error"});
    }
}); 

//exportera
module.exports = router; 