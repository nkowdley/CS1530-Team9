<?php
//WARNING: Function does not handle pic's of the same name in any way
//TODO: add pic entry to db upon upload

    //Uploads file to IMG folder relative to where upload.php is located
    
    if(isset($_FILES['myfile']['name']))
    {
        $destination_path = '../IMG/'; //relative path where pics are placed
        $result = 0;
        $target_path = $destination_path . basename( $_FILES['myfile']['name']); //full path for pic 

        if(@move_uploaded_file($_FILES['myfile']['tmp_name'], $target_path)) {
          $result = 1;
        }

        print_r($_POST); //FOR DEBUG ONLY
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
