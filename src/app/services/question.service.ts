import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { question } from "../models/question";
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private url = "http://localhost:3000/question";

  questionId: Pick<User, "id">;


  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<question[]> {
    return this.http
      .get<question[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<question[]>("fetchAll", []))
      );
  }


 

 

  createquestion(
   
    formData: Partial<question>,userId: Pick<User, "id">
  ): Observable<question> {
    console.log('wahab is here '+ localStorage.getItem( 'takwa-user-id'));
    return this.http
      .post<question>(
        this.url,
        { title: formData.title, description: formData.description, user: localStorage.getItem( 'takwa-user-id')},
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<question>("createquestion"))
      );
  }

 
/*

createquestionn(title: Partial<question>,description: Partial<question>, userId: Pick<User, "id">): Observable<any> {
    return this.http
      .post<Partial<question>>(this.url, {title, description,userId}, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }*/

  upquestion(
    formData: Partial<question>
  ): Observable<question> {
    return this.http
      .put<question>(
        this.url,
        { id : formData, title: formData.title, description: formData.description},
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<question>("update"))
      );
  }

  updatequestion(question: question): Observable<any> {
    return this.http
      .put<question>(this.url, question, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }


  
  deletePost(questionId: Pick<question, "id">): Observable<{}> {
    return this.http
      .delete<question>(`${this.url}/${questionId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<question>("deletequestion"))
      );
  }

   getquestionbyid(questionId: Pick<question, "id">): Observable<{}> {
    return this.http
      .get<question[]>(`this.url, /${questionId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<question>("findByPk"))
      );
  }

  updateData(id:any, data:any):Observable<any>
  {
    return this.http.put(`${this.url}/${id}`,data);
  }
  //get single data

  getSingleData(id:any):Observable<any>
  {
    let ids=id;
    return this.http.get(`${this.url}/${ids}`);
  }
}
