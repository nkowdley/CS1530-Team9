//Gets the current users information returned as JSON. Return undefined for bad requests
//TODO: handle more then just facebook info
//Tests are broken here for some reason
function getUser(callback) //asynchronous
{
    FB.api('/me', function(response) { //request facebook for info
        callback(JSON.stringify(response));
    });
}

//Return just a users unique id
function getUserId(callback) // asychronous
{
    getUser(function(data)
    {
        obj = JSON.parse(data);
        callback(obj.id);
    });
}

//Returns just a users name
function getUserName(callback) //asychronous
{
    getUser(function(data)
    {
        obj = JSON.parse(data);
        callback(obj.first_name + obj.last_name);
    });
}