require('../models')
const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')

let TOKEN
let category
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'

let product
let productId

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


     category = await Category.create({name: 'Pantalones para dama'})
   
    

     product = {
        title: 'Jeans',
        description: 'lorem 10',
        price:12.20,
        categoryId: category.id
    }


})

afterAll((async () => {
    await category.destroy()
  })
)



test('POST -> BASE_URL, should return statusCode 201, and res.body.title === product.title', async () => { 


    const descripts = [ 'title', 'description', product.price, 'categoryId' ]

    const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id
    
    
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    descripts.forEach( element =>  expect(res.body[element]).toBe(product[element]));

 })

 
test("GET -> 'BASE_URL', should return status code 200, and res.body.length = 1", async () => {
    const res = await request(app)
      .get(BASE_URL)
  
   
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
   //console.log('esta es la respuesta',res.body[0].category.id);
   
    expect(res.body[0].category.id).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)
  
  })
  
  test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.title === product.title", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/${productId}`)
  
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
  
    
    expect(res.body.category.id).toBeDefined()
    expect(res.body.category.id).toBe(category.id)
  })
  
  test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.title === updateProduct.title", async () => {
  
    const updateProduct = {
      title: 'camisas'
    }
    const res = await request(app)
      .put(`${BASE_URL}/${productId}`)
      .send(updateProduct)
      .set('Authorization', `Bearer ${TOKEN}`)
  
   
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(updateProduct.title)
  
   
    expect(res.body.categoryId).toBeDefined()
    expect(res.body.categoryId).toBe(category.id)
  })
  
  test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${productId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(204)
  })