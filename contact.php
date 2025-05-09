<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Database Connection
    $conn = new mysqli('localhost', 'root', '', 'openday');
    if ($conn->connect_error) {
        die('Connection Failed: ' . $conn->connect_error);
    }

    // Prepare and bind the SQL query to insert the data
    $stmt = $conn->prepare("INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $subject, $message);

    // Execute the query
    if ($stmt->execute()) {
        // If the query was successful, show a success message
        echo "<script>alert('Thank you for your message. We will respond to you shortly.'); window.location.href='contact.html';</script>";
    } else {
        // If the query failed, show an error message
        echo "<script>alert('Error submitting message. Please try again later.'); window.location.href='contact.html';</script>";
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
