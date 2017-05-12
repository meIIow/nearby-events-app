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
    };
    EventFilterComponent.prototype.getEvents = function () {
        var _this = this;
        this.myTestService.getEvents().then(function (events) { return _this.events = events; });
        this.testNumber = 6;
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