<?php

$server = "localhost";
$user = "root";
$pass = ""; 
$bd = "raicessv";

$connect = new mysqli($server, $user, $pass, $bd);

if ($connect->connect_error) {
    die ("ERROR DE CONEXION" . $connect->connect_error);
}

?>