<?php
// process_booking.php
// Handle the booking form submission
// Created by: Obaida Qasem (Student Number: 2213884)

session_start(); // Start the session
include 'config.php'; // Include the database configuration file

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name']; // Get the full name from the form
    $email = $_POST['email']; // Get the email from the form
    $phone = $_POST['phone']; // Get the phone number from the form
    $event_date = $_POST['event_date']; // Get the event date from the form
    $course = $_POST['course']; // Get the course of interest from the form

    // Insert data into the database
    $sql = "INSERT INTO bookings (name, email, phone, event_date, course) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql); // Prepare the SQL statement
    $stmt->bind_param("sssss", $name, $email, $phone, $event_date, $course); // Bind the parameters

    // Execute the statement
    if ($stmt->execute()) {
        echo "<script>alert('Booking successful!'); window.location.href='booking.php';</script>"; // Show success message
    } else {
        echo "<script>alert('Error in booking. Please try again.'); window.location.href='booking.php';</script>"; // Show error message
    }

    $stmt->close(); // Close the statement
    $conn->close(); // Close the database connection
}
?>
