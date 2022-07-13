import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { WorkingHourRangeService } from 'src/app/services/working-hour-range.service';
import { WorkingHourRange } from '../../../model';

@Component({
  selector: 'app-edit-working-hour-form',
  templateUrl: './edit-working-hour-form.component.html',
  styleUrls: ['./edit-working-hour-form.component.scss'],
})
export class EditWorkingHourFormComponent implements OnInit {
  editWorkingHourForm!: FormGroup;
  loading: boolean = false;
  currentWorkingHourRange!: WorkingHourRange;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private workingHourRangeService: WorkingHourRangeService
  ) {}

  ngOnInit(): void {
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
          Object.keys(this.editWorkingHourForm.controls).forEach(key =>{
            this.editWorkingHourForm.controls[key].setErrors(null)
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
