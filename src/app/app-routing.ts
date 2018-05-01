import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './services/auth-guard.service';
 import { InterfaceComponent } from './auth/interfaces/interface.component';
 import { DeviceComponent } from './auth/devices/device.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: InterfaceComponent,
  },
  {
    path: 'devices',
    component: DeviceComponent,    
                children: [                    
                    { path: 'interface/:id', component: InterfaceComponent }
                ]
  },
  {
    path: '**',
    redirectTo: 'devices',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { useHash: true}),HttpModule ],
  exports: [ RouterModule,HttpModule ]
})
export class AppRoutingModule { }