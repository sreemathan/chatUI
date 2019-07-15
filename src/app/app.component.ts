import { Component, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { ChatShowcaseService } from './chat-showcase.service';
import {DataServiceService} from './data-service.service';
import { Data } from './data';

declare var $: any;

@Component({
  selector: 'app-root',
  providers: [ ChatShowcaseService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent {
  
  messages: any[];
  message: Data[];
  public show:boolean = true;
	file:any;
  
  constructor(protected chatShowcaseService: ChatShowcaseService, private renderer: Renderer2, private elem: ElementRef, private messageData: DataServiceService) {
    this.messages = this.chatShowcaseService.loadMessages();
	console.log('onload',this.messages);
  }
  ngOnInit() {
    
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
				$("#openMedia").html('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Altran Assist</h5></div><div class="modal-body" style="text-align:center;"><video width="100%" height="450" controls autoplay><source src="' + linkVal + '" type="video/mp4"></video></div></div></div>');
			}
			if(ext == 'pdf'){
				$("#openMedia").html('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Altran Assist</h5></div><div class="modal-body" style="text-align:center;"><iframe src="' + linkVal + '" width="100%" height="500px"></iframe></div></div></div>');
			}
			
		});
	});
	} 
	
  sendMessage(event: any) {
	 var datas = {
	"format": false,
	"username": "saudawar",
	"sendertext": {
		"sendertext": event.message
	}
}; 


	this.messageData.getMessage().subscribe(
      result => {
		  console.log(result);
		  
		  result['responses'].forEach((value) => {
			  if(value.title == undefined){value.title = ""}
	  $('<nb-chat-message class="ng-tns-c3-2 ng-trigger ng-trigger-flyInOut not-reply ng-star-inserted"><div class="message"><nb-chat-message-text><p class="text ng-star-inserted">' + value.content + '<br><a href="http://130.61.95.1:5001/chat/' + value.url + '" target="_blank">' + value.title + '</a></p></nb-chat-message-text></div></nb-chat-message>').insertBefore('.chatloader');
	$('.chatloader').hide();
	  
		  });
		  /* result['responses'].forEach((value) => {
		this.messages.push({
		  text: value.content,
		  date: new Date(),
		  reply: false,
		  type: 'file',
		  files: value.url,
		  user: {
			name: 'Altran Assist'
		  },
		});
	}, 2000); */
	        }
    ) 
	
	$('.chatloader').show();
	var result = this.message;
	console.log("AfterFilter",result);
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
	
	
	
	console.log('onload',this.messages);
    
  }
}

