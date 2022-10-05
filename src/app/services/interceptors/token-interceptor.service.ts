import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { APIRESTService } from '../apirest.service';
import { Router } from '@angular/router';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private apirest:APIRESTService,
    private router:Router, private httpnative:HTTP) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.apirest.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    //Seteamos el header nativo
    this.httpnative.setHeader(req.url, "Authorization", authToken);

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      catchError(err => {
          // onError
          console.log(err);
          if (err instanceof HttpErrorResponse) {
              console.log(err.status);
              console.log(err.statusText);
              if (err.status === 401) {
                this.router.navigate(['/login']);
              }
          }
          return throwError(err);
        }
      )
    );

  }
}
