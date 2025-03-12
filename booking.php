<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Your Open Day Visit</title>
    <!-- 
        booking.php
        Booking page for the University Open Day project
        Created by: Obaida Qasem (Student Number: 2213884)
    -->
    <link rel="stylesheet" href="styles.css"> <!-- Link to the stylesheet -->
</head>
<body>
    <!-- Header Section -->
    <div class="header">
        <img src="images/logo.jpg" alt="University Logo"> <!-- University logo -->
        <h1>Book Your Open Day Visit</h1> <!-- Page heading -->
    </div>

    <!-- Booking Form -->
    <div class="wrapper">
        <form action="process_booking.php" method="post">
            <!-- Personal Details Section -->
            <h2>Personal Details</h2>
            <div class="input-box">
                <input type="text" name="name" placeholder="Full Name" required> <!-- Full Name input -->
            </div>
            <div class="input-box">
                <input type="email" name="email" placeholder="Email Address" required> <!-- Email input -->
            </div>
            <div class="input-box">
                <input type="tel" name="phone" placeholder="Phone Number" required> <!-- Phone Number input -->
            </div>

            <!-- Event Details Section -->
            <h2>Event Details</h2>
            <div class="input-box">
                <label for="event_date">Event Date:</label>
                <input type="date" name="event_date" id="event_date" required> <!-- Event Date input -->
            </div>
            <div class="input-box">
                <label for="course">Course of Interest:</label>
                <select name="course" id="course" required> <!-- Course of Interest dropdown -->
                    <option value="">Select a course</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Management">Business Management</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Psychology">Psychology</option>
                </select>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn">Book Now</button> <!-- Submit button -->
        </form>
    </div>
</body>
</html>
