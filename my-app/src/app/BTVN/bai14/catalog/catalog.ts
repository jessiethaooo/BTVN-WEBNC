import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog';

@Component({
  selector: 'app-catalog',
  standalone: false,
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent implements OnInit {
  categories: any[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.categories = this.catalogService.getCategories();
  }
}