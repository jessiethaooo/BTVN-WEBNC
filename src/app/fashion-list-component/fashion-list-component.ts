import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-list-component',
  standalone: false,
  styleUrl: './fashion-list-component.css',
  templateUrl: './fashion-list-component.html',
})
export class FashionListComponent implements OnInit {
  fashions: any[] = [];
  
  // Đổi port theo backend của bạn (http://localhost:4000/fashions hoặc http://localhost:3002/fashions)
  private apiUrl = 'http://localhost:4000/fashions';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  // 1. Tải danh sách Fashion từ backend
  loadFashions(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.fashions = data;
      },
      error: (err) => {
        console.error('Lỗi tải danh sách:', err);
      }
    });
  }

  // 2. Chuyển sang màn hình Thêm mới
  onAdd(): void {
    this.router.navigate(['/fashion-new']);
  }

  // 3. Chuyển sang màn hình Chỉnh sửa
  onEdit(id: string): void {
    this.router.navigate(['/fashion-update', id]);
  }

  // 4. Xóa bài viết (có xác nhận confirm)
  onDelete(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa bài Fashion này không?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          alert('Xóa thành công!');
          this.loadFashions(); // Cập nhật lại danh sách sau khi xóa
        },
        error: (err) => {
          alert('Lỗi khi xóa dữ liệu!');
          console.error(err);
        }
      });
    }
  }
}