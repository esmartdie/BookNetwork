import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  set token(token: string){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  isTokenValid(): boolean {
    const token: string | null = this.token;
    if (!token) {
      return false;
    }

    const jwtHelper: JwtHelperService = new JwtHelperService();
    const isTokenExpired: boolean = jwtHelper.isTokenExpired(token);

    if (isTokenExpired) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.clear();
      }
      return false;
    }

    return true;
  }
}
