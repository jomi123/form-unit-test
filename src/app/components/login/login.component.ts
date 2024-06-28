import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: number = 0;

  constructor(private router: Router) {}
  loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  onSubmit() {
    if (this.loginForm?.valid) {
      console.log(this.loginForm.value);
    }
  }
  @Output() switchToSignup = new EventEmitter<boolean>();
  islogin: boolean = false;
  goToSignup() {
    this.switchToSignup.emit(this.islogin);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
