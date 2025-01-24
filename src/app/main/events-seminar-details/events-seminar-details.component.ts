import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { EventsSeminarService } from 'src/app/services/events-seminar.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-events-seminar-details',
  templateUrl: './events-seminar-details.component.html',
  styleUrls: ['./events-seminar-details.component.scss']
})
export class EventsSeminarDetailsComponent implements OnInit {
  breadcrumbsName: string = "Events & Seminars";
  id: number;
  eventData: any;
  eventDataDateTime: any[] = [];
  htmlContent: any;
  presenterImage: any;
  participantForm: FormGroup;
  submit: boolean = false;
  eventDateTime: any;
  groupedEvents: any = {};
  selectedEvent: { eventDateTimeId: number } | null = null;
  isDeadlinePassed: boolean;
  isDeadlinePast: boolean;
  highestFutureDateObject: any;
  eventDateTimeFrom: moment.Moment;
  matchingEvent: any;
  isRegistrationOpen: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private _eventsSeminarService: EventsSeminarService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private notify: ToastrService,
    private datePipe: DatePipe,
    private webSocketService: WebSocketService,
    private router: Router
  ) {

    this.participantForm = this.fb.group({
      eventParticipantId: [0],
      surname: [''],
      name: ['', Validators.required],
      companyName: [''],
      departmentName: [''],
      jobTitle: [''],
      telephoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      eventId: [0],
      statusCode: [0],
      responseMessage: [''],
      eventDateTimeId: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }
  isInValidField(formControlName: string): boolean {
    return this.formField(formControlName)?.invalid && (this.formField(formControlName)?.dirty ||
      this.formField(formControlName)?.touched);
  }
  formField(formControlName: string) {
    return this.participantForm.get(formControlName);
  }

  ngOnInit(): void {
    this.getQueryParams();
    this.webSocketService.messages$.subscribe((message: string) => {
      if (message === 'LOAD_EVENTS') {
        if (this.id) {
          this.fetchEventDetails(this.id);
        } else {
        }
      }
    });
  }


  changeDateTimeForRegForm(date: any, format: string): string | null {
    const dateObj = new Date(date);
    if (this.isValidDate(dateObj)) {
      return this.datePipe.transform(dateObj, format);
    } else {
      return null;
    }
  }

  convertDateTimeToTime(dateTime: any): string {
    const dateObj = new Date(dateTime);
    if (this.isValidDate(dateObj)) {
      return this.datePipe.transform(dateObj, 'hh:mm a') || 'N/A';
    } else {
      return 'N/A';
    }
  }
  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
  get isFormValid(): boolean {
    return this.participantForm.valid;
  }

  onSubmit() {
    this.submit = true;
    if (this.participantForm.invalid) {
      // Optionally, mark all controls as touched to display error messages in the UI
      this.participantForm.markAllAsTouched();
    }
    if (this.participantForm.invalid) {
      this.submit = false;
      this.notify.error("Please enter valid data in the required fields.");
      this.participantForm.markAllAsTouched();
      return;
    }
    this._eventsSeminarService.registerParticipation(this.participantForm.value)
      .pipe(
        finalize(() => {
          this.submit = false;
        })
      )
      .subscribe((response) => {
        if (response.statusCode == 200) {
          this.submit = false;
          this.notify.success(response?.responseMessage);
          this.resetFormExceptEventFields();
          this.scroollToTop();
        }
        if (response.statusCode == 500) {
          this.notify.error(response?.responseMessage);
        }
        if (response.statusCode == 400) {
          this.notify.error(response?.responseMessage);
        }
      })
  }

  resetFormExceptEventFields() {
    this.participantForm.reset();
    this.participantForm.get('eventId').setValue(this.id);
    this.participantForm.get('eventDateTime').setValue(this.eventDateTime);
  }

  getQueryParams() {
    this.activatedRoute.queryParamMap.subscribe(res => {
      if (res.has('id')) {
        this.id = parseInt(res.get('id'));
        this.fetchEventDetails(this.id);
        this.participantForm.get('eventId').setValue(this.id);
      }
    });
  }

  isSelected(event: { eventDateTimeId: number }): boolean {
    return this.selectedEvent !== null && this.selectedEvent.eventDateTimeId === event.eventDateTimeId;
  }

  selectEvent(event: { eventDateTimeId: number }): void {
    if (this.selectedEvent && this.selectedEvent.eventDateTimeId === event.eventDateTimeId) {
      this.selectedEvent = null; // Deselect if the same event is clicked again
      this.participantForm.get('eventDateTimeId').setValue(null); // Reset eventDateTimeId
    } else {
      this.selectedEvent = event;
      this.participantForm.get('eventDateTimeId').setValue(event.eventDateTimeId); // Set eventDateTimeId
    }
  }

  formatTime(time: string): string {
    if (time) {
      return time?.slice(0, 5); // Extract HH:mm from HH:mm:ss
    }
    return "";
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  groupEventsByDate(eventDateArr: any[]) {
    const arr = eventDateArr.reduce((groups, event) => {
      const date = event.eventDate;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});
    return arr;
  }

  fetchEventDetails(id: number) {
    this._eventsSeminarService.getEvent(id)
      .subscribe((response) => {
        if (response.statusCode == 200) {

          if (!response.isPublished) {
            this.router.navigate(['/landing']); // Navigate to landing if unpublished
            return;
          }

          this.eventData = response;
          this.eventDataDateTime = response?.eventDetails?.eventDateTimes || [];
          const deadlineString = response?.eventDetails?.deadline;

          const deadline = moment(deadlineString).startOf('day');
          const currentDate = moment().startOf('day');
          this.isDeadlinePast = deadline.isBefore(currentDate, 'day');

          const futureDatesArray = (this.eventDataDateTime || []).filter((item) => {
            if (item && item.eventDate) {
              const eventDate = moment(item.eventDate).startOf('day');
              return eventDate.isSameOrAfter(currentDate, 'day');
            }
            return false;
          });

          if (futureDatesArray.length > 0) {
            this.matchingEvent = futureDatesArray.find((item) => moment(item.eventDate).isSame(deadline, 'day'));
          
            if (this.matchingEvent) {
              this.eventDateTimeFrom = moment(`${this.matchingEvent.eventDate}T${this.matchingEvent.eventFromTime}`);
            } else {
              this.highestFutureDateObject = futureDatesArray.reduce((latest, current) => {
                return moment(latest.eventDate).isAfter(moment(current.eventDate)) ? latest : current;
              }, futureDatesArray[0]);
              this.eventDateTimeFrom = moment(`${this.highestFutureDateObject.eventDate}T${this.highestFutureDateObject.eventFromTime}`);
            }
          }

          // Handle registration display logic
          if (currentDate.isSame(deadline, 'day')) {
            this.isRegistrationOpen = true;
          } else {
            this.isRegistrationOpen = false;
          }

          if (this.isDeadlinePast) {
            this.isDeadlinePassed = true;
          } else if (!this.isDeadlinePast) {
            if (this.matchingEvent) {
              const currentTime = moment();
              this.isDeadlinePassed = currentTime.isAfter(this.eventDateTimeFrom);
            } else if (deadline.isSame(moment(this.highestFutureDateObject.eventDate), 'day')) {
              const currentTime = moment();
              this.isDeadlinePassed = currentTime.isAfter(this.eventDateTimeFrom);
            } else if (deadline.isSame(currentDate)) {
              this.isDeadlinePassed = false;
            }
          } else {
            this.isDeadlinePassed = !this.isDeadlinePassed;
          }

          this.presenterImage = response?.eventDetails?.presenterDetails?.presenterImage;
          const decodedHtml = response?.domFullContent;
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(decodedHtml);

          const groupedEvents = {};
          this.eventDataDateTime.forEach(event => {
            const { eventDate } = event;
            if (!groupedEvents[eventDate]) {
              groupedEvents[eventDate] = [];
            }
            groupedEvents[eventDate].push(event);
          });
          const groupedEventsArray = Object.keys(groupedEvents).map(eventDate => ({
            eventDate,
            events: groupedEvents[eventDate]
          }));
          this.groupedEvents = groupedEvents;
          this.eventDateTime = this.convertEventDateTimeForInput(response?.eventDetails?.eventFromDateTime, response?.eventDetails?.eventToDateTime, 'dd-MM-YYYY');
        }
      });
}


  convertTo12HourFormat(timeString: string): string {
    if (timeString) {
      const [hoursStr, minutes, seconds] = timeString.split(':');
      let hours = parseInt(hoursStr, 10);
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes.padStart(2, '0');
      return `${formattedHours}:${formattedMinutes} ${period}`;
    }
    return '';
  }
  convertEventDateTimeForInput(fromDateTime: any, toDateTime: any, format: string): string {
    const fromDateFormatted = this.changeDateTimeForRegForm(fromDateTime, format);
    const fromTime = this.convertDateTimeToTime(fromDateTime);
    const toTime = this.convertDateTimeToTime(toDateTime);
    return `${fromDateFormatted} and ${fromTime} - ${toTime}`;
  }

  goToRegisterForm() {
    this.scrollToTarget();
  }

  scrollToTarget() {
    setTimeout(() => {
      const target = document.getElementById('EventRegisterForm');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  scroollToTop() {
    setTimeout(() => {
      const target = document.getElementById('EventRegisterFormTop');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  showInquiry(data: string): string {
    return data ? data.concat(",") : "";
  }
  convertMinFormat(minutes: any): any {
    return moment(minutes, "HH:mm:ss").format("hh:mm");
  }
}
