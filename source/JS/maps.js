//Function will cuase the display to go to "Map View", as of now just google map location
function gotoMap() 
{
    //Sets zoom and location map initially focused on. API examples defaults as of now
    var mapOptions = {
      center: { lat: 40.441983, lng: -79.957351},
      zoom: 10
    };
    
    //Locally declares a map variable
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    return map;
}