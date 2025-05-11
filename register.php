<?php
// register.php

// Collect form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

// Password strength validation
if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/", $password)) {
    header("Location: register.html?error=weak_password");
    exit();
}

// DB connection
$conn = new mysqli('localhost', 'root', '', 'openday');
if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
}

// Check duplicate email
$check_email = $conn->prepare("SELECT * FROM registration WHERE email = ?");
$check_email->bind_param("s", $email);
$check_email->execute();
$result = $check_email->get_result();

if ($result->num_rows > 0) {
    header("Location: register.html?error=email_exists");
    exit();
}

// Hash and insert
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO registration (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $hashed_password);

if ($stmt->execute()) {
    echo "<script>alert('Registration Successful! You can now login.'); window.location.href='login.html';</script>";
} else {
    header("Location: register.html?error=register_fail");
}

$stmt->close();
$conn->close();
?>
