/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<div class="col-md-6"><h1 id="name">%data%</h1></div>';
var HTMLheaderRole = '<div class="col-md-6"><span>%data%</span><hr/></div>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<div class="col-sm-4"><span class="orange-text">email</span><span id="email" class="white-text">%data%</span></div>';
var HTMLtwitter = '<div class="col-sm-4"><span class="orange-text">twitter</span><span id="twitter" class="white-text">%data%</span></div>';
var HTMLgithub = '<div class="col-sm-4"><span class="orange-text">github</span><span id="github" class="white-text">%data%</span></div>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLWelcomeMsg = '%data%';

var HTMLskillsStart = '<h3 id="skillsH3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="%link%" class="work-link">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p class="work-description"><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLextraStart = '<div><ul class="extra-entry"></ul></div>';
var HTMLextraDescription = '<li><a href="%link%" class="work-link">%data%<a></li>';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="%link%" class="work-link">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

/**
 * Take a name and convert to international
 * @param name the name to covert.
 * @param the convert name.
 */
function inName(name) {
  var a = name.split(" ");

  var first = a[0].toLowerCase();
  var last = a[1].toUpperCase();
  var firstLetter = first.slice(0, 1).toUpperCase();
  var firstRest = first.slice(1, first.length);

  var result = firstLetter + firstRest + " " + last;
  return result;
}

/**
 *  When the document is fully loaded, then add event handlers for email, twitter and github.
 */
$(document).ready(function() {
  // not used
  $('button').click(function() {
    var myName = $('#name').html();
    console.log(myName);
    var iName = inName(myName) || function(){};
    $('#name').html(iName);  
  });

  // from Stack Overflow http://stackoverflow.com/questions/1843674/how-to-change-cursor-from-pointer-to-finger-using-jquery.
  $("#email").css("cursor", "pointer");
  // from Stack Overflow http://stackoverflow.com/questions/22941457/open-email-client-through-javascript.
  $('#email').on('click',function(){
       window.location.href = "mailto:" + bio.contacts.email + "?subject=RE: Your Resume&body=Hi " + bio.name; 
    });

  $("#twitter").css("cursor", "pointer");
  $('#twitter').on('click',function(){
       window.location.href = bio.contacts.twitter; 
    });

  $("#github").css("cursor", "pointer");
  $('#github').on('click',function(){
       window.location.href = bio.contacts.github; 
    });
});

/**
 * The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
 */
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

// moved to resumeBuilder.js
// $(document).click(function(loc) {
//   logClicks(loc.screenX, loc.screenY);
// });

/**
 * Here's where we generate the custom Google Map for the website.
 */
var map;    // declares a global map variable

/**
 * createMapMarker(placeData) reads Google Places search results to create map pins.
 * placeData is the object returned from search results containing information
 * about a single location.
 *
 * @param placeData a Google object representing a location.
 */
function createMapMarker(placeData) {

  // The next lines save location data from the search result object to local variables
  var lat = placeData.geometry.location.lat();  // latitude from the place service
  var lon = placeData.geometry.location.lng();  // longitude from the place service
  var name = placeData.formatted_address;   // name of the place from the place service
  var bounds = window.mapBounds;            // current boundaries of the map window

  // marker is an object with additional data about the pin for a single location
  var marker = new google.maps.Marker({
    map: map,
    position: placeData.geometry.location,
    title: name
  });

  // infoWindows are the little helper windows that open when you click
  // or hover over a pin on a map. They usually contain more information
  // about a location.
  var infoWindow = new google.maps.InfoWindow({
    content: name
  });

  // gets called when the user clicks on a balloon.
  google.maps.event.addListener(marker, 'click', function() {
    console.log(marker.__gm.yf.title);
    // open a new tab showing the Google search results for the location
    var search = "https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=" + marker.__gm.yf.title.replace(", ", "+");
    window.open(search, "_blank");
  });

  console.log("Adding " + lat + "," + lon);
  // this is where the pin actually gets added to the map.
  // bounds.extend() takes in a map location object
  bounds.extend(new google.maps.LatLng(lat, lon));
  // fit the map to the new marker
  map.fitBounds(bounds);
  // center the map
  map.setCenter(bounds.getCenter());
}

/**
 * Callback(results, status) makes sure the search returned results for a location.
 * If so, it creates a new map marker for that location.
 *
 * @param result a Google map object that respresents a location.
 * @param status the result of the search.
 */
function callback(results, status) {
  console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMapMarker(results[0]);
  }
}

/**
 * pinPoster(locations) takes in the array of locations created by locationFinder()
 * and fires off Google place searches for each location
 *
 * @param locations an array of locations.
 */
function pinPoster(locations) {

  // creates a Google place search service object. PlacesService does the work of
  // actually searching for location data.
  var service = new google.maps.places.PlacesService(map);

  // Iterates through the array of locations, creates a search object for each location
  for (var place in locations) {

    // the search request object
    var request = {
      query: locations[place]
    };
    //console.log("Searching for " + request);

    // Actually searches the Google Maps API for location data and runs the callback
    // function with the search results after each search.
    service.textSearch(request, callback);

    //console.log("Done searching for " + request);
  }
}

/**
 * Search our locations to see if the location already exists in the array.
 * @param locations the array to search
 * @param location the location to search for.
 * @return true if found, otherwise false;
 */
function searchLocations(locations, location) {
  var found = false;
  if (location != undefined) {
    //console.log("Searching for " + location);
    locations.forEach(function(d) {
      if (d === location) {
        found = true;
        //console.log("found " + d);
        return;
      }
    });
  } else {
    found = true;
  }
  return found;
}

/**
 * Initialize the map.  This is from Googles "Getting Started" map api guide.
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6097, lng: -122.3331},
    scrollwheel: false,
    backgroundColor: 'none',
    zoom: 8
  });

  var locations = [];

  locations.push(bio.contacts.location);

  // iterates through school locations and appends each location to
  // the locations array
  for (var school in education.schools) {
    if (searchLocations(locations, education.schools[school].location) != true) {
      locations.push(education.schools[school].location);
    }
  }

  // iterates through work locations and appends each location to
  // the locations array
  for (var job in work) {
    if (searchLocations(locations, work[job].location) != true) {
      locations.push(work[job].location);
    }
  }
  console.log(locations);
  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);
}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});
