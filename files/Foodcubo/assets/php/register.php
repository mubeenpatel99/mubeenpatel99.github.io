<?php

session_start();
header('location:login.php');

$con = mysqli_connect('localhost', 'root', '');

mysqli_select_db($con, 'login');

$name = $_POST['user'];
$pass = $_POST['password'];
$email = $_POST['email'];

$s = "select * from usertable where uname = '$name'";

$result = mysqli_query($con, $s);

$num = mysqli_num_rows($result);

if($num == 1){
    echo 'Username Already Taken';
}else{
    $reg = "insert into usertable(uname, upassword, uemail) values('$name', '$pass', '$email')";
    mysqli_query($con, $reg);
    echo 'Registration Successful';
}

?>