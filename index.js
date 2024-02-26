const express = require('express')
const app = express()
const sequelize = require('./config/database')
require('dotenv').config();

app.use(express.json());
app.use('/user'  , require('./routes/user.js'));
app.use('/product', require( './routes/product.js'))
app.use('/category', require('./routes/category.js'))
app.use('/cart', require('./routes/cart.js'))
app.use('/order', require('./routes/order.js'))

const port = process.env.PORT || 8080;
app.listen(port, async ()=>{
    try {
        await sequelize.authenticate() 
        console.log('PostgreSQL DB connected successfully!')
    } catch (error) {
        console.error('Unable to connect to the database: ', error)
    }
    console.log(`Server is running on http://localhost:${port}`)
});