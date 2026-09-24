import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Contact } from './contact/contact';
import { Homework } from './homework/homework';
import { BindigPropertyComponent } from './bindig-property-component/bindig-property-component';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ChildComponent } from './child/child';
import { ParentComponent } from './parent/parent';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';

import { ServiceProductImageEventComponent } from './BTVN/bai13/service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetailComponent } from './BTVN/bai13/service-product-image-event-detail/service-product-image-event-detail';
import { CatalogComponent } from './BTVN/bai14/catalog/catalog';
import { CustomerComponent } from './BTVN/bai18/customer/customer';

@NgModule({
  declarations: [
    App,
    Contact,
    Homework,
    BindigPropertyComponent,
    BindingClassComponent,
    BindingStyleComponent,
    BindingEventComponent,
    BindingTwoWayComponent,
    ProductListComponent,
    ParentComponent,
    ChildComponent,
    ProductListCallServiceComponent,
    ProductDropdownListComponent,
    ProductListCallHttpServiceComponent,
    ProductHttpHandleErrorServiceComponent,
    CatalogComponent,
    CustomerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ServiceProductImageEventComponent,
    ServiceProductImageEventDetailComponent,
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [App],
})
export class AppModule {}
