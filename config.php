<?php
// config.php
// Database configuration file
// Created by: Obaida Qasem (Student Number: 2213884)

$host = 'localhost'; // Database host
$db_username = 'root'; // Default username for XAMPP MySQL
$db_password = ''; // Default password for XAMPP MySQL (empty)
$db_name = 'open_day_db'; // Replace with your database name

// Create a connection to the database
$conn = new mysqli($host, $db_username, $db_password, $db_name);

// Check if the connection failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Display error message and stop execution
}
?>
