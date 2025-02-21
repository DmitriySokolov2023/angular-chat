import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Message } from '../../interfaces/message.interface';
import { ChatService } from '../../services/chat.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat-page',
  imports: [ReactiveFormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  username: string = '';
  noValid: string = '';
  message: string = '';
  messages: Message[] = [];
  form = new FormGroup({
    message: new FormControl(null, Validators.required),
  });
  private channel: BroadcastChannel;
  constructor(
    private loginService: LoginService,
    private chatService: ChatService
  ) {
    this.channel = new BroadcastChannel('chat_channel');
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'guest123';
    this.loadMessages();
    this.channel.addEventListener('message', (event) => {
      if (event.data) {
        this.messages.push(event.data);
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
      } else this.logout();
    });
  }

  loadMessages() {
    this.messages = this.chatService.getMessages();
  }

  logout() {
    this.loginService.logout();
  }

  clearMessage() {
    this.messages = [];
    localStorage.removeItem('chatMessages');
  }

  onSubmit() {
    if (this.form.valid) {
      this.message = this.form.value.message || 'lorem';
      this.noValid = '';
      this.chatService.saveMessage(this.username, this.message, this.channel);
      this.loadMessages();
      this.form.reset();
    } else {
      this.noValid = 'Введите сообщение';
    }
  }
}
