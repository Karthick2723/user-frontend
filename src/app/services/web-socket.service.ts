import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { API_GATEWAY } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Stomp.Client;
  private messageSubject: Subject<string> = new Subject<string>();
  public messages$ = this.messageSubject.asObservable();
  private isConnected = false;
  public webSocketURL = API_GATEWAY.WEBSOCKET_SERVER;
  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS(this.webSocketURL);
    this.stompClient = Stomp.Stomp.over(socket);

    this.stompClient.debug = () => {};

    this.stompClient.onConnect = (frame) => {
      this.isConnected = true;
      this.stompClient.subscribe('/topic/messagesProduct', (message) => {
        this.messageSubject.next(message.body);
      });

      this.stompClient.subscribe('/topic/messagesCategory', (message) => {
        this.messageSubject.next(message.body);
      });

      this.stompClient.subscribe('/topic/messagesEvent', (message) => {
        this.messageSubject.next(message.body);
      });

      this.stompClient.subscribe('/topic/messagesUser', (message) => {
        this.messageSubject.next(message.body);
      });

      this.stompClient.subscribe('/topic/messagesBanner', (message) => {
        this.messageSubject.next(message.body);
      });
      this.stompClient.subscribe('/topic/messagesArticle', (message) => {
        this.messageSubject.next(message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
    };

    this.stompClient.onWebSocketClose = (evt) => {
      this.isConnected = false;
      setTimeout(() => {
        this.connect(); 
      }, 5000);
    };

    this.stompClient.onWebSocketError = (error) => {
    };

    this.stompClient.activate();
  }
}
