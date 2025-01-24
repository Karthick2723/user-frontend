import { Injectable } from '@angular/core';
import { API_GATEWAY } from 'src/environments/environment';
import { HttpService } from './http-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsSeminarService {

  private prodapiURL = API_GATEWAY.SERVER + "/events";
  private prodapiEventTypeUrl = API_GATEWAY.SERVER + "/eventType";
  private prodapiEventParticipationURL = API_GATEWAY.SERVER + "/EventParticipantForm";
  private serviceUrl: string;

  constructor(private httpClient: HttpService) { }

  getAllEvents(): Observable<any> {
    this.serviceUrl = this.prodapiURL + "/getAllEvents";
    return this.httpClient.getAll(this.serviceUrl);
  }

  getEvent(id: number): Observable<any> {
    this.serviceUrl = this.prodapiURL + "/getEventById";
    return this.httpClient.getSingle(this.serviceUrl, id)
  }

  getAllEventsType(): Observable<any> {
    this.serviceUrl = this.prodapiEventTypeUrl + "/getAllEventTypes";
    return this.httpClient.getAll(this.serviceUrl);
  }

  getPublishedEvents(): Observable<any> {
    this.serviceUrl = this.prodapiURL + "/publishedEvents";
    return this.httpClient.getAll(this.serviceUrl);
  }

  registerParticipation(data: any): Observable<any> {
    this.serviceUrl = this.prodapiEventParticipationURL + "/createEventParticipantForm";
    return this.httpClient.post(this.serviceUrl, data);
  }
  
  getYearBasedEvent(year: number): Observable<any> {
    this.serviceUrl = this.prodapiURL + `/getEventsByYear/{year}?year=${year}`;
    return this.httpClient.get(this.serviceUrl);
  }

  getAllEventYear() {
    this.serviceUrl = this.prodapiURL + "/getAllEventYears";
    return this.httpClient.get(this.serviceUrl);
  }
}
