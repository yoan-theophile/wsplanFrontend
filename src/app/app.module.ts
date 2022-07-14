import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './components/home/home.component';
import { PlanningTableOverviewComponent } from './components/shared/planning-table-overview/planning-table-overview.component';
import { HttpHeaderInterceptor } from './interceptors/http-headers.interceptor';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { EditWorkingHourFormComponent } from './components/shared/edit-working-hour-form/edit-working-hour-form.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { FakeBackendInterceptor } from './interceptors/fake-backend.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import {MatListModule} from '@angular/material/list';
import { EditWorkingHourComponent } from './components/edit-working-hour/edit-working-hour.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { WeeklyPlanningOverviewComponent } from './components/weekly-planning-overview/weekly-planning-overview.component';
import {MatTreeModule} from '@angular/material/tree';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PlanningTableOverviewComponent,
    EditWorkingHourFormComponent,
    RegisterComponent,
    AlertComponent,
    EditWorkingHourComponent,
    WeeklyPlanningOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTreeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
    // {
    //   // use fake backend in place of Http service for backend-less development
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: FakeBackendInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
