//Indcludes
var script = document.createElement('script');
script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

script = document.createElement('script');
script.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyCYRCZ4qnZv2QpyPCbSX7vP1ZiKLsuX9gQ"';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

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