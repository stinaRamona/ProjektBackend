const express = require("express"); 
const bodyParser = require("body-parser"); 
const cors = require("cors"); 

require("dotenv").config(); 
let port = process.env.PORT || 3001;

//Initiering av app
const app = express(); 
app.use(bodyParser.json());
app.use(cors()); 


//Startar servern på angiven port
app.listen(port, ()=>{
    console.log(`Servern är startad på port ${port}`)
}); 