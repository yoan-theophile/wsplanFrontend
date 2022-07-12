import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private workingHourRangeService: WorkingHourRangeService
  ) {}

  ngOnInit(): void {
    this.editWorkingHourForm = this.formBuilder.group({
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
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
    this.workingHourRangeService
      .add(
        this.f['date'].value,
        this.f['start_time'].value,
        this.f['end_time'].value
      )
      .then(() => {
        this.loading = false;
        this.editWorkingHourForm.reset();
      });
  }
}
