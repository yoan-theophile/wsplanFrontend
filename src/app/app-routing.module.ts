import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core/interceptors/guard';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';

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
    canActivateChild: [AuthGuard],
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

  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
