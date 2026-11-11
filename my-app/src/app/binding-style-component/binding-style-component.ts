import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-style-component',
  standalone: false,
  styleUrl: './binding-style-component.css',
  templateUrl: './binding-style-component.html',
})
export class BindingStyleComponent {
  // Sửa 'progresValue' thành 'progressValue' (thêm chữ s)
  public progressValue: number = 50; 
  public statusColor: string = 'green';

  isCritical() {
    return this.progressValue > 80; // Logic tùy chọn của bạn
  }
}
