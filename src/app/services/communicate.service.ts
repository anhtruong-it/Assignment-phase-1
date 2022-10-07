import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { group } from '../database/group';
import { channel } from '../database/channel';
import { user } from '../database/user';
import { GCU } from '../database/G-C-U';
import {newchannels} from '../database/channels'

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  constructor(private http: HttpClient) { }

  getlist() {
    return this.http.get<any>('http://localhost:3000/api/getlist');
  }

  getGCU() {
    return this.http.get<any>('http://localhost:3000/api/getGCU');
  }

  createUser(users: user) {
   // alert([users.userId, users.userName, users.userPwd, users.userRole]);

    return this.http.post<any>('http://localhost:3000/api/createUser', users);
  }

  addGroup(newGroup: GCU) {
    return this.http.post<any>('http://localhost:3000/api/addGroup', newGroup);
  }

  addChannel(newChannel: channel) {
    return this.http.post<any>('http://localhost:3000/api/addchannel', newChannel)
  }

  testChannel() {
    return this.http.get<any>('http://localhost:3000/api/testChannel');
  }

  deleteGroup(groupId){
    return this.http.post<any>('http://localhost:3000/api/deleteGroup', {'groupId': groupId});
  }

  deleteChannel(groupId, channelId){
    return this.http.post<any>('http://localhost:3000/api/deleteChannel', {'groupId': groupId, "channelId": channelId});
  }

  getUser() {
    return this.http.get<any>('http://localhost:3000/api/getUser');
  }

  deleteUser(userId) {
    return this.http.post<any>('http://localhost:3000/api/deleteUser', {'userId': userId});
  }

  updateUser(user: user) {
    return this.http.post<any>('http://localhost:3000/api/updateUser', user);
  }

  login(userName, userPwd) {
    return this.http.post<any>('http://localhost:3000/api/login', {'userName': userName, "userPwd": userPwd});
  }

  addUserGC(userId, groupId, channelId) {
    return this.http.post<any>('http://localhost:3000/api/addUserGC', {'userId': userId, 'groupId': groupId, 'channelId': channelId});
  }

}
