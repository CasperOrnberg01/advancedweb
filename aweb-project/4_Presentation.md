# Phase 4 – Project Presentation

> [!NOTE]  
> Think of this as presenting your project, which you can include in your job application. The presentation should be clear and concise. Explain the entire project. Don't be afraid to highlight failures, as everyone has experienced them at some point. Consider that the viewer may not have a strong technical background.  
>   
> **You can do this entire presentation in English or Finnish.**

## 🎯 Project title

**Warehouse management system** / **Varastonhallintajärjestelmä**

---

## 📝 Project overview

_Briefly describe the project’s purpose, its target users, and its context._
Idea was to implement warehouse management system for basic inventory handling tasks. Target users are warehouse managers and workers, where managers have functionality to add new users such as new employees, by creating login credentials for them to the system. Managers can also add new items to the system with a description. Both roles managers/workers can ship or receive orders, what immediately updates the quantity of items in the system (database table: items;). Warehouse worker's task along receiving and shipping the products, is correcting the quantity of the items in inventory, by adjusting their amount with the (+)/(-) -buttons, or they can use "change" -button to set a custom quantity to update the correct amount to the database.

### Roles in the warehouse management system "Access control"
- Warehouse **manager** --> Think of as an admin (Admin priviledges)
- Warehouse **worker**  --> Think of as an regular employee (basic priviledges)

<br>

 **Access control table**                                            
| Feature                          | Manager (Admin) | Worker (Regular) |
|----------------------------------|:---------------:|:----------------:|
| **Add new item**                 | Yes             | No               |
| **Delete item**                  | Yes             | No               |
| **Update item quantity**         | No              | Yes              |
| **View all items**               | Yes             | Yes              |
| **Create “Receive” order**       | Yes             | Yes              |
| **Create “Ship” order**          | Yes             | Yes              |
| **View order history**           | Yes             | Yes              |
| **Add users in the system**      | Yes             | No               |
| **Login**                        | Yes             | Yes               |


---

## 📌 Use case summary

[Link to the use cases defined in Phase 1](1_Definition_and_Planning.md)

**Abreviations for the table explained:**
- Phase 1 = (P1): Use cases from phase 1.
- Phase 2 = (P2): Use cases / new functionalities added on phase 2.
- Phase 3 = (P3): Use cases / new functionalities added on phase 3.

  <br>
  
| Use Case | Implemented (Yes/No) | Explanation / Timestamp on video |
|----------|----------------------|------------------------|
| Both roles: Login (P1+P2+P3) | Yes | Role based access: Frontend login form sends credentials to backend API --> login handled in backend where is checked that user's credentials and role matches the bcrypt hash: "password_hash" stored in "users" -table in the database. Timestamp on video: --  |
| Warehouse manager: add new item to the system (P1) | Yes | Backend API route /api/items is used to add new items to system. Implementation and logic for adding new items is in the itemsController.js file. Frontend in Items.jsx includes the creation of the form for manager and when submitting the form, POST request is send to the backend to add new item to the system. Timestamp on video: - |
| Warehouse manager: Delete item from the system (P2)   | Yes | The delete logic is handled in backend, based on item's ID, and item is removed from the items table in database. Timestamp on video: --  |
| Warehouse manager: Register new user to the system (P3)  | Yes | In frontend manager enters new user's details and submitting form sends POST request to backend. In backend POST /api/users/register route registers new user by adding their username, password_hash and role into the database's user table. Timestamp on video: --  |
| Both roles: Receive/ship orders (P1+P2)   | Yes | Both roles can create orders, where "Receiving order" adds the quantity of the items the order includes into the database, and vice versa "Ship order" decreases the amount of items from the system. Frontend send order --> POST request to backend where the process is handled, by updating items table through the order_items table. Timestamp on video: --   |
| Both roles: Cancel order creation (P1+P2)   | Yes | Order creation can be cancelled just by exiting the order -scene, the "cancel" -button in order scene is just more of a "cosmetic" at this point. The logic behind order cancellation is that if the order is interrupted like switching scene, or pressing cancel button, the UI is resetted and order creation data is cleared. Timestamp on video: --  |
| Both roles: View order history | Yes | Frontend makes GET request to /api/orders endpoint and the backend reuturns the list of "existing" or the past orders. Orders.jsx is responsible for displaying the list in frontend for the user. Timestamp on video: -- |
| Both roles: View all items in the system: (P1+P2)  | Yes | When Items component is loaded GET request is made to backend to retrieve and display all items currently in the system. Timestamp on video: --  |
| Warehouse worker: Update quantity of items (P1) | Yes | Warehouse workers can modify the quantity of items with (+)/(-) -buttons, or with the "change" -button to set custom quantity. Timestamp on video: --  |


_Add explanations for each use case, including demo timestamps if using video._

---

## ✍️ Technical implementation

_Describe technologies used, architectural decisions, and how key features were implemented._
### Environment
- Totally hosted in azure:
  -Database: Azure postgreSQL
  -Backend: Azure web app
  -Frontend: Azure static web app
  - npm for dependency management
  - nodemon to automatically restart server after making changes to code
### Frontend
- React used to build the frontend application, using component-based architecture
- Component-based architecture makes it easy to reuse and develope further components
- Axios used to make requests from frontend to backend. (Retrieving and sending data)
### Backend 
- Backend is built using Node.js and Express, for building RESTful APIs.
- Handles HTTP requests and routes them to the controllers in backend.
- Backend uses Azure PostgreSQL as the database, and their connection is made with the pg-promise library.
- Bcrypt for password hashing, for example when manager registers user password is hashed before storing it in the database.
- For the project 4 tables are used in the database:
  -items: contains details such as name, quantity and description.
  -orders: Stores order details: order type, creation time.
  -order_items: join table that links orders to their products by product ID and quantities.
  -users: Stores User ID, username, password_hash and role.

  <br>

  **Picture of the tables in database**
  [tables](tables.jpg)
  
  <br>

**Picture of the users table**
[users](censoredhashes.png)


## 🚂 Development process

_Summarize your progress from start to finish, mentioning key decisions or changes along the way._

---
1. Working with defining the project idea and planning
   -Environment: Azure
   -Backend: Node.js with Express
   -Frontend: React
   -Database: Azure Postgresql
   -Making user personas and coming up with use cases and user flows.
   -Worked on frontend, to make UI prototypes
[1_Definition_and_Planning.md](1_Definition_and_Planning.md)

<br>

2. Main functionalities
   -Warehouse manager: View, add, delete items
   -Warehouse worker: update quantities of existing items
   -Both roles can create new orders ship/receive
   -Testing and error handling
[2_Basic_structure_and_main_functionalities.md](2_Basic_structure_and_main_functionalities.md)

<br>

3. Extra features or improvements (optional)
   - Host application in azure environment (failed on phase 2, only local implementation there)
   - Implemented functionality for manager -role to register new employees into the system
   - Login (with authentication)

## ☀️ Reflection and future work

### Reflection & Issues encountered
-Project took plenty of time, and had some setbacks and problems, which made me feel miserable and frustrated.
-Succeeding on hard parts gave more motivation and energy to push through:
  -Problems connecting azure postgresql to azure web app (backend), issue with connection string = Solved this by following outputs from azure web app (backend) log stream.
  -Issue encountered with bcrypt and azure compatibility, fixed with updating json packages in github.

### Future work ideas
- Working on UI, to make it more user-friendly and aesthetic.
- Possibly integrating JWT to enhance security and scalability.

---

## 📊 Work Hours Log

_You can copy from the logbook here._

| Date       | Time | Task                                |
|------------|------|-------------------------------------|
| 2.4.2025   | 3h   | Defined use cases                   |
| 4.4.2025   | 2h   | Built login form                    |
| ...        | ...  | ...                                 |
| **Total**  | **63h** |                                 |

---

## 🪢 Presentation link

_Add a link to your video presentation or state that it was presented live._
