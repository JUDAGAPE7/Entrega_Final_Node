const User = require("../models/User")


const user ={
    firstName: "Maria",
    lastName: "Gonzales",
    email: "maria@hotmail.com",
    password: "maria1234",
    phone: "+573203204040",
}


const BASE_URL = '/api/v1/users'


test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName', async () => { 
    
    const user = await User.findAll()
    console.log(user);
    

 })