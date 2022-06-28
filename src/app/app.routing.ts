import { HistoryComponent } from './history/history.component';
import { UsersComponent } from './users/users.component';
import { AdminreportdetailsComponent } from './reports/adminreportdetails/adminreportdetails.component';
import { AdminreportComponent } from './reports/adminreport/adminreport.component';
import { ClientreportdetailsComponent } from './reports/clientreportdetails/clientreportdetails.component';
import { ClientreportComponent } from './reports/clientreport/clientreport.component';
import { CommentsComponent } from './comments/comments.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { TicketsComponent } from './tickets/tickets.component';
import { SignupComponent } from './account/signup/signup.component';
import { CreatequestionComponent } from './createquestion/createquestion.component';
import { QuestionadminComponent } from './questionadmin/questionadmin.component';
import { ChatdiaglogComponent } from './chatdiaglog/chatdiaglog.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ResultgaComponent } from './resultga/resultga.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'pages/login',
      pathMatch: 'full',
    },
    { path:'login', component : LoginComponent},
    { path:'signup', component : SignupComponent},

   // { path:'comment', component : CommentsComponent},
  {   
      path: '',
      component: AdminLayoutComponent,
      
      children: [
        { path:'tickets/ticket', component : TicketsComponent},
        { path:'tickets/comment', component : CommentsComponent},
        { path:'tickets/comment/:id', component : CommentsComponent},
        { path:'tickets/report', component : ClientreportComponent},
        { path:'reportdetail/:id/:reportId', component : AdminreportdetailsComponent},
        // { path:'reportdetail/:id/:reportId', component : ClientreportdetailsComponent},
        { path:'reportadmin/:id', component : AdminreportComponent},
        { path:'adminreportdetail/:id/:reportId', component : AdminreportdetailsComponent},
        { path:'historyy', component : HistoryComponent},
        { path:'forms/userss', component : UsersComponent},
        { path:'updatequestion/:id', component : CreatequestionComponent},
        { path:'questionadmin', component : QuestionadminComponent},
        { path:'chatbot', component : ChatdiaglogComponent},
        { path:'trychatbot', component : ChatComponent},
        { path:'trychatbotms', component : MessageComponent},
        { path:'chatb', component : ChatbotComponent},
        { path:'resultga/:id', component : ResultgaComponent},




          {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }, {
        path: 'components',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
    }, {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.Forms)
    }, {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    }, {
        path: 'maps',
        loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
    }, {
        path: 'widgets',
        loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
    }, {
        path: 'charts',
        loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    }, {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    }, {
        path: '',
        loadChildren: () => import('./userpage/user.module').then(m => m.UserModule)
    }, {
        path: '',
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
    }
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }]
    }
];
