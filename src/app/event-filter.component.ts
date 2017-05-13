import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Event} from './event';
import {SearchPacket} from './search-packet';
import {MyTestService} from './my-test.service';

@Component({
  selector: 'event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css'],
})
export class EventFilterComponent  implements OnInit{
  selectedEvent: any;
  events: any[];
  currentSearch: SearchPacket;
  geocodePacket: any;
  testNumber: number;
  addMe: Event;
  mapSize: number;


  constructor(
    //private heroService: HeroService,
    private myTestService: MyTestService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.testNumber = 3;
    this.currentSearch = {
      terms: 'ZZZ',
      centerCoordinates: 'YYY',
      maxDistance: 0,
      startTime: 0,
      endTime: 0,
      name: 'ZZZ',
      coordsSet: true,
      maxDistSet: true,
      lat: '',
      lng: '',
      centerDate: new Date(),
    };

    this.mapSize = 12;

    this.getEventsAndDefault();
  }


  getEventsAndDefault(): void {
    this.myTestService.getEvents().then((data) => {
      if (data.length > 6) {
        this.events = data.slice(6);
      }
      if (data.length > 5) {
        this.currentSearch = data[4];
        this.geocodePacket = data[5];
      }
      console.log(this.events);
      console.log(this.currentSearch);
    });
    this.testNumber = 6;
  }

  filterEvents2(): void {
    this.myTestService.getEvents().then((data) => {
      if (data.length > 6) {
        this.events = data.slice(6);
      }

      var tempEvents = [];

      for (var eventToCheck in this.events) {
        if (this.checkEvent(eventToCheck)) {
          tempEvents.push(eventToCheck);
        }
      }

      this.events = tempEvents;

    });
  }

  checkEvent(event: any): boolean {
    // check for name
    // check for terms
    // check for start time
    // check for end time
    return true;
  }

  filterEvents(): void {
    //does nothing so far
    this.addMe = {
      id: 100,
      name: 'I added this thru filter',
    }
    this.selectedEvent = this.addMe;
    this.selectedEvent = null;
    this.events.push(this.addMe);
  }

  updateSelectedEvent(event: any): void {
    this.selectedEvent = event;
  }

  backToFetcher(): void {
    this.router.navigate(['/event-fetcher']);
  }
}
