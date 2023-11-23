import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.getAuthorizedRequest(req)).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this.auth.logout('Authorization required - Please log in!');
              break;

            case 403:
              alert('Access denied. You do not have the necessary permissions.');
              break;

            default:
              alert('An error occurred. Please try again later.');
              break;
          }
        }
        return throwError(() => err);
      })
    );
  }

  getAuthorizedRequest(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + this.auth.getToken()
      }
    })
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}