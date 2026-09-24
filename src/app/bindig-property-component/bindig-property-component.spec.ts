import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BindigPropertyComponent } from './bindig-property-component';

describe('BindigPropertyComponent', () => {
  let component: BindigPropertyComponent;
  let fixture: ComponentFixture<BindigPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BindigPropertyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BindigPropertyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
