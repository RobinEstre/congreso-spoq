import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { PersonalizationService } from '../../services/personalization.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  docElement: any = HTMLElement;

  isFullScreen = false;
  searchText = '';
  showSearchResult = false;
  userName = 'Maxartkiller';
  constructor(
    private eRef: ElementRef,
    public authenticationService: AuthenticationService,
    public personalizationService: PersonalizationService) { }

  ngOnInit(): void {
    this.docElement = document.documentElement;

    var tooltiptriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltiptriggerList.map(function (e) {
      return new bootstrap.Tooltip(e)
    });
    const userName = this.authenticationService.getUserName();
    if (userName) {
      this.userName = userName;
    }
    this.personalizationService.renderUserImage();
    this.personalizationService.renderLogoImage();
  }

  ngAfterViewInit() {
    var chosensimple: any = $('.simplechosen')
    chosensimple.chosen()

    var thischosen: any = $('#searchfilterlist')
    thischosen.chosen({ no_results_text: "Oops, nothing found!", max_selected_options: 2 }).bind("chosen:maxselected", function () {
      thischosen.closest('.input-group').next('.invalid-feedback').show()
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    const ignoreClickOnMeElement: any = document.getElementById('search-header');
    const isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
    if (!isClickInsideElement) {
      this.showSearchResult = false;
    }
  }

  menuopen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('menu-close');
  }

  rightbaropenchat() {
    const body: any = document.getElementsByTagName('body')[0];
    const chatbar: any = document.getElementById('chatwindow');
    const notificationlist: any = document.getElementById('notificationwindow');
    if (body.classList.contains('rightbar-open') === true) {
      if (chatbar.classList.contains('d-none') === true) {
        chatbar?.classList.remove('d-none');
        notificationlist?.classList.add('d-none');

      } else {
        body.classList.remove('rightbar-open');
        chatbar?.classList.add('d-none');
        notificationlist?.classList.add('d-none');
      }

    } else {
      body.classList.add('rightbar-open');
      chatbar?.classList.remove('d-none');
      notificationlist?.classList.add('d-none');
    }


  }
  rightbaropennotification() {
    const body: any = document.getElementsByTagName('body')[0];
    const notificationlist: any = document.getElementById('notificationwindow');
    const chatbar: any = document.getElementById('chatwindow');

    if (body.classList.contains('rightbar-open') === true) {
      if (notificationlist.classList.contains('d-none') === true) {
        chatbar?.classList.add('d-none');
        notificationlist?.classList.remove('d-none');
      } else {
        body.classList.remove('rightbar-open');
        chatbar?.classList.add('d-none');
        notificationlist?.classList.add('d-none');
      }

    } else {
      body.classList.add('rightbar-open');
      chatbar?.classList.add('d-none');
      notificationlist?.classList.remove('d-none');
    }
  }

  dontclose(event: any) {
    event.stopPropagation();
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;

    if (this.isFullScreen) {
      const bodyTag = document.body;
      bodyTag.classList.add('isfullscreen');
      this.docElement.requestFullscreen();
    } else {
      const bodyTag = document.body;
      bodyTag.classList.remove('isfullscreen');
      document.exitFullscreen();
    }
    // TODO : Add required classes for fullscreen
  }

  searching() {
    if (this.searchText?.length > 0) {
      this.showSearchResult = true;
    } else {
      this.showSearchResult = false;
    }
  }

}
