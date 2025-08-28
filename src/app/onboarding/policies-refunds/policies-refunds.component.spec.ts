import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesRefundsComponent } from './policies-refunds.component';

describe('PoliciesRefundsComponent', () => {
  let component: PoliciesRefundsComponent;
  let fixture: ComponentFixture<PoliciesRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesRefundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
