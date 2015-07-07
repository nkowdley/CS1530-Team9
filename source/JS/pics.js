//Listener for form submission
$("form[name=upload-form]").submit(function(){
    uploadPic($("#myfile").val());
    return false;
});

//Prepare a photo for upload onto server and db
//Handles physical upload to file and will be limited mostly to live testing
function uploadPic(filename)
{
    alert(filename);
    var success = validateUploadForm(filename);

    if(success === "success")
    {        
        //Get photo coords, rest of the upload must be in callback
        getCoords(function(coords)
        {
            //If coords are not found then exit. Should not occur with proper form validation
            if(coords == "failure")
            {
                alert("Coordinate lookup failed");  
            }
            
            //Prepare data and upload
            //PHP SCRIPT AND THIS FUNCTION CURRENTLY ONLY HANDLE UPLOADING PHOTO ITSELF
            else
            {
                //Need to get file and all user info needed for db entry and send to php script
                
                //Get upload form data
                var files = $('#myfile')[0];               
                var data = new FormData();                
                var url =  "PHP/uploadPhoto.php";
                var xhr = new XMLHttpRequest();  

                jQuery.each(files.files, function (i, file) {
                    data.append("myfile", file)
                });                
                xhr.open('POST', url, true);
                xhr.upload.onprogress = function(e) {    
                };    

                xhr.upload.onerror = function(e){
                };

                xhr.addEventListener('readystatechange', function(e) {
                if( this.readyState === 4 ) 
                {
                    var result = this.responseText;
                    alert(result);
                    $('#myfile').val(null);
                }
                });
                xhr.send(data);

            }
        });
    }
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
  
    //If photo not selected, alert and exit.
    if(filename.lastIndexOf("png") !== filename.length-3) //Accepts only png
    {
        alert("Must provide .png file to be uploaded");
        return "photo selection failed";
    }
    
    return "success";
}

//Unimplmented
//Embeds the Lat/Lng position got from the google api's into a photos exif tags
function embedCoords(file, coords)
{
    //Create a file reader
    var fileReader = new FileReader;
    
    fr.onloadend = function() //When ready
    {
        //Get exif
        var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));

        alert(exif);
    };
}
