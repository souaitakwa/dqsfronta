import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { answer } from "../models/answer";
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class AnswerService {



  private url = "http://localhost:3000/answer";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<answer[]> {
    return this.http
      .get<answer[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<answer[]>("fetchAll", []))
      );
  }

  get(id) {
    return this.http.get(`${this.url}/${id}`);
  }

  createanswer(
    formData: Partial<answer>,
    userId: Pick<User, "id">
  ): Observable<answer> {
    return this.http
      .post<answer>(
        this.url,
        { answer: formData.answer, questionid: formData.questionid, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<answer>("createanswer"))
      );
  }

  addAnswer(questionId, answer, userId) {
    console.log(questionId, answer, userId);
    
    return this.http.post(this.url,  { answer: answer, questionid: questionId, user: userId });
  }

/*
createanswer(title: Partial<answer>,description: Partial<answer>, userId: Pick<User, "id">): Observable<any> {
    return this.http
      .post<Partial<answer>>(this.url, {title, description,userId}, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }
*/
  
  deleteAnswer(answerId: Pick<answer, "id">): Observable<{}> {
    return this.http
      .delete<answer>(`${this.url}/${answerId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<answer>("deleteanswer"))
      );
  }

 
  getquestionanswerid(questionId: Pick<answer, "questionid">): Observable<{}> {
    return this.http
      .get<answer[]>(`this.url, /${questionId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<answer>("findOne"))
      );
  }

  getSingleDataanswer(id:any):Observable<any>
  {
    let ids=id;
    return this.http.get(`${this.url}/${ids}`);
  }

  getAnswerByQuestionId(QuestionId): Observable<any> {
    return this.http.get(`${this.url}/question/${QuestionId}`);
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
