import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }
  
    private baseUrl = 'http://localhost:3000'
  
    getMembers():Observable<Member[]> {
      return this.http.get<Member[]>(`${this.baseUrl}/members`);
    }
}
