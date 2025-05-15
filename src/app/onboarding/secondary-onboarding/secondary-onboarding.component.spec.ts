import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryOnboardingComponent } from './secondary-onboarding.component';

describe('SecondaryOnboardingComponent', () => {
  let component: SecondaryOnboardingComponent;
  let fixture: ComponentFixture<SecondaryOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
