import { Component } from '@angular/core';
import { IPProduct } from '../classes/IPProduct';

@Component({
  selector: 'app-product-list-component',
  standalone: false,
  styleUrl: './product-list-component.css',
  templateUrl: './product-list-component.html',
})
export class ProductListComponent {
  products:IPProduct[]=
  [
{ id: 1, name: 'Iphone 18', price: 100, image: 'https://minhtuanmobile.com/uploads/products/260910065147-iphone-18-pro-256gb-chinh-hang-vn-2.png' },
    { id: 2, name: 'Iphone 17prm', price: -50, image: 'https://minhtuanmobile.com/uploads/products/251227020732-iphone-17-pro-max-256gb-2.jpg' },
    { id: 3, name: 'Macbook Pro M5', price: 3000, image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/e/_en_5_14.png' },
    { id: 4, name: ' Lenovo IdeaPad Slim 5', price: 2000, image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_11__7_26_3.png' },
    { id: 5, name: 'Samsung Galaxy S26 Ultra', price: 500, image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-samsung-galaxy-s26-ultra_1.jpg' },
  ];
}

