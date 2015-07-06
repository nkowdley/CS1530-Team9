
//Prepare a photo for upload onto server and db
function uploadPic()
{
    //If location not selected, alert and exit
    var location = $("#address").val();
    if(location === "")
    {
        alert("Must select a location");
        return "location selection failed";
    }
  
    //If photo not selected, alert and exit.
    var fileName = $("#myfile").val();
    if(fileName.lastIndexOf("png") !== fileName.length-3) //Accepts only png
    {
        alert("Must provide .png file to be uploaded");
        return "photo selection failed";
    }

    //Get photo coords, rest of the upload must be in callback
    getCoords(function(coords)
    {
        if(coords == "failure")
        {
            alert("Coordinates could not be found");
            return "getCoords failed";
        }
        
        //Prepare data and upload
        else
        {
            
        }
    });
}
