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
var Observable_1 = require("rxjs/Observable");
var FacebookService = (function () {
    function FacebookService(ngZone) {
        this.ngZone = ngZone;
        this.loggedIn = false;
        if (!window.fbAsyncInit) {
            console.log('define');
            window.fbAsyncInit = function () {
                FB.init({
                    appId: "1675373839434472",
                    xfbml: true,
                    version: 'v2.9'
                });
            };
        }
    }
    FacebookService.prototype.testOne = function () {
        var query = "/";
        var id = "124809187539278";
        query += id;
        query += "/events";
        FB.api(query, function (response) {
            if (response && !response.error) {
                // handle the result
                console.log("In FB Service, got request");
                console.log(response);
                var thisEvent = response.data[0];
                //self.myTestService.pushEvent(thisEvent);
                var theseEvents;
            }
            else {
                console.log("In FB Service NO EVENT");
            }
        });
    };
    //delete me
    FacebookService.prototype.facebookLogin = function () {
        var self = this;
        FB.login(function (response) {
            if (response.authResponse) {
                FB.api('/me', function (response) {
                    self.ngZone.run(function () {
                        console.log(response);
                        self.username = response.name;
                        console.log(self.username);
                    });
                });
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    };
    FacebookService.prototype.accessGraphAPI = function (query) {
        var self = this;
        return Observable_1.Observable.create(function (observer) {
            FB.api(query, function (response) {
                observer.next(response);
                console.log(response.name);
                observer.complete();
            });
        });
    };
    FacebookService.prototype.facebookLogin2 = function () {
        return Observable_1.Observable.create(function (observer) {
            // Do the FB login and wait for the data to come back
            FB.login(function (response) {
                if (response.authResponse) {
                    FB.api('/me', function (response) {
                        observer.next(response);
                        console.log(response.name);
                        observer.complete();
                    });
                }
                else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        });
    };
    //delete me
    FacebookService.prototype.getLoginInfo = function () {
        return this.username;
    };
    FacebookService.prototype.loadAndInitFBSDK = function () {
        var js, id = 'facebook-jssdk', ref = document.getElementsByTagName('script')[0];
        if (document.getElementById(id)) {
            return;
        }
        js = document.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        ref.parentNode.insertBefore(js, ref);
    };
    return FacebookService;
}());
FacebookService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone])
], FacebookService);
exports.FacebookService = FacebookService;
//# sourceMappingURL=facebook.service.js.map