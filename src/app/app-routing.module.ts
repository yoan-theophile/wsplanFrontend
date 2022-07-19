import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core/interceptors/guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login-routing.module').then(
        (mod) => mod.LoginRoutingModule
      ),
  },
  {
    path: 'planning',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./modules/planning/planning-routing.module').then(
        (mod) => mod.PlanningRoutingModule
      ),
  },
  {
    path: 'manager',
    // canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./modules/manager/manager-routing.module').then(
        (mod) => mod.ManagerRoutingModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./modules/registration/registration-routing.module').then(
        (mod) => mod.RegistrationRoutingModule
      ),
  },
  {
    path: '',
    redirectTo: 'planning/students',
    pathMatch: 'full',
  },

  // otherwise redirect to login
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
