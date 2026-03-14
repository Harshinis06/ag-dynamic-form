import { Injectable } from '@angular/core';
import { Books } from '../models/Books';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000'

  getBooks():Observable<Books[]> {
    return this.http.get<Books[]>(`${this.baseUrl}/books`);
  }
}
