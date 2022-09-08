# Assignment1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

Anh Truong Nguyen-s5168384
# Git
## Git Layout
The git repository contains the project folder and a README file. The default branch is called main as is the latest convention. 
https://github.com/anhtruong-it/Assignment-phase-1.git 

## Version Control Approach 
During development, I commit when a body of work was completed. It is important that the application can be run without error regardless of which commit is pulled. 
Branches were created when working on complex new features, such as when I was implementing the user permissions dialog, where I need to commit. I find it easier and cleaner than rolling back to a previous commit. As I was the only developer working on this project, I decided to merge and rebase in order to keep the commit history on the main branch clear to understand.

## Data Structures 
There are three primary data structures used in this program. They are users, groups, channels. Users is an array that consists of a user object. A user has an id, username, email address and a role. Groups is an array that consist of a group object. A group has a group name. Each group contains Channel. Channels is an array that consist of a channel object. A channel has a channel name and User. Users is an array that consist of a username object.

{group: number, channel: [
	{nameChannel: string, user: [
		username,…]
]}

## REST API
### Login Route
Description:	This route checks that user exists. If it does, it logs them in. Otherwise, it displays an   error message on the frontend
Route: /login
Method:	POST
Parameter:	username: string,	password: string
Return value: If authenticated: : {ok: role, user: {id: number, username: string, email: string, role: string}}, if not authenticated: {ok: false, errors: {}}
Technical Explanation: 	This route receives a username and a password in the request body. The users.json file is read and, if a user matching username and password are found, then the route returns ok: role of user and the user as a response. If a user does not exist with the username, it returns ok: false as a response.

### Upgrade User
Description: this route updates a user role
Route: /upgradeUsers
Method: POST
Parameters: In req.body:  { user: username: string, role: string}}
Return Value: true
Technical Explanation: This route receives a username and role in the request parameters and a user in the request body. It reads in the users.json file to the local variable users. It finds the index where username matches id in users and sets the value at that index to user. It writes users to the users.json file. It returns users as a response.

### Delete User
Description: This route deletes a user
Route: /removeUser
Method: POST
Parameters: usename: string
Return Value: true
Technical Explanation: This route receives a username in the request parameters. It reads in the users.json file to the local variable users. It finds the index of the user where username matches id in users and uses it to splice the user from users.

### Get Users
Description: This route returns a list of users.
Route: /getUsers
Method: POST
Parameters: NONE
Return Value: users
Technical Explanation: This route receives no parameter in the request body, users.json file is read then it returns users.

### Get Group-Channel
Description: This route returns a list of group and channel
Route: /showGC
Method: POST
Parameters: NONE
Return Value: Groups
Technical Explanation: This route receives no parameter in the request body, group.json file is read then it returns all the group and channel.

### Create Group
Description: This route creates a new group.
Route: /createGroup
Method: POST
Parameters: NONE
Return Value: {group: number}
Technical Explanation: This route receives no parameter in the request body, group.json file is read, create a new Group Object and then rewrite new list of group to group.json file.

### Create Channel
Description: This route creates a new channel
Route: /createChannel
Method: POST
Parameters: {group: number}
Return Value: {Group: number, channel: number[]}
Technical Explanation: This route receives group in the request body, group.json file is read, find the index of the group in JSON file that matches group. Create a channel within the group found. It then rewrites to the JSON file.

### Delete Group
Description: This route deletes a group
Route: /delGroup
Method: POST
Parameters: {group: number}
Return Value: group
Technical Explanation: This route receives group in the request body, group.json file is read, find the index of the group in JSON file that matches group. Delete the group found, it then rewrites the group to the JSON file.

### Delete Channel
Description: This route deletes a channel
Route: /delChannel
Method: POST
Parameters: {group: numbe, channel: number}
Return Value: group
Technical Explanation: This route receives group and channel in the request body, group.json file is read, find the index of the group and channel in JSON file that matches group. Delete the channel found, it then rewrites the group to the JSON file.

# Angular Architecture
## Components
### Login
It consists of a simple login form with an input for username, password and a submit button. When the submit button is clicked it calls the login function, which makes an HTTP POST request to /login with the username and password. If the response returns ok: [user] then returned user data is set as user in localStorage, a function is called with the return value of what is stored in user in localStorage and the application navigates to the page that corresponding to role of user. If the response returns ok: false, then the local error variable is set to true which displays a hint on the frontend stating the username or password is incorrect.

### Role of user setting options
Options |	Technical | Explanation	Permission | Required	| Applies to
-------------|-------------
Create Channel |	Opens a dialog to create a new channel |	createChannel |	Super Admin , Group Admin
Delete Channel	| Deletes the channel	| delChannel	| Super Admin , Group Admin
Create Group	| Opens a dialog to create a new group	| createGroup	| Super Admin , Group Admin
Delete Group	| Deletes the group	| delGroup	| Super Admin , Group Admin


### Creating Users
Clicking the 'Create User' button opens the create/update user dialog. After closing this dialog the users local variable is set to the returned users who logging  display a list of users with the new user.
### Deleting User
If the current user role is not 'super' then the delete buttons are hint.
If the user is 'super', then clicking the delete button will call the removeUser function which makes HTTP POST request to /removeUser and the users local variable is set to the returned users and priority is set for users.

### Upgrading Users
If the current user's role priority is less than or equal to the user's role priority then the edit button is disabled and a tooltip displays a message if they are hovered over. Otherwise, clicking the edit icon opens the dialog to update the user. After closing this dialog the users local variable is set to the returned users and priority is set for users.







