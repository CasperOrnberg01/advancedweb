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
| Warehouse manager: Delete item from the system (P2)   | Yes | - |
| Warehouse manager: Register new user to the system (P3)  | Yes | - |
| Both roles: Receive/ship orders (P1+P2)   | Yes | - |
| Both roles: Cancel order creation (P1+P2)   | Yes | - |
| Both roles: View all items in the system: (P1+P2)  | Yes | - |
| Warehouse worker: Update quantity of items (P1) | Yes | - |
|   | - | - |

_Add explanations for each use case, including demo timestamps if using video._

---

## ✍️ Technical implementation

_Describe technologies used, architectural decisions, and how key features were implemented._

---

## 🚂 Development process

_Summarize your progress from start to finish, mentioning key decisions or changes along the way._

---

## ☀️ Reflection and future work

_What worked well? What challenges did you face? What would you add or improve in the future?_

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
