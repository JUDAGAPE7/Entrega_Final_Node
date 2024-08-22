const User = require("../../models/User")


const userCreate = async () => {
    
const user ={
    firstName: "Pedro",
    lastName: "Pazcal",
    email: "pedro@hotmail.com",
    password: "pedro1234",
    phone: "+573203204040",
}


    await User.create(user)
}



module.exports = userCreate