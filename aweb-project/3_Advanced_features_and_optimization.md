# Phase 3 – Extra Feature or Improvements (Optional)

## 🎯 Chosen Use Cases or Features to Improve

_Which use case or aspect of the application did you choose to improve or expand? Describe it briefly and explain why you selected it._

### Hosting the application in azure environment
- I chose to work on the issue I encountered on phase, where my intention was to host entire application on azure. I had some issues with getting the azure postgresql database connected to the azure web app back end properly. My phase 2 implementation worked locally.

### Register new user (functionality available only when logged in as manager)
I had this idea starting from phase 1, where warehouse manager would be able to register new users to the warehouse management system, once the authentication part for login is implemented.

### Login (previously just setting role, now includes authentication)
This idea I also had starting from phase1, but on phase 2 more specifically I was thinking of the login functionality, and where the credentials (username, hashed password and role) is stored.

## 🔍 Original Definition

_Link or reference to the original use case or requirement from Phase 1._
<br>
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

_Describe what you implemented in this phase. Focus on what changed or was added:_

### Hosting the application in azure environment
- Connection string in azure backend web app was slightly incorrect. Adjusted it in azure at *Environment variables* > *App settings*.
- Added console.log lines in db.js file to find potential issues in backend log stream.
- Changed target url in frontend items.jsx and orders.jsx from local to azure backend. Here had very minor and annoying problem, just forgot Https:// protocol infront off the backend address, and didn't notice it at first. Used dev tools to find out more about the potential issue and there I realized what was wrong.
- Axios calls also use the azure hosted backend from now on. Leaved local implementation in the code, which can be uncommented if wanted to host locally or keep developing in local environment.
