"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms"); // <-- NgModel lives here
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
//for in-memory API
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var in_memory_data_service_1 = require("./in-memory-data.service");
var app_component_1 = require("./app.component");
var event_fetcher_component_1 = require("./event-fetcher.component");
var event_map_component_1 = require("./event-map.component");
var event_filter_component_1 = require("./event-filter.component");
var event_list_component_1 = require("./event-list.component");
var welcome_component_1 = require("./welcome.component");
var event_detail_component_1 = require("./event-detail.component");
//import { EventFetcherService }  from './event-filter.service';
//import { EventFilterService }  from './event-filter.service';
var my_test_service_1 = require("./my-test.service");
var facebook_service_1 = require("./facebook.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService),
        ],
        providers: [
            my_test_service_1.MyTestService,
            facebook_service_1.FacebookService,
        ],
        declarations: [
            app_component_1.AppComponent,
            event_fetcher_component_1.EventFetcherComponent,
            event_filter_component_1.EventFilterComponent,
            event_map_component_1.EventMapComponent,
            event_list_component_1.EventListComponent,
            welcome_component_1.WelcomeComponent,
            event_detail_component_1.EventDetailComponent,
        ],
        bootstrap: [app_component_1.AppComponent,]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map