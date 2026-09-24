import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindigPropertyComponent } from './bindig-property-component/bindig-property-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ServiceProductImageEventComponent } from './BTVN/bai13/service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetailComponent } from './BTVN/bai13/service-product-image-event-detail/service-product-image-event-detail';
import { CatalogComponent } from './BTVN/bai14/catalog/catalog';
import { CustomerComponent } from './BTVN/bai18/customer/customer';

const routes: Routes = [
  {path:"binding-property", component:BindigPropertyComponent},
  {path:"binding-class", component:BindingClassComponent},
  {path:"binding-event", component:BindingEventComponent},
  {path:"binding-two-way", component:BindingTwoWayComponent},
  {path:"danh-sach-san-pham", component:ProductListComponent},
  {path:"product-dropdown-list", component:ProductDropdownListComponent},
  {path:"product-list-call-service", component:ProductListCallServiceComponent},
  {path:"product-list-call-http-service", component:ProductListCallHttpServiceComponent},
  {path: 'service-product-image-event', component: ServiceProductImageEventComponent },
  {path: 'service-product-image-event/:id', component: ServiceProductImageEventDetailComponent },
  {path: 'bai14', component: CatalogComponent },
  { path: 'bai18', component: CustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }