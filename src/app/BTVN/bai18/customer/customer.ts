import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class CustomerComponent implements OnInit { 
  customerGroups: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerGroups = this.customerService.getCustomerGroups();
  }
}