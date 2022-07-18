import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { CoreModule } from './modules/core/core.module';
import { PlanningModule } from './modules/planning/planning.module';
import { RegisterModule } from './modules/register/register.module';

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
    RegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
