//Global initializations
var markers = [];
var map;
var mapOptions;

//Initialize map to default location and link up search box
function gotoMap() 
{
    //TODO: Current default is just some place over pgh, change to geolocation
    //Sets zoom and location map initially focused on. API examples defaults as of now
    mapOptions = {
      center: { lat: 40.441983, lng: -79.957351},
      zoom: 10
    };
    
    //Locally declares a map variable
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    //Create the search box and link it to the UI element.
    var input = (document.getElementById('search-box'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(input);
    
    
    //Listen for the event fired when the user selects an item from the
    //pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() 
    {
        //Get results of search
        var places = searchBox.getPlaces();

        if (places.length == 0) 
            return;
       
        //Init bounds
        var bounds = new google.maps.LatLngBounds();
        
        //Establish location for results of search selection
        for (var i = 0, place; place = places[i]; i++) 
        {
            var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
            };

            bounds.extend(place.geometry.location);
        }
        
        //Set map location/zoom
        map.fitBounds(bounds);
    });
   

    //Bias the SearchBox results towards places that are within the bounds of the current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
    });
        
    return map;
}

//Gets the lat/lng coordinates from text box
//Asychronous due to call to geocoder
function getCoords(callback)
{
    //Local vars
    var geocoder;
    geocoder = new google.maps.Geocoder();

    var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': address}, function(results, status) 
    {
        if (status == google.maps.GeocoderStatus.OK) 
        {
            //alert(results[0].geometry.location);
            callback(results[0].geometry.location);
        } 
        
        else
        {
            callback("failure");
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}