import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  datas = [
    {
      "Cateid": "cate1", 
      "CateName": "Nước ngọt",
      "Products": [
        {
          "ProductId": "p1", 
          "ProductName": "Coca Cola", 
          "Price": 100, 
          "Image": "https://www.coca-cola.com/content/dam/onexp/vn/vi/brands/coca-cola/vn-coca-cola.png"
        },
        {
          "ProductId": "p2", 
          "ProductName": "Pepsi", 
          "Price": 300, 
          "Image": "https://product.hstatic.net/1000301274/product/_10100993__pepsi_cola_320ml_sleek_lon_29e233d9c27b4e6f85995a290d5fcad2.png"
        },
        {
          "ProductId": "p3", 
          "ProductName": "Sting Dâu", 
          "Price": 200, 
          "Image": "https://product.hstatic.net/200000460455/product/sting_dau_sleek_lon__320ml__7ea37f02dff64103ae8121a3f9b193c0_master.jpg"
        }
      ]
    },
    {
      "Cateid": "cate2", 
      "CateName": "Bia",
      "Products": [
        {
          "ProductId": "p4", 
          "ProductName": "Heineken", 
          "Price": 500, 
          "Image": "https://www.heineken.com/media/zlhhgjsm/heineken-original-bottle.png"
        },
        {
          "ProductId": "p5", 
          "ProductName": "Bia 333", 
          "Price": 400, 
          "Image": "https://douongnhapkhau.com/wp-content/uploads/2025/12/18133-94894.jpg"
        },
        {
          "ProductId": "p6", 
          "ProductName": "Bia Sài Gòn", 
          "Price": 600, 
          "Image": "https://cdnv2.tgdd.vn/bhx-static/bhx/production/2026/2/image/Products/Images/2282/158349/bhx/bia-sai-gon-lager-lon-330ml-thung-24-lon_202602231128390411.jpg"
        }
      ]
    }
  ];

  constructor() { }

  getCategories() {
    return this.datas;
  }
}