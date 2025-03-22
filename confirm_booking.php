<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root"; // Default for XAMPP
$password = ""; // Default for XAMPP
$database = "open_day_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Debugging: Check if form data is received
echo "<pre>";
print_r($_POST);
echo "</pre>";

// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $visit_date = $_POST['visit_date'] ?? '';
    $time = $_POST['time'] ?? '';
    $purpose = $_POST['purpose'] ?? '';
    $course = $_POST['course'] ?? '';
    $other_details = $_POST['other_details'] ?? '';

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($visit_date) || empty($time) || empty($purpose)) {
        die("Please fill in all required fields.");
    }

    // Prepared statement to insert data safely
    $stmt = $conn->prepare("INSERT INTO bookings (name, email, phone, visit_date, time, purpose, course, other_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        die("Prepared statement failed: " . $conn->error);
    }

    $stmt->bind_param("ssssssss", $name, $email, $phone, $visit_date, $time, $purpose, $course, $other_details);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Booking successfully submitted!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
