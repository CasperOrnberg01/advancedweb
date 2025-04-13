# Project phase 2 - Basic structure and main functionalities

Project's subject is Warehouse management system with basic structure that covers both backend and frontend main features. Server- and client side are implemented separately and database is from Azure PostgreSQL.
On this phase I focused on every aspect, including making improvements on frontend, developing backend and creating Database with Azure PostgreSQL server.

## 1. Environment

Project's backend is implemented with Node.js + Express, and a React based frontend. To enhance the development process, I also used npm for dependency management and nodemon to automatically restart server, after making changes to code. Idea was also to run this whole application from azure. I created azure static web app for frontend, and Azure web app for backend. I encountered some issues with connecting the database to the backend on azure. This is why I have to forget hosting the application on azure for now, but If i have time I might relook into it on Project's phase 3. However, the application worked well locally and the integrating frontend + backend. Backend communication with the Azure PostgreSQL also worked locally.

## 2. Backend

Backend is built using Node.js + Express, handling RESTful API for products and orders.
Code is separated into different modules for routes (items) & (orders), different controllers (itemsController) & (ordersController).
Also database configuration (db.js) is put in a separate folder.

API operations include:

Items:

-Fetching

-Adding

-Updating

-Deleting


Orders:

-Receive orders (which directly updates inventory quantities, by increasing the qty of items in the database)

-Ship orders (which directly updates inventory quantities, by decreasing the qty of items in the database)

## 3. Frontend

Frontend is implemented with react and divided into components: App, Nav, Login, Items, Orders.
Login component allows users to select their role, manager or worker. (Set on manager role as default)
Interface for roles differs, and it determines their available functionalities:
-Manager can add or delete products from the database, and also create new orders ship/receive, which adjusts the qty of items in the database.
-Warehouse worker can update the quantity of the items in the database, and also create new orders.

Axios is used to make asynchronous requests to the backend.
## 4. Database

Project uses Azure PostgreSQL db that has three tables:

-items: contains details such as name, quantity and description.

-orders: Stores order details: order type, creation time.

-order_items: join table that links orders to their products by product ID and quantities.



Table structure allows dynamic updates of stock quantities of the items when orders are placed:

-Shipping: Quantity of products from the stock (items) decrease by the amount of specific products shipped.

-Receiving: Quantity of products from the stock (items) increase by the amount of specific products received.

## 5. Basic structure and architecture

Architecture is modular with clear separation into backend, frontend and database layer.
On backend routes, controllers and the database connection are split into separate folders which improves maintainability and keeps the structure as clear as possible.
On frontend, Usaed React-type of approach: components, where different views (login, items, orders) are separate. This makes developing and extending the UI easier.
![backend](backend.png)  ![frontend](frontend.png)


## 6. Functionalities

Add something

## 7. Code quality and documentation

Add something

## 8. Testing and error handling

Add something

## 9. User interface and interaction

Add something
