require('../models')
const request = require("supertest")
const app = require('../app')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL_CART = '/api/v1/cart'
const BASE_URL = '/api/v1/purchase'

let TOKEN
let userId
let category
let product
let cart
let purchaseId



beforeAll(async () => {
    
        const user = {
            email: "pedro@hotmail.com",
            password: "pedro1234"
        }
    
        const res = await request(app)
          .post(BASE_URL_LOGIN)
          .send(user)
        
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

    const cartRes = await request(app)
      .post(BASE_URL_CART)
      .send(cart)
      .set('Authorization', `Bearer ${TOKEN}`)
    
})

afterAll(async () => {
    await Category.destroy({where: {id: category.id}})
    await Product.destroy({where: {id: product.id}})
    
})



test("POST -> 'BASE_URL', should return statusCode 201 and res.body.quantity === cart.quantity", async () => {
    const res = await request(app)
      .post(BASE_URL)
      .set('Authorization', `Bearer ${TOKEN}`)

   
    
    purchaseId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body[0].quantity).toBe(cart.quantity)
    expect(res.body[0].userId).toBe(userId)
    expect(res.body[0].productId).toBe(product.id)

    
})

test("GET -> 'BASE_URL', should return statusCode 200 and res.body.quantity === cart.quantity", async () => {
    
    const res = await request(app)
      .get(BASE_URL)
      .set('Authorization', `Bearer ${TOKEN}`)

    

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].product.id).toBeDefined()
    expect(res.body[0].product.categoryId).toBeDefined()
    expect(res.body[0].product.categoryId).toBe(category.id)
    expect(res.body[0].product.id).toBe(product.id)
})