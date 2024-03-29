# E-commerce-API-with-Node.js

## Live

    https://e-commerce-api-with-node-js-2pci.onrender.com/

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

## Product

    GET /product/list-all-products-by-category/:categoryId : Retrieve a list of products based on the category ID.
    GET /product/product-details/:productId : Retrieve detailed information of a specific product by its ID.
    POST /product/add-product : Add a new product to the database.

    {
        'title': 'product name',
        'price': 99.99, 
        'description': 'About the product',
        'availability' Boolean, // Set to true by default or when unspecified
        'categoryId': Integer
    }
  
## Category

    GET /category/list-all-categories: Retrieve a list of all categories.
    POST /category/add-category: Add a category to the database.  
    
    {
        "name":"Category Name"  // required
        "description": "About the product and its type" optional
    }

## Cart Management

    POST /cart/add-item: Add a product to the user's cart.

    {
        "productId": 1,
        "quantity": 2
    }

    GET /cart/view-cart/:userId: View the user's cart with their user ID.
    PUT /cart/update-cart-item/:cartItemId: Update quantities of items in the cart with their cart item ID.
    DELETE /cart/remove-cart-item/:cartItemId: Remove a product from the user's cart with their cart item ID.

## Order

    POST /order/place-order: Place an order with products from the user's cart.

    {
        "products": [
            { "productId": 1, "quantity": 2 },
            { "productId": 2, "quantity": 1 }
        ]
    }

    GET /order/order-history: Fetch the order history for authenticated users.
    GET /order/order-details/:orderId : Retrieve detailed information of a specific order by its ID.
