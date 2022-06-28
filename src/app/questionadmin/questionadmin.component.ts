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


@Component({
  selector: 'app-questionadmin',
  templateUrl: './questionadmin.component.html',
  styleUrls: ['./questionadmin.component.css']
})
export class QuestionadminComponent implements OnInit {

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

      // alert('ok');
      //services
      this.posts$ = this.fetchAll();
      console.log(this.fetchAll());
      this.userId = localStorage.getItem('takwa-user-id');


      
       this.answers$ = this.fetchAllanswer();
   
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
  
    delete(questionId: Pick<answer, "id">): void {
      this.answerService
        .deleteAnswer(questionId)
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


 
    answerForm = new FormGroup({
      'id': new FormControl(''),
     'answer' : new FormControl('', Validators.required),
    });

    setEditanswer(answer) {
      console.log('===== Heyya =====',  answer);
      this.answerForm.patchValue({
        id: answer.id,
        answer:  answer.answer
      })
      $('#myModal').modal({ show: true });
    }

    answerUpdate(){
      console.log(this.answerForm.value, 'updatedform');
     if(this.answerForm.valid)
     {
  
      this.answerService.updateData(this.answerForm.value.id,this.answerForm.value).subscribe((res)=>{
        console.log(res,'resupdated');
        this.posts$ = this.fetchAll();
      
      });
  
  
       
     }else
     {
       this.errormsg='all field are required';
     }
    }
   
}
