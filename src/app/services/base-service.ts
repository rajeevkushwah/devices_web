import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from "rxjs";
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import { NotificationsService } from '../shared/notifications.service';

export class BaseService {
  http: Http;
  url = new Map;
  notifier: NotificationsService = null;
  constructor(http, notifier, suffix) {
    this.http = http;
    this.notifier = notifier;
    this.url.set('socket', environment.config.SOCKET_URL);
    this.url.set('base', environment.config.BASE_URL);
    this.url.set('api', environment.config.API_URL);
    this.url.set('suffix', suffix);
  }

  authToken() {
    const headers = new Headers({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return new RequestOptions({ headers: headers });
  }

  getHeader(language) {
    const headers = new Headers({ 'language': language, user_id:localStorage.getItem('userID'), name:localStorage.getItem('name'), userID:localStorage.getItem('userID'), 'Authorization': `Bearer ${localStorage.getItem('token')}`});
    return new RequestOptions({ headers: headers });
  }

  getUrl(suffix) {
    return this.url.get('api') + (suffix ? suffix : this.url.get('suffix'));
  }

  getItems(language, suffix = null) {
    return this.http.get(this.getUrl(suffix), this.getHeader(language))
                    .toPromise().then(response => response.json())
                    .catch(data => this.handleError(data));
  }

  getXItems(obj, language, suffix = null) {
    return this.http.post(this.getUrl(suffix), obj, this.getHeader(language))
                    .toPromise().then(response => response.json())
                    .catch(data => this.handleError(data));
  }

  getItem(id, language, suffix = null) {
    return this.http.get(this.getUrl(suffix) + '/' + id, this.getHeader(language))
                    .toPromise().then(response => response.json())
                    .catch(data => this.handleError(data));
  }

  addItem(obj, language, suffix = null) {
    return this.http.post(this.getUrl(suffix), obj, this.getHeader(language))
                    .toPromise().then(response => response.json())
                    .catch(data => this.handleError(data));
  }

  updateItem(id, obj, language, suffix = null) {
    return this.http.put(this.getUrl(suffix), obj, this.getHeader(language)).toPromise()
                    .then(response => response.json())
                    .catch(data => this.handleError(data));
  }

  removeItem(obj, language, suffix = null) {
    return this.http.put(this.getUrl(suffix), obj, this.getHeader(language))
                    .toPromise().then(response => response.json())
                    .catch(data => this.handleError(data));
  }

  deleteItem(obj, language, suffix = null) {
    const headers = new Headers({ 'language': language, user_id:localStorage.getItem('userID'), userID:localStorage.getItem('userID'), 'Authorization': `Bearer ${localStorage.getItem('token')}`});
    return this.http.delete(this.getUrl(suffix), this.getHeader(language))
                    .toPromise().then(response => response.json())
                    .catch(data => this.handleError(data));
  }

  toggleStatus(obj, language, suffix = null) {
    return this.http.put(this.getUrl(suffix), obj, this.getHeader(language))
                    .toPromise().then(response => response.json())
                    .catch(data => this.handleError(data));
  }

  getCountries(language) {
    return this.getItems(language, 'countries');
  }

  handleError(error,status=null) {
  if(status)
  if(status===400){
    this.notifier.notify('error', JSON.parse(error.response).msg);
  }
      if(error.hasOwnProperty('status')) {
        if(error.status===403){
          this.notifier.notify('error', 'Unauthorized Access.');
        }else if(error.headers._headers.get('content-type')[0] == "application/json; charset=utf-8") {
          this.notifier.notify('error', error.json().msg);
        } else {
          this.notifier.notify('error', 'Unable process your request.');
        }
      }


    return null;
  }
}
