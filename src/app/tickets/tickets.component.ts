import { Component,  OnInit,ViewChild,Output,EventEmitter } from '@angular/core';

import { TableData } from '../md/md-table/md-table.component';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

//qustion part

import { first } from "rxjs/operators";

import { question } from "src/app/models/question";

import { AuthService } from "src/app/services/auth.service";
import { QuestionService } from "src/app/services/question.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  //question
  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  isOpen = false;
  //questionend


  public tableData3: TableData;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  validEmailRegister: boolean = false;
  validConfirmPasswordRegister: boolean = false;
  validPasswordRegister: boolean = false;

  validEmailLogin: boolean = false;
  validPasswordLogin: boolean = false;

  validTextType: boolean = false;
  validEmailType: boolean = false;
  validNumberType: boolean = false;
  validUrlType: boolean = false;
  pattern = "https?://.+";
  validSourceType: boolean = false;
  validDestinationType: boolean = false;

  matcher = new MyErrorStateMatcher();
  register : FormGroup;
  login : FormGroup;
  type : FormGroup;

  constructor(private formBuilder: FormBuilder,  private authService: AuthService,
    private questionservice: QuestionService,private router: Router) {}

   isFieldValid(form: FormGroup, field: string) {
     return !form.get(field).valid && form.get(field).touched;
   }

   displayFieldCss(form: FormGroup, field: string) {
     return {
       'has-error': this.isFieldValid(form, field),
       'has-feedback': this.isFieldValid(form, field)
     };
   }

   onRegister() {
     if (this.register.valid) {
     } else {
       this.validateAllFormFields(this.register);
     }
   }
   onLogin() {
     if (this.login.valid) {
     } else {
       this.validateAllFormFields(this.login);
     }
   }
   onType() {
     if (this.type.valid) {
     } else {
       this.validateAllFormFields(this.type);
     }
   }
   validateAllFormFields(formGroup: FormGroup) {
     Object.keys(formGroup.controls).forEach(field => {
       const control = formGroup.get(field);
       if (control instanceof FormControl) {
         control.markAsTouched({ onlySelf: true });
       } else if (control instanceof FormGroup) {
         this.validateAllFormFields(control);
       }
     });
   }
  ngOnInit() {

    this.tableData3 = {
      headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
      dataRows: [
          ['1', 'Dakota Rice (Success)', '$36,738', 'Niger', 'Oud-Turnhout' ],
          ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
         ['3', 'Sage Rodriguez (Info)', '$56,142', 'Netherlands', 'Baileux' ],
         ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
          ['5', 'Doris Greene (Danger)', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
        //  ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ],
         // ['7', 'Mike Chaney (Warning)', '$38,735', 'Romania', 'Bucharest' ]
      ]
   };

      this.register = this.formBuilder.group({
        // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
        email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
        optionsCheckboxes: ['', Validators.required],
        password: ['',  Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPassword: ['', Validators.required],
       }, {
     });
     this.login = this.formBuilder.group({
       // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
       email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
       // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
       password: ['', Validators.required]
    });
       this.type = this.formBuilder.group({
         // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
         text: [null, Validators.required],
         email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
         number: [null, Validators.required],
         url: [null , Validators.required],
         // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
         password: ['', Validators.required],
         confirmPassword: ['', Validators.required],
        }, {
      });


      //question
      this.form = this.createFormGroup();

  }

  //question
  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit(formData: Pick<question, "title" | "description">): void {

    this.questionservice
      .createquestion(formData, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    this.form.reset();
    this.formDirective.resetForm();
    this.router.navigate(["tickets/comment"]);
  }
  

  //end question

  emailValidationRegister(e){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e).toLowerCase())) {
        this.validEmailRegister = true;
    } else {
      this.validEmailRegister = false;
    }
  }
  passwordValidationRegister(e){
      if (e.length > 5) {
          this.validPasswordRegister = true;
      }else{
        this.validPasswordRegister = false;
      }
  }
  confirmPasswordValidationRegister(e){
    if (this.register.controls['password'].value === e) {
        this.validConfirmPasswordRegister = true;
    }else{
      this.validConfirmPasswordRegister = false;
    }
  }

  emailValidationLogin(e){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e).toLowerCase())) {
        this.validEmailLogin= true;
    } else {
      this.validEmailLogin = false;
    }
  }
  passwordValidationLogin(e){
      if (e.length > 5) {
          this.validPasswordLogin = true;
      }else{
        this.validPasswordLogin = false;
      }
  }


  textValidationType(e){
      if (e) {
          this.validTextType = true;
      }else{
        this.validTextType = false;
      }
  }
  emailValidationType(e){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e).toLowerCase())) {
        this.validEmailType = true;
    } else {
      this.validEmailType = false;
    }
  }
  numberValidationType(e){
      if (e) {
          this.validNumberType = true;
      }else{
        this.validNumberType = false;
      }
  }
  urlValidationType(e){
    try {
      new URL(e);
      this.validUrlType = true;
    } catch (_) {
      this.validUrlType = false;
    }
  }
  sourceValidationType(e){
      if (e) {
          this.validSourceType = true;
      }else{
        this.validSourceType = false;
      }
  }
  confirmDestinationValidationType(e){
    if (this.type.controls['password'].value === e) {
        this.validDestinationType = true;
    }else{
      this.validDestinationType = false;
    }
  }


}
