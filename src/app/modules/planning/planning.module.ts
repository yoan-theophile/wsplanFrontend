import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditWorkingHourComponent } from './components/edit-working-hour/edit-working-hour.component';
import { EditWorkingHourFormComponent } from './components/edit-working-hour-form/edit-working-hour-form.component';
import { PlanningTableOverviewComponent } from './components/planning-table-overview/planning-table-overview.component';
import { WeeklyPlanningOverviewComponent } from './components/weekly-planning-overview/weekly-planning-overview.component';
import { WorkingStudentPlanningComponent } from './components/working-student-planning/working-student-planning.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

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
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [
    EditWorkingHourComponent,
    PlanningTableOverviewComponent,
    WeeklyPlanningOverviewComponent,
  ],
})
export class PlanningModule {}
