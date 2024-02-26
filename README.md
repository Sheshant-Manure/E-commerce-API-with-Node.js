# E-commerce-API-with-Node.js

## Test email and password

    email: john.doe@gmail.com
    password: Johndoe@1997

This project is an E-commerce API built with Node.js, Express, Sequelize, and JWT for user authentication. The API provides endpoints for managing categories, products, user authentication, cart management, and order placement.

## Setup

Clone the repository

    https://github.com/Sheshant-Manure/E-commerce-API-with-Node.js.git

    cd E-commerce-API-with-Node.js

## Install Dependencies

    npm install

## API Endpoints

## User Authentication

    POST /user/register: Create a new user.

    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "password": "password123"
    }


    POST /user/login: Log in and obtain a JWT token.

    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
  
## Category

    GET /categories: Retrieve a list of all categories.

## Product

    GET /products?category_id={categoryId}: Retrieve a list of products based on the category ID.
    GET /products/{productId}: Retrieve detailed information of a specific product by its ID.

## Cart Management

    POST /cart/add: Add a product to the user's cart.

    {
        "productId": 1,
        "quantity": 2
    }

    GET /cart/view: View the user's cart.
    PUT /cart/update: Update quantities of items in the cart.
    DELETE /cart/remove/{productId}: Remove a product from the user's cart.

## Order

    POST /order/place: Place an order with products from the user's cart.

    {
        "products": [
            { "productId": 1, "quantity": 2 },
            { "productId": 2, "quantity": 1 }
        ]
    }

    GET /order/history: Fetch the order history for authenticated users.
    GET /order/details/{orderId}: Retrieve detailed information of a specific order by its ID.
