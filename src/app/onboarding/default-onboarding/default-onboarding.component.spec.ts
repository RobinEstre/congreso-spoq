import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultOnboardingComponent } from './default-onboarding.component';

describe('DefaultOnboardingComponent', () => {
  let component: DefaultOnboardingComponent;
  let fixture: ComponentFixture<DefaultOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
