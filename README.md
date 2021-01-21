# Group 44 Web-programing final project
# HierarchiOrg!
This is an app for hierarchical organizing. It is expected to apply to any activities or organizations that have hierarchical structure, where members have differnet authority. People can conveniently send and receive information, and orgainize their plans by this app.
## Usage
  1. git clone
  2. yarn and yarn server
  3. cd frontend, yarn and yarn start
  4. You can login with these accounts:
<br>
(username/password/userclass)
  - a/a/general director
  - b/b/groupA manager
  - c/c/groupA member
  - d/d/groupB manager
  - e/e/groupB member
<br>
*Please wait 3 sec for the animation in the homepage, thank you. :))*
<br>
*Due to the sleep mode in Heroku, please try and give it some time to wake up....*
## Introduction  
### Hierarchical design
There are three hierarchical levels.  
- General director
  - Set the end date of the acitivity.  
    You can set up a count down timer for every member.
  - Manage group orginization.  
    You can add or delete class option for members to register.
   - Assign todo to members.  
    You have access to todolist from every member. 
    You can add todo on every member's todo list, and receive notification when it has been done.
    - Modify flowchart.  
    You can modify the flow chart for your compaign.    
  - Manage Calander.
- Group manager
  - Assign todo to members.  
    You have access to todolist from members in your group. 
    You can add todo on your members' todo list, and receive notification when it has been done.
  - Modify flowchart.  
    You can modify the flowchart for your compaign.
  - Get end date.
  - Receive todo.  
  - Manage Calander.
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
    - Add todo to your own todolist, you can select deadline and input details for each todo.
    - Delete todo on your own todolist when it has done.
  - Select and see other members' todolist.
    - Add new todo to subusers' todolist.
  - Receive notification when a member has done the todo which you had assigned.
  - Receive notification when your manager add a todo to your todolist.
  - Synchronizing update todolist when others have modified.
- Calendar
  - Switch month/year.
  - Add context to calendar.
  - Delete context from calendar.
  - Import/hide todolist deadline to calendar.
- Flowchart
  - Show flowchart of own and others' jobs, with own jobs highlighted.
  - Double click to modify content.
  - Add new row in the selected time slot.
  - Save sheet.
## Contribution  
  - 林佩潁 b07901102 (組長)
    - Routing
    - Home page
    - User homepage
    - Todolist
      - Design todolist
      - Hierarchy structure for subusers' todolist
    - Flowchart
    - Deploy
  - 劉知穎 b07901039
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
https://www.youtube.com/watch?v=aFhBBUFJDYo&t=13s
## Deploy Link  
https://hierarchiorg.herokuapp.com/  
*Due to some deployment problem, the delpoyed version didn't include subscription, so the todolist won't synchronizing update and send notifications.*
## PPT Link
https://www.canva.com/design/DAET0jn0f2Q/tXgIXh4DQ0cAANKQWiLCkg/view?utm_content=DAET0jn0f2Q&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton
## Branch information
- master => complete version, includes subscription
- nosub => deploy version, exclude subscription
