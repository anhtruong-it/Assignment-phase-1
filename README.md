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
There are three main data structures used in this program. They are users, groups, channels. The user has an id, a username, a role, and an array containing the group id and channel id they're in. The channel has an id, the channel name and the group id that contains the channel. The group consists of the id, the group name, an object named channel, the channel object has the channel id, the channel name is the user object. The user object has an id, a user name, and a role. All three collections (users, channels, groups) bind group, user, and channel ids together to support accessing different program functions.

Group: GCU {
  _id = UntypedFormBuilder;
  groupId: number;
  groupName: string;
  channel: [
    {
      channelId: number,
      channelName: string,
      user:[
        {
          userId: number,
          userName: string,
          userRole: string,
        },
      ];
    } ,
  ];
}

Channel: channel {
  _id = UntypedFormBuilder;
  channelId: number;
  channelName: string;
  groupID: any;
}

User: user {
  _id = UntypedFormBuilder;
  userId: number;
  userName: string;
  userPwd: string;
  userRole: string;
  groupId:[
    {
      id: number;
      channelId: number;
    }
  ];
}


## REST API
### Login Route
Description:	This route checks that user exists. If it does, it logs them in. Otherwise, it displays an   error message on the frontend

Route: /api/login

Method:	POST

Parameter:	username: string,	password: string

Return value: If authenticated: : {ok: role, user: {id: number, username: string, email: string, role: string}}, if not authenticated: {ok: false, errors: {}}

Technical Explanation: 	This route receives a username and a password in the request body. The users.json file is read and, if a user matching username and password are found, then the route returns ok: role of user and the user as a response. If a user does not exist with the username, it returns ok: false as a response.



### List Channel Route
Description: this route is used to access all available channels

Route: /api/getChannels

Method: get

Parameters: None

Return value: Array

Technical Explanation: this route is used to retrieve all available channels, it accesses the collection in mongodb, finds the collection named 'channels', retrieves all channels into an array.

### List Group/Channel/User Route

Description: this route is used to retrieve all group/channel/users

Route: /api/getGCU

Method: get

Parameters: None

Return value: Array

Technical Explanation: this route is used to retrieve all group/channel/users from collection 'GCUs' in mongodb to represent this information by a table in html

###Create New User Route
Description: this route is used to create a new use

Route: api/createUser

Method: post

Parameters: new user(userId, username, userPwd, userRole)

Return value: Array

Technical Explanation: this route is used to create a new user, it takes the parameters from the user input then creates a new user in dababase 'users'

### Create New Group Route
Description: this route is used to create a new group

Route: /api/addGroup

Method: post

Parameters: new GCU(groupId, groupName, channel:[channelId: null, channelName: null, user:[userId: null, username: null, userRole: null]])

Return value: Array

Technical Explanation: This route is used to create a new group, it receives new parameters from the user including groupId and groupName, then creates a new group8 in the database, the child objects inside GCU will be defaulted to null.

### Create Channel Route
Description: this route is used to create a new channel in an existing group

Route: /api/addchannel

Method: post

Parameters: new channel(chanenlId, channelName, groupId)

Return value: array

Technical Explanation: This route is used to create a new channel in an existing group, it takes parameters channelID, channelName from user and groupId available in database to create a channel associated with that group.

### Delete Group Route
Description: this route is used to delete a group

Route:  /api/deleteGroup

Method: post

Parameters: groupId: number

Return value: array

Technical Explanation: this route is used to delete a group in the database by groupId


### Get Deleted Channel Route
Description: This route is used to create a list of channels you want to delete

Route: /api/getChannelDel

Method: get

Parameters: None

Return value: array

Technical Explanation: This route is used to create a list of channels you want to delete, the list will be displayed on the html page with the name channelName and the value is channelId

### Delete Channel Route
Description: this route is used to delete a channel

Route: /api/deleteChannel

Method: post

Parameters: groupId: number, channelId: number

Return value: array

Technical Explanation: this route is used to delete a channel in the database using the channelId and groupId contained in that channel

### Get User Route
Description: this route is used to retrieve all users

Route: /api/getUser

Method: get

Parameters: None

Return value: array

Technical Explanation:

### Delete User Route
Description: this route is used to delete a user

Route: /api/deleteUser

Method: post

Parameters: userId: number

Return value: array

Technical Explanation: This route is used to delete a user from the database and make sure the user's information in the GCU object is also deleted

### Update User Route
Description: this route is used to update a user's information

Route: /api/updateUser

Method: post

Parameters: new user(userId, username, userPwd, userRole, groupId[])

Return value: array

Technical Explanation: this route is used to update a user's information from the user, the information will be changed in the database but the groupId will not be changed in this case

### Add User to Channel Route
Description: this route is used to add a user to a channel

Route: /api/addUserGC

Method: post

Parameters: userId: number, groupId: number, channelId: number

### Return value: array 

Technical Explanation: this route is used to add a user to a channel, the user databse will also be added a pair of groupId, channelId

Remove User Route
Description: this route is used to remove a user from a channel

Route: /api/removeUser

Method: post

Parameters: userId: number, groupId: number, channelId: number

Return value: array

Technical Explanation: This route is used to remove a user from a channel, and the groupId and channelId pairs in the user database are also deleted accordingly.

# Angular Architecture
## Components
### Login
It consists of a simple login form with an input for username, password and a submit button. When the submit button is clicked it calls the login function, which makes an HTTP POST request to /login with the username and password. If the response returns ok: [user] then returned user data is set as user in localStorage, a function is called with the return value of what is stored in user in localStorage and the application navigates to the page that corresponding to role of user. If the response returns ok: false, then the local error variable is set to true which displays a hint on the frontend stating the username or password is incorrect.

### Role of user setting options

Options|Technical Explanation |	Permission Required | Applies to
-------|----------------------|---------------------|-----------
Create Channel|Opens a dialog to create a new channel|createChannel|Super Admin , Group Admin
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







