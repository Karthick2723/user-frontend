import { Component } from '@angular/core';

@Component({
  selector: 'app-cookies-info',
  templateUrl: './cookies-info.component.html',
  styleUrls: ['./cookies-info.component.scss']
})
export class CookiesInfoComponent {
  formattedDate: string;

  constructor() {
    this.formattedDate = this.getFormattedDate();
  }

  getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZoneName: 'short'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  }
}
