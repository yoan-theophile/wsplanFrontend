import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core/interceptors/guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'planning',
    pathMatch: 'full',
  },
  {
    path: 'planning/login',
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
    path: 'register',
    loadChildren: () =>
      import('./modules/register/register-routing.module').then(
        (mod) => mod.RegisterRoutingModule
      ),
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
