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
  testNumber: number;
  addMe: Event;


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
  }

  getEvents(): void {
    this.myTestService.getEvents().then(events => this.events = events);
    this.testNumber = 6;
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
