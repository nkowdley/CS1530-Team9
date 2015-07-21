<!DOCTTYPE html>
<html>
<head>
  <title>Profile Template</title>
</head>
<link href="../CSS/style.css?<?php echo time() ?>" rel="stylesheet" type="text/css"> <!-- hack to stop chrome from cacheing CSS cuasing immediate changes to not be displayed -->
<link href="../CSS/bootstrap.min.css" rel="stylesheet" media="screen">
<!-- Includes for maps-->
<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBcaRb_4a8rqmrenDR-_W3sPQ37An_3fzs"></script><!--api key for local host-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="../JS/maps.js"></script>
<script src="../JS/pics.js"></script>
<script src="../JS/facebook.js"></script>
<script src="../JS/bootstrap.min.js"></script>
<body>
  <!--NavBar-->
  <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
          <div class="navbar-header">
              <a class="navbar-brand" href="#">Map Thingy</a>
          </div>

          <div id="navbar" class="collapse navbar-collapse">
              <ul class="nav navbar-nav">
                  <li><a href="#about">Link</a></li>
                  <li><a href="#contact">Another Link</a></li>
              </ul>


              <form class="navbar-form navbar-right" id="upload-form" name="upload-form" method="post" enctype="multipart/form-data">
                  <div class="form-group">
                      <span class="btn btn-success btn-file">
                          Choose File <input type="file" id="myfile" name="myfile" class="btn btn-success"/>
                      </span>
                  </div>

                  <div class="form-group">
                      Location <input id="address" type="text">
                  </div>
                  <div class="form-group">
                      <button type="submit" id="file-button" class="btn btn-success" name="submitBtn" value="Upload">Upload</button>
                  </div>
              </form>
              <div id="status"></div>

          </div>
      </div><!-- /.container -->
  </nav>

  <?php
  if(isset($_GET['user'])) //if the user variable is sent through a GET Request
  {
    $user=$_GET['user'];//move the contents of user from the $_GET varialbe to a local variable
    connect_to_db($user);
    map(); //prints out Google Map
  }
  else
  {
    //if a user name is not passed via GET, kill the page load and echo an error
    echo "<div id=\"Error\" style=\"margin-top:70px;\"><h3>ERROR!</h3></div>";
    die();
  }
  ?>
  <!--function calls-->
  <?php
  function connect_to_db($user)
  {
    $db = new mysqli('localhost', 'root', '', 'CS1530');//set the db params
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
    echo "<div id=\"username\"><h1>$user</h1></div>";
    echo "<div id=\"interests\">$interests</div>";
    echo "<div id=\"education\">$education</div>";
  }
  function map()
  {
    //code for google maps
    echo "
    <div id=\"map-canvas\" style=\"height:30%;margin-top:120px;\"></div>
    <input id=\"search-box\" class=\"controls\" type=\"text\">
    <script type=\"text/javascript\">
      gotoMap();
    </script>";
  }
  ?>
</body>
</html>
