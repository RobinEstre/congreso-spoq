import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secondary-onboarding',
  templateUrl: './secondary-onboarding.component.html',
  styleUrls: ['./secondary-onboarding.component.scss']
})
export class SecondaryOnboardingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/pages/dashboard/home/']);
    }, 2000)
  }

}
