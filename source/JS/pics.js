//Listener for form submission
$("form[name=upload-form]").submit(function(){
    uploadPic($("#myfile").val(), function(){});
    return false;
});

//Prepare a pic for upload onto server and db
//Handles physical upload to file and will be limited mostly to live testing
//Asynchronous call to getPicCoords makes function asynchronous
function uploadPic(filename, callback) //callback for testing
{
    var success = validateUploadForm(filename);   
    
    if(success === "success")
    {        
        //Get pic coords, rest of the upload must be in callback
        getPicCoords(function(coords) //coords is a google maps api object
        {
            //If coords are not found then exit. Should not occur with proper form validation
            if(coords == "failure")
            {
                alert("Coordinate lookup failed");  
                return "failure";
            }
            
            //Prepare data and upload
            //TODO: handle facebook error better. 
            else
            {
                //Get user Id. Asychronous, so wrap upload in the callback for simple handling
                getUserId(function(userId)
                { 
                    //Ensure that the facebook request sent a valid returns
                    if(userId) //TODO: handle better then just if not null
                    {
                        //Set user id as local var
                        console.log("UserId = " + userId);
                        
                        //Set lng/lat as local vars
                        var lat = coords.lat();
                        var lng = coords.lng();
                        
                        //Get file from upload form data. This will include the name of the pic
                        var files = $('#myfile')[0];               
                        var data = new FormData();                
                        var url =  "PHP/uploadPic.php";
                        var xhr = new XMLHttpRequest();                    
                                        
                        //Add files to dataform 
                        jQuery.each(files.files, function (i, file) {
                            data.append("myfile", file)
                        });     
                        
                        //Pack lat/lng  and user id into dataform
                        data.append("lat", lat);
                        data.append("lng", lng);
                        data.append("userId", userId);
                                
                        //Using xhr cuase undertermined issue with jquery ajax
                        xhr.open('POST', url, true);                
                        
                        //Completion listener
                        xhr.addEventListener('readystatechange', function(e) {
                        if( this.readyState === 4 ) 
                        {
                            var result = this.responseText;
                            alert(result); //FOR DEBUG ONLY
                            $('#myfile').val(null);
                        }
                        });
                        xhr.send(data);
                        callback("complete");
                    }
                    
                    else //facebook /me request did not return a valid value
                        alert("Could not get user ID");
                });
            }
        });
    }
    
    //alert("failed"); //DEBUG
    return "failure"
}

//Makes sure form is properly set up and enviroment is ready to load
function validateUploadForm(filename)
{
    //If location not selected, alert and exit
    var location = $("#address").val();
    if(location === "" || location === null)
    {
        alert("Must select a location");
        return "location selection failed";
    }
  
    //If pic not selected, alert and exit.
    if(filename.lastIndexOf("png") !== filename.length-3) //accepts only png
    {
        alert("Must provide .png file to be uploaded");
        return "pic selection failed";
    }
    
    return "success";
}


//Gets all pic entries from the DB by calling getPics.php
function getAllPics(callback) //asynchronous
{
    //Ajax call to getPics.php
    $.ajax({
        url: 'PHP/getPics.php',
        success: function(data) {
            var json = JSON.parse(data);
            //console.log("PIC DATA - " + json[0].picPath); //DEBUG
            callback(json);
        }
    });
}

//Function used to place markers representing pics on the the map
//Currently just places ALL markers, which is an unscalable solution
// WARNING: pic path needs to absolute for server
function populateMap() //uses asynchronous calls, but its return shouldn't actually matter
{
    //Get list of all pics
    getAllPics(function(pics) { //more asynch hell 
        //Iterate over list of pics
        for(var i=0; i<pics.length; i++)
        {
            var pic = pics[i];
            
            //Get attributes from pic
            //**Whats up with relative paths? this file is already in CStest so why need to add?
            var path = "/CStest" + pic.picPath; //THIS IS FOR MY PERSONAL LOCAL HOSTING, NEEDS CHANGED FOR SERVER
            var uploader = pic.uploaderId;
            
            //Make LatLng obj
            var myLatLng = new google.maps.LatLng(pic.picLat, pic.picLng);
                        
            //Generate infoWindow for pic
            var infoHtml = '<div style="width: 100%; height:100%;">' +
            '<img style="width: 400px;" src="' + path + '"width></div>';
            var infowindow = new google.maps.InfoWindow({
                content: infoHtml
            });
            
            //Place marker for pic
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Title'
            });
            
            //Add listener to open window on click
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });
            
            
        }
    });
}
