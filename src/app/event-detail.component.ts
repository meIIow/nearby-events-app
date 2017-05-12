import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent  implements OnInit{
  @Input() selectedEvent: Event;


  constructor(
    //private heroService: HeroService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

}
