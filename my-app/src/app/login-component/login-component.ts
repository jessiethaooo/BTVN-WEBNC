import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 1. Import Router
import { UserLogin } from '../classes/UserLogin';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  // Khởi tạo model để binding
  user = new UserLogin();

  // 2. Inject Router vào constructor
  constructor(private router: Router) {}

  onLogin() {
    console.log('Thông tin đăng nhập:', this.user);

    // 3. Lưu trạng thái đăng nhập vào localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(this.user));

    alert('Đăng nhập thành công!');

    // 4. Điều hướng sang trang được bảo vệ bởi authGuard (ví dụ: /admin hoặc /samplenested)
    this.router.navigate(['/admin']);
  }
}