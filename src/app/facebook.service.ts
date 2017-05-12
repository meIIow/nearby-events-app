import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';

declare var FB: any;

@Injectable()
export class FacebookService {

  username: string;
  loggedIn = false;
  allPlaces: any[];
  allEvents: any[];

  constructor(
    private ngZone: NgZone,
  ) {
    if (!(<any>window).fbAsyncInit) {
      console.log('define');
      (<any>window).fbAsyncInit = function() {
        (<any>FB).init({
          appId: "1675373839434472",
          xfbml: true,
          version: 'v2.9'
        });
      };
    }

  }

  testOne() {

    var query = "/";
    var id = "124809187539278";
    query += id;
    query += "/events";

    (<any>FB).api(query, function (response: any) {

      if (response && !response.error) {
        // handle the result
        console.log("In FB Service, got request");
        console.log(response);
        var thisEvent = response.data[0];
        //self.myTestService.pushEvent(thisEvent);
        var theseEvents;
        //self.myTestService.getEvents().then(events => self.xxxxx = events);
      } else {
        console.log("In FB Service NO EVENT");
      }
    });
  }

  //delete me
  facebookLogin(): void {
    var self = this;
    FB.login(function(response: any) {
		    if (response.authResponse) {
		        FB.api('/me', function(response: any) {
	          	self.ngZone.run(() => {
                console.log(response);
				        self.username = response.name;
                console.log(self.username);
			        });
		        });
		    }else{
		        console.log('User cancelled login or did not fully authorize.');
		    }
		});
  }

  accessGraphAPI(query: string): Observable<any>{
    var self = this;
    return Observable.create((observer: any) => {
      FB.api(query, function (response: any) {
        observer.next(<any>response);
        console.log(response.name);
        observer.complete();
      });
    });
  }


  facebookLogin2(): Observable<any> {
    return Observable.create((observer: any) => {
        // Do the FB login and wait for the data to come back
        FB.login((response: any) => {
            if (response.authResponse) {
              FB.api('/me', function(response: any) {
                observer.next(<any>response);
                console.log(response.name);
                observer.complete();
  		        });
            } else {
              console.log('User cancelled login or did not fully authorize.');
            }
        });
    });
  }

  //delete me
  getLoginInfo(): string {
    return this.username;
  }

  loadAndInitFBSDK():Observable<any>{
    var js,
      id = 'facebook-jssdk',
      ref = document.getElementsByTagName('script')[0];

    if (document.getElementById(id)) {
      return;
    }

    js = document.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/sdk.js";

    ref.parentNode.insertBefore(js, ref);
  }

}
