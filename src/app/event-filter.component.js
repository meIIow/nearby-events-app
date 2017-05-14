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
var my_test_service_1 = require("./my-test.service");
var EventFilterComponent = (function () {
    function EventFilterComponent(
        //private heroService: HeroService,
        myTestService, router) {
        this.myTestService = myTestService;
        this.router = router;
    }
    EventFilterComponent.prototype.ngOnInit = function () {
        this.testNumber = 3;
        this.currentSearch = {
            terms: '',
            centerCoordinates: 'YYY',
            maxDistance: 0,
            startTime: new Date(),
            endTime: new Date(),
            name: '',
            coordsSet: true,
            maxDistSet: true,
            lat: '',
            lng: '',
            centerDate: new Date(),
        };
        this.mapSize = 12;
        this.getEventsAndDefault();
    };
    EventFilterComponent.prototype.getEventsAndDefault = function () {
        var _this = this;
        this.myTestService.getEvents().then(function (data) {
            if (data.length > 6) {
                _this.events = data.slice(6);
                _this.allEvents = data.splice(6);
            }
            if (data.length > 5) {
                _this.currentSearch = data[4];
                _this.geocodePacket = data[5];
            }
            console.log(_this.events);
            console.log(_this.currentSearch);
        });
        this.testNumber = 6;
    };
    EventFilterComponent.prototype.filterEvents2 = function () {
        console.log(this.allEvents);
        this.events.length = 0;
        /*
        for (var eventToCheck of this.allEvents) {
          console.log(eventToCheck);
          if (this.checkEvent(eventToCheck)) {
            this.events.push(eventToCheck);
          }
        }
        */
        for (var _i = 0, _a = this.allEvents; _i < _a.length; _i++) {
            var eventToCheck = _a[_i];
            console.log(eventToCheck);
            if (this.checkEvent(eventToCheck)) {
                this.events.push(eventToCheck);
            }
        }
        console.log(this.events);
        var xx = "my name is joe";
        var y;
        y = xx.split(" ");
        console.log(y);
        var z;
        z = xx.split("");
        console.log(z);
        xx = "time";
        var y;
        y = xx.split(" ");
        console.log(y);
        var z;
        z = xx.split("");
        console.log(z);
        console.log(xx.toLowerCase().indexOf("".toLowerCase()));
        console.log(xx.toLowerCase().indexOf("name".toLowerCase()));
    };
    /*
  Object
  description:
  "Join us -  Relax and mingle with wonderful women. Enjoy the beautiful selection of women's apparel and accessories, receive 10% off purchases (except Brighton). Meet Megan Monroe, Stylist, find a new look or update your current. Don't forget mother's day is just around the corner. See you soon!"
  end_time:
  "2017-05-02T22:00:00-0700"
  id:
  "119996128556025"
  name:
  "Ladies' Night"
  place:
  Object
  start_time:
  "2017-05-02T18:00:00-0700"
  __proto__:
  Object
    */
    EventFilterComponent.prototype.checkEvent = function (event) {
        // check for name
        var match = true;
        console.log(this.currentSearch.name);
        console.log(this.currentSearch.terms);
        var eventName = event.name.toLowerCase();
        var eventDescription = event.description.toLowerCase();
        var nameTerms;
        nameTerms = (this.currentSearch.name).split(" ");
        console.log(nameTerms);
        for (var _i = 0, nameTerms_1 = nameTerms; _i < nameTerms_1.length; _i++) {
            var nameTerm = nameTerms_1[_i];
            var x = nameTerm.toLowerCase();
            if (eventName.indexOf(x) < 0) {
                match = false;
            }
        }
        var searchTerms;
        searchTerms = (this.currentSearch.terms).split(" ");
        console.log(searchTerms);
        for (var _a = 0, searchTerms_1 = searchTerms; _a < searchTerms_1.length; _a++) {
            var searchTerm = searchTerms_1[_a];
            var x = searchTerm.toLowerCase();
            if (eventName.indexOf(x) < 0 && eventDescription.indexOf(x) < 0) {
                match = false;
            }
        }
        //check for start and end time
        /*
        if (!this.isInTimeWindow(event)) {
          match = false;
        }
        */
        return match;
    };
    EventFilterComponent.prototype.isInTimeWindow = function (event) {
        var eventHasStart = event.hasOwnProperty('start_time');
        var eventHasEnd = event.hasOwnProperty('end_time');
        if (!eventHasStart || !eventHasEnd) {
            return false;
        }
        else {
            var eventStartInfo = [];
            var eventEndInfo = [];
            var startDateVsTime = event.start_time.split("T");
            var endDateVsTime = event.end_time.split("T");
            var eventStartDateArray = startDateVsTime[0].split("-");
            var eventEndDateArray = endDateVsTime[0].split("-");
            var eventStartTimeArray = startDateVsTime[1].split(":");
            var eventEndTimeArray = endDateVsTime[1].split(":");
            eventStartInfo = eventStartDateArray.concat(eventStartTimeArray);
            eventEndInfo = eventEndDateArray.concat(eventEndTimeArray);
            var eventStartDate = new Date(parseInt(eventStartInfo[0]), parseInt(eventStartInfo[1]), parseInt(eventStartInfo[2]), parseInt(eventStartInfo[3]), parseInt(eventStartInfo[4]));
            var eventEndDate = new Date(parseInt(eventEndInfo[0]), parseInt(eventEndInfo[1]), parseInt(eventEndInfo[2]), parseInt(eventEndInfo[3]), parseInt(eventEndInfo[4]));
            console.log(this.currentSearch.startTime);
            console.log(this.currentSearch.endTime);
            console.log(eventEndDate);
            console.log(eventStartDate);
            //return true;
            if (this.currentSearch.startTime <= eventStartDate && this.currentSearch.endTime >= eventEndDate) {
                return true;
            }
            else {
                return false;
            }
        }
        // FB event date/time reference
        // "2013-12-07T00:00:00-0800"
        // year-month-day
    };
    EventFilterComponent.prototype.filterEvents = function () {
        //does nothing so far
        this.addMe = {
            id: 100,
            name: 'I added this thru filter',
        };
        this.selectedEvent = this.addMe;
        this.selectedEvent = null;
        this.events.push(this.addMe);
    };
    EventFilterComponent.prototype.updateSelectedEvent = function (event) {
        this.selectedEvent = event;
    };
    EventFilterComponent.prototype.updateDate = function (dateInput, dateToUpdate) {
        //console.log(dateInput);
        //console.log(dateToUpdate);
        console.log(this.currentSearch.endTime);
        if (dateInput.length < 3) {
            return false;
        }
        var dateInputArray = dateInput.split("-");
        if (dateToUpdate === "startTimeTag") {
            var timeInfo = [];
            timeInfo.push(this.currentSearch.startTime.getHours());
            timeInfo.push(this.currentSearch.startTime.getMinutes());
            this.currentSearch.startTime = new Date(parseInt(dateInputArray[0]), parseInt(dateInputArray[1]), parseInt(dateInputArray[2]), timeInfo[0], timeInfo[1]);
        }
        else if (dateToUpdate == "endTimeTag") {
            var timeInfo = [];
            timeInfo.push(this.currentSearch.endTime.getHours());
            timeInfo.push(this.currentSearch.endTime.getMinutes());
            this.currentSearch.endTime = new Date(parseInt(dateInputArray[0]), parseInt(dateInputArray[1]), parseInt(dateInputArray[2]), timeInfo[0], timeInfo[1]);
        }
        else {
            console.log("dateframe update failed");
        }
        console.log(this.currentSearch.endTime);
        return true;
    };
    EventFilterComponent.prototype.updateDateTime = function (timeInput, timeToUpdate) {
        if (timeInput.length < 3) {
            return false;
        }
        console.log(timeInput);
        console.log(this.currentSearch.endTime);
        var timeInputArray = timeInput.split(":");
        if (timeToUpdate === "startTimeTag") {
            var timeReset = [];
            timeReset.push(this.currentSearch.startTime.getFullYear());
            timeReset.push(this.currentSearch.startTime.getMonth());
            timeReset.push(this.currentSearch.startTime.getDate());
            timeReset.push(parseInt(timeInputArray[0]));
            timeReset.push(parseInt(timeInputArray[1]));
            this.currentSearch.startTime = new Date(timeReset[0], timeReset[1], timeReset[2], timeReset[3], timeReset[4]);
        }
        else if (timeToUpdate == "endTimeTag") {
            var timeReset = [];
            timeReset.push(this.currentSearch.endTime.getFullYear());
            timeReset.push(this.currentSearch.endTime.getMonth());
            timeReset.push(this.currentSearch.endTime.getDate());
            timeReset.push(parseInt(timeInputArray[0]));
            timeReset.push(parseInt(timeInputArray[1]));
            this.currentSearch.endTime = new Date(timeReset[0], timeReset[1], timeReset[2], timeReset[3], timeReset[4]);
        }
        else {
            console.log("timeframe update failed");
        }
        console.log(this.currentSearch.endTime);
        return true;
    };
    EventFilterComponent.prototype.backToFetcher = function () {
        this.router.navigate(['/event-fetcher']);
    };
    return EventFilterComponent;
}());
EventFilterComponent = __decorate([
    core_1.Component({
        selector: 'event-filter',
        templateUrl: './event-filter.component.html',
        styleUrls: ['./event-filter.component.css'],
    }),
    __metadata("design:paramtypes", [my_test_service_1.MyTestService,
        router_1.Router])
], EventFilterComponent);
exports.EventFilterComponent = EventFilterComponent;
//# sourceMappingURL=event-filter.component.js.map