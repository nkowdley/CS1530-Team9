<!DOCTTYPE html>
<html>
<head>
  <title>Generating a Simple Table</title>
</head>
<body>
  <?php
  $db = new mysqli('localhost', 'root', '', 'CS1530');
  if ($db->connect_error):
    die ("Could not connect to db: " . $db->connect_error);
  endif;
  //drop tables
  $result = $db->query("drop table Posts");
  $result = $db->query("drop table Users");
  //make tables
  $result = $db->query("create table Posts (id int, user char(30) not null, type char(30) not null, content char(30), location char(30), PRIMARY KEY (user)))") or die ("Invalid: " . $db->error);//Posts table
  $result = $db->query("create table Users (id int, user char(30) not null, interests char(100) not null, education char(100), PRIMARY KEY (user))") or die ("Invalid: " . $db->error);//Users Table
  //dummy data for testing
  $db->query('INSERT INTO Posts (id, user, type, content, location)VALUES("1", "neel","text","hello world", "Pittsburgh, PA")') or die ("Invalid: " . $db->error); //test post
  $db->query('INSERT INTO Users (id,user,interests,education)VALUES("1", "neel","football movies","University of Pittsburgh")') or die ("Invalid: " . $db->error); //test for user info
  echo "<h3>Here is your data:</h3>";
  $query = "select * from Posts;";
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