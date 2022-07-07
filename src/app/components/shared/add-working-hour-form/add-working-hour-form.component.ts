import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-working-hour-form',
  templateUrl: './add-working-hour-form.component.html',
  styleUrls: ['./add-working-hour-form.component.scss']
})
export class AddWorkingHourFormComponent implements OnInit {
  addWorkingHourForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addWorkingHourForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.addWorkingHourForm.value)
  }
}
