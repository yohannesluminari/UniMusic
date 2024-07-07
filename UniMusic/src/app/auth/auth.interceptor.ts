import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private AuthSvc:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const accessToken = this.AuthSvc.getAcccessToken()
    const newRequest = request.clone({
      headers: request.headers.append('Authorization', 'Bearer' + accessToken)
    })
    return next.handle(newRequest);


  }
}
