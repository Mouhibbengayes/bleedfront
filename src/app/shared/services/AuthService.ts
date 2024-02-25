import { Injectable } from '@angular/core';
import { jwtDecode} from 'jwt-decode';
import { InvalidTokenError } from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';


export interface DecodedToken {
  role: any;
  // Other properties in your decoded token
}

@Injectable()
export class AuthService {
//token:string;
  constructor(private jwtHelperrr: JwtHelperService, private router:Router){}
  public getToken(): string {
    return localStorage.getItem('JWT');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if(token==null){
      return false;
    }
    if(!this.jwtHelperrr.isTokenExpired(token)){
      return true;
    }else{
      return false;
    }
  }


  public getDecoded(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token) as DecodedToken;
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  public getRole(): any  | null {
    const decodedToken = this.getDecoded();
    return decodedToken ? decodedToken.role : null;
  }
}
