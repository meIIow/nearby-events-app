import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventFetcherComponent }   from './event-fetcher.component';
import { EventFilterComponent }      from './event-filter.component';
//import { LoginComponent }  from './hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/event-fetcher', pathMatch: 'full' },
  { path: 'event-fetcher',  component: EventFetcherComponent },
  { path: 'event-filter', component: EventFilterComponent },
  //{ path: 'login',     component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
