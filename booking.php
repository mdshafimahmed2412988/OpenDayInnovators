<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $visit_date = $_POST['visit_date'];
    $visit_time = $_POST['visit_time'];
    $purpose = $_POST['purpose'];
    $course = $_POST['course'];

    //Database Connection
    $conn = new mysqli('localhost','root','','openday');
    if($conn->connect_error){
        die('Connection Failed  :  '. $conn->connect_error);
    }else{
        $stmt = $conn->prepare("Insert into booking(name, email, phone, visit_date, visit_time, purpose, course)
                values(?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssiiiss", $name, $email, $phone, $visit_date, $visit_time, $purpose, $course);
        $stmt->execute();
        echo "<script>alert('Booking confirmed!'); window.location.href='index.html';</script>";
        $stmt->close();
        $conn->close();
}


?>