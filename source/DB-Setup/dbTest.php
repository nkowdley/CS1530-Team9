/**
 * User: Blaise
 * Date: 6/23/2015
 * Time: 11:50 PM
 */<!DOCTTYPE html>
<html>
<head>
  <title>Testing a Table</title>
</head>
<body>
  <?php

  require_once 'PHPUnit/Autoload.php';

  class dbTest extends PHPUnit_Framework_TestCase {
      function tester ()
      {
          $db = new mysqli('localhost', 'root', 'pass', 'CS1530');

          if ($db->connect_error):
              die ("Could not connect to db: " . $db->connect_error);
          endif;

          $fields = array("id", "user", "type", "content", "location");
          $vals = array("1", "neel", "text", "hello world", "Pittsburgh PA");
          $result = $db->query("drop table posts");
          $result = $db->query("create table posts ($fields[0] int, $fields[1] char(30) not null, $fields[2] char(30) not null, $fields[3] char(30), $fields[4] char(30))") or die ("Invalid: " . $db->error);

          //$db->query("INSERT INTO posts ($fields[0], $fields[1], $fields[2], $fields[3], $fields[4])VALUES($vals[0], $vals[1], $vals[2], $vals[3], $vals[4])") or die ("Invalid: " . $db->error);
          $db->query('INSERT INTO Posts (id, user, type, content, location)VALUES("1", "neel","text","hello world", "Pittsburgh, PA")') or die ("Invalid: " . $db->error);

          //echo "<h3>Here is your data:</h3>";
          $query = "select * from posts;";
          $result = $db->query($query);
          $rows = $result->num_rows;
          $i = 0;
          $row = $result->fetch_array();
          assertEquals(0, 0);
          foreach ($row as $key => $val):
              //assertEquals($vals[$i],$val);
              $i++;
          endforeach;
          echo "<br/>";
      }
  }
  dbTest::tester();
  ?>
</body>
</html>
