const { DataTypes, Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.HOST,
    dialect: "postgres"
})

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "user" }
})

const Product = sequelize.define("product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    price: { type: DataTypes.FLOAT, defaultValue: 0 },
    description: { type: DataTypes.TEXT, defaultValue: " " },
    image: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
})

const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Rating = sequelize.define("rating", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT },
    rating: { type: DataTypes.TEXT, defaultValue: 5 }
})

const Type = sequelize.define("type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

const Category = sequelize.define("category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

const BasketProduct = sequelize.define("basket product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const RatingProduct = sequelize.define("rating product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.hasOne(User)

Basket.belongsToMany(Product, { through: BasketProduct })
Product.belongsToMany(Basket, { through: BasketProduct })

Rating.belongsToMany(Product, { through: RatingProduct })
Product.belongsToMany(Rating, { through: RatingProduct })

Category.hasMany(Product)
Product.belongsTo(Category)

Type.hasMany(Product)
Product.belongsTo(Type)

module.exports = {
    Type,
    User,
    Category,
    Product,
    Basket,
    Rating
}