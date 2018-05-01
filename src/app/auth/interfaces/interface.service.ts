import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { BaseService } from "../../services/base-service";
import { environment } from '../../../environments/environment';



@Injectable()
export class InterfaceService {
  rootUrl: string =   environment.config.BASE_URL;
  baseUrl: string =   environment.config.API_URL;

  constructor(private _router: Router, private http: Http) { }

  getOneDevice(deviceId) {       
        
       return this.http.get(`${this.baseUrl}getone/${deviceId}`)
                    .toPromise().then((res: Response) => res.json());
                 
   
  }


   addInterface(item) {
     const headers = new Headers({ });
    const options = new RequestOptions({ headers: headers });
     return this.http.post(`${this.baseUrl}add_interface`, item,options)
                    .toPromise().then((res: Response) => res.json());
  }


   updateInterface(item) {
     const headers = new Headers({ });
    const options = new RequestOptions({ headers: headers });
     return this.http.post(`${this.baseUrl}edit_interface`, item,options)
                    .toPromise().then((res: Response) => res.json());
  }

  removeInterface(deviceId,interfaceId) {
     const headers = new Headers({ });
    const options = new RequestOptions({ headers: headers });
     return this.http.delete(`${this.baseUrl}remove_interface/${deviceId}/${interfaceId}`,options)
                    .toPromise().then((res: Response) => res.json());
  }
}
