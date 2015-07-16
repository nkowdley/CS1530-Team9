/*
 * No automated tests for functions reliant on file selction due to JavaScript security features
 *
 */

//Hack that disables alerts for uneeded alerts used in certain tested functions
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

//Tests getPicCoords function, function should return a google location object of searched for location
//Will ALWAYS derive a location from the contents of "address" input, even without full address
QUnit.test("get coords test", function(assert)
{
    var coords;
    $("#address").val("Posvar");
    
    //Asychronous getPicCoords() success test
    getPicCoords(function(coords)
    {
        //Should return 40.4417002 lat and -79.95383900000002 lng
        assert.ok(coords.lng() == -79.95383900000002 && coords.lat() == 40.4417002, "Posvar coords correctly found");
    });
    
    $("#address").val("-");
    
    //Asychronous getPicCoords() failure test
    getPicCoords(function(coords){
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
    assert.ok(validateUploadForm("billy") === "pic selection failed", "pic selection fail enforced");
    
    //Check if success when all fields included
    assert.ok(validateUploadForm("billy.png") === "success", "valid form passed");
});

//Test that uploadPic() calls the PHP script, other functions live tested due to file I/O
QUnit.test("uploadPic() test", function(assert)
{    
    var result;
    uploadPic("sample.png", function(result){
        assert.ok(result === "complete", "uploadPic() ran through");
    });
    
    assert.notOk(result, "Should see another assert.");
});

//Test that the getUserId function will properly return a user info in JSON format for a logged in user
QUnit.test("getUser test", function(assert)
{
    var result;
    getUser(function(result) {
        assert.ok(result, "GetUser returned valid");
    });
    
    assert.notOk(result, "Wait for aynch");
});

//Test that the getUserId function will properly return a user ID for a logged in user
QUnit.test("getUserId test", function(assert)
{
    var result;
    getUserId(function(result) {
        assert.ok(result, "GetUserId returned valid");
    });
    
    assert.notOk(result, "Should see another assert.");
});

//Test embeding location coords into a pic's exit data
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
