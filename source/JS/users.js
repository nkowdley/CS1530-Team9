

//Gets the current users information returned as JSON. Return undefined for bad requests
//TODO: handle more then just facebook info
function getUser(callback) //asynchronous
{
    FB.api('/me', function(response) { //request facebook for info
        callback(JSON.stringify(response));
    });
}

//Return just a users unique id
function getUserId(callback) //asychronous
{
    getUser(function(callback)
    {
    
    });
}