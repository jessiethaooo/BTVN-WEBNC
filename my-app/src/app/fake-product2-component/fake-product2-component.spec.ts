import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FakeProduct2Component } from './fake-product2-component';

describe('FakeProduct2Component', () => {
  let component: FakeProduct2Component;
  let fixture: ComponentFixture<FakeProduct2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeProduct2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(FakeProduct2Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
