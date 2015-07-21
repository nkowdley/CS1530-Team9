<?php
//Gets all photos from the DB and returns the info as JSON 
//WARNING: Currently pics have no security. All info displayed on this page

//Instanstiate the db
$db = new mysqli('localhost', 'user', 'password', 'db');
if ($db->connect_error)
    die ("Could not connect to db: " . $db->connect_error);

//Get the pics
$result = $db->query("SELECT * FROM Pics"); //test post

//Iterate over result
$pics = Array();
while($row = $result->fetch_assoc())
{
    $pics[] = $row;
}



//Close DB
$db->close();

//Return a JSON string
print_r(json_encode($pics)); 

?>
