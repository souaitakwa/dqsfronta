import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { history } from "../models/history";
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private url = "http://localhost:3000/history";


  questionId: Pick<User, "id">;


  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<history[]> {
    return this.http
      .get<history[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<history[]>("fetchAll", []))
      );
  }


 

 

  createhistory(
    formData: Partial<history>,userId: Pick<User, "id">
  ): Observable<history> {
    return this.http
      .post<history>(
        this.url,
        { comment: formData.comment, question: formData.question , answer: formData.answer, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<history>("createhistory"))
      );
  }

}
