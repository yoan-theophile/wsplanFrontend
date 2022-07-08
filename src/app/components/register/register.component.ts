import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      class: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)],
    });
  }
  onSubmit() {
    console.log(this.registerForm.value);
  }
}
