import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-service-product-image-event-detail',
  imports: [CommonModule], // Bổ sung CommonModule vào đây
  templateUrl: './service-product-image-event-detail.html',
  styleUrls: ['./service-product-image-event-detail.css']
})
export class ServiceProductImageEventDetailComponent implements OnInit {
  selectedProduct: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private pservice: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id) {
        let allProducts: any[] = this.pservice.getProductList();
        // Dùng == để so sánh không phân biệt chuỗi/số (sửa lỗi TS2367)
        this.selectedProduct = allProducts.find(p => p.id == id);
      }
    });
  }

  goBack() {
    this.router.navigate(['service-product-image-event']);
  }
}