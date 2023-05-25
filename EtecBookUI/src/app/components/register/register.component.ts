import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  checkName() {
    return this.registerForm.controls['name'].dirty && this.registerForm.controls['name'].errors?.['required']
  }

  checkEmail() {
    return this.registerForm.controls['email'].dirty && this.registerForm.controls['email'].errors?.['required']
  }

  checkEmailValid() {
    return this.registerForm.controls['email'].dirty && this.registerForm.controls['email'].errors?.['email']
  }

  checkPassword() {
    return this.registerForm.controls['password'].dirty && this.registerForm.controls['password'].errors?.['required']
  }

  checkPasswordLength() {
    return this.registerForm.controls['password'].dirty && this.registerForm.controls['password'].errors?.['minlength']
  }

  onSubmit() {
    if (this.registerForm.valid) {
      //Enviar os dados ao backend
      console.log(this.registerForm.value);
    } else {
      //Dispara um erro
      this.validateAllFormFields(this.registerForm);
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
