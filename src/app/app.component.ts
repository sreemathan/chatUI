import { Component } from '@angular/core';
import { ChatShowcaseService } from './chat-showcase.service';

@Component({
  selector: 'app-root',
  providers: [ ChatShowcaseService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  
  messages: any[];
  public show:boolean = true;
  toggle() {
  this.show = !this.show;
  }
  
	constructor(protected chatShowcaseService: ChatShowcaseService) {
    this.messages = this.chatShowcaseService.loadMessages();
	console.log(this.messages);
  }
  
  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'mathan',
        avatar: 'https://cresscap.com/wp-content/uploads/bfi_thumb/dummy-profile-pic-353fq072wibz1xp0b9j75s.png',
      },
    });
	console.log(this.messages);
    
  }
  
	
  
}
