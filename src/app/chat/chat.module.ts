import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatdiaglogComponent } from '../chatdiaglog/chatdiaglog.component';

import { ChatService } from './chat.service';
import { FormsRoutes } from '../forms/forms.routing';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';


@NgModule({
  declarations: [ ChatdiaglogComponent ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [ ChatdiaglogComponent ],
  providers : [ ChatService]
})
export class ChatModule { }
