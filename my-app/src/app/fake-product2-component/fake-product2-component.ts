import { Component, signal } from '@angular/core';
import { FakeProductService } from '../services/fake-product-service';
import { IFakeProduct } from '../classes/IFakeProduct';

@Component({
  selector: 'app-fake-product2-component',
  standalone: false,
  templateUrl: './fake-product2-component.html',
  styleUrl: './fake-product2-component.css',
})
export class FakeProduct2Component {
  products=signal<IFakeProduct[]>([])
  errMessage=signal('')
  constructor(private _service:FakeProductService){
  }
  ngOnInit():void
  {
    this._service.getFakeProductData().subscribe({
      next:(data)=>{ this.products.set(data)},
      error:(err)=>{
        this.errMessage.set(err)
      }
    })
  }
}


