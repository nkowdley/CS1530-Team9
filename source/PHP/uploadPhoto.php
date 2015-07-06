<?php
    //Uploads file to IMG folder relative to where upload.php is located
    $destination_path = '../IMG/';

    $result = 0;

    $target_path = $destination_path . basename( $_FILES['myfile']['name']);

    if(@move_uploaded_file($_FILES['myfile']['tmp_name'], $target_path)) {
      $result = 1;
    }
   
    //Add data base entry for the photo
    $db = new mysqli('localhost', 'root', 'pass', 'CS1530');

    if ($db->connect_error):
        die ("Could not connect to db: " . $db->connect_error);
    endif;
    

   sleep(1);
?>
