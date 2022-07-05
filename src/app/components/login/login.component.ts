import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit () {
    console.log(this.loginForm.value)
    console.log("📜 ---------------------------------------------------------------------------------------------------------------📜")
    console.log("📜 ~ file: login.component.ts ~ line 23 ~ LoginComponent ~ onSubmit ~ this.loginForm.value", this.loginForm.value)
    console.log("📜 ---------------------------------------------------------------------------------------------------------------📜")
  }
}
