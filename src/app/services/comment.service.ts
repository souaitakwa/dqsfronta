import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";
import { comment } from '../models/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = "http://localhost:3000/comment";

  questionId: Pick<User, "id">;


  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(reportId): Observable<comment[]> {
    console.log(this.url+'?reportId='+reportId);
    return this.http
      .get<comment[]>(this.url+'?reportId='+reportId, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<comment[]>("fetchAll", []))
      );
  }


 

 

  createcomment(
    formData: Partial<comment>,userId: Pick<User, "id">
  ): Observable<comment> {
    return this.http
      .post<comment>(
        this.url,
        {  description: formData.description,defaultcomment: formData.defaultcomment,picture: formData.picture,  userid: formData.userid, reportId:formData.reportId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<comment>("createcomment"))
      );
  }


  deleteComment(questionId: Pick<comment, "id">): Observable<{}> {
    return this.http
      .delete<comment>(`${this.url}/${questionId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<comment>("deletecomment"))
      );
  }
}
