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
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { authGuard } from './classes/auth.guard';
import { Contact } from './contact/contact';
import { CourseRegistrationComponent } from './course-registration-component/course-registration-component';
import { LoginComponent } from './login-component/login-component';
import { CourseRegistrationReactiveComponent } from './course-registration-reactive-component/course-registration-reactive-component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { FakeProduct2Component } from './fake-product2-component/fake-product2-component';
import { BooksComponent } from './books-component/books-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { BookNewComponent } from './book-new-component/book-new-component';
import { BookUpdateComponent } from './book-update-component/book-update-component';
import { BookDeleteComponent } from './book-delete-component/book-delete-component';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';
import { SearchFashionComponent } from './search-fashion-component/search-fashion-component';
import { FashionNewComponent } from './fashion-new-component/fashion-new-component';
import { FashionUpdateComponent } from './fashion-update-component/fashion-update-component';
import { FashionDeleteComponent } from './fashion-delete-component/fashion-delete-component';
import { FashionListComponent } from './fashion-list-component/fashion-list-component';
import { LoginAuthComponent } from './login-auth-component/login-auth-component';



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
  {path: 'bai18', component: CustomerComponent },
  {path: "products/:id",component:ProductDetailComponent },
  {path: "products",component:ProductListAdvancedComponent },
  {path: "search-product",component:ProductListSearchComponent },
  {path: 'lazyinfo',
    loadComponent: ()=>
      import('./lazy-component/lazy-component')
  .then(c => c.LazyComponent),
  canActivate: [authGuard]
},

   { path:"samplenested",
    component: ProductListAdvancedComponent,
    children:[
      { path:"search", component: ProductListSearchComponent },
      { path:"detail/:id", component: ProductDetailComponent },
    ]
  },
  {path: "course-register", component: CourseRegistrationComponent},
  {path: "course-reactive-register", component: CourseRegistrationReactiveComponent},
  {path: 'contacts',component:Contact },
  {path: '',component:Contact },
  {path: "login", component: LoginComponent},
  {path: "fakeproducts", component: FakeProductComponent},
  {path: "fakeproducts2", component: FakeProduct2Component},
  {path: "book-list", component: BooksComponent},
  {path: "book-detail", component: BookDetailComponent},
  {path: "book-new", component: BookNewComponent},
  {path: "book-update", component: BookUpdateComponent},
  {path: "book-delete", component: BookDeleteComponent},
  {path: "fashion-list", component: FashionComponent},
  {path: "fashion-detail", component: FashionDetailComponent },
  {path: "search-fashion", component: SearchFashionComponent },
  {path: "fashion-new", component: FashionNewComponent },
  {path: "fashion-update", component: FashionUpdateComponent },
  {path: "fashion-delete", component: FashionDeleteComponent },
  {path: "fashion-list", component: FashionListComponent },
  {path: "login-auth", component: LoginAuthComponent },
  {path: '**',component:PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }