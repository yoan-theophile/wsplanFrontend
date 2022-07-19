import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { StudentListComponent } from './components/student-list/student-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'new-student', pathMatch: 'full' },
  {
    // Add a new student
    path: 'new-student',
    component: RegisterComponent,
  },
  { path: 'list-of-students', component: StudentListComponent },
  { path: 'edit-student/:id', component: RegisterComponent },

  // TODO: SET THE CORRECT REDIRECTION
  // otherwise redirect to register
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
