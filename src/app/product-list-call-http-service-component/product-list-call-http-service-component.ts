import { Component, signal } from '@angular/core';
import { IPProduct } from '../classes/IPProduct';
import { ProductHttpService } from '../services/product-http-service';

@Component({
  selector: 'app-product-list-call-http-service-component',
  standalone: false,
  styleUrl: './product-list-call-http-service-component.css',
  templateUrl: './product-list-call-http-service-component.html',
})
export class ProductListCallHttpServiceComponent {
  products=signal<IPProduct[]>([])
  constructor(private productHttpService: ProductHttpService) {}
  ngOnInit():void{
    this.productHttpService.getProductsList().subscribe(
    {
      next:(data)=>{
        this.products.set(data);
      },
      error:(error)=>{
        console.log("Error Occured", error);
        alert("Error Occured while calling the service="+JSON.stringify(error));
      }
    }
    )
  }
}