import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/planning/add']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/planning/add';
  }

  // convenience getter for easy access to form fields

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService
      .login(this.f['email'].value, this.f['password'].value)
      .then(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate([this.returnUrl]);
        }
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  }
}
