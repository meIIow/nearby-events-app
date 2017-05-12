import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { RouterModule }   from '@angular/router';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

//for in-memory API
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { EventFetcherComponent }  from './event-fetcher.component';
import { EventMapComponent }  from './event-map.component';
import { EventFilterComponent }  from './event-filter.component';
import { EventListComponent }  from './event-list.component';
import { WelcomeComponent }  from './welcome.component';
import { EventDetailComponent }  from './event-detail.component';

//import { EventFetcherService }  from './event-filter.service';
//import { EventFilterService }  from './event-filter.service';
import { MyTestService }  from './my-test.service';
import { FacebookService }  from './facebook.service';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [
    MyTestService,
    FacebookService,
    //EventFilterService,
    //EventFetcherService,
  ],
  declarations: [
    AppComponent,
    EventFetcherComponent,
    EventFilterComponent,
    EventMapComponent,
    EventListComponent,
    WelcomeComponent,
    EventDetailComponent,
  ],
  bootstrap:    [ AppComponent, ]
})
export class AppModule { }
