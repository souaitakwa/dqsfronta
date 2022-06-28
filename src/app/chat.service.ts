import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {ApiAiClient} from 'api-ai-javascript/es6/ApiAiClient';


import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs";
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';




export class Message{
  constructor(public contecnt : string, public sentBy : string) {}
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

 /* readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token});

  conversation = new BehaviorSubject<Message[]>([]);
  constructor() { }





  // Sends and receives messages via DialogFlow



  /*talk(){
    this.client.textRequest('How are you ! ')
    .then(res => console.log(res));
  }*/
/*
  update(msg : Message) {
    this.conversation.next([msg]);
  }
  converse(msg: string){
    const userMessage = new Message(msg , 'user');
    this.update(userMessage);
 

  return this.client.textRequest(msg)
  .then(res =>{
 const speech = res.result.fulfillment.speech;
 const botMessage = new Message(speech , 'bot');
 this.update(botMessage);
  });
}
*/
/*
converse(msg: string) {
  const userMessage = new Message(msg, 'user');
  this.update(userMessage);

  return this.client.textRequest(msg)
             .then(res => {
                const speech = res.result.fulfillment.speech;
                const botMessage = new Message(speech, 'bot');
                this.update(botMessage);
             });
}



// Adds message to source
update(msg: Message) {
  this.conversation.next([msg]);
}
*/
}
