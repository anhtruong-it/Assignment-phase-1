
import { HttpClient } from '@angular/common/http';
import { group } from '../database/group';
import { channel } from '../database/channel';
import { user } from '../database/user';
import { GCU } from '../database/G-C-U';
import {newchannels} from '../database/channels';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  private socket;

  constructor(private http: HttpClient) { }


  initSocket(){
    this.socket = io(SERVER_URL);
    return ()=>{this.socket.disconnect();}
  }

  send(message: string){
    this.socket.emit('message', message);
  }

  getMessage(){
    return Observable.create((observer)=>{
      this.socket.on('message', (message)=>{
        observer.next(message);
      });
    });
    //this.socket.on('message', (message)=>next(message));
  }


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

  removeUser(userId, groupId, channelId) {
    return this.http.post<any>('http://localhost:3000/api/removeUser', {'userId': userId, 'groupId': groupId, 'channelId': channelId});
  }

  updateChannelUser(userId, groupId, channelId) {
    return this.http.post<any>('http://localhost:3000/api/updateChannelUser', {'userId': userId, 'groupId': groupId, 'channelId': channelId});
  }

}
