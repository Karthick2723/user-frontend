import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isVisible = false;
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isVisible = window.scrollY > 300;
  }

  constructor() {
  }
  
  openCookiesInfoPage() {
    window.open("/cookie", "_blank")
  }

  openAbout() {
    window.open("/aboutsite", "_blank")
  }

  openFundamental() {
    window.open("/fundamentalPolicy", "_blank")
  }

  openPrivacy() {
    window.open("/privacyPolicy", "_blank")
  }
  
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
