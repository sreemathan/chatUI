import { Component, Renderer2, ElementRef, HostListener} from '@angular/core';
import { ChatShowcaseService } from './chat-showcase.service';
import {DataServiceService} from './data-service.service';
import { Data } from './data';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

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
  }
  @HostListener('click', ['$event']) onClick(e) {
	  if(e.target.hasAttribute("send")){ 
		  let emojiElement = this.elem.nativeElement.querySelector('emoji-mart'); 
		  this.renderer.removeClass(emojiElement, 'opened'); 
	  }
	  if (e.target.offsetParent.classList.contains('chatButton')) {
		  let emojiElement = this.elem.nativeElement.querySelector('emoji-mart'); this.renderer.removeClass(emojiElement, 'opened');
	  }
	  
	  if (e.target.classList.contains('emojiClick')) {
		let emojiElement = this.elem.nativeElement.querySelector('emoji-mart');
		let classes: DOMTokenList = emojiElement.classList;
		let classCond = classes.contains('opened');
		this.renderer[classCond ? 'removeClass' : 'addClass'](emojiElement, 'opened');
		
	  }
	  if (e.target.classList.contains('readMoreClick')) {
		let currentHeight = e.target.previousElementSibling.style.height;
			if(currentHeight == "59px"){
				e.target.previousElementSibling.style.height = "auto";
				e.target.innerText = "Read Less";
			} else {
				e.target.previousElementSibling.style.height = "59px";
				e.target.innerText = "Read More";
			}
	  }
	  if (e.target.classList.contains('a.ng-star-inserted')) {
	  }
  }
  ngAfterViewInit() {
	  var chatButton = this.elem.nativeElement.querySelector('nb-chat-form .message-row input');
	  var chatBody = this.elem.nativeElement.querySelector('.messages');
	  var chatform = this.elem.nativeElement.querySelector('nb-chat-form .message-row');
	  
	  chatform.insertAdjacentHTML('afterbegin','<i class="fa fa-smile-o emojiClick" aria-hidden="true"></i>');
	  chatBody.insertAdjacentHTML('beforeend', '<div class="chatloader"><img src="http://10.203.208.133:4200/assets/gif/loader.gif" class="align-center"></div>');
	  this.renderer.setAttribute(chatButton, 'send', "" );
	  this.renderer.listen(chatButton, 'keyup', (e) => {
		  if(e.target.value == ""){
		  } else {
			
			this.renderer.setAttribute(chatButton, 'send', e.target.value );
		  }
	  });
	  
	$(() => {
		$( "#draggable" ).draggable(
			{ handle: ".header" }
		);
	});
	} 
	addEmoji(ev){
		  let prevValue = this.elem.nativeElement.querySelector('nb-chat-form .message-row input').getAttribute('send');
		  this.renderer.setProperty(this.elem.nativeElement.querySelector('nb-chat-form .message-row input'), 'value', prevValue + '' + ev.emoji.native);
		  this.renderer.setAttribute(this.elem.nativeElement.querySelector('nb-chat-form .message-row input'), 'send', prevValue + '' + ev.emoji.native);
	}
  sendMessage(event: any) {
	 var datas = {
	"format": false,
	"username": "saudawar",
	"sendertext": {
		"sendertext": event.target.attributes.send.value
	}
}; 

	var getD = $('<nb-chat-message class="ng-tns-c3-2 ng-trigger ng-trigger-flyInOut not-reply ng-star-inserted"></nb-chat-message>');
	this.messageData.getMessage(datas).subscribe(
      result => {
		  
		  result['responses'].forEach((value) => {
			  if(value.title == undefined){value.title = ""}
			  
			  var words = $.trim(value.content).split(" ");
			  var countedVal, heightVal = "";
			  var contentVal = value.content;
			  var sliced = contentVal.slice(0, 500); 
				if(words.length > 15 ){ countedVal = "Read More"; heightVal= "59px"; } else { countedVal = ""; heightVal= "auto"; }
				  getD.append('<nb-chat-message class="ng-tns-c3-2 ng-trigger ng-trigger-flyInOut not-reply ng-star-inserted"><div class="message"><nb-chat-message-text><p class="text ng-star-inserted"><span class="readMore" style="height:' + heightVal + '">' + sliced + '</span> <span class="readMoreClick">' + countedVal + '</span><br><a href="http://130.61.95.1:5001' + value.url + '" target="_blank">' + value.title + '</a></p></nb-chat-message-text></div></nb-chat-message>');
				  
				$('.chatloader').hide();
	  
		  });
		  
		  this.elem.nativeElement.querySelector('.chatloader').insertAdjacentHTML('beforebegin', getD.html());
	        }
    ) 
	
	$('.chatloader').show();
	var result = this.message;
	const files = !event.files ? [] : event.files.map((file) => {
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
	const msg = event.target.attributes.send.value;
	
	$('<nb-chat-message class="ng-tns-c3-1 ng-trigger ng-trigger-flyInOut reply ng-star-inserted"><div class="message"><nb-chat-message-text><p class="text ng-star-inserted">' + msg + '</p></nb-chat-message-text></div></nb-chat-message>').insertBefore('.chatloader');
	this.renderer.setProperty(this.elem.nativeElement.querySelector('nb-chat-form .message-row input'), 'value', "");
	this.renderer.setAttribute(this.elem.nativeElement.querySelector('nb-chat-form .message-row input'), 'send', "");
	this.renderer.removeClass(this.elem.nativeElement.querySelector('emoji-mart'), 'opened');
    
  }
}

