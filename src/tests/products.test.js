require('../models')
const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')

let product


const BASE_URL_LOGIN = '/api/v1/users/login/'

const BASE_URL = '/api/v1/products'

beforeAll(async() => {

    const user = {

        email: "pedro@hotmail.com",
        password: "pedro1234"

    }

    const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(user)

    // console.log('Login Response Status:', res.statusCode)
    // console.log('Login Response Body:', res.body)

    TOKEN = res.body.token

    if (!TOKEN) {
        throw new Error('Token was not received from login')
    }

    const category = await Category.create({name: 'Pantalones para dama'})
    console.log(category.id);
    

     product = {
        title: 'Jeans',
        description: 'lorem 10',
        price:12.20,
        categoryId: category.id
    }


})

afterAll(async () => {
    await category.destroy()
})



test('POST -> BASE_URL, should return statusCode 201, and res.body.title === product.title', async () => { 


    const descripts = [ 'title', 'description', product.price, 'categoryId' ]

    const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

    console.log(res.body);
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    descripts.forEach( element =>  expect(res.body[element]).toBe(product[element]));

 })