"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("@angular/core");
var facebook_service_1 = require("./facebook.service");
var my_test_service_1 = require("./my-test.service");
var EventFetcherComponent = (function () {
    function EventFetcherComponent(router, cd, ngZone, facebookService, myTestService) {
        this.router = router;
        this.cd = cd;
        this.ngZone = ngZone;
        this.facebookService = facebookService;
        this.myTestService = myTestService;
        this.loggedIn = false;
        this.readyToFetch = false;
        this.count = 0;
        this.mapSize = 12;
    }
    EventFetcherComponent.prototype.ngOnInit = function () {
        this.fetcherSearch = {
            terms: '',
            centerCoordinates: '1965 Fletcher Avenue',
            lat: "",
            lng: "",
            maxDistance: 400,
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
    };
    EventFetcherComponent.prototype.checkAddress = function () {
        this.addressToGeocode(this.fetcherSearch.centerCoordinates);
    };
    EventFetcherComponent.prototype.updateDate = function (dateInput) {
        //console.log(dateInput);
        var dateInputArray = dateInput.split("-");
        this.fetcherSearch.centerDate = new Date(parseInt(dateInputArray[0]), parseInt(dateInputArray[1]), parseInt(dateInputArray[2]));
        this.updateDateRange();
    };
    EventFetcherComponent.prototype.updateDateRange = function () {
        this.fetcherSearch.startTime.setDate(this.fetcherSearch.centerDate.getDate() - 28);
        this.fetcherSearch.endTime.setDate(this.fetcherSearch.centerDate.getDate() + 28);
    };
    EventFetcherComponent.prototype.checkInputs = function () {
        if (this.geocodePacket) {
            this.fetcherSearch.coordsSet = true;
            this.fetcherSearch.lat = this.geocodePacket.geometry.location.lat();
            this.fetcherSearch.lng = this.geocodePacket.geometry.location.lng();
        }
        else {
            this.fetcherSearch.coordsSet = false;
        }
        if (100 <= this.fetcherSearch.maxDistance && this.fetcherSearch.maxDistance <= 4800) {
            this.fetcherSearch.maxDistSet = true;
        }
        else {
            this.fetcherSearch.maxDistSet = false;
        }
        this.readyToFetch = (this.fetcherSearch.coordsSet && this.fetcherSearch.maxDistSet);
        this.cd.detectChanges();
    };
    EventFetcherComponent.prototype.login = function () {
        var _this = this;
        var x = this.facebookService.facebookLogin2();
        console.log(x);
        var z;
        x.subscribe(function (data) {
            z = data;
            console.log("-------");
            console.log(data);
            console.log(data.name);
            _this.username = data.name;
            //this.manualCheck(data);
            _this.cd.detectChanges();
        });
    };
    EventFetcherComponent.prototype.placesToEventsToDB = function () {
        //"/470483233084822/events"
        var count = 0;
        var query = this.getQuery();
        this.getFacebookPlaces(query, count);
        //this.getFacebookPlaces("search?pretty=0&type=place&center=34.12%2C-118.15&distance=1200&limit=25&after=MTQ5", count);
    };
    EventFetcherComponent.prototype.getQuery = function () {
        var queryString = "search?pretty=0&type=place&center=";
        queryString += this.fetcherSearch.lat;
        queryString += "%2C";
        queryString += this.fetcherSearch.lng;
        queryString += "&distance=";
        queryString += this.fetcherSearch.maxDistance;
        queryString += "&limit=25";
        console.log(queryString);
        console.log("search?pretty=0&type=place&center=34.12%2C-118.15&distance=1200&limit=25&after=MTQ5");
        return queryString;
    };
    EventFetcherComponent.prototype.getFacebookPlaces = function (query, count) {
        var _this = this;
        var placesObservable = this.facebookService.accessGraphAPI(query);
        placesObservable.subscribe(function (response) {
            if (response && !response.error) {
                // handle the result
                console.log(response.data);
                _this.allPlaces = _this.allPlaces.concat(response.data);
                if (count < 5 && response.paging) {
                    console.log("going again");
                    var nextQuery = response.paging.next;
                    _this.getFacebookPlaces(nextQuery, (count + 1));
                }
                else {
                    _this.getFacebookEvents();
                }
                console.log("THIS THING WORKED");
                console.log(response);
            }
            else {
                console.log("Didn't work");
            }
        });
    };
    EventFetcherComponent.prototype.getFacebookEvents = function () {
        var _this = this;
        console.log("from places to events");
        console.log(this.allPlaces);
        //this.fetcherSearch.startTime.setDate(this.fetcherSearch.centerDate.getDate() - 28);
        //this.fetcherSearch.endTime.setDate(this.fetcherSearch.centerDate.getDate() + 28);
        var placesToCheck = this.allPlaces.length;
        for (var i = 0; i < placesToCheck; i++) {
            var currentPlace = this.allPlaces[i];
            // create query string from place info
            var query = "/";
            var id = currentPlace.id;
            query += id;
            query += "/events";
            console.log(query);
            var placesObservable = this.facebookService.accessGraphAPI(query);
            placesObservable.subscribe(function (response) {
                if (response && !response.error) {
                    for (var j = 0; j < response.data.length; j++) {
                        if (_this.isInTimeWindow(response.data[j])) {
                            console.log("found an event!");
                            console.log(response.data[j]);
                            _this.allEvents.push(response.data[j]);
                        }
                    }
                }
                else {
                    console.log("failed to get events");
                }
                _this.fireWhenFull(placesToCheck, false, false);
            });
        }
    };
    EventFetcherComponent.prototype.fireWhenFull = function (countNeeded, fireNow, reset) {
        this.count++;
        if (reset) {
            this.count = 0;
        }
        else if ((this.count >= countNeeded) || fireNow) {
            this.eventsToDb();
        }
        //global variable for number of places searched so far
        //if all done, send to db
    };
    EventFetcherComponent.prototype.eventsToDb = function () {
        var _this = this;
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
            .then(function (storedSearch) {
            _this.myTestService.pushEvent(_this.geocodePacket)
                .then(function (storedGeo) {
                _this.recAddToDB(0);
            });
        });
        //this.recAddToDB(0);
        //this.myTestService.getEvents().then(events => this.xxxxx = events);
        //this.goToFilter();
    };
    EventFetcherComponent.prototype.recAddToDB = function (count) {
        var _this = this;
        if (count >= this.allEvents.length) {
            this.myTestService.getEvents()
                .then(function (events) {
                _this.xxxxx = events;
                _this.dbCheck();
                _this.goToFilter();
            });
        }
        else {
            this.myTestService.pushEvent(this.allEvents[count])
                .then(function (event) {
                count++;
                _this.recAddToDB(count);
            });
        }
    };
    EventFetcherComponent.prototype.isInTimeWindow = function (event) {
        var eventHasStart = event.hasOwnProperty('start_time');
        var eventHasEnd = event.hasOwnProperty('end_time');
        if (!eventHasStart || !eventHasEnd) {
            return false;
        }
        else {
            var eventStartString;
            var eventEndString;
            eventStartString = event.start_time;
            eventEndString = event.end_time;
            eventStartString.split("T").pop();
            eventEndString.split("T").pop();
            var eventStartArray = eventStartString.split("-");
            var eventEndArray = eventEndString.split("-");
            var eventStartDate = new Date(parseInt(eventStartArray[0]), parseInt(eventStartArray[1]) - 1, parseInt(eventStartArray[2]));
            var eventEndDate = new Date(parseInt(eventEndArray[0]), parseInt(eventEndArray[1]) - 1, parseInt(eventEndArray[2]));
            console.log(this.fetcherSearch.startTime);
            console.log(this.fetcherSearch.endTime);
            console.log(eventEndDate);
            console.log(eventStartDate);
            if (this.fetcherSearch.startTime <= eventStartDate && this.fetcherSearch.endTime >= eventEndDate) {
                return true;
            }
            else {
                return false;
            }
        }
        // "2013-12-07T00:00:00-0800"
        // year-month-day
    };
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
    EventFetcherComponent.prototype.dbCheck = function () {
        console.log("Did my DB work?");
        console.log(this.xxxxx);
    };
    // call this to force DOM update
    EventFetcherComponent.prototype.manualCheck = function (staller) {
        this.cd.markForCheck();
    };
    EventFetcherComponent.prototype.addressToGeocode = function (address) {
        //console.log("into addressToGeocode");
        var query = { 'address': address };
        var self = this; // so we can access variables from event-fetcher
        function updateGeocodePacket(geoResults) {
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
        this.geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                //console.log("geocoder.geocode() successful");
                updateGeocodePacket(results[0]);
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
                updateGeocodePacket(null);
            }
        });
    };
    EventFetcherComponent.prototype.goToFilter = function () {
        this.router.navigate(['/event-filter']);
    };
    return EventFetcherComponent;
}());
EventFetcherComponent = __decorate([
    core_1.Component({
        selector: 'event-fetcher',
        templateUrl: './event-fetcher.component.html',
        styleUrls: ['./event-fetcher.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router,
        core_2.ChangeDetectorRef,
        core_1.NgZone,
        facebook_service_1.FacebookService,
        my_test_service_1.MyTestService])
], EventFetcherComponent);
exports.EventFetcherComponent = EventFetcherComponent;
//# sourceMappingURL=event-fetcher.component.js.map