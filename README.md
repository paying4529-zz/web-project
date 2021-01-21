# Group 44 Web-programing final project
# HierarchiOrg 
This is an website for hierarchical orginization. It is expected to applied to any activities or organizations that have hierarchical structure, where members have with differnet authority. People can conveniently send and receive messages, and orgainize their self plans by this website.
## Introduction  
### Hierarchical design
There are three hierarchical levels.  
- General director
  - Set the end date of the acitivity.  
    Set up a count down timer for every member.
  - Manage group orginization.  
    Add or delete class option for members to register.
   - Assign todo to members.  
    Add todo on your members' todo list, and receive notification when it has been done.
    - Modify flowchart.  
    Modify the flow chart for your compaign.    
- Group manager
  - Assign todo to members.  
    Add todo on your members' todo list, and receive notification when it has been done.
  - Modify flowchart.  
    Modify the flowchart for your compaign.
- Group member
  - Get end date.
  - Receive todo.  
  - Read flowchart.
  - Manage Calander.
### Home page
- Home page
  - Link to register page.
  - Link to homepage.
  - Link to login page.
- Register page
  - Enter username, password, and select a class.
  - Check if the username is unique.
- Login page
  - If success, redirect to user page.
### User page
- User home page
  - General director
    - Set end date.
    - Show count down timer.
    - Modify class orgainization.
  - Group manager and member
    - Show count down timer.
    - Show todo remaining.
- Todolist
  - Own todo list.
    - Add or delete todo to own todolist.
    - Select deadline for each todo.
  - Select and see other members' todolist.
    - Add new todo to members' todolist.
  - Receive notification when a member has done his todo.
  - Receive notification when your manager add a todo.
  - Synchronizing update todolist when others have modified.
- Calendar
  - Switch month/year.
  - Add context to calendar.
  - Delete context from calendar.
  - Import/hide todolist to calendar.
- Flowchart
  - Show flowchart of own and others' jobs.
  - Double click to enter new content.
  - Add new row in the selected time slot.
  - Save sheet.
## Usage
  username/password/userclass
  - a/a/general director
  - b/b/groupA manager
  - c/c/groupA member
  - d/d/groupB manager
  - e/e/groupB member
## Contribution  
  - 林佩穎
    - Rounting
    - Home page
    - User homepage
    - Todolist
      - Design todolist
      - Subusers' todolist
    - Flowchart
    - Deploy
  - 劉知穎
    - Modify server + client
    - Todolist
      - Subscribe, synchronizing update todolist for differnet pages
      - Add notification
    - Calendar
## Package Usage
   - React.js
   - Node.js
   - Mongoose
   - Heroku
   - Apollo
   - Express
   - GraphQL
   - Matrial-UI
   - react-apollo, react-datasheet, react-date-icker, react-router-dom, react-select
## Demo Link  

## Deploy Link  
https://hierarchiorg.herokuapp.com/  
*Due to some deployment problem, the delpoyed version didn't include subscription, so the todolist won't synchronizing update and send notifications.*
