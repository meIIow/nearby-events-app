import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import {SearchPacket} from './search-packet';

declare var google: any;

@Component({
  selector: 'event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css'],
})
export class EventMapComponent  implements OnChanges{
  @Input() selectedEvent: any;
  @Input() events: any[];
  @Input() currentSearch: SearchPacket;
  @Input() currentGeo: any;
  @Input() tempZoom: number;


  constructor(
    //private heroService: HeroService,
    private router: Router,
  ) { }

  ngOnChanges(): void {
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

    function getCircle(miles: number) {
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

    map.data.setStyle(function(feature: any) {
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
          var eventLatLang = new google.maps.LatLng(
            parseFloat(this.selectedEvent.place.location.latitude),
            parseFloat(this.selectedEvent.place.location.longitude)
          )

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
        radius: this.currentSearch.maxDistance,    // 2 miles in metres
        fillColor: '#AA0000'
      });
      circle.bindTo('center', marker, 'position');
    }

    // if no search packet, assign generic one
  }

}
