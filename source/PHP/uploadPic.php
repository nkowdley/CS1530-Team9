<?php
//WARNING: May be a bug with getting the location
//WARNING: Function does not handle pic's of the same name in any way
//TODO: ensure multiple file name uploads are not added to DB
//TODO: ensure logged in, upload will fail if not

    //Uploads file to IMG folder relative to where upload.php is located
    if(isset($_FILES['myfile']['name']))
    {
        //Prepare file for move
        $destination_path = '../IMG/'; //relative path where pics are placed
        $result = 0;
        $target_path = $destination_path . basename( $_FILES['myfile']['name']); //full path for pic 

        //Check physical file move success
        if(@move_uploaded_file($_FILES['myfile']['tmp_name'], $target_path)) {
          $result = 1;
        }
                    
        //Get other values from $_POST to be added
        $geoLoc = $_POST["geoLoc"];
        $userId = $_POST["userId"];
        
        //Instanstiate the db
        $db = new mysqli('localhost', 'user', 'password', 'db');
        if ($db->connect_error)
            die ("Could not connect to db: " . $db->connect_error);
        
        //Add the file as a db entry
        $db->query("INSERT INTO Pics (uploaderId, picGeolocation, picPath) VALUES('$userId', '$geoLoc','$target_path')") or die ("Invalid: " . $db->error); //test post

        //Close DB
        $db->close();
        
        //print_r($_POST); //FOR DEBUG ONLY
        echo "uploaded";
        sleep(1);
    }
    
    else
    {
        //echo json_encode(array('error'=> true));
        print_r($_FILES); //FOR DEBUG ONLY
        die ("File not uploaded");
    }
?>
