import { Component, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { ChatShowcaseService } from './chat-showcase.service';

declare var $: any;

@Component({
  selector: 'app-root',
  providers: [ ChatShowcaseService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent {
  
  messages: any[];
  public show:boolean = true;
  
  constructor(protected chatShowcaseService: ChatShowcaseService, private renderer: Renderer2, private elem: ElementRef) {
    this.messages = this.chatShowcaseService.loadMessages();
	console.log(this.messages);
  }
  
  ngAfterViewInit() {
	  var nbIcon = this.elem.nativeElement.querySelector('nb-icon');
	  var chatButton = this.elem.nativeElement.querySelector('input.with-button');
	  var chatBody = this.elem.nativeElement.querySelector('.messages');
	  nbIcon.insertAdjacentHTML('beforeend', '<i class="fa fa-microphone" aria-hidden="true"></i>');
	  chatBody.insertAdjacentHTML('beforeend', '<div class="chatloader"><img src="http://localhost:4200/assets/gif/loader.gif" class="align-center"></div>');
	  
	  this.renderer.listen(chatButton, 'keyup', (e) => {
		  if(e.target.value == ""){
			this.renderer.removeClass(nbIcon, 'toggleIcon');
			nbIcon.classList.add('animated', 'pulse','infinite');
		  } else {
			
			this.renderer.addClass(nbIcon, 'toggleIcon');
			nbIcon.classList.remove('animated', 'pulse','infinite');
		  }
	  });
	  
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
	if(event.message == "hello" || event.message == "hi"){
	setTimeout(()=>{    
      this.messages.push({
		  text: "How can i assist you?",
		  date: new Date(),
		  reply: false,
		  type: files.length ? 'file' : 'text',
		  files: files,
		  user: {
			name: 'Altran Assist'
		  },
		});
	}, 1000);
	
		
	}
	console.log(this.messages);
    
  }
}

