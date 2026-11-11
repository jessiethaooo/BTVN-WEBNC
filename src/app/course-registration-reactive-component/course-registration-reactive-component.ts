import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-registration-reactive-component',
  standalone: false,
  styleUrl: './course-registration-reactive-component.css',
  templateUrl: './course-registration-reactive-component.html',
})
export class CourseRegistrationReactiveComponent {
  public regForm: FormGroup = new FormGroup(
    {
      name: new FormControl('Thanh Thao',[ Validators.required, Validators.minLength(3),this.customNameValidator]),
      email: new FormControl('minhvy@uel.edu.vn', [Validators.required, Validators.email]),
      password: new FormControl('1234567', [Validators.required, Validators.minLength(6)]),
      confirmPass: new FormControl('1234567', [Validators.required])
    }
  );
  setDefaultValues() {
    this.regForm.patchValue({
      name: 'Trần Duy Thanh',
      email: 'thanhtd@uel.edu.vn'
    });
  }
  customNameValidator(control: AbstractControl): {[key:string]: any} | null {
    const matchName = /[@#$%^&]/g.test(control.value);
    return matchName ? { 'nameNotMatch': {value: control.value} } : null;
  }
}
