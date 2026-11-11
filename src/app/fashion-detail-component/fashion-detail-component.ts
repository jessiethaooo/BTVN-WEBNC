import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

@Component({
  selector: 'app-fashion-detail-component',
  standalone: false,
  templateUrl: './fashion-detail-component.html',
  styleUrl: './fashion-detail-component.css',
})
export class FashionDetailComponent implements OnInit {
  fashion=signal<Fashion|null>(null);
  errMessage=signal('');
  loading=signal(false);
  isLookupMode=signal(true);

  constructor(
    private _service: FashionAPIService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.isLookupMode.set(!slug);
      if (slug) {
        this.loadFashionBySlug(slug);
      }
    });
  }

  private loadFashionBySlug(slug: string): void {
    this.fashion.set(null);
    this.errMessage.set('');
    this.loading.set(true);
    this._service.getFashionBySlug(slug).subscribe({
      next: data => {
        this.fashion.set(Object.assign(new Fashion(), data));
        this.loading.set(false);
      },
      error: err => {
        this.errMessage.set(err.message || 'Không thể tải chi tiết Fashion.');
        this.loading.set(false);
      }
    });
  }

  searchFashion(idF: string){
    const numericIdF = Number(idF);
    if (!Number.isSafeInteger(numericIdF) || numericIdF < 1) {
      this.fashion.set(null);
      this.errMessage.set('Vui lòng nhập IdF là số nguyên dương.');
      return;
    }

    this.fashion.set(null);
    this.errMessage.set('');
    this.loading.set(true);
    this._service.getFashionByIdF(numericIdF).subscribe({
      next:(data)=>{
        //restore object model from json
        const fashionInstance = Object.assign(new Fashion(), data);
        this.fashion.set(fashionInstance);        
        this.loading.set(false);
      },
      error:(err)=>{
        this.errMessage.set(err.message || 'Không thể tải chi tiết Fashion.');
        this.loading.set(false);
      }
    })
  }

  goToList(): void {
    this.router.navigate(['/fashion-list']);
  }
}