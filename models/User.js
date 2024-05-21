//För att häntera användarinfromation så inloggning är möjlig
const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt"); 

const userShcema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    created: {
        type: Date, 
        default: Date.now
    }
}); 

//Hascha lösenord
userShcema.pre("save", async function(next){
    try{
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10); 
            this.password = hashedPassword; 
        }

        next();

    } catch(error) {
        next(error); 
    }
}); 

//registrerar användare 
userShcema.statics.register = async function(username, password){
    try {
        const user = new this({username, password});
        await user.save();  
        return user; 
    } catch(error) {
        throw error; 
    }
}; 

//jämför lösenord 
userShcema.methods.comparePassword = async function(password) {
    try {
       return await bcrypt.compare(password, this.password); 

    } catch(error) {
        throw error
    }
}

//logga in användare
userShcema.methods.login = async function(username, password) {
    try {
        //kontrollera användarnamn
        const user = await this.findOne({username}); 

        if(!user){
            throw new Error("Fel användarnamn eller lösenord"); 
        }

        //kontrollera lösenord 
        const isPasswordMatch = await user.comparePassword(password);  

        if(!isPasswordMatch){
            throw new Error("Fel användarname eller lösenord"); 
        }

        //om allt stämmer:
        return user; 

    } catch(error) {
        throw error 
    }
}

const User = mongoose.model("User", userShcema); 
module.exports = User; 