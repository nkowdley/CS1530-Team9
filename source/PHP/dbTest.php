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

  require_once '../../../php/pear/PHPUnit/Autoload.php';

  class dbTest extends PHPUnit_Framework_TestCase {
      public function tester ()
      {
          $db = new mysqli('localhost', 'root', 'pass', 'CS1530'); //connect to database

          if ($db->connect_error):
              die ("Could not connect to db: " . $db->connect_error);
          endif;

          $fields = array("id", "user", "type", "content", "location"); //test columns
          $vals = array("1", "neel", "text", "hello world", "Pittsburgh PA"); //test values
          $result = $db->query("drop table posts"); //delete old test table
          $result = $db->query("create table posts ($fields[0] int, $fields[1] char(30) not null, $fields[2] char(30) not null, $fields[3] char(30), $fields[4] char(30))") or die ("Invalid: " . $db->error); //create new test table

          $db->query("INSERT INTO posts ($fields[0], $fields[1], $fields[2], $fields[3], $fields[4])VALUES('$vals[0]', '$vals[1]', '$vals[2]', '$vals[3]', '$vals[4]')") or die ("Invalid: " . $db->error);
          //$db->query('INSERT INTO Posts (id, user, type, content, location)VALUES("1", "neel","text","hello world", "Pittsburgh, PA")') or die ("Invalid: " . $db->error);

          echo "<h3>Here is your data:</h3>";
          $query = "select * from posts;";
          $result = $db->query($query);

          $i = 0;
          $row = $result->fetch_array(MYSQL_ASSOC);

          foreach ($row as $key => $val):
              //echo "first val in query is $vals[$i]<br>current val in posted vals is $val<br>";
              $testResult = $this->assertEquals($vals[$i],$val);
              if(!$testResult){
                  echo "$vals[$i] equals $val<br>";
              }
              $i++;
          endforeach;
          echo "<br/>";
      }
  }
  $test = new dbTest();
  $test->tester();
  ?>
</body>
</html>
