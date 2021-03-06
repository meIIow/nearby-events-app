import { Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {Event} from './event';
import {SearchPacket} from './search-packet';
import {ChangeDetectorRef} from '@angular/core';
import {FacebookService} from './facebook.service';
import {MyTestService} from './my-test.service';

declare var google: any; // for geocoder

@Component({
  selector: 'event-fetcher',
  templateUrl: './event-fetcher.component.html',
  styleUrls: ['./event-fetcher.component.css'],
})
export class EventFetcherComponent  implements OnInit{
  fetcherSearch: SearchPacket;
  allPlaces: any[];
  allEvents: any[];
  geocoder: any;
  geocodePacket: any;
  latLongTest: any;
  username: string;
	loggedIn = false;
  readyToFetch = false;

  count = 0;


  xxxxx: any[];
  mapSize = 12;


  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
		private facebookService: FacebookService,
    private myTestService: MyTestService,
  ) { }

  ngOnInit(): void {
    this.fetcherSearch = {
      terms: '',
      centerCoordinates: '1965 Fletcher Avenue',
      lat: "",
      lng: "",
      maxDistance: 400, // 1 mile default
      startTime: new Date(),
      endTime: new Date(),
      name: '',
      coordsSet: false,
      maxDistSet: false,
      centerDate: new Date(),
    };
    this.geocoder = new google.maps.Geocoder();
    this.facebookService.loadAndInitFBSDK();
    this.allPlaces = [];
    this.allEvents = [];

    this.myTestService.resetDB();
    this.updateDateRange();

  }

  checkAddress(): void {
    this.addressToGeocode(this.fetcherSearch.centerCoordinates);
  }

  updateDate(dateInput: string): void {
    //console.log(dateInput);

    var dateInputArray = dateInput.split("-");

    this.fetcherSearch.centerDate = new Date(
      parseInt(dateInputArray[0]), parseInt(dateInputArray[1]), parseInt(dateInputArray[2])
    )

    this.updateDateRange();
  }

  updateDateRange(): void {
    this.fetcherSearch.startTime.setDate(this.fetcherSearch.centerDate.getDate() - 28);
    this.fetcherSearch.endTime.setDate(this.fetcherSearch.centerDate.getDate() + 28);
  }

  checkInputs(): void {

    if (this.geocodePacket) {
      this.fetcherSearch.coordsSet = true;
      this.fetcherSearch.lat = this.geocodePacket.geometry.location.lat();
      this.fetcherSearch.lng = this.geocodePacket.geometry.location.lng();
    } else {
      this.fetcherSearch.coordsSet = false;
    }

    if (100 <= this.fetcherSearch.maxDistance && this.fetcherSearch.maxDistance <= 4800) {
      this.fetcherSearch.maxDistSet = true;
    } else {
      this.fetcherSearch.maxDistSet = false;
    }



    this.readyToFetch = (this.fetcherSearch.coordsSet && this.fetcherSearch.maxDistSet);
    this.cd.detectChanges();
  }

  login(): void {
    var x = this.facebookService.facebookLogin2();
    console.log(x);
    var z;
    x.subscribe((data) => {
      z = data;
      console.log("-------");
      console.log(data);
      console.log(data.name);
      this.username = data.name;
      //this.manualCheck(data);
      this.cd.detectChanges();
   });
  }

  placesToEventsToDB(){
    //"/470483233084822/events"
    var count = 0;
    var query = this.getQuery();

    this.getFacebookPlaces(query, count);

    //this.getFacebookPlaces("search?pretty=0&type=place&center=34.12%2C-118.15&distance=1200&limit=25&after=MTQ5", count);

  }

  getQuery(): string {
    var queryString = "search?pretty=0&type=place&center="
    queryString += this.fetcherSearch.lat;
    queryString += "%2C";
    queryString += this.fetcherSearch.lng;
    queryString += "&distance=";
    queryString += this.fetcherSearch.maxDistance;
    queryString += "&limit=25";
    console.log(queryString);
    console.log("search?pretty=0&type=place&center=34.12%2C-118.15&distance=1200&limit=25&after=MTQ5");
    return queryString;
  }

  getFacebookPlaces(query: string, count: number){
    var placesObservable = this.facebookService.accessGraphAPI(query);
    placesObservable.subscribe((response: any) => {
      if (response && !response.error) {
        // handle the result
        console.log(response.data);
        this.allPlaces = this.allPlaces.concat(response.data);
        if (count < 5 && response.paging) {
          console.log("going again");
          var nextQuery = response.paging.next;
          this.getFacebookPlaces(nextQuery, (count+1));
        } else {
          this.getFacebookEvents();
        }
        console.log("THIS THING WORKED");
        console.log(response);
      } else {
        console.log("Didn't work");
      }
    });
  }

  getFacebookEvents(): void{
    console.log("from places to events");
    console.log(this.allPlaces);

    //this.fetcherSearch.startTime.setDate(this.fetcherSearch.centerDate.getDate() - 28);
    //this.fetcherSearch.endTime.setDate(this.fetcherSearch.centerDate.getDate() + 28);

    var placesToCheck = this.allPlaces.length;
    for (var i = 0; i < placesToCheck; i ++) {
      var currentPlace = this.allPlaces[i];

      // create query string from place info
      var query = "/";
      var id = currentPlace.id;
      query += id;
      query += "/events";
      console.log(query);

      var placesObservable = this.facebookService.accessGraphAPI(query);
      placesObservable.subscribe((response: any) => {
        if (response && !response.error) {
          for (var j = 0; j < response.data.length; j ++) {
            if (this.isInTimeWindow(response.data[j])) {
              console.log("found an event!");
              console.log(response.data[j]);
              this.allEvents.push(response.data[j]);
            }
          }
        } else {
          console.log("failed to get events");
        }
        this.fireWhenFull(placesToCheck, false, false);
      });
    }
  }

  fireWhenFull(countNeeded: number, fireNow: boolean, reset: boolean): void {
    this.count ++;
    if (reset) {
      this.count = 0;
    } else if ((this.count >= countNeeded) || fireNow) {
      this.eventsToDb();
    }
    //global variable for number of places searched so far
    //if all done, send to db
  }

  eventsToDb(): void {
    //send events to DB
    console.log("-------------");
    console.log(this.allEvents);
    /*
    for (var event in this.allEvents) {
      this.myTestService.pushEvent(event);
    }
    */
    //this.myTestService.pushEvent(this.allEvents[0]);

    this.myTestService.pushEvent(this.fetcherSearch)
      .then((storedSearch: any ) => {
        this.myTestService.pushEvent(this.geocodePacket)
          .then((storedGeo: any ) => {
            this.recAddToDB(0);
          }
        );
      }
    );

    //this.recAddToDB(0);
    //this.myTestService.getEvents().then(events => this.xxxxx = events);

    //this.goToFilter();
  }

  recAddToDB(count: number): void {
    if (count >= this.allEvents.length) {
      this.myTestService.getEvents()
        .then((events: any) => {
          this.xxxxx = events;
          this.dbCheck();
          this.goToFilter();
        }
      );
    } else {
      this.myTestService.pushEvent(this.allEvents[count])
        .then((event: any ) => {
          count ++;
          this.recAddToDB(count);
        }
      );
    }
  }

  isInTimeWindow(event: any): boolean {

    var eventHasStart = event.hasOwnProperty('start_time');
    var eventHasEnd = event.hasOwnProperty('end_time');

    if(!eventHasStart || !eventHasEnd) {
      return false
    } else {
      var eventStartString : string;
      var eventEndString : string;
      eventStartString = event.start_time;
      eventEndString = event.end_time;

      eventStartString.split("T").pop();
      eventEndString.split("T").pop();

      var eventStartArray = eventStartString.split("-");
      var eventEndArray = eventEndString.split("-");

      var eventStartDate = new Date(
        parseInt(eventStartArray[0]), parseInt(eventStartArray[1])-1, parseInt(eventStartArray[2])
      )

      var eventEndDate = new Date(
        parseInt(eventEndArray[0]), parseInt(eventEndArray[1])-1, parseInt(eventEndArray[2])
      )

      console.log(this.fetcherSearch.startTime);
      console.log(this.fetcherSearch.endTime);
      console.log(eventEndDate);
      console.log(eventStartDate);

      if (this.fetcherSearch.startTime <= eventStartDate && this.fetcherSearch.endTime >= eventEndDate) {
        return true;
      } else {
        return false;
      }
    }

    // "2013-12-07T00:00:00-0800"
    // year-month-day
  }
  /*
  //for testing event retrieval and DB Update / Retrieval

  eventTest(){
    var self = this;
    var query = "/";
    var id = "124809187539278";
    query += id;
    query += "/events";
    FB.api(query, function (response: any) {

      if (response && !response.error) {
        // handle the result
        console.log("I GOT AN EVENT");
        console.log(response);
        var thisEvent = response.data[0];
        self.myTestService.pushEvent(thisEvent);
        var theseEvents;
        self.myTestService.getEvents().then(events => self.xxxxx = events);
        this.dbCheck();
      } else {
        console.log("NO EVENT");
      }
    });
  }
  */

  dbCheck(): void {
    console.log("Did my DB work?");
    console.log(this.xxxxx);
  }

  // call this to force DOM update
  manualCheck(staller: any): void {
    this.cd.markForCheck();
  }

  addressToGeocode(address: string): void {
    //console.log("into addressToGeocode");
    var query = { 'address': address};
    var self = this; // so we can access variables from event-fetcher

    function updateGeocodePacket(geoResults: any) {
      //console.log("updating geo packet");
      self.geocodePacket = geoResults;
      if (self.geocodePacket) {
        self.fetcherSearch.lat = self.geocodePacket.geometry.location.lat();
        self.fetcherSearch.lng = self.geocodePacket.geometry.location.lng();
      }
      self.fetcherSearch.lat = geoResults.geometry.location.lat();
      self.fetcherSearch.lng = geoResults.geometry.location.lng();
      console.log("geo packet");
      console.log(self.geocodePacket);
      console.log(self.fetcherSearch.lat);
      console.log(self.fetcherSearch.lng);
      self.cd.detectChanges();
    }

    this.geocoder.geocode( { 'address': address}, function(results: any, status: any) {
      if (status == 'OK') {
        //console.log("geocoder.geocode() successful");
        updateGeocodePacket(results[0]);
        //console.log(_this.latLongTest.formatted_address)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
          updateGeocodePacket(null);
      }
    });
  }

  goToFilter(): void {
    this.router.navigate(['/event-filter']);
  }
}
