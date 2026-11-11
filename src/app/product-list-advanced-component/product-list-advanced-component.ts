import { Component, signal } from '@angular/core';
import { IPProduct } from '../classes/IPProduct';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';
import { ActivatedRoute, Router } from '@angular/router';
import { createSlug } from '../classes/slug-helper';

@Component({
  selector: 'app-product-list-advanced-component',
  standalone: false,
  styleUrl: './product-list-advanced-component.css',
  templateUrl: './product-list-advanced-component.html',
})
export class ProductListAdvancedComponent {
  products = signal<IPProduct[]>([]);
  errMessage = signal("");
  public generateSlug = createSlug;
  constructor(
    private _service: ProductHttpHandleErrorService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
  this._service.getProductsList().subscribe({
    next: (data) => {
      this.products.set(data);
    },
    error: (err) => {
      this.errMessage.set(err)
    }
  }
  )
}
viewDetail(id: number)
{
  this.router.navigate(["/products", id])
}
viewDetailSlug(p:IPProduct)
{
    let slug=this.generateSlug(p.name,p.id)
    this.router.navigate(["/products",slug])
}


}