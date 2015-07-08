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
            //TODO: pack in user info and lat/lng of the pic
            else
            {
                //Get and set user info as local vars
                
                
                //Set lng/lat as local vars
                var lat = coords.lat();
                var lng = coords.lng();
                                
                //Get file from upload form data. This will include the name
                var files = $('#myfile')[0];               
                var data = new FormData();                
                var url =  "PHP/uploadpic.php";
                var xhr = new XMLHttpRequest();  

                //Add files to dataform 
                jQuery.each(files.files, function (i, file) {
                    data.append("myfile", file)
                });     
                
                //Pack lat/lng into dataform
                data.append("lat", lat);
                data.append("lng", lng);
                        
                //Using xhr cuase undertermined issue with jquery ajax
                xhr.open('POST', url, true);
                xhr.upload.onprogress = function(e) {    
                };    

                xhr.upload.onerror = function(e){
                };
                
                
                //Completion listener
                xhr.addEventListener('readystatechange', function(e) {
                if( this.readyState === 4 ) 
                {
                    var result = this.responseText;
                    alert(result);
                    $('#myfile').val(null);
                }
                });
                xhr.send(data);
                callback("complete");
            }
        });
    }
    
    return "failure"
}

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
    if(filename.lastIndexOf("png") !== filename.length-3) //Accepts only png
    {
        alert("Must provide .png file to be uploaded");
        return "pic selection failed";
    }
    
    return "success";
}

//Unimplmented, and may not be used. Possibly just pack the lat/lng into db
//Embeds the Lat/Lng position got from the google api's into a pics exif tags
function embedCoords(file, coords)
{
    //Create a file reader
    var fr = new FileReader();
    
    fr.onloadend = function() //When ready
    {
        //Get exif
        var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));

        alert(exif);
    };
}
