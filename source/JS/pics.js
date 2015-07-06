//Prepare a photo for upload onto server and db
function uploadPic(filename)
{
    alert(filename);
    var success = validateUploadForm(filename);

    if(success === "success")
    {
        //Hack used for live testing
        alert("upload attempted");
        
        //Get photo coords, rest of the upload must be in callback
        getCoords(function(coords)
        {
            if(coords == "failure")
            {
            
            }
            
            //Prepare data and upload
            else
            {
                //Need to get file and all user info needed for db entry and send to php script
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
