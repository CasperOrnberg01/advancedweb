# Phase 3 – Extra Feature or Improvements (Optional)

## 🎯 Chosen Use Case or Feature to Improve

_Which use case or aspect of the application did you choose to improve or expand? Describe it briefly and explain why you selected it._

### Hosting the application in azure environment
- I chose to work on the issue I encountered on phase, where my intention was to host entire application on azure. I had some issues with getting the azure postgresql database connected to the azure web app back end properly. My phase 2 implementation worked locally.

## 🔍 Original Definition

_Link or reference to the original use case or requirement from Phase 1._
<br>
### Original vision was to host entire application in azure:
<br>
<br>

[Link to phase 1 definition and planning](1_Definition_and_Planning.md)


## 🔄 Implementation

_Describe what you implemented in this phase. Focus on what changed or was added:_
### Hosting the application in azure environment
- Backend to azure web app via github workflows
- Frontend to azure static web app via github workflows
- Connected Azure PostgreSQL database to azure backend.

### Hosting the application in azure environment

- Connection string in azure backend web app was slightly incorrect. Adjusted it in azure at *Environment variables* > *App settings*.
- Added console.log lines in db.js file to find potential issues in backend log stream.
- Changed target url in frontend items.jsx and orders.jsx from local to azure backend. Here had very minor and annoying problem, just forgot Https:// protocol infront off the backend address, and didn't notice it at first. Used dev tools to find out more about the potential issue and there I realized what was wrong.
- Axios calls also use the azure hosted backend from now on. Leaved local implementation in the code, which can be uncommented if wanted to host locally or keep developing in local environment.
