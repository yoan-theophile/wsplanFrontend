import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { User, UserProfile } from 'src/app/modules/core/model';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;
  editMode: boolean = false;
  currentUser: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      class: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });

    this.loading = true;
    const studentId = +this.route.snapshot.params['id'];
    if (studentId) {
      // Chargement des donnees de l’étudiant
      this.userService.getStudent(studentId).then((data) => {
        this.currentUser = data;
        if (this.currentUser.id) {
          this.editMode = true;
          this.registerForm.setValue({
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName,
            class: this.currentUser.class,
            sex: this.currentUser.sex,
            email: this.currentUser.email,
            password: this.currentUser.password,
          });
        }
        this.loading = false;
      });
    } else {
      this.editMode = false;
      this.loading = false;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    let response: Promise<any>;

    if (this.editMode) {
      response = this.userService.updateStudent(
        new User({
          id: this.currentUser.id,
          profile: UserProfile.Student,
          email: this.f['email'].value,
          password: this.f['password'].value,
          token: this.currentUser.token,
          firstName: this.f['firstName'].value,
          lastLog: this.currentUser.lastLog,
          lastName: this.f['lastName'].value,
          sex: this.f['sex'].value,
          class: this.f['class'].value,
          active: this.currentUser.active,
        })
      );
    } else {
      response = this.userService
        // TODO: NEED TO REVIEW THIS FUNCTION. IN REALITY, THE TOKEN IS GIVEN FROM THE BACKEND AND LASTLOG PLUS ACTIVE ARE SETTING BY THE BACKEND
        .register(
          new User({
            profile: UserProfile.Student,
            email: this.f['email'].value,
            password: this.f['password'].value,
            token: 'fake-jwt-token',
            firstName: this.f['firstName'].value,
            lastLog: new Date().toISOString().split('T')[0],
            lastName: this.f['lastName'].value,
            sex: this.f['sex'].value,
            class: this.f['class'].value,
            active: true,
          })
        );
    }

    response
      .then((val) => {
        this.loading = false;
        this.router.navigateByUrl('/registration/list-of-students');
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }
}
