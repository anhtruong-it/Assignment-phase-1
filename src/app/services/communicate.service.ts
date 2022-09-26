import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { group } from '../database/group';
import { channel } from '../database/channel';
import { user } from '../database/user';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  constructor(private http: HttpClient) { }

  getlist() {
    return this.http.get<any>('http://localhost:3000/api/getlist');
  }
}
