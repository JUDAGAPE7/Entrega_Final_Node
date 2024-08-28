require('../models')
const request = require("supertest")
const app = require('../app')
const Category = require('../models/Category')
const Product = require('../models/Product')

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/cart'


let TOKEN
let userId
let category

let product
let cart
let cartId


beforeAll(async () => {
    const hits = {
        email: "pedro@hotmail.com",
        password: "pedro1234"
    }

    const res = await request(app)
      .post(BASE_URL_LOGIN)
      .send(hits)
    
    TOKEN = res.body.token

    userId = res.body.user.id
    

    category = await Category.create({name:'household appliance'})

    product = await Product.create({
        title: "Fridge",
        description: "45 lt",
        price: 7.985,
        categoryId: category.id
    })
    
    cart = {
        userId: userId,
        productId: product.id,
        quantity: 10
    }
})

afterAll(async () => {
    await Category.destroy({where: {id: category.id}})
    await Product.destroy({where: {id: product.id}})
})

test("POST --> BASE_URL, should return statusCode 201, and res.body.productId === product.id", async() => {
    const res = await request(app)
        .post(BASE_URL)
        .send(cart)
        .set('Authorization', `Bearer ${TOKEN}`)
        // console.log(res.body)
        cartId = res.body.id;
        expect(res.statusCode).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.quantity).toBe(cart.quantity)
        expect(res.body.productId).toBe(product.id)
        expect(res.body.userId).toBe(userId)
})

test('GET -> BASE_URL. should return statusCode 200 and res.body.lenght === 1', async() => { 

    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    //console.log(res.body);
    expect(res.body[0].product.id).toBe(product.id)
    expect(res.body[0].product.categoryId).toBe(product.categoryId)
  })

  test('GET -> BASE_URL/:id. should return statusCode 200 and res.body.lenght === 1', async() => { 

    const res = await request(app)
    .get(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
   

    //console.log(res.body);
    expect(res.body.product.id).toBe(product.id)
    expect(res.body.product.categoryId).toBe(product.categoryId)
  })

  test('PUT -> BASE_URL/:id. should return statusCode 200 and res.body.quantity === cart.quantit', async() => {  

    updatedCart = {
        quantity: 2
    }

    const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(updatedCart)
    .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(updatedCart.quantity)
  })