import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  standalone: false,
  templateUrl: './parent.html',
  styleUrl: './parent.css'
})
export class ParentComponent {
  data: string = "Hello từ Parent";
  dataFromChild: string = "";

  handleMessage(message: string) {
    this.dataFromChild = message;
  }
}