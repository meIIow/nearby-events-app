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
var EventListComponent = (function () {
    //selectedHero: Hero;
    //heroes: Hero[];
    function EventListComponent(
        //private heroService: HeroService,
        router) {
        this.router = router;
        this.selectionEvent = new core_1.EventEmitter();
    }
    EventListComponent.prototype.ngOnInit = function () {
        this.doesNothing();
    };
    EventListComponent.prototype.onSelect = function (event) {
        this.selectedEvent = event;
        this.selectionEvent.next(this.selectedEvent);
    };
    EventListComponent.prototype.doesNothing = function () {
    };
    return EventListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EventListComponent.prototype, "events", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EventListComponent.prototype, "selectedEvent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EventListComponent.prototype, "selectionEvent", void 0);
EventListComponent = __decorate([
    core_1.Component({
        selector: 'event-list',
        templateUrl: './event-list.component.html',
        styleUrls: ['./event-list.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router])
], EventListComponent);
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=event-list.component.js.map