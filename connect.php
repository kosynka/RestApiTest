<?php

$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'rest_api_test';

$connect = mysqli_connect($host, $user, $pass, $dbname);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

?>