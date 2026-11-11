import { Component, signal } from '@angular/core';
import { IPProduct } from '../classes/IPProduct';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';

@Component({
  selector: 'app-product-http-handle-error-service-component',
  standalone: false,
  styleUrl: './product-http-handle-error-service-component.css',
  templateUrl: './product-http-handle-error-service-component.html',
})
export class ProductHttpHandleErrorServiceComponent {
  products=signal<IPProduct[]>([])
  errMessage=signal("")
  constructor(private _service: ProductHttpHandleErrorService) {}
  ngOnInit():void{
    this._service.getProductsList().subscribe(
    {
      next:(data)=>{
        this.products.set(data);
      },
      error:(err)=>{
        this.errMessage.set(err)
      }
    }
    )
  }
}
