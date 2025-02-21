import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDate {
  getCurrentTime(): string {
    return new Date().toLocaleTimeString().slice(0, 5);
  }
}
