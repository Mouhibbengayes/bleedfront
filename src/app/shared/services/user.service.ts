import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  authenticate(data:any){
    return this.http.post("http://localhost:8001/bleed/user/authenticate",data) .pipe(map((response: Response) => response))
  }

  signup(data:any){
    return this.http.post("http://localhost:8001/bleed/user/add",data) .pipe(map((response: Response) => response))
  }
}
