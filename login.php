<?php
    $email = $_POST['email'];
    $password = $_POST['password'];

    //Database Connection
    $conn = new mysqli('localhost','root','','openday');
    if($conn->connect_error){
        die('Connection Failed  :  '. $conn->connect_error);
    }else{
        $stmt = $conn->prepare("Insert into login(email, password)
                values(?, ?)");
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        echo "<script>alert('Login Succesfull..'); window.location.href='index.html';</script>";
    $stmt->close();
    $conn->close();
    }


?>