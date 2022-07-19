import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditWorkingHourComponent } from './components/edit-working-hour/edit-working-hour.component';
import { EditWorkingHourFormComponent } from './components/edit-working-hour-form/edit-working-hour-form.component';
import { PlanningTableOverviewComponent } from './components/planning-table-overview/planning-table-overview.component';
import { WeeklyPlanningOverviewComponent } from './components/weekly-planning-overview/weekly-planning-overview.component';
import { WorkingStudentPlanningComponent } from './components/working-student-planning/working-student-planning.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EditWorkingHourComponent,
    EditWorkingHourFormComponent,
    PlanningTableOverviewComponent,
    WeeklyPlanningOverviewComponent,
    WorkingStudentPlanningComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    EditWorkingHourComponent,
    PlanningTableOverviewComponent,
    WeeklyPlanningOverviewComponent,
  ],
})
export class PlanningModule {}
