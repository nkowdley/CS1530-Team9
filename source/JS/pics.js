
//Prepare a photo for upload onto server and db
function uploadPic()
{
    //If location not selected, alert and exit
  
    //If photo not selected, alert and exit.
    
    //Get photo coords, if not found alert and exit
    var coords = getCoords();
    if(!coords)
    {
        alert("Coordinates could not be found");
        return ;
    
    //Send data to php script to upload
}