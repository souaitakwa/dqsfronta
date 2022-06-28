import { Component, OnInit,ViewChild,Output,EventEmitter  } from '@angular/core';




import { QuestionService } from "src/app/services/question.service";
import { AuthService } from "src/app/services/auth.service";

import  {ActivatedRoute} from "@angular/router";


import {FormControl, Validators, FormGroup, FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-createquestion',
  templateUrl: './createquestion.component.html',
  styleUrls: ['./createquestion.component.css']
})
export class CreatequestionComponent implements OnInit {
  form: FormGroup;


  getparamId:any;

errormsg:any;
  constructor(private questionService: QuestionService, private authService: AuthService,  private router : ActivatedRoute) { }

  ngOnInit(): void {

    this.getparamId = this.router.snapshot.paramMap.get('id');
    this.questionService.getSingleData(this.getparamId).subscribe((res)=>{
    console.log(res,'res==>');

    this.questionForm.patchValue({
      title:res.data[0].title,
      description:res.data[0].description
    });

    });

  }

  questionForm = new FormGroup({
    'title' : new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required)
  })

 

 


   questionSubmit()
   {
    if(this.questionForm.valid)
    { 
     console.log(this.questionForm.value);
    }

    this.errormsg = 'all field are required';
   
   }

   questionUpdate(){
    console.log(this.questionForm.value, 'updatedform');
   if(this.questionForm.valid)
   {

    this.questionService.updateData(this.questionForm.value,this.getparamId).subscribe((res)=>{
      console.log(res,'resupdated');
    
    });
     
   }else
   this.errormsg='all field are required';
   {


   }
  }

}
