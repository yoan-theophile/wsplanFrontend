import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { CoreModule } from './modules/core/core.module';
import { PlanningModule } from './modules/planning/planning.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { ManagerModule } from './modules/manager/manager.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    CoreModule,
    PlanningModule,
    RegistrationModule,
    ManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
