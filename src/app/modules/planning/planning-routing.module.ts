import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditWorkingHourComponent } from './components/edit-working-hour/edit-working-hour.component';
import { WeeklyPlanningOverviewComponent } from './components/weekly-planning-overview/weekly-planning-overview.component';
import { WorkingStudentPlanningComponent } from './components/working-student-planning/working-student-planning.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
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

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}
