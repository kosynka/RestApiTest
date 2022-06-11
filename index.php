<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');
require 'connect.php';
require 'functions.php';

$method = $_SERVER['REQUEST_METHOD'];

$q = $_GET['q'];
$params = explode('/', $q);

$type = $params[0];
$id = $params[1];

switch ($method) {
    case 'GET':
        switch ($type) {
            case 'posts':
                if (isset($id)) {
                    getPost($connect, $id);
                } else { getPosts($connect); }
                break;
        }
    case 'POST':
        switch ($type) {
            case 'posts':
                addPost($connect, $_POST);
                break;
        }
    case 'PATCH':
        switch ($type) {
            case 'posts':
                if (isset($id)) {
                    $data = file_get_contents('php://input');
                    $data = json_decode($data, true);
                    updatePost($connect, $id, $data);
                }
                break;
        }
    case 'DELETE':
        switch ($type) {
            case 'posts':
                if (isset($id)) {
                    deletePost($connect, $id);
                }
                break;
        }
    default:
        echo "Method does not found";
}

?>