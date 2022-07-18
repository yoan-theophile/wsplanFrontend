import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { WorkingHourRangeService } from 'src/app/modules/core/services/working-hour-range.service';
import { WorkingHourRange } from '../../../core/model';

@Component({
  selector: 'app-edit-working-hour-form',
  templateUrl: './edit-working-hour-form.component.html',
  styleUrls: ['./edit-working-hour-form.component.scss'],
})
export class EditWorkingHourFormComponent implements OnInit, OnDestroy {
  editWorkingHourForm!: FormGroup;
  loading: boolean = false;
  currentWorkingHourRange!: WorkingHourRange;
  currentWorkingHourRangeSubscriber!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private workingHourRangeService: WorkingHourRangeService
  ) {}

  ngOnInit(): void {
    this.currentWorkingHourRangeSubscriber =
      this.workingHourRangeService.currentWorkingHourRange$.subscribe({
        next: (data: WorkingHourRange) => {
          this.currentWorkingHourRange = data;
          if (this.editWorkingHourForm)
            this.editWorkingHourForm.patchValue(this.currentWorkingHourRange);
        },
      });

    this.editWorkingHourForm = this.formBuilder.group({
      date: [this.currentWorkingHourRange.date, Validators.required],
      start_time: [
        this.currentWorkingHourRange.start_time,
        Validators.required,
      ],
      end_time: [this.currentWorkingHourRange.end_time, Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.currentWorkingHourRangeSubscriber != null) {
      this.currentWorkingHourRangeSubscriber.unsubscribe();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editWorkingHourForm.controls;
  }

  onSubmit() {
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.editWorkingHourForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.currentWorkingHourRange.id) {
      this.workingHourRangeService
        .put({
          ...this.currentWorkingHourRange,
          date: this.f['date'].value,
          start_time: this.f['start_time'].value,
          end_time: this.f['end_time'].value,
        })
        .then(() => {
          this.loading = false;
          this.editWorkingHourForm.reset();
          this.workingHourRangeService.setDefaultCurrentWorkingHourRange();

          //  resetting the error state for each form control
          Object.keys(this.editWorkingHourForm.controls).forEach((key) => {
            this.editWorkingHourForm.controls[key].setErrors(null);
          });
        });
    } else {
      this.workingHourRangeService
        .add(
          this.f['date'].value,
          this.f['start_time'].value,
          this.f['end_time'].value
        )
        .then(() => {
          this.loading = false;
          this.editWorkingHourForm.reset();
          this.workingHourRangeService.setDefaultCurrentWorkingHourRange();
        });
    }
  }
}
