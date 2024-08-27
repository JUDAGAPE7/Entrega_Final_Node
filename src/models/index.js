const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");


    // Product --> categoryId
    Product.belongsTo(Category)
    Category.hasMany(Product)


   // Cart -> USerId
    Cart.belongsTo(User)
    User.hasMany(Cart)


     //Cart -> ProductId

     Cart.belongsTo(Product)
     Product.hasMany(Cart)