import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from '../services/auth.service';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export let ROUTES: RouteInfo[] = [
    
     
  /*  {
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    },{
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        children: [
            {path: 'regular', title: 'Regular Forms', ab:'RF'},
            {path: 'extended', title: 'Extended Forms', ab:'EF'},
            {path: 'validation', title: 'Validation Forms', ab:'VF'},
            {path: 'wizard', title: 'Wizard', ab:'W'}
        ]
    },{
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'Regular Tables', ab:'RT'},
            {path: 'extended', title: 'Extended Tables', ab:'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
        ]
    }
    ,{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            {path: 'google', title: 'Google Maps', ab:'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    }
    ,*/
    
  /*  ,{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    }*/
    
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    constructor(private authService: AuthService, private router: Router) {
        console.log('==================>', authService.role);
        ROUTES = [];
        const  role  = localStorage.getItem('takwa-user-role');
        const  userId  = localStorage.getItem('takwa-user-id');
        if (!userId) {
            this.logout();
            return;
        }
        if (role  == 'administrator') {
            ROUTES.push(
             /*   {
                path: '/dashboard',
                title: 'Dashboard',
                type: 'link',
                icontype: 'dashboard'
            }
            ,{
                path: '/reportadmin',
                title: 'Reports',
                type: 'link',
                icontype: 'content_paste'
            }*/
            
           
            {
                path: '/historyy',
                title: 'History',
                type: 'link',
                icontype: 'content_paste'
            },
            {
                path: '/questionadmin',
                title: 'Questions',
                type: 'link',
                icontype: 'date_range'
            },
            {
                path: '/forms',
                title: 'Clients',
                type: 'sub',
                icontype: 'content_paste',
                collapse: 'forms',
                children: [
                   // {path: 'regular', title: 'Regular Forms', ab:'RF'},
                   // {path: 'extended', title: 'Extended Forms', ab:'EF'},
                   // {path: 'validation', title: 'Validation Forms', ab:'VF'},
                    {path: 'wizard', title: 'Add Client', ab:'W'},
                    {path: 'userss',title: 'Clients',ab:'U'
                    }
                ]
            }
            /*,
            {
                path: '/calendar',
                title: 'Calendar',
                type: 'link',
                icontype: 'date_range'
            }*/)
        } else {
            ROUTES.push(
                /*{
                path: '/tickets',
                title: 'Client',
                type: 'sub',
                icontype: 'dashboard'  ,
                collapse: 'ticket',
                children: [
                    {path: 'report', title: 'My reports', ab:'R'},
                    {path: 'ticket', title: 'Tickets', ab:'T'},
                    {path: 'comment', title: 'Questions', ab:'Q'}
                  
                ]
            },*/
            {
                path: '/tickets/report',
                title: 'My reports',
                type: 'link',
                icontype: 'date_range'
            },
            {
                path: '/tickets/ticket',
                title: 'Tickets',
                type: 'link',
                icontype: 'date_range'
            },
            {
                path: '/tickets/comment',
                title: 'Questions',
                type: 'link',
                icontype: 'date_range'
            },
            {
                path: '/chatb',
                title: 'our bot',
                type: 'link',
                icontype: 'date_range'
            })
        }
        
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    logout() {
        localStorage.removeItem('takwa-user-role');
        localStorage.removeItem('takwa-user-id');
        this.router.navigate(['/pages/login'])
    }
}
