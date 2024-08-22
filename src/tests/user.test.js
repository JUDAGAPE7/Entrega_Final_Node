
const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/users'
let TOKEN


beforeAll(async () => {
    
    const user ={
    email: "pedro@hotmail.com",
    password: "pedro1234",
    } 
    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    TOKEN = res.body.token

    console.log(TOKEN);
    
})


const user ={
    firstName: "Maria",
    lastName: "Gonzales",
    email: "maria@hotmail.com",
    password: "maria1234",
    phone: "+573203204040",
}




test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName', async () => {  

    const userDetails= [ 'firstName', 'lastName', 'email',  'phone' ]
    
    const res = await request(app)
    .post(BASE_URL)
    .send(user)
    

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    userDetails.forEach( userDetail => {
    return    expect(res.body[userDetail]).toBe(user[userDetail])
    });

 })