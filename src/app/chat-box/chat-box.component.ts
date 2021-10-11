import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  constructor(private apiService: ApiServiceService) {}
  startChat = false;
  value: any;
  chatList= [] as  any;
  ngOnInit(): void {}

  startConversation() {
    this.startChat = !this.startChat;
  }
  sendChat() {
    console.log('value', this.value);
    let sentChat = {
      "advice": this.value,
      "type": 'sent',
    };
    let reciveChat;
    let recieve;
    this.chatList.push(sentChat);
    this.apiService.getRequest('https://api.adviceslip.com/advice').subscribe(
      (data: any[]) => {
        recieve=data;
        reciveChat = {
          "advice":recieve.slip.advice,
          "type": 'recieve',
        };
        this.chatList.push(reciveChat);
        this.value="";
      },
      (error) => {}
    );
  }
}
