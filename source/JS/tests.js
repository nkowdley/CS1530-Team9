/*
 * No automated tests for functions reliant on file selction due to JavaScript security features
 *
 */

//Hack that disables alerts for uneeded alerts used in certain tested functions
window.alert = function() {};

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
    getCoords(function(coords){
        //Should return 40.4417002 lat and -79.95383900000002 lng
        assert.ok(coords == "failure", "Coord failure detected");
    });
    
    //Due to asychronous call, this should be undefined
    assert.notOk(coords); 
});

//Test upload form validation
QUnit.test("pic form validation", function(assert)
{      
    //Check if no location selected fails
    $("#address").val("");
    assert.ok(validateUploadForm("billy.png") === "location selection failed", "location selection fail enforced");
    
    //Check if location but improper file fails
    $("#address").val("Posvar"); //add proper location
    assert.ok(validateUploadForm("billy") === "photo selection failed", "photo selection fail enforced");
    
    //Check if success when all fields included
    assert.ok(validateUploadForm("billy.png") === "success", "valid form passed");
});

//Test that uploadPic() successfully calls PHP upload script
QUnit.test("uploadPic() prelim test", function(assert)
{    
    var result;
    uploadPic("sample.png", function(result){
        assert.ok(result === "complete", "uploadPic() ran through");
    });
    
    assert.notOk(result, "Result should be undefined");
});

//Test embeding location coords into a photo's exit data
QUnit.test("coord embed test", function(assert)
{
    var coords = new google.maps.LatLng(40.441983, -79.957351);
    //embedCoords(, coords)
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
