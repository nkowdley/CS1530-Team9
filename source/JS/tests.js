//Hello World test
QUnit.test("hello test", function(assert) 
{
    assert.ok(1 == "1", "One does in fact equal 1");
});

//Map Init Test
QUnit.test("map init test", function(assert) 
{
        var result = gotoMap();
        assert.ok(result, "gotoMap() returned a map obj that evalutes to true");
});

//Tests getCoords function, function should return a google location object of searched for location
QUnit.test("get coords test", function(assert)
{
    var coords;
    $("#address").val("Posvar");
    
    //Asychronous getCoords();
    getCoords(function(coords)
    {
        //Should return 40.4417002 lat and -79.95383900000002 lng
        assert.ok(coords.lng() == -79.95383900000002 && coords.lat() == 40.4417002, "Posvar coords correctly found");
    });
    
    //Need to expect 0 for asychronous acceptenc
    expect(0);
});

//Check to see if the function properly adds db entry and photo to server
QUnit.test("pic upload test", function(assert)
{

});

//Test maps api search functionality (broked)
QUnit.test("map search test", function(assert) 
{
    //Init map
    gotoMap();
    
    //Search for posvar
   
    $("#search-box").val("Posvar"); 
    $("#search-box").click(); 
    
    
    var searchBox = new google.maps.places.SearchBox(document.getElementById('search-box'));
    //alert(searchBox.getPlaces());
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
    //alert(result.lat());
    assert.ok(map.getCenter() == expected , "Map correctly centered on posvar");
});
