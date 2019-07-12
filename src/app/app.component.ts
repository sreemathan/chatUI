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
	console.log('onload',this.messages);
  }
  
  ngAfterViewInit() {
	  var nbIcon = this.elem.nativeElement.querySelector('nb-icon');
	  var chatButton = this.elem.nativeElement.querySelector('input.with-button');
	  var chatBody = this.elem.nativeElement.querySelector('.messages');
	  nbIcon.insertAdjacentHTML('beforeend', '<i class="fa fa-microphone" aria-hidden="true"></i>');
	  chatBody.insertAdjacentHTML('beforeend', '<div class="chatloader"><img src="http://10.203.208.133:4200/assets/gif/loader.gif" class="align-center"></div>');
	  
	  this.renderer.listen(chatButton, 'keyup', (e) => {
		  if(e.target.value == ""){
			this.renderer.removeClass(nbIcon, 'toggleIcon');
			nbIcon.classList.add('animated', 'pulse','infinite');
		  } else {
			
			this.renderer.addClass(nbIcon, 'toggleIcon');
			nbIcon.classList.remove('animated', 'pulse','infinite');
		  }
	  });
	  	  $( () => {
    $( "#draggable" ).draggable();
	$("body").on('click','a.ng-star-inserted', (event) => {
		
		var linkVal = event.currentTarget.href;
		var ext = linkVal.substr( (linkVal.lastIndexOf('.') +1) );
		console.log(ext);
		if(ext == 'jpg' || ext == 'png'){
			$("#openMedia").html('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Altran Assist</h5></div><div class="modal-body" style="text-align:center;"><img src="' + linkVal + '" style="width:40%"></div></div></div>');
		}
		if(ext == 'mp4'){
			$("#openMedia").html('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Altran Assist</h5></div><div class="modal-body" style="text-align:center;"><video width="100%" height="450" controls><source src="' + linkVal + '" type="video/mp4"></video></div></div></div>');
		}
		if(ext == 'pdf'){
			$("#openMedia").html('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Altran Assist</h5></div><div class="modal-body" style="text-align:center;"><iframe src="' + linkVal + '" width="100%" height="500px"></iframe></div></div></div>');
		}
		
	});
  } );
	} 
	
  sendMessage(event: any) {
	$('.chatloader').show();
	const files = !event.files ? [] : event.files.map((file) => {
      console.log('type',file.type);
	  if(file.type == "image/jpeg") {
	  return {
        url: 'http://10.203.208.133:4200/assets/images/sampleimg.jpg',
        type: file.type,
        icon: 'file-text-outline',
      };
	  }
	  if(file.type == "image/png") {
	  return {
        url: 'https://cresscap.com/wp-content/uploads/bfi_thumb/dummy-profile-pic-353fq072wibz1xp0b9j75s.png',
        type: file.type,
        icon: 'file-text-outline',
      };
	  }
      if(file.type == "video/mp4") {
	  return {
        url: 'http://10.203.208.133:4200/assets/images/sample.mp4',
        type: file.type,
        icon: 'file-text-outline',
      };
	  }
      if(file.type == "application/pdf") {
	  return {
        url: 'http://10.203.208.133:4200/assets/images/sample.pdf',
        type: file.type,
        icon: 'file-text-outline',
      };
	  }
    });
	const msg = event.message.toLowerCase( );
    this.messages.push({
      text: msg,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'mathan',
        avatar: 'https://cresscap.com/wp-content/uploads/bfi_thumb/dummy-profile-pic-353fq072wibz1xp0b9j75s.png',
      },
    });
	
	if(msg == "hello" || msg == "hi" || msg == "" ){
	setTimeout(()=>{    
      $('.chatloader').hide();
	  this.messages.push({
		  text: "How can i assist you?",
		  date: new Date(),
		  reply: false,
		  type: 'text',
		  files: files,
		  user: {
			name: 'Altran Assist'
		  }
		});
	}, 2000);
	
		
	} else if (msg == "what is this about" ||msg == "what" || msg == "about" ){
	setTimeout(()=>{    
      $('.chatloader').hide();
	  this.messages.push({
		  text: "This is a chatbot POC",
		  date: new Date(),
		  reply: false,
		  type: 'text',
		  files: files,
		  user: {
			name: 'Altran Assist'
		  }
		});
	}, 2000);
	
		
	} else if(msg == "image"){
		setTimeout(()=>{    
      $('.chatloader').hide();
	  this.messages.push({
		  text: "A sample image",
		  date: new Date(),
		  reply: false,
		  type: 'file',
		  files: [
        {
          url: 'http://10.203.208.133:4200/assets/images/sampleimg.jpg',
          type: 'image/jpeg',
        },
      ],
		  user: {
			name: 'Altran Assist'
		  }
		});
	}, 2000);
	} else {
		setTimeout(()=>{    
      $('.chatloader').hide();
	  this.messages.push({
		  text: "Sorry couldn't recognize",
		  date: new Date(),
		  reply: false,
		  type: 'text',
		  files: files,
		  user: {
			name: 'Altran Assist'
		  }
		});
	}, 2000);
	}
	
	console.log('onload',this.messages);
    
  }
}

