import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private headers: any

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
    })
  }

  public login(nickName: string, password: string) {
    return this.http.post<any>(environment.HOST3 + "Login", {
      "nickName": nickName,
      "password": password
    })
  }

  public ValidateToken(token: string) {
    return this.http.post<any>(environment.HOST3 + "ValidateToken?token=" + token, null)
  }

  public getUsers() {
    return this.http.get<any>(environment.HOST3 + "GetUsers", { headers: this.headers })
  }
}
