import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DeviceService } from './device.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'device.component.html',
  styleUrls: ['device.component.css'],
  providers: [DeviceService]
})
export class DeviceComponent implements OnInit {
  busy: Promise<any>;
  public item :any={_id:"",hostname:"",loopback:""};
  public listItem:any=[];
  public msg = '';
  public isForgotPassword: boolean = false;
  public emailNew: string;

  constructor(
    private _service: DeviceService,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getDevices()
  }

  clear(){
    this.item={_id:"",hostname:"",loopback:""};
  }

  addDevice() {

    let obj={hostname:this.item.hostname,loopback_ipv4:this.item.loopback};

    if(this.item._id==""){
      this.busy = this._service.addDevice(obj).then(
      (res: any) => {  

      console.log("res",res.data)   
      this.listItem.push(res.data);

      this.item  ={_id:"",hostname:"",loopback:""};
        
       this.toastr.success(res.msg);


         //this._router.navigate(['/']);
        
      },
      (error) => {
        if(error.headers._headers.get('content-type')[0] == "application/json; charset=utf-8") {
          this.toastr.error(error.json().msg);
        } else {
          this.toastr.error('you are not able to login. Please try later.');
        }
      }
    );
    }else{
      let obj={_id:this.item._id,hostname:this.item.hostname,loopback_ipv4:this.item.loopback};
    this.busy = this._service.updateDevice(obj).then(
      (res: any) => {  

      
      this.item  ={_id:"",hostname:"",loopback:""};
        
       this.toastr.success(res.msg);
       this.getDevices();


         //this._router.navigate(['/']);
        
      },
      (error) => {
        if(error.headers._headers.get('content-type')[0] == "application/json; charset=utf-8") {
          this.toastr.error(error.json().msg);
        } else {
          this.toastr.error('you are not able to login. Please try later.');
        }
      }
    );
    }
    


  }

getItem(item){
this.item={_id:item._id,hostname:item.hostname,loopback:item.loopback_ipv4};

}


  getDevices(){
   this.busy = this._service.getDevices().then(
      (res: any) => {
       this.listItem = res.data;
      
        
      },
      (error) => {
        if(error.headers._headers.get('content-type')[0] == "application/json; charset=utf-8") {
          //this.toastr.error(error.json().msg);
        } else {
         // this.toastr.error('you are not able to login. Please try later.');
        }
      }
    );
 }

 removeDevice(deviceId){
   this.busy = this._service.removeDevice(deviceId).then(
      (res: any) => {
       this.toastr.success(res.msg);
         this.getDevices();

      },
      (error) => {
        if(error.headers._headers.get('content-type')[0] == "application/json; charset=utf-8") {
          //this.toastr.error(error.json().msg);
        } else {
         // this.toastr.error('you are not able to login. Please try later.');
        }
      }
    );
 }






}
