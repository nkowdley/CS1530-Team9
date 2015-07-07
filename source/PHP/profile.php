<!DOCTTYPE html>
<html>
<head>
  <title>Profile Template</title>
</head>
<link href="stylesheet.css" rel="stylesheet" type="text/css"</>
<body>
  <!-- Includes for testing -->
  <script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBcaRb_4a8rqmrenDR-_W3sPQ37An_3fzs"></script><!--api key for local host-->
  <script src="https://maps.googleapis.com/maps/api/js?libraries=places,location&sensor=SET_TO_TRUE_OR_FALSE"></script>
  <?php
  if(isset($_GET['user'])) //if the user variable is sent through a GET Request
  {

    $db = new mysqli('localhost', 'root', '', 'CS1530');//set the db params
    $user=$_GET['user'];//move the contents of user from the $_GET varialbe to a local variable
    $query="SELECT * from Users where user='$user'"; //db query to pull all info about a user from a table
    $result=$db->query($query) or die ("Invalid: " . $db->error);
    //Extract the info from the $result object
    if($result->num_rows==1) //if there was an entry from the query
    {
      while($row = $result->fetch_assoc())
      {
        $interests=$row['interests'];
        $education=$row['education'];
      }
    }
    else
    {
      //if no records are found for the user in the db, stop the page load and echo an error
      echo "<h3>User Not Found!</h3>";
      die();
    }
    //print out the info we obtained
    echo "$user";
    echo "$interests";
    echo "$education";

  }
  else
  {
    //if a user name is not passed via GET, kill the page load and echo an error
    echo "<h3>ERROR!</h3>";
    die();
  }
  ?>
</body>
</html>
