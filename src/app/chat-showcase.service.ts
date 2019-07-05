import { Injectable } from '@angular/core';
import { messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class ChatShowcaseService {

  constructor() { }
  
  loadMessages() {
    return messages;
	
  }
  reply(message: string){
	  
    
  }
	    
  }
  

