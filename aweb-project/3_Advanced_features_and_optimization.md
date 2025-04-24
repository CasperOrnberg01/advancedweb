# Phase 3 – Extra Feature or Improvements (Optional)

## 🎯 Chosen Use Cases or Features to Improve

### Hosting the application in azure environment
- I chose to work on the issue I encountered on phase 2, where my intention was to host entire application on azure. I had some issues with getting the azure postgresql database connected to the azure web app backend properly. My phase 2 implementation worked locally.

### Register new user (functionality available only when logged in as manager)
I had this idea starting from phase 1, where warehouse manager would be able to register new users to the warehouse management system, once the authentication part for login is implemented.

### Login (previously just setting role, now includes authentication)
This idea I also had starting from phase1, but on phase 2 more specifically I was thinking of the login functionality, and where the credentials (username, hashed password and role) is stored.

## 🔍 Original Definition

### Original vision was to host entire application in azure:
- Backend to azure web app via github workflows
- Frontend to azure static web app via github workflows
- Connected Azure PostgreSQL database to azure backend.
- [Link to phase 1 definition and planning](1_Definition_and_Planning.md)
  
<br>
<br>

### Register new user (functionality available only when logged in as manager)
- This wasn't actually requirement, but I mentioned it on phase 1, as a potential development for the application.
- Please see phase 1, chapter 4: [Link to phase 1 definition and planning](1_Definition_and_Planning.md)
  
### Login (previously just setting role, now includes authentication) 
- This wasn't requirement either, but was also mentioned on phase 1 as a potential development for the application.
- Please see phase 1, chapter 4: [Link to phase 1 definition and planning](1_Definition_and_Planning.md)



## 🔄 Implementation


### Hosting the application in azure environment
- Connection string in azure backend web app was slightly incorrect. Adjusted it in azure at *Environment variables* > *App settings*.
- Added console.log lines in db.js file to find potential issues in backend log stream.
- Changed target url in frontend items.jsx and orders.jsx from local to azure backend. Here had very minor and annoying problem, just forgot Https:// protocol infront off the backend address, and didn't notice it at first. Used dev tools to find out more about the potential issue and there I realized what was wrong.
- Axios calls also use the azure hosted backend from now on. Leaved local implementation in the code, which can be uncommented if wanted to host locally or keep developing in local environment.

<br>

### Register new user (manager) + Login (authentication)
- Had slight issues with the bcrypt compatibility in azure environment, at first, since forgot to update json packages.
- User ID, username, password_hash and role are stored in azure PostgreSQL db on a table called users;, see below:
  ![users_table](censoredhashes.png)

<br>

- Registration flow: *Manager fills out form with (username, password, role)* --> *Frontend sends a POST to /api/users/register* -->  (*usersController.js hashes and stores* --> *to database in users table (id,username,password_hash,role)*
- Login flow: *user submits credentials: (username, password, role)* --> *Frontend sends POST /api/users/login* --> *controller verifies* --> *if password and role match the stored hash, user is authenticated successfully*

<br>

-Code for this implementation at [usersController.js](../aweb-project/backend/controllers/usersController.js):
```
const db     = require('../config/db'); //tietokantayhteys poolin avulla
const bcrypt = require('bcrypt'); //bcrypt hashaamiseen ja varmistamsieen

// uuden käyttäjän rekisteröinti, ja tarkistetaan rooli
exports.registerUser = async (req,res,next) => {
  const { username, password, role } = req.body;
  if (!['manager','worker'].includes(role)) 
    return res.status(400).json({ error: 'Invalid role' });
// hashataan salasana suolauksen avulla
  const hash = await bcrypt.hash(password, 10);
  try {
    // lisätään käyttäjä tietokantaan ja palautetaan id + username + rooli
    const result = await db.query(
      'INSERT INTO users (username,password_hash,role) VALUES ($1,$2,$3) RETURNING id,username,role',
      [username, hash, role]
    );
    res.status(201).json(result.rows[0]);
  } catch(err) {
    // virheenkäsittely blokki jos käyttäjänimi jo olemassa
    if (err.code === '23505') // koodi unique name taken
      return res.status(409).json({ error: 'Username taken' });
      // muut virheet ohjataan yleiselle middlewarelle
    next(err);
  }
};
// autentikoidaan käyttäjä
exports.authenticate = async (req,res,next) => {
    // tarkistetaan username+salasana+rooli
  const { username, password, role } = req.body;
  try {
    const result = await db.query(
      'SELECT id,username,password_hash,role FROM users WHERE username=$1',
      [username]
    );
    if (result.rows.length === 0) 
      return res.status(401).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    const ok   = await bcrypt.compare(password, user.password_hash);
    if (!ok || user.role !== role)
      return res.status(401).json({ error: 'Invalid credentials' });

    // palautetaan käyttäjätiedot
    res.json({ id: user.id, username: user.username, role: user.role });
  } catch(err) {
    //muiden virheiden ohjaus middlewwarelle
    next(err);
  }
};
```

<br>

- Routes:
```
// routes FROM /backend/routes/users.js:

const express         = require('express');
const router          = express.Router();
const usersController = require('../controllers/usersController');

//rekisteröinti POST
router.post('/register', usersController.registerUser);
//LOGin POST
router.post('/login',    usersController.authenticate);

module.exports = router;
```

<br>

```
//  routes FROM /backend/app.js:

const usersRoutes = require('./routes/users'); //users reitit (phase3)
app.use('/api/users', usersRoutes); // rekisteröi users reitit (phase3)

```

<br>

## Project link
**Project live at https://red-sky-09c0adf03.6.azurestaticapps.net/**
- Test login credentials for teacher on ItsLearning phase 3 (optional) submission.
- Feel free to observe the application and try its functionalities on different roles.

