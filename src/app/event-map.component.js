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
var search_packet_1 = require("./search-packet");
var EventMapComponent = (function () {
    function EventMapComponent(
        //private heroService: HeroService,
        router) {
        this.router = router;
    }
    EventMapComponent.prototype.ngOnChanges = function () {
        /*
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
        */
        var self = this;
        var lat = 51.508742;
        var lng = -0.120850;
        if (this.currentGeo) {
            //lat = this.currentGeo.geometry.location.lat();
            //lng = this.currentGeo.geometry.location.lng();
            lat = parseFloat(this.currentSearch.lat);
            lng = parseFloat(this.currentSearch.lng);
            console.log(lat);
            console.log(lng);
        }
        var mapProp = {
            center: new google.maps.LatLng(lat, lng),
            zoom: this.tempZoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        function getCircle(miles) {
            console.log("define circle");
            return {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'red',
                fillOpacity: .2,
                scale: 10,
                strokeColor: 'white',
                strokeWeight: .5
            };
        }
        map.data.setStyle(function (feature) {
            console.log("setting Style");
            return {
                icon: getCircle(self.currentSearch.maxDistance)
            };
        });
        if (self.currentGeo) {
            var marker = new google.maps.Marker({
                position: map.getCenter(),
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'red',
                    fillOpacity: 0,
                    scale: 0,
                    strokeColor: 'white',
                    strokeWeight: .5
                },
                draggable: true,
                map: map
            });
            if (this.selectedEvent) {
                if (this.selectedEvent.place.location) {
                    console.log("map knows an event was selected");
                    var eventLatLang = new google.maps.LatLng(parseFloat(this.selectedEvent.place.location.latitude), parseFloat(this.selectedEvent.place.location.longitude));
                    console.log(this.selectedEvent.place.location.latitude);
                    console.log(this.selectedEvent.place.location.longitude);
                    var eventMarker = new google.maps.Marker({
                        position: eventLatLang,
                        title: "Selected Event",
                        map: map
                    });
                }
            }
            var circle = new google.maps.Circle({
                map: map,
                radius: this.currentSearch.maxDistance,
                fillColor: '#AA0000'
            });
            circle.bindTo('center', marker, 'position');
        }
        // if no search packet, assign generic one
    };
    return EventMapComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EventMapComponent.prototype, "selectedEvent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EventMapComponent.prototype, "events", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", search_packet_1.SearchPacket)
], EventMapComponent.prototype, "currentSearch", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EventMapComponent.prototype, "currentGeo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EventMapComponent.prototype, "tempZoom", void 0);
EventMapComponent = __decorate([
    core_1.Component({
        selector: 'event-map',
        templateUrl: './event-map.component.html',
        styleUrls: ['./event-map.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router])
], EventMapComponent);
exports.EventMapComponent = EventMapComponent;
//# sourceMappingURL=event-map.component.js.map