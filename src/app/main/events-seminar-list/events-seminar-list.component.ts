import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventsSeminarService } from 'src/app/services/events-seminar.service';
import moment from 'moment';
import { WebSocketService } from 'src/app/services/web-socket.service';
@Component({
  selector: 'app-events-seminar-list',
  templateUrl: './events-seminar-list.component.html',
  styleUrls: ['./events-seminar-list.component.scss']
})
export class EventsSeminarListComponent implements OnInit {
  breadcrumbsName: string = "Events & Seminars";
  eventsList: any[];
  allEvents: any[];
  filteredEvent: any[];
  eventTypeOptions: { eventTypeId: number; eventTypeName: string; }[];
  eventTypeDropDownLable: string;
  activeEvent;
  eventDate: any;
  activeCourse = 0;
  isActiveYears;
  years: number[] = [];
  visibleYears: number[] = [];
  currentYear: number = new Date().getFullYear();
  activeYear = new Date().getFullYear();
  isShowLoader: boolean = false;
  apiDelayMessage: string = '';
  visibleYearsCount = 4;
  eventTypeDropdown:{ eventTypeId: number, eventTypeName: string };
  constructor(private _eventsSeminarService: EventsSeminarService, private router: Router, private webSocketService: WebSocketService) {
  }
  isPreviousYearAvailable(): boolean {
    const currentIndex = this.years.indexOf(this.currentYear);
    return currentIndex > 0;
  }

  isNextYearAvailable(): boolean {
    const currentIndex = this.years.indexOf(this.currentYear);
    return currentIndex < this.years.length - 1;
  }
  ngOnInit(): void {
    this.getAllYears();
    this.getYearBasedEvents(this.currentYear);
    this.webSocketService.messages$.subscribe((message: string) => {
      if (message === "LOAD_EVENTS") {
        this.getYearBasedEvents(this.currentYear);
      } else if (message === "UPDATE_YEARS") {
        this.getAllYears(); // Call getAllYears when UPDATE_YEARS message is received
      }
    });

    this.updateVisibleYearsCount();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateVisibleYearsCount();
    this.updateVisibleYears();
  }

  updateVisibleYearsCount(): void {
    const width = window.innerWidth;
    if (width <= 767) {
      this.visibleYearsCount = 2; // 2 years for mobile
    } else if (width <= 1100) {
      this.visibleYearsCount = 3; // 3 years for screens <= 992px
    } else if (width <= 1195) {
      this.visibleYearsCount = 4; // 4 years for screens between 993px and 1195px
    } else {
      this.visibleYearsCount = 4; // 5 years for screens > 1195px
    }
  }

  getAllYears() {
    this._eventsSeminarService.getAllEventYear()
      .subscribe((response) => {
        this.years = response[0]?.years?.sort((a, b) => b - a);
        this.initializeYears();
        this.initMethods();
      });
  }

  initializeYears() {
    this.updateVisibleYears();
  }

  updateVisibleYears() {
    const currentIndex = this.years.indexOf(this.currentYear);
    const startIndex = Math.max(currentIndex - Math.floor(this.visibleYearsCount / 2), 0);
    const endIndex = Math.min(startIndex + this.visibleYearsCount, this.years.length);
    this.visibleYears = this.years.slice(startIndex, endIndex);
  }

  selectPreviousYear() {
    const currentIndex = this.years.indexOf(this.currentYear);
    if (currentIndex > 0) {
      this.currentYear = this.years[currentIndex - 1];
      this.activeYear = this.currentYear;
      this.updateVisibleYears();
      this.getYearBasedEvents(this.currentYear);
    
    }
  }

  selectNextYear() {
    const currentIndex = this.years.indexOf(this.currentYear);
    if (currentIndex < this.years.length - 1) {
      this.currentYear = this.years[currentIndex + 1];
      this.activeYear = this.currentYear;
      this.updateVisibleYears();
      this.getYearBasedEvents(this.currentYear);
     
    }
  }

  setYear(year: number) {
    this.currentYear = year;
    this.activeYear = year;
    this.updateVisibleYears();
    this.getYearBasedEvents(this.currentYear);
  }

  getYearBasedEvents(year: number) {
    this.isShowLoader = true;
    this.apiDelayMessage = 'Loading...';
    this._eventsSeminarService.getYearBasedEvent(year).subscribe((response) => {
      this.apiDelayMessage = 'No Events Found';
      this.eventsList = response;
      this.allEvents = response;
      this.setActive(this.eventTypeDropdown);
      setTimeout(() => {
        this.isShowLoader = false;
      }, 200); // 1000 milliseconds = 1 second

    });
  }

  scrollToTarget() {
    setTimeout(() => {
      const target = document.getElementById('EventList');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  isActive(eventType: any) {
    return this.activeCourse == eventType?.eventTypeId;
  }

  isActiveYear(year: any) {
    return this.activeYear === year;
  }

  showDrodownLable(): string {
    return this.eventTypeDropDownLable ? this.eventTypeDropDownLable : 'All Events';
  }

  fetchEventTypes(): void {
    this._eventsSeminarService.getAllEventsType().subscribe(
      (data: { eventTypeId: number, eventTypeName: string }[]) => {
        this.eventTypeOptions = [{ eventTypeId: 0, eventTypeName: 'All Events' }, ...data];
      }
    );
  }
  
  setActive(eventType: { eventTypeId: number, eventTypeName: string }) {
    if (eventType && typeof eventType === 'object') {
      this.eventTypeDropdown=eventType;
      this.activeCourse = eventType.eventTypeId;
      this.eventTypeDropDownLable = eventType.eventTypeName;
      if (eventType.eventTypeId === 0) {
        this.eventsList = this.allEvents.slice();
      } else {
        this.eventsList = this.allEvents.filter(e => e?.eventType?.eventTypeId === eventType.eventTypeId);
      }
    } 
  }
  // setActive(eventType: any) {
  //   this.activeCourse = eventType;
  //   this.eventTypeDropDownLable = eventType?.eventTypeName;
  //   if (eventType?.eventTypeId === 0) {
  //     this.eventsList = this.allEvents.slice();
  //   } else {
  //     const selectedEventTypeId = eventType?.eventTypeId;
  //     this.eventsList = this.allEvents.filter(e => e?.eventType?.eventTypeId === selectedEventTypeId);
  //   }
  // }

  setActiveYear(year: number) {
    this.activeYear = year;
  }

  initMethods(): void {
    this.fetchEventTypes();
  }

  getAllEvents(): any {
    // this._eventsSeminarService.getPublishedEvents()
    //   .subscribe((response) => {
    //   });
  }

  navaigateEventdetailsPage() {
    this.router.navigate(['/events-details']);
  }

  viewEventDetails(id: any) {
    this.router.navigate(['events-details/'], {
      queryParams: {
        id: id
      }
    });
  }

  findMinDate(dates: any[]): string {
    if (dates && dates.length > 0) {
      let momentDates = dates.map(event => moment(event.eventDate));
      let minDate = moment.min(momentDates);
      return minDate.format('DD-MM-YYYY');
    }
    return '';
  }

  findTimeForEvent(events: { eventDate: string, eventFromTime: string, eventToTime: string }[]): string | null {
    if (events?.length == 0) {
      return "";
    } else {
      const minDateEvent = events.reduce((minEvent, currentEvent) => {
        return new Date(minEvent?.eventDate) < new Date(currentEvent?.eventDate) ? minEvent : currentEvent;
      });
      const fromTime = minDateEvent?.eventFromTime ? this.formatTime(minDateEvent?.eventFromTime) : '';
      const toTime = minDateEvent?.eventToTime ? this.formatTime(minDateEvent?.eventToTime) : '';
      return fromTime === '' && toTime === '' ? '' : `${fromTime} to ${toTime}`;
    }
  }

  formatTime(time: string): string {
    return moment(time, 'HH:mm:ss').format('hh:mm A');
  }

  findMinDateTime(date: any, dates: any[]) {
    if (dates && dates.length > 0) {
      var result;
      dates.forEach((e, i) => {
        if (e?.eventDate == date) {
          result = e?.eventFromTime + " to " + e?.eventToTime;
        }
      });
      return result;
    }
    return '';
  }

  findMinDateMinTime(date: any, dates: any[]) {
    if (dates && dates.length > 0) {
      var result;
      dates.forEach((e, i) => {
        if (e?.eventDate == date) {
          result = e?.eventFromTime;
        }
      });
      return result;
    }
    return '';
  }

  findMinDateMaxTime(date: any, dates: any[]) {
    if (dates && dates.length > 0) {
      var result;
      dates.forEach((e, i) => {

        if (e?.eventDate == date) {
          result = e?.eventToTime;
        }
      });
      return result;
    }
    return '';
  }

  findMaxDate(dates: any[]) {
    if (dates && dates.length > 0) {
      let momentDates = dates.map(event => moment(event.eventDate));
      let minDate = moment.max(momentDates);
      return minDate.format('DD-MM-YYYY');
    }
    return '';
  }

  displayDateRange(events: any[]): string {
    let minDate = this.findMinDate(events);
    let maxDate = this.findMaxDate(events);

    if (minDate && maxDate && minDate === maxDate) {
      return minDate; // Display only one date if both are the same
    } else {
      return `${minDate} - ${maxDate}`; // Display the date range
    }
  }

  groupByDate(eventDetails: any[]): { date: string, times: { eventFromTime: string, eventToTime: string }[] }[] {
    if (!Array.isArray(eventDetails)) {
      console.error('eventDetails is not an array:', eventDetails);
      return [];
    }
    const grouped = eventDetails.reduce((acc, current) => {
      const date = current.eventDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({ eventFromTime: current.eventFromTime, eventToTime: current.eventToTime });
      return acc;
    }, {});
    return Object.keys(grouped).map(date => ({
      date: date,
      times: grouped[date]
    }));
  }
}
