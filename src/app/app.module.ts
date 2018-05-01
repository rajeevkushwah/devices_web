import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomFormsModule } from 'ng2-validation'
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing';

import { AppSharedModule } from './shared/app-shared.module';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { CommonService } from './services/common.service';

import { AppComponent } from './app.component';
 import { InterfaceComponent } from './auth/interfaces/interface.component';
 import { DeviceComponent } from './auth/devices/device.component';
import {BusyModule} from 'angular2-busy';

import { MaterializeModule } from 'angular2-materialize';
import {DataTableModule} from "angular2-datatable";

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    InterfaceComponent     
   
  ],
  imports: [
     AppRoutingModule,
    BrowserAnimationsModule,
    CustomFormsModule,
    AppSharedModule,
    BusyModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MaterializeModule,
    DataTableModule
  ],
  providers: [AuthGuard, AuthService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
