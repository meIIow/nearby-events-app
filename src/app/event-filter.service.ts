import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Event }           from './event';

@Injectable()
export class EventFilterService {

  constructor(private http: Http) {}

  search(term: string): Observable<Event[]> {
    return this.http
               .get(`app/events/?name=${term}`)
               .map(response => response.json().data as Event[]);
  }

}
