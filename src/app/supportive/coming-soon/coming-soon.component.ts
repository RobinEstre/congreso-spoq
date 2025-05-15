import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  @ViewChild('hoursEl', { read: ElementRef, static: false }) hoursEl!: ElementRef;
  @ViewChild('dayEl', { read: ElementRef, static: false }) dayEl!: ElementRef;
  @ViewChild('minEl', { read: ElementRef, static: false }) minEl!: ElementRef;
  @ViewChild('secEl', { read: ElementRef, static: false }) secEl!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var countDownDate = new Date("June 06, 2025 20:00:00").getTime();
    var daysEle = this.dayEl.nativeElement;
    var hoursEle = this.hoursEl.nativeElement;
    var minsEle = this.minEl.nativeElement;
    var secsEle = this.secEl.nativeElement;
    // Update the count down every 1 second

    setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEle.innerHTML = days;
      hoursEle.innerHTML = hours;
      minsEle.innerHTML = minutes;
      secsEle.innerHTML = seconds;

      if (distance < 0) {
        //clearInterval(x);
        //document.getElementById("timer").innerHTML = "Our website is a live.";
      }
    }, 1000);
  }
}
