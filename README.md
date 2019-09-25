# Connecticut Hockey League (CHL)

## About

This site is allows a user to view all teams, edit teams, add teams, edit players and add players for the Connecticut Hockey League (CHL). 

Index page - Provides a description of each division available in the league and provides buttons to Login and Register. There are also links on the navigation bar for Login and Register.

![Index Page](Hockey_League/public/images/IndexPage.JPG)

Login page - The user will need to enter their User Name and Password then click Log In, if authentication is valid then the user will be directed to the Filter Teams page.

![Login Page](Hockey_League/public/images/LoginPage.JPG)

Register page - If the user does not have a login they will be able to register for access to the website. User will need to enter a User Name, Password and Email. User Name and Email will check for existing duplicates. If registration is successful the user will be directed to the Login page.

![Register Page](Hockey_League/public/images/RegisterPage.JPG)

Admin page - If a user is an Admin then they will be able to access the Admin page. The page will display a table of registered users (User Name and Email Address).

![Admin Page](Hockey_League/public/images/AdminPage.JPG)

Filter Teams page - Provides a table list of all the Teams currently in the league. The user will have the ability to filter the list by Division and/or Team Gender. There is a button to add a team, as well as a button to see the details of a team and a button to delete the team from the league.

![Filter Teams Page](Hockey_League/public/images/FilterTeamPage.JPG)

Edit User Profile page - Provides the user the ability to change there Email Address. Email Address will check for existing duplicates.

![Edit User Profile Page](Hockey_League/public/images/EditUserProfilePage.JPG)

Details (Edit) Team page - Provides the details of the selected team as well as a list of players currently on the team. The user also has the ability to edit the team details by clicking the edit button (fields will become enabled). There is a button to add a team (if team is not full), as well as a button to see the details of a player and a button to delete the player from the team.

![Details Team Page](Hockey_League/public/images/TeamDetailsPage.JPG)

Details (Edit) Player page - Provides the details of the selected player. The user also has the ability to edit the player details by clicking the edit button (fields will become enabled). Provided to the user is a blue information icon, when clicked the user will see a popover with information about the team (Min Age, Max Age and Team Gender).

![New Team Page](Hockey_League/public/images/AddTeamPage.JPG)

New Player page - This page is navigated to by the link on the team details page. Provides the user the ability to add a player to the selected team. Once all information is entered and validated the player will be added to the selected team. Upon closing the success modal the user will be displayed the team details page where the new player will be displayed on the players table. Provided to the user is a blue information icon, when clicked the user will see a popover with information about the team (Min Age, Max Age and Team Gender).

![New Player Page](Hockey_League/public/images/AddPlayerPage.JPG)

New Player No Team page - This page is navigated to by the link on the navigation bar. Provides the user a form to add a player to any team that is not full. Once all information is entered and validated the player will be added to the selected team. Upon closing the success modal the user will be displayed the team details page where the new player will be displayed on the players table. Provided to the user is a blue information icon, when clicked the user will see a popover with information about the team (Min Age, Max Age and Team Gender).

## Audience
- Primary - Currently the site is setup for the admin of the site and anyone else who has the ability to add teams and/or players. Future upgrade will have access for anyone interested in playing, where they can register to play.

## Credits
- Content provided by [wiki](http://www.wiki.com)

# Setup
- Clone / Fork / Download Repo then run npm install.

## Execute the Following in your working dir
- npm install express --save
- npm install body-parser --save

## To Start/Stop a Specific Node Process
### To start server
- npm start

### To stop server
- Ctrl + C
  
## Test App (Browser)
- Ensure Node Server is started!

http://localhost:3000/

## Reporting issues
Use Github's Issues section for this repository to report any issues with the notes.
Examples of the kind of issues that may need reporting:
- Typos
- Code samples not working as described
- Broken or moved links
- Etc.