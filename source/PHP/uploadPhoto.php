<?php
    //Uploads file to IMG folder relative to where upload.php is located
    
    if(isset($_FILES['myfile']['name']))
    {
        $destination_path = '../IMG/';

        $result = 0;

        $target_path = $destination_path . basename( $_FILES['myfile']['name']);

        if(@move_uploaded_file($_FILES['myfile']['tmp_name'], $target_path)) {
          $result = 1;
        }

        echo "uploaded";
        sleep(1);
    }
    
    else
    {
        //echo json_encode(array('error'=> true));
        print_r($_FILES);
        die ("File not uploaded");
    }
?>
