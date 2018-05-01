import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { RouterModule } from '@angular/router';
import { InterfaceService } from './interface.service';

import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  templateUrl: 'interface.component.html',
  styleUrls: ['interface.component.css'],
  providers: [InterfaceService]
})
export class InterfaceComponent implements OnInit {
  busy: Promise<any>;
  modalActions = new EventEmitter<string|MaterializeAction>();
  public device :any;
  public deviceId :String; 
  public interface :any={device_id:"",interface_id:"",interface:"",interface_ipv4:""};
  public interface_list:any=[];

  constructor(
    private _service: InterfaceService,
    private _router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    
     setTimeout(function(){
      $(".clcikkkk").click();
    },1000);

this.activatedRoute.params.subscribe((params: Params) => {
      this.deviceId = params['id'];
     
      this.getOne(this.deviceId);
    });
    
  }
 clear(){
     this.interface  ={device_id:"",interface_id:"",interface:"",interface_ipv4:""};
  }

addInterface() {

    let obj={device_id:this.deviceId,interface:this.interface.interface,interface_ipv4:this.interface.loopback};
      
      if(this.interface.interface_id==""){
      this.busy = this._service.addInterface(obj).then(
      (res: any) => {  

      console.log("res",res.data)   
      this.getOne(this.deviceId);

      this.interface  ={device_id:"",interface_id:"",interface:"",interface_ipv4:""};
        
       this.toastr.success(res.msg);


         
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
      let obj={device_id:this.deviceId,interface_id:this.interface.interface_id,interface:this.interface.interface,interface_ipv4:this.interface.loopback};
    this.busy = this._service.updateInterface(obj).then(
      (res: any) => {  

      
      this.interface  ={device_id:"",interface_id:"",interface:"",interface_ipv4:""};
        
       this.toastr.success(res.msg);
       this.getOne(this.deviceId);


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

this.interface={device_id:this.deviceId,interface_id:item._id,interface:item.interface,loopback:item.interface_ipv4};;


}





  getOne(deviceId){

     this.busy = this._service.getOneDevice(deviceId).then(
      (res: any) => {
       
        this.device=res.data;
        this.interface_list=this.device.interfaces;
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

  openModal(){
    this.modalActions.emit({action:"modal",params:['open']});   

  }
  closeModal(){
    this.modalActions.emit({action:"modal",params:['close']});   
    this._router.navigate([`/devices`]);
  }


  removeInterface(interfaceId){
   this.busy = this._service.removeInterface(this.deviceId,interfaceId).then(
      (res: any) => {
       this.toastr.success(res.msg);
         this.getOne(this.deviceId);

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
