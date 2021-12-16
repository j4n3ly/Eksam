<?php
if(isset($_POST["submit"]))
{
include "sqlConn.php";

$username= ($_POST["username"]);
$password= ($_POST["password"]);
$passwordCheck= ($_POST["password-check"]);
$email= ($_POST["email"]);

if($password != $passwordCheck) {
    echo "Passwords didn't match";
    return;
}

$sql = "INSERT INTO users (username, password, email)
VALUES ('$username', '$password', '$email')";

if ($conn->query($sql) === TRUE) {
    header('Location: ../search.html');
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
}
?>