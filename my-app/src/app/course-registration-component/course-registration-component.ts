import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseRegistration } from '../classes/CourseRegistration';


@Component({
  selector: 'app-course-registration-component',
  standalone: false,
  styleUrl: './course-registration-component.css',
  templateUrl: './course-registration-component.html',
})
export class CourseRegistrationComponent {
  /*onSubmit(form: NgForm) {
    if (form.valid) {
      let courseName = form.value.course;
      alert(JSON.stringify(courseName))
      alert("Ten khóa học: " + courseName);
    }
  }
}*/
  courseModel = new CourseRegistration()
  onSubmit()
  {
alert("Thông tin đăng ký khoá học:" +this.courseModel.getInfor());
  }
}