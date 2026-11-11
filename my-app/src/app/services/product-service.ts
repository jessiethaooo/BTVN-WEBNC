import { Injectable } from '@angular/core';
import { IPProduct } from '../classes/IPProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IPProduct[] = [
    { id: 1, name: 'Coca Cola', price: 10, image: 'https://www.coca-cola.com/content/dam/onexp/vn/vi/brands/coca-cola/vn-coca-cola.png' },
    { id: 2, name: 'Pepsi', price: 10, image: 'https://product.hstatic.net/1000301274/product/_10100993__pepsi_cola_320ml_sleek_lon_29e233d9c27b4e6f85995a290d5fcad2.png' },
    { id: 3, name: 'Sting Dâu', price: 12, image: 'https://product.hstatic.net/200000460455/product/sting_dau_sleek_lon__320ml__7ea37f02dff64103ae8121a3f9b193c0_master.jpg' },
  ];

  constructor() { }

  getProductList(): IPProduct[] {
    return this.products;
  }

  getProductDetail(id: number): IPProduct | undefined {
    return this.products.find(x => x.id === id);
  }

  filterProductList(minPrice: number, maxPrice: number): IPProduct[] {
    return this.products.filter(p => p.price >= minPrice && p.price <= maxPrice);
  }
}