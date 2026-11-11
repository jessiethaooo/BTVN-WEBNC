import { Component } from '@angular/core';

@Component({
  selector: 'app-bindig-property-component',
  standalone: false,
  styleUrl: './bindig-property-component.css',
  templateUrl: './bindig-property-component.html',
})
export class BindigPropertyComponent {
  public name:string="Nguyễn La Thanh Thao";
  public email:string="thao@gmail.com";
  public nameid:string="Thao01";
  public isDisabled:boolean=true;
  public hello:string="Hello";

}
