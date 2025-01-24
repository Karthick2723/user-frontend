import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_GATEWAY } from 'src/environments/environment';
import { HttpService } from './http-services';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {
  public orderapiURL = API_GATEWAY.SERVER + "/orders";
  private serviceUrl: string;
  constructor(private httpClient: HttpService) { }

  getallorder(userid: any): Observable<any> {
    this.serviceUrl = this.orderapiURL + "/getOrderDetails";
    return this.httpClient.getMultipleParam(this.serviceUrl, { userId: userid });
  }

  getordersByUsersId(userid: any): Observable<any> {
    this.serviceUrl = this.orderapiURL + "/getOrderListByUserId";
    return this.httpClient.getSingle(this.serviceUrl, userid);
  }
}

