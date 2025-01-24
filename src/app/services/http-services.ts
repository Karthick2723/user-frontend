import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpParams,
} from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { API_GATEWAY } from "../../environments/environment";

@Injectable()
export class HttpService {
  rtlEnabled: boolean;
  constructor(private http: HttpClient) { }

  public getAll<T>(requestUrl: string): Observable<T> {
    return this.http.get<T>(requestUrl);
  }

  public getAllSync<T>(requestUrl: string): Observable<T> {
    return this.http.get<T>(requestUrl);
  }

  public getSingle<T>(requestUrl: string, id: number): Observable<T> {
    return this.http.get<T>(requestUrl + "/" + id);
  }

  public getSingleObject(requestUrl: string, id: number): Observable<any> {
    return this.http.get(requestUrl + "/" + id);
  }

  public getByText<T>(requestUrl: string, id: string): Observable<T> {
    return this.http.get<T>(requestUrl + "/" + id);
  }

  public getByTextSync<T>(requestUrl: string, id: string): Observable<T> {
    return this.http.get<T>(requestUrl + "/" + id).pipe(map((res) => res));
  }

  public post<T>(requestUrl: string, item: any): Observable<T> {
    const toBeAdd = JSON.stringify(item);
    return this.http.post<T>(requestUrl, toBeAdd, { headers: { 'Content-Type': 'application/json' } });

  }

  public postbyUrl<T>(requestUrl: string): Observable<T> {
    return this.http.post<T>(requestUrl, {});
  }

  public update<T>(requestUrl: string, objects: any, id): Observable<T> {
    return this.http.put<T>(requestUrl + "/" + id, objects);
  }

  public updateByParam<T>(requestUrl: string, objects: any): Observable<T> {
    const paramValue = this.buildQueryParams(objects);
    return this.http.put<T>(requestUrl, { params: paramValue });
  }

  public delete<T>(requestUrl: string, id: number): Observable<T> {
    return this.http.delete<T>(requestUrl + "/" + id);
  }

  public deleteByParam<T>(requestUrl: string, objects: any): Observable<T> {
    const paramValue = this.buildQueryParams(objects);
    return this.http.delete<T>(requestUrl, { params: paramValue });
  }

  public getMultipleParam<T>(requestUrl: string, objects: any): Observable<T> {
    const paramValue = this.buildQueryParams(objects);
    return this.http.get<T>(requestUrl, { params: paramValue });
  }

  public getByurl<T>(requestUrl): Observable<T> {
    return this.http.get<T>(requestUrl);
  }
  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  public getAllbyid<T>(requestUrl: string): Observable<T> {
    return this.http.get<T>(requestUrl);
  }

  public buildQueryParams(source: any): HttpParams {
    let target: HttpParams = new HttpParams();
    Object.keys(source).forEach((key: string) => {
      const value: string | number | boolean | Date = source[key];
      if (typeof value !== "undefined" && value !== null) {
        target = target.append(key, value.toString());
      }
    });
    return target;
  }
}

@Injectable()
export class AccountHttpInterceptor implements HttpInterceptor {
  constructor() { }
  public apiURL = API_GATEWAY.SERVER + "/category";
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.has("Accept")) {
      request = request.clone({
        headers: request.headers.set("Accept", "application/json"),
      });
    }

    if (
      request.url.indexOf(`${this.apiURL}/getVendorProductLOBByCategoryId`) === -1
    ) {
      const token = localStorage.getItem("access_token");
      if (token) {
        request = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + token),
        });
      }
    }
    return next.handle(request);
  }
}

