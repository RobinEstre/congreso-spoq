import { Component, OnInit } from '@angular/core';
import { EventsParams } from 'swiper/angular';
import { Router } from '@angular/router';

// import Swiper core and required modules
import SwiperCore, { Swiper, Autoplay, Pagination, Navigation } from "swiper";
import { PersonalizationService } from 'src/app/shared/services/personalization.service';
import { LocalhostKeys } from 'src/app/shared/enum/localhost-keys';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SessionStorageKeys } from 'src/app/shared/enum/session-storage-keys';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);


@Component({
  selector: 'app-default-onboarding',
  templateUrl: './default-onboarding.component.html',
  styleUrls: ['./default-onboarding.component.scss']
})

export class DefaultOnboardingComponent implements OnInit {
  isFullScreen: boolean = false;

  pagination = {
    el: '.pagination-wrap',
    clickable: true,
    bulletClass: "swiper-pagination-bullet mx-1 ",
  };
  navigation = {
    nextEl: '.btn-next',
    prevEl: '.btn-prev',
  }
  themeColor = 'theme-blue';
  userName = '';
  domain = 'finance';
  fileToUpload: File | null = null;
  constructor(
    private router: Router,
    public personalizationService: PersonalizationService,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.themeColor = localStorage.getItem(LocalhostKeys.THEME_COLOR) ?? 'theme-blue';
  }

  slideChange() {
    document.getElementsByClassName('btn-next')[0].classList.remove('d-none');
    document.getElementsByClassName('btn-summary')[0].classList.add('d-none')
  }


  summaryNavigate() {
    document.getElementsByClassName('iconnext')[0].classList.add('d-none');
    document.getElementsByClassName('iconloader')[0].classList.remove('d-none');

    setTimeout(() => {
      this.router.navigate(['/onboarding/secondary']);
    }, 3000)
  }

  reachEnd() {
    setTimeout(() => {
      document.getElementsByClassName('btn-next')[0].classList.add('d-none');
      document.getElementsByClassName('btn-summary')[0].classList.remove('d-none')

    }, 50);
  }

  selectThemeColor(themeColor: string) {
    this.personalizationService.setThemeColor(themeColor, this.themeColor);
    this.themeColor = themeColor;
  }

  userNameUpdated() {
    if (this.userName?.length) {
      this.authenticationService.setUserName(this.userName);
    } else {
      this.authenticationService.setUserName('');
    }
  }

  handleFileInput(event: any) {
    if (event?.target?.files) {
      const file = event.target.files[0];
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader?.result) {
          this.personalizationService.setUserImage(reader?.result);
        }
      };
    }
  }

  handleFileInputLogo(event: any) {
    if (event?.target?.files) {
      const file = event.target.files[0];
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader?.result) {
          this.personalizationService.setLogoImage(reader?.result);
        }
      };
    }
  }

  selectDomain(domain: string) {
    this.domain = domain;
  }

}
