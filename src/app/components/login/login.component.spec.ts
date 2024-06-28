import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, LoginComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = router.navigate as jasmine.Spy;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const usernameInput = component.loginForm.get('username');
    const passwordInput = component.loginForm.get('password');
    expect(usernameInput?.value).toBe('');
    expect(passwordInput?.value).toBe('');
  });

  it('should display validation errors when form is submitted with empty values', () => {
    const form = component.loginForm;
    const usernameInput = form.get('username');
    const passwordInput = form.get('password');

    usernameInput?.markAsTouched();
    passwordInput?.markAsTouched();
    fixture.detectChanges();

    const usernameError: DebugElement = fixture.debugElement.query(
      By.css('#username ~ .text-danger')
    );
    const passwordError: DebugElement = fixture.debugElement.query(
      By.css('#password ~ .text-danger')
    );

    expect(usernameError.nativeElement.textContent.trim()).toBe(
      'Username is required.'
    );
    expect(passwordError.nativeElement.textContent.trim()).toBe(
      'Password is required.'
    );
  });

  it('should display a minlength error when password length is less than 4', () => {
    const passwordInput = component.loginForm.get('password');
    passwordInput?.setValue('123');
    passwordInput?.markAsTouched();
    fixture.detectChanges();

    const passwordError: DebugElement = fixture.debugElement.query(
      By.css('#password ~ .text-danger')
    );

    expect(passwordError.nativeElement.textContent.trim()).toBe(
      'Minimum length should be>=4.'
    );
  });

  it('should navigate to the home page on valid form submission', () => {
    component.loginForm.setValue({
      username: 'testuser',
      password: 'password',
    });
    component.onSubmit();
    component.goToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should not navigate to the home page on invalid form submission', () => {
    component.loginForm.setValue({ username: '', password: '' });
    component.onSubmit();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should emit switchToSignup event when goToSignup is called', () => {
    spyOn(component.switchToSignup, 'emit');
    component.goToSignup();
    expect(component.switchToSignup.emit).toHaveBeenCalledWith(
      component.islogin
    );
  });
});
