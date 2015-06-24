//Hello World test
QUnit.test("hello test", function(assert) 
{
    assert.ok(1 == "1", "One does in fact equal 1");
});

QUnit.test("map init test", function(assert) 
{
        var result = gotoMap();
        assert.ok(result, "gotoMap() returned a map obj that evalutes to true");
});

QUnit.test("map search test", function(assert) 
{
    //Init map
    gotoMap();
    
    //Search for posvar
   
    $("#search-box").val("Posvar"); 
    $("#search-box").click(); 
    
    
    var searchBox = new google.maps.places.SearchBox(document.getElementById('search-box'));
    alert(searchBox.getPlaces());
    var place = searchBox.getPlaces()[0];
    map.setCenter(place.geometry.location);
    
    //Get map object
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var mapOptions = {
    center: { lat: 40.441983, lng: -79.957351},
    zoom: 10
    };
    
    //Create latlng object with posvar coords to compare against
    var expected = new google.maps.LatLng(0.441643, -79.953818, false);
    var result = new google.maps.LatLng();
    result = map.getCenter();
    alert(result.lat());
    assert.ok(map.getCenter() == expected , "Map correctly centered on posvar");
});
