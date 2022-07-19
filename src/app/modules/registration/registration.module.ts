import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegisterComponent } from './components/register/register.component';


import { StudentListComponent } from './components/student-list/student-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RegisterComponent, StudentListComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule
  ],
  exports: [RegisterComponent],
})
export class RegistrationModule {}
