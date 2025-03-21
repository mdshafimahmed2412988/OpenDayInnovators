<?php
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

// Database Connection
$conn = new mysqli('localhost', 'root', '', 'openday');

if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
}

// Check if the email already exists
$check_email = "SELECT * FROM registration WHERE email = ?";
$stmt = $conn->prepare($check_email);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Email already exists
    echo "<script>alert('Email already registered! Please use a different email.'); window.location.href='register.html';</script>";
    $stmt->close();
    $conn->close();
    exit();
}

// Insert new user if email is not found
$stmt = $conn->prepare("INSERT INTO registration (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo "<script>alert('Registration Successful! You can now login.'); window.location.href='login.html';</script>";
} else {
    echo "<script>alert('Error: Registration failed. Please try again.'); window.location.href='register.html';</script>";
}

$stmt->close();
$conn->close();
?>