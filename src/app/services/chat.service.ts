import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private storageKey = 'chatMessages';
  constructor() {}

  getMessages(): Message[] {
    const messages = localStorage.getItem(this.storageKey);
    return messages ? JSON.parse(messages) : [];
  }

  saveMessage(username: string, text: string, channel: BroadcastChannel) {
    const messages = this.getMessages();
    const newMessage: Message = {
      user: username,
      message: text,
      time: new Date().toLocaleTimeString().slice(0, 5),
    };
    channel.postMessage(newMessage);
    messages.push(newMessage);
    localStorage.setItem(this.storageKey, JSON.stringify(messages));
  }
}
