<?php
session_start();

$email = $_POST['email'];
$password = $_POST['password'];

// Database Connection
$conn = new mysqli('localhost', 'root', '', 'openday');
if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
} else {
    $stmt = $conn->prepare("SELECT id, password FROM registration WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 0) {
        echo "<script>alert('Email not registered. Please register.'); window.location.href='register.html';</script>";
    } else {
        $stmt->bind_result($user_id, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            // Log login activity
            $log_stmt = $conn->prepare("INSERT INTO login (user_id, email) VALUES (?, ?)");
            $log_stmt->bind_param("is", $user_id, $email);
            $log_stmt->execute();
            $log_stmt->close();

            // Store session data
            $_SESSION['email'] = $email;
            $_SESSION['user_id'] = $user_id;

            echo "<script>alert('Login successful!'); window.location.href='index.html';</script>";
        } else {
            echo "<script>alert('Incorrect password.'); window.location.href='login.html';</script>";
        }
    }

    $stmt->close();
    $conn->close();
}
?>
