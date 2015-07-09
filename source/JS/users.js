

//Gets the current users identity. Returns as JSON. Return undefined for bad requests
//TODO: handle more then just facebook info
function getUserId(callback)
{
    FB.api('/me', function(response) { //request facebook for info
        callback(JSON.stringify(response));
    });
}