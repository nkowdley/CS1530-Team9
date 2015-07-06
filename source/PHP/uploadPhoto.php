<?php
   //Uploads file to wherver upload.php is located
   $destination_path = '../IMG/';

   $result = 0;
   
   $target_path = $destination_path . basename( $_FILES['myfile']['name']);

   if(@move_uploaded_file($_FILES['myfile']['tmp_name'], $target_path)) {
      $result = 1;
   }
   
   //Add data base entry for the photo
   
   sleep(1);
?>
