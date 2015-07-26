<!DOCTTYPE html>
<html>
<head>
  <title>Generating a Simple Table</title>
</head>
<body>
<?php
  $db = new mysqli('localhost', 'user', 'password', 'db'); //yes I changed it in master again. this is on the server

  if ($db->connect_error):
    die ("Could not connect to db: " . $db->connect_error);
  endif;
  
  //drop tables
  $result = $db->query("drop table Pics");
  $result = $db->query("drop table Users");
  
  //make tables
  //Pics table scheme has arbitrary (auto incremented) id as primary key, and hold geolocation, uploader name/id, comment and relative path to file
  $result = $db->query("create table Pics (id int NOT NULL AUTO_INCREMENT, uploaderId varchar(64) not null, picLat varchar(64), picLng varchar(64), picPath varchar(64),picComment varchar(2048), PRIMARY KEY(id))") or die ("Invalid: " . $db->error);//Pics table
  $result = $db->query("create table Users (id int, user varchar(64) not null, interests varchar(64) not null, education varchar(64), PRIMARY KEY (user))") or die ("Invalid: " . $db->error);//Users Table
 
  //dummy data for testing
  $db->query("INSERT INTO Pics (uploaderId, picLat, picLng, picPath, picComment) VALUES('admin', '40.441725', '-79.953776', '../IMG/posvar.png', 'This place sucks')") or die ("Invalid: " . $db->error); //test post
  $db->query("INSERT INTO Pics (uploaderId, picLat, picLng, picPath, picComment) VALUES('admin', '40.444272', '-79.953172', '../IMG/cathedral.png', 'Wow such architecture')") or die ("Invalid: " . $db->error); //test post
  $db->query("INSERT INTO Pics (uploaderId, picLat, picLng, picPath, picComment) VALUES('admin', '40.442582', '-79.956709', '../IMG/towers.png', 'Look its a dorm room')") or die ("Invalid: " . $db->error); //test post
  //$db->query('INSERT INTO Users (id,user,interests,education)VALUES("1", "neel","football movies","University of Pittsburgh")') or die ("Invalid: " . $db->error); //test for user info
  
  echo "<h3>Here is your data:</h3>";
  $query = "select * from Pics;";
  $result = $db->query($query);
  $rows = $result->num_rows;
  for ($i = 0; $i < $rows; $i++):
    $row = $result->fetch_array();
    foreach ($row as $key=>$val):
      echo "$key:$val  ";
    endforeach;
    echo "<br/>";
  endfor;
  
  $query = "select * from Users;";
  $result = $db->query($query);
  $rows = $result->num_rows;
  for ($i = 0; $i < $rows; $i++):
    $row = $result->fetch_array();
    foreach ($row as $key=>$val):
      echo "$key:$val  ";
    endforeach;
    echo "<br/>";
  endfor;
  ?>
</body>
</html>