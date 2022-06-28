import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000/auth";
  public ImageUrl = "http://localhost:3000";
  private BaseUrl = "http://localhost:3000";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id">;
  role: Pick<User, "role">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  upload(body): Observable<any> {
    // console.log(body);
    // console.log('file uploading');
    return this.http.post(this.ImageUrl + `/profile-upload-single`,body).pipe(
     catchError(this.errorHandlerService.handleError<any>('upload')),
     tap((res) => {console.log('file uploaded'); })
   );
  }

  saveReport(body): Observable<any> {
    console.log(body);
    console.log('addReport');
    return this.http.post(this.BaseUrl + `/addReport`,body).pipe(
     catchError(this.errorHandlerService.handleError<any>('saveReport')),
     tap((res) => {console.log('saveReport'); })
   );
  }

  getReports(body): Observable<any> {
    console.log(body);
    console.log(this.BaseUrl + `/getReports?userid=`+body.userid);
    return this.http.get(this.BaseUrl + `/getReports?userid=`+body.userid).pipe(
     catchError(this.errorHandlerService.handleError<any>('getReports')),
     tap((res) => {console.log('getReports'); })
   );
  }

  //getReports

  signup(user: Omit<User, "id">): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>("signup"))
      );
  }

  login(
    email: Pick<User, "email">,
    password: Pick<User, "password">
  ): Observable<{
    token: string;
    userId: Pick<User, "id">;
  }> {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<User, "id">, role: Pick<User, "role"> }) => {
          this.userId = tokenObject.userId;
          this.role = tokenObject.role;
          localStorage.setItem("token", tokenObject.token);
          localStorage.setItem("takwa-user-id", tokenObject?.userId.toString());
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["dashboard"]);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, "id">;
          }>("login")
        )
      );
  }

  fetchAll(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<User[]>("fetchAll", []))
      );
  }
  
  deleteUser(UserId: Pick<User, "id">): Observable<{}> {
    return this.http
      .delete<User>(`${this.url}/${UserId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>("deleteuser"))
      );
  }

}
