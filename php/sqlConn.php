<?php
$servername = "localhost";
$username = "mamp";
$password = "";
$dbname = "movie-users";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  echo($conn);
  die("Connection failed: " . $conn->connect_error);
}
echo("Connection olemas, aga ");

?>