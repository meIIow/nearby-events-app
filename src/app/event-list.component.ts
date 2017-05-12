import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent  implements OnInit{
  @Input() events: any[];
  @Input() selectedEvent: any;
  @Output() selectionEvent: EventEmitter<any> = new EventEmitter();
  //selectedHero: Hero;
  //heroes: Hero[];

  constructor(
    //private heroService: HeroService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.doesNothing();
  }

  onSelect(event: any): void {
    this.selectedEvent = event;
    this.selectionEvent.next(this.selectedEvent);
  }

  doesNothing(): void {

  }
}
