import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {
    constructor(private router: Router) {}
    logout() {
        localStorage.removeItem('takwa-user-role');
        localStorage.removeItem('takwa-user-id');
        this.router.navigate(['/pages/login'])
    }
}
