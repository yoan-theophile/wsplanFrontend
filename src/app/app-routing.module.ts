import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditWorkingHourComponent } from './components/edit-working-hour/edit-working-hour.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WeeklyPlanningOverviewComponent } from './components/weekly-planning-overview/weekly-planning-overview.component';
import { WorkingStudentPlanningComponent } from './components/working-student-planning/working-student-planning.component';
import { AuthGuard } from './interceptors/guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'planning',
    pathMatch: 'full',
  },
  {
    path: 'planning',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/planning/students',
        pathMatch: 'full',
      },
      {
        path: 'add',
        component: EditWorkingHourComponent,
      },
      {
        path: 'days',
        component: WeeklyPlanningOverviewComponent,
      },
      {
        path: 'students',
        component: WorkingStudentPlanningComponent,
      },
    ],
  },
  { path: 'planning/login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
