import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BusyModule } from 'angular2-busy';
import { ToastrModule } from 'ngx-toastr';

//import { NG2DataTableModule } from "angular2-datatable-pagination";

import { SocketService } from './socket.service';

import { CustomFormsModule } from 'ng2-validation'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
//import { Ng2TelInputModule } from 'ng2-tel-input';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HttpModule,
    BusyModule,
    FormsModule,
    CustomFormsModule,
    CommonModule,
    //NG2DataTableModule,
   // Ng2TelInputModule,
   // NgxIntlTelInputModule,
    BsDropdownModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [SocketService],
  declarations: []
})
export class AppSharedModule { }
