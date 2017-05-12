import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent  implements OnInit{
  //selectedHero: Hero;
  //heroes: Hero[];

  constructor(
    //private heroService: HeroService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.doesNothing();
  }

  doesNothing(): void {

  }
}
