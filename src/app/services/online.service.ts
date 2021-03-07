import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  public isOnline: boolean = navigator.onLine;

  constructor() { 
    window.addEventListener('online', this.handleConnection);
    window.addEventListener('offline', this.handleConnection);
  }

  handleConnection() {
    if (navigator.onLine) {
      this.isReachable().then(function(online) {
        this.isOnline = online;
      });
    } else {
      this.isOnline = false;
    }
  }

  isReachable() {
    return fetch('https://www.techiediaries.com/api/data.json', { method: 'GET', mode: 'no-cors' })
      .then(function(resp) {
        return resp && resp.ok;
      })
      .catch(function(err) {
        console.warn('[conn test failure]:', err);
      });
  }
}
