
const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/users'
let TOKEN
let TOKEN2

beforeAll(async () => {
    
    const user ={
    email: "pedro@hotmail.com",
    password: "pedro1234",
    } 
    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    TOKEN = res.body.token
    
    //console.log(TOKEN);
    
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

 test('GET -> BASE_URL. should return statusCode 200 and res.body.lenght === 2', async() => { 

    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
  })


  test('POST ->"BASE_URL/LOGIN", should return status code 200 and res,body.user.email === user.email', async () => { 

    const user = {
        email: "maria@hotmail.com",
        password: "maria1234"
    } 


    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()

console.log(res.body.user);

    expect(res.body.user.email).toBe(user.email)

   })




//    test('PUT -> "', () => {    const user = {
//     email: user.email,
//     password: user.password
// }

// const res = request(app)
// .post(`${BASE_URL}/login`)
// .send(user) 

//  })