# Food Ordering Portal

## Introduction
This codebase contains the implementation for a Food Delivering Portal, where users can register as Buyers or Vendors and interact with each other to order and sell food items. The portal enables Buyers to browse and place orders for specific food items provided by Vendors, while Vendors can list and manage their available food items and process Buyer orders.

## Features
- User registration and login functionality.
- User roles: Buyers and Vendors.
- Buyer features:
  - View all food items available from Vendors.
  - Place orders for specific food items.
  - View and Update in App wallet balance.
  - View Order status.
- Vendor features:
  - List and manage available food items.
  - Add detailed descriptions, prices, and tags for food items.
  - Process incoming orders from Buyers.
  - Update order status and fulfillment/rejection.

## Prerequisites
Before using this codebase, ensure that you have the following prerequisites:

- Node
- MongoDB
- React

## Running the Code

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

