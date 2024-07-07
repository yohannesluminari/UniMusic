import { Router, RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap} from 'rxjs';
import { IUser } from '../models/i-user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ILoginData } from '../models/i-login-data';

type AccessData = {
  accessToken: string,
  user: IUser
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: IUser[] = [];
  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubject = new BehaviorSubject<IUser | null>(null);

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(user => this.syncIsLoggedIn = user)
  );

  syncIsLoggedIn: boolean = false;

  constructor(private Http: HttpClient, private router: Router) {
    this.restoreUser();
  }


  resgisterUrl: string = environment.resgisterUrl;
  loginUrl: string = environment.loginUrl;

  register(newUser: Partial<IUser>): Observable<AccessData> {
    return this.Http.post<AccessData>(this.resgisterUrl, newUser);
  }

  login(loginData: ILoginData): Observable<AccessData> {
    return this.Http.post<AccessData>(this.loginUrl, loginData)
      .pipe(tap(data => {
        this.authSubject.next(data.user);
        localStorage.setItem('accessData', JSON.stringify(data));
        this.autoLogout(data.accessToken);
      }));
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['auth/login']);
  }

  getAcccessToken(): string {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return '';
    const accessData: AccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return '';
    return accessData.accessToken;
  }

  autoLogout(jwt: string) {
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    const expMs = expDate.getTime() - new Date().getTime();

    setTimeout(() => {
      this.logout();
    }, expMs);
  }

  // Blocca il login se il token è scaduto
  restoreUser() {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData: AccessData = JSON.parse(userJson);

    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;

    this.authSubject.next(accessData.user);
    this.autoLogout(accessData.accessToken);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.Http.get<IUser[]>(environment.userUrl);
  }


}
