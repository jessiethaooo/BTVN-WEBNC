import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: false,
  templateUrl: './child.html',
  styleUrl: './child.css'
})
export class ChildComponent {

  @Input() parentData: string = '';
  @Output() childEvent = new EventEmitter<string>();

  sendToParent() {
    this.childEvent.emit('Hello từ Child Component!');
  }
}