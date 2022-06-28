import { Component, OnInit,ViewChild,Output,EventEmitter  } from '@angular/core';

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


import { QuestionService } from "src/app/services/question.service";
import { AnswerService } from '../services/answer.service';
import { AuthService } from "src/app/services/auth.service";

import { question } from "src/app/models/question";
import { User } from "src/app/models/User";
import { answer } from "src/app/models/answer";

import  {ActivatedRoute} from "@angular/router";


import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';

declare var $: any;
declare interface Task {
  title: string;

}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  posts$: Observable<question[]>;
  userId: any;

  answers$: Observable<answer[]>;
  answerr$:Observable<answer[]>;
  questionId: Pick<question, "id">;
  answerquestionId: Pick<answer, "id">;

  answersList: Array<any>;


  
 // currentTutorial = null;

 //updatequestion
 @ViewChild("formDirective") formDirective: NgForm;
 @Output() create: EventEmitter<any> = new EventEmitter();

 form: FormGroup;

 isOpen = false;
 //updatequestionend
 currentTutorial = null;


getparamId:any;

errormsg:any;

  constructor( private questionService: QuestionService, private authService: AuthService, private answerService : AnswerService, private router : ActivatedRoute) { }

    ngOnInit() :void{
      //services
      this.posts$ = this.fetchAll();
      this.userId = localStorage.getItem('takwa-user-id');


      
      // this.answers$ = this.fetchAllanswer();
   
      this.questionId = this.questionService.questionId;
      
     // console.log(this.router.snapshot.paramMap.get('id'),'getid');
      this.getparamId = this.router.snapshot.paramMap.get('id');
      this.questionService.getSingleData(this.getparamId).subscribe((res)=>{
      console.log(res,'res==>');

      this.questionForm.patchValue({
        title:res.data[0].title,
        description:res.data[0].description
      });

      });

      this.answerr$ = this.answerService.getSingleDataanswer(this.getparamId);
     

/*

      questionForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description' : new FormControl('',Validators.required)
      });
*/
      //end services
        //update question
    //  this.form = this.createFormGroup();
   //endupdate
    }

    //new tuto
    questionForm = new FormGroup({
      'id': new FormControl(''),
     'title' : new FormControl('', Validators.required),
     'description': new FormControl('', Validators.required)
    });

    setEditQuestion(post) {
      console.log('===== Heyya =====',  post);
      this.questionForm.patchValue({
        id: post.id,
        title:  post.title,
        description: post.description
      })
      $('#myModal').modal({ show: true });
    }


    questionSubmit()
    {
     if(this.questionForm.valid)
     { 
      console.log(this.questionForm.value);
     }

     this.errormsg = 'all field are required';
    
    }
    // end new tuto


     //updatequestion


  //end updatequestion

    
    fetchAll(): Observable<question[]> {
      return this.questionService.fetchAll();
    }

    fetchAllanswer(): Observable<answer[]> {
      return this.answerService.fetchAll();
    }
  
    createPost(): void {
      this.posts$ = this.fetchAll();
    }
  
    delete(postId: Pick<question, "id">): void {
      this.questionService
        .deletePost(postId)
        .subscribe(() => (this.posts$ = this.fetchAll()));
    }



  questionUpdate(){
    console.log(this.questionForm.value, 'updatedform');
   if(this.questionForm.valid)
   {

    this.questionService.updateData(this.questionForm.value.id,this.questionForm.value).subscribe((res)=>{
      console.log(res,'resupdated');
      this.posts$ = this.fetchAll();
    
    });


     
   }else
   {
     this.errormsg='all field are required';
   }
  }
 

/*
    update(id: number, newtitle: Partial<question>, newdescription : Partial<question>, userid:number,postdate : Date): void {
      const title = (<string>newtitle).trim();
      const description = (<string>newdescription).trim();

    //  if (!item) return;
  
      const newquestion: question = {
        id,
        title,
        description,
        userid,
        postdate
      };
  
      this.posts$ = this.questionService
        .updatequestion(newquestion)
        .pipe(tap(() => (this.posts$ = this.fetchAll())));
    }


 */
    

    
    getquestionbyid(questionid: Pick<question, "id">): void{
      this.questionService
        .getquestionbyid(questionid)
        .subscribe(() => (this.posts$ = this.fetchAll()));
    
    }

    getanswerquestionbyid(questionid): void{
      this.answersList = [];
      
      this.answerService
        .getAnswerByQuestionId(questionid)
        .subscribe((response) => {
          this.answersList = response;
          // console.log(response);
          $('#noticeModal').modal({ show: true });
        });
    }

    answerText = '';
    answeringQuestionId = 0;

    addAnswerModal(questionId) {
      this.answerText  = '';
      this.answeringQuestionId = questionId;
      $('#addAnswerModal').modal({show: true});
    }

    addAnswer() {
      this.answerService.addAnswer(this.answeringQuestionId, this.answerText, this.authService.userId || 1).subscribe((response) => {
        $('#addAnswerModal').modal({show: false});
      })
    }


    
  getTutorial(id) {
    this.answerService.getquestionanswerid(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

/*
    getTutorial(answerquestionId) {
      this.answerService.get(answerquestionId)
        .subscribe(
          data => {
            this.currentTutorial = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
*/
}
