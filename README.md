# nearby-events-app
A web app that finds public FB Events near you

A demo-only app that can be used to find and filter FB events near a specified location.
Uses Angular2  with FB and Google Maps API integration.

How it works:


1. Fetch events

Login to FB (grants access to their Graph API)

Choose your location (app uses Google Maps' Geocoder to confirm address and find coordinates)

Customize Search parameters

Find events near your location within parameters
  (finds nearby places, then events hosted by these places -> workaround since no way to search events themselves by location)
 
 2. Filter events
 
 View and search within pool of already-fetched events for terms, names, stricter parameters, etc
  (minimizes FB API calls, which are limited. Event-finding workaround is query-intensive)
  
 Chooses specific events to look at in more detail
 
 How to run:
 
 clone repository to a folder, then
 in command line:
 
 npm install
 
 npm start

 then it should open and run on localhost in-browser
