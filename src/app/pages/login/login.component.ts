import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
//tuto
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "src/app/services/auth.service";

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    //tuto
    loginForm: FormGroup;

    constructor(private element: ElementRef, private authService: AuthService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

        //tuto
        this.loginForm = this.createFormGroup();
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }


    //tuto
    createFormGroup(): FormGroup {
        return new FormGroup({
          email: new FormControl("", [Validators.required, Validators.email]),
          password: new FormControl("", [
            Validators.required,
            Validators.minLength(7),
          ]),
        });
      }
    
      login(): void {
        this.authService
          .login(this.loginForm.value.email, this.loginForm.value.password)
          .subscribe((response) => {
            //   console.log(response);
            //   return false;
              localStorage.setItem( 'takwa-user-role', response[`role`]);
            //   localStorage.setItem( 'takwa-user-id', response[`id`]);
          });
      }
}
