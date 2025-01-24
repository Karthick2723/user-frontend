import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { API_GATEWAY } from 'src/environments/environment';
import { HttpService } from './http-services';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private selectedLinkSubject = new BehaviorSubject<string>('Orders');
  selectedLink$ = this.selectedLinkSubject.asObservable();

  public offeringapiURL = API_GATEWAY.SERVER + "/category";
  public prodapiURL = API_GATEWAY.SERVER + "/products";
  public lobURL = API_GATEWAY.SERVER + "/lob";
  public detailUrl = API_GATEWAY.SERVER + "/profileDetails";
  public updateURl = API_GATEWAY.SERVER + '/updateProfile';
  public eventUrl = API_GATEWAY.SERVER + '/events';
  public submitConatactUrl = API_GATEWAY.SERVER + '/contact';
  public getProduct = API_GATEWAY.SERVER + '/products';
  public productTags = API_GATEWAY.SERVER + '/productTags';
  public vendor = API_GATEWAY.SERVER + '/vendor';
  public banner = API_GATEWAY.SERVER + '/banner';
  public article = API_GATEWAY.SERVER + '/articles';
  public  updateURls = API_GATEWAY.SERVER+'/updateUsers';
  public userAccountDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public categorydataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  private serviceUrl: string;
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();
  private authToken: string | null = null; 
  private categoriesSubject = new BehaviorSubject<any[]>([]);
  public categories$ = this.categoriesSubject.asObservable();
  constructor(private httpClient: HttpService) { }

  setSelectedLink(link: string) {
    this.selectedLinkSubject.next(link);
  }
  getalloffering(): Observable<any> {
    this.serviceUrl = this.offeringapiURL + "/published";
    return this.httpClient.getAll(this.serviceUrl);
  }
  

  getCategoryById(categoryId: number): Observable<any> {
    return this.httpClient.getAllbyid(`${this.offeringapiURL}/getVendorProductLOBByCategoryId/${categoryId}`);
  }
  productTagsByCategoryId(categoryId:number):Observable<any>{
    return this.httpClient.getAllbyid(`${this.offeringapiURL}/productTagsByCategoryId/${categoryId}`);
  }

  getproductId(id: number): Observable<any> {
    this.serviceUrl = this.prodapiURL;
    return this.httpClient.getSingle(this.serviceUrl, id);
  }

  getLobById(id: number): Observable<any> {
    this.serviceUrl = this.lobURL;
    return this.httpClient.getSingle(this.serviceUrl, id);
  }

  getOrderDeatils(id: number): Observable<any> {
    this.serviceUrl = this.detailUrl + `/${id}`;
    return this.httpClient.getAll(this.serviceUrl)
  }

  updateall(item, id): Observable<any> {
    this.serviceUrl = this.updateURl;
    return this.httpClient.update(this.serviceUrl, item, id);
  }

  updateURlss(item,id):Observable<any>{
    this.serviceUrl= this.updateURls;
    return this.httpClient.update(this.serviceUrl,item,id);
  }

  getEvents(): Observable<any> {
    this.serviceUrl = this.eventUrl + '/getRecentThreeEventDetails';
    return this.httpClient.getAll(this.serviceUrl);
  }

  getAllCategory(): Observable<any> {
    this.serviceUrl = this.offeringapiURL + '/getAllCategory';
    return this.httpClient.getAll(this.serviceUrl);
  }

/*   getAllCategoryPublished(): Observable<any> {
    this.serviceUrl = this.offeringapiURL + '/published';
    return this.httpClient.getAll(this.serviceUrl);
  } */
  getAllCategoryPublished(): Observable<any> {
    this.serviceUrl = this.offeringapiURL + '/published';
    return this.httpClient.getAll<any[]>(this.serviceUrl).pipe(
      tap(categories => {
        this.categoriesSubject.next(categories);
      })
    );
  }

  getAllProducts(tag, vendor): Observable<any> {
    this.serviceUrl = `${this.prodapiURL}/productswithtagandvendors/${tag + '&' + vendor}`;
    return this.httpClient.get(this.serviceUrl)
  }

  getAllbycategoryId(id: any): Observable<any> {
    this.serviceUrl = `${this.prodapiURL}/categories/${id}`;
    return this.httpClient.get(this.serviceUrl);
  }

  autoCompleteProductTag(tag: any): Observable<any> {
    this.serviceUrl = `${this.prodapiURL}/autocomplete/product-tags/${tag}`;
    return this.httpClient.get(this.serviceUrl);
  }

  autoCompleteVendor(vendor: any): Observable<any> {
    this.serviceUrl = `${this.prodapiURL}/autocomplete/vendors/${vendor}`;
    return this.httpClient.get(this.serviceUrl);
  }

  getAllTagsandVendor(): Observable<any> {
    this.serviceUrl = this.prodapiURL + '/getAll';
    return this.httpClient.get(this.serviceUrl);
  }
  submitContactForm(item: any): Observable<any> {
    this.serviceUrl = this.submitConatactUrl + '/submit';
    return this.httpClient.post(this.serviceUrl, item)
  }

  getAllProduct(): Observable<any> {
    this.serviceUrl = this.getProduct + '/getAll';
    return this.httpClient.getAll(this.serviceUrl);
  }

  getProductsById(ProudctId: number): Observable<any> {
    this.serviceUrl = this.getProduct + '/getProductById';
    return this.httpClient.getSingle(this.serviceUrl, ProudctId)
  }

  getAllProductTag(): Observable<any> {
    this.serviceUrl = this.productTags + '/getAllProductTags';
    return this.httpClient.getAll(this.serviceUrl);
  }

  getAllVendor(): Observable<any> {
    this.serviceUrl = this.vendor + '/getAllVendor';
    return this.httpClient.getAll(this.serviceUrl);
  }

  getProductsByVendorId(vendorId: any): Observable<any> {
    this.serviceUrl = this.prodapiURL + '/vendors';
    return this.httpClient.getAllbyid(`${this.serviceUrl}/${vendorId}`);
  }
  getProdcutsByTagId(TagID: any): Observable<any> {
    this.serviceUrl = this.productTags + '/getProductsByProductTagId';
    return this.httpClient.getAllbyid(`${this.serviceUrl}/${TagID}`);
  }

  getActiveBanners(): Observable<any[]> {
    this.serviceUrl = this.banner + '/publishedBanner';
    return this.httpClient.get(this.serviceUrl);
  }

  getAllPublished(): Observable<any[]> {
    this.serviceUrl = this.getProduct + '/published';
    return this.httpClient.get(this.serviceUrl);
  }

  open() {
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
  }
  getAllPublishedArticle(): Observable<any>{
    this.serviceUrl=this.article+"/publishedArticles";
    return this.httpClient.getAll(this.serviceUrl);
  }
  getArticleById(articleId: number): Observable<any> {
    this.serviceUrl = this.article + '/getArticleById';
    return this.httpClient.getSingle(this.serviceUrl, articleId)
  }
  getTopThreeArticle(): Observable<any>{
    this.serviceUrl=this.article+"/getTop3Articles";
    return this.httpClient.getAll(this.serviceUrl);
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('firebaseAuthToken', token); // Store the token for future use
  }
}
