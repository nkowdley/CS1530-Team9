//Disables alerts for uneeded alerts used in certain tested functions
//window.alert = function() {};

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
//Will ALWAYS derive a location from the contents of "address" input, even without full address
QUnit.test("get coords test", function(assert)
{
    var coords;
    $("#address").val("Posvar");
    
    //Asychronous getCoords() success test
    getCoords(function(coords)
    {
        //Should return 40.4417002 lat and -79.95383900000002 lng
        assert.ok(coords.lng() == -79.95383900000002 && coords.lat() == 40.4417002, "Posvar coords correctly found");
    });
    
    $("#address").val("-");
    
    //Asychronous getCoords() failure test
    getCoords(function(coords)
    {
        //Should return 40.4417002 lat and -79.95383900000002 lng
        assert.ok(coords == "failure", "Coord failure detected");
    });
    
    //Due to asychronous call, this should be undefined
    assert.notOk(coords); 
});

//Check to see if the function properly enforces all fields to be filled
QUnit.test("pic upload validation", function(assert)
{    
    //CAN NOT PROGRAMMITCALLY SET A FILE NAME, THUS VALIDATION WILL NOT BE TESTED
    //Check if no photo selected fails
    /*$("#myfile").val("photo");
    $("#address").val("Posvar");
    assert.ok(uploadPic() === "photo selection failed", "photo selection enforced");*/
    
    //Check if no location selected fails
    $("#address").val("");
    assert.ok(uploadPic() === "location selection failed", "location selection enforced");
    
    //Check if getCoords fails
    $("#address").val("-"); //Location is selected, but getCoords will fail with this input
    assert.ok(uploadPic() === "getCoords failed", "getCoords success enforced");
    
    //Check if success when all fields included
});

//Check to see if a photo will be properly uploaded to server
QUnit.test("pic upload success", function(assert)
{
    //Possibly untestable due to inability to programmatically set file name
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
    alert(place.geometry.location);
    var place = searchBox.getPlaces()[0];
    map.setCenter(place.geometry.location);
    
    //Get map object
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var mapOptions = {
    center: { lat: 40.441983, lng: -79.957351},
    zoom: 10
    };
    assert.ok(map.getCenter() == expected , "Map correctly centered on posvar");
});
