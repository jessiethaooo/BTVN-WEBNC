import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BindingTwoWayComponent } from './binding-two-way-component';

describe('BindingTwoWayComponent', () => {
  let component: BindingTwoWayComponent;
  let fixture: ComponentFixture<BindingTwoWayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BindingTwoWayComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BindingTwoWayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
