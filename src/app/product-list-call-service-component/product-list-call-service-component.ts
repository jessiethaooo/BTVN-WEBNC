import { Component, OnInit } from '@angular/core';
import { IPProduct } from '../classes/IPProduct';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product-list-call-service-component',
  standalone: false,
  styleUrl: './product-list-call-service-component.css',
  templateUrl: './product-list-call-service-component.html',
})
export class ProductListCallServiceComponent implements OnInit {
  products: IPProduct[] = [];
  minPrice: number = 0;
  maxPrice: number = 500;

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.products = this.ps.getProductList();
  }
  doFilter()
  {
    this.products = this.ps.filterProductList(this.minPrice,this.maxPrice)
  }
}
