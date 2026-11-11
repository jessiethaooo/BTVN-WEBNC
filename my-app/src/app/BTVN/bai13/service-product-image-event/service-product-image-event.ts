import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-service-product-image-event',
  imports: [CommonModule], // Bổ sung CommonModule vào đây
  templateUrl: './service-product-image-event.html',
  styleUrls: ['./service-product-image-event.css']
})
export class ServiceProductImageEventComponent implements OnInit {
  products: any[] = [];

  constructor(private pservice: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products = this.pservice.getProductList();
  }

  viewDetail(p: any) {
    this.router.navigate(['service-product-image-event', p.id]);
  }
}