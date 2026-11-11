import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { createSlug } from '../classes/slug-helper';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-list-component',
  standalone: false,
  styleUrl: './fashion-list-component.css',
  templateUrl: './fashion-list-component.html',
})
export class FashionListComponent implements OnInit {
  fashions = signal<Fashion[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private fashionService: FashionAPIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  // 1. Tải danh sách Fashion từ backend
  loadFashions(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.fashions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Không thể tải danh sách Fashion.');
        this.loading.set(false);
      }
    });
  }

  getSlug(fashion: Fashion): string {
    return fashion.slug || createSlug(fashion.fashion_subject, fashion.IdF);
  }

  viewDetail(slug: string): void {
    this.router.navigate(['/fashion-detail', slug]);
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
      this.fashionService.deleteFashion(id).subscribe({
        next: () => {
          alert('Xóa thành công!');
          this.loadFashions(); // Cập nhật lại danh sách sau khi xóa
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Lỗi khi xóa dữ liệu.');
        }
      });
    }
  }
}