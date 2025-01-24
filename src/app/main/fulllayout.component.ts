import { Component, NgZone } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { AngConfig } from '../app-config';

@Component({
  selector: 'app-fulllayout',
  templateUrl: './fulllayout.component.html',
  styleUrls: ['./fulllayout.component.scss']
})
export class FulllayoutComponent {
  AngConfig;
  navCollapsed: boolean;
  navCollapsedMob = false;
  windowWidth: number;

  constructor(
    private zone: NgZone,
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
    this.AngConfig = AngConfig;
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    if (current_url === baseHref + '/layout/theme-compact' || current_url === baseHref + '/layout/box') {
      this.AngConfig.isCollapse_menu = true;
    }
    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 1025 ? AngConfig.isCollapse_menu : false;
  }
  
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.coded-navbar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  };
}
