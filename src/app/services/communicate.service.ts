
import { HttpClient } from '@angular/common/http';
import { group } from '../database/group';
import { channel } from '../database/channel';
import { user } from '../database/user';
import { GCU } from '../database/G-C-U';
import {newchannels} from '../database/channels';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { nextTick } from 'q';

import io from 'socket.io-client';
const SERVER_URLS = 'http://localhost:3000/super';
const SERVER_URLM = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  private socket;

  constructor(private http: HttpClient) { }


  initSocket(userRole){

    if(userRole=='Super Admin'){
      //alert('roleS: ' + userRole);
      this.socket = io(SERVER_URLS);
    } else {
      //alert('role: ' + userRole);
      this.socket = io(SERVER_URLM);
    }

    //return ()=>{this.socket.disconnect();}
  }

  joinroom(selroom):void{
    this.socket.emit("joinRoom", selroom);
  }

  leaveroom(selroom):void{
    this.socket.emit("leaveRoom", selroom);
  }

  joined(next){
    this.socket.on('joined', res=>next(res));
  }

  createroom(newroom){
    this.socket.emit('newroom', newroom);
  }

  reqnumusers(selroom){
    this.socket.emit("numusers", selroom);
  }

  getnumusers(next){
    this.socket.on('numusers', res=>next(res));
  }

  reqroomList(channelsList){
    this.socket.emit('roomlist', channelsList);
  }

  getroomList(next){
    this.socket.on('roomlist', res=>next(res));
  }

  notice(next){
    this.socket.on('notice', res=>next(res));
  }

  sendMessage(message): void {
    this.socket.emit('message', message);
  }

  getMessage(next){
    /*
    return Observable.create((observer)=>{
      this.socket.on('message', (message)=>{
        observer.next(message);
      });
    });
    */
    this.socket.on('message', (message)=>next(message));
  }


  getChannels() {
    return this.http.get<any>('http://localhost:3000/api/getChannels');
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

  getChannelDel(){
    return this.http.get<any>('http://localhost:3000/api/getChannelDel');
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

  getListUser(userId){
    return this.http.post<any>('http://localhost:3000/api/getlist', {'userId': userId});
  }

}
