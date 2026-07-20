<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize inputs
    $name      = htmlspecialchars(trim($_POST['name'] ?? ''));
    $company   = htmlspecialchars(trim($_POST['company'] ?? ''));
    $phone     = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $email     = htmlspecialchars(trim($_POST['email'] ?? ''));
    $pickup    = htmlspecialchars(trim($_POST['pickup'] ?? ''));
    $delivery  = htmlspecialchars(trim($_POST['delivery'] ?? ''));
    $service   = htmlspecialchars(trim($_POST['service'] ?? ''));
    $weight    = htmlspecialchars(trim($_POST['weight'] ?? ''));
    $dispatch  = htmlspecialchars(trim($_POST['dispatch'] ?? ''));
    $message   = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Error: Invalid email address.'); window.history.back();</script>";
        exit;
    }

    if (empty($name) || empty($phone) || empty($pickup) || empty($delivery)) {
        echo "<script>alert('Error: Please fill all required fields.'); window.history.back();</script>";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // --- SMTP Authentication Engine ---
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'aryankumarperua@gmail.com';
        $mail->Password   = 'dvys youv xeis bnzj'; // Secure App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Common Headers
        $mail->setFrom('aryankumarperua@gmail.com', 'SMR Website');
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);

        // --- Safe Attachment Processing ---
        $allowed = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
        if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == 0) {
            $fileName = $_FILES['attachment']['name'];
            $tmpName  = $_FILES['attachment']['tmp_name'];
            $size     = $_FILES['attachment']['size'];
            $ext      = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

            if (!in_array($ext, $allowed)) {
                echo "<script>alert('Error: Invalid file type.'); window.history.back();</script>";
                exit;
            }

            if ($size > 5 * 1024 * 1024) {
                echo "<script>alert('Error: Maximum upload size is 5MB.'); window.history.back();</script>";
                exit;
            }

            // Safe memory stream linkage
            $mail->addAttachment($tmpName, $fileName);
        }

        // --- EMAIL 1: Dispatch Admin Notification ---
        $mail->addAddress('bhojarajperua@gmail.com');
        $mail->Subject = "New Transport Quote Request";
        $mail->Body    = "
            <h2>New Quote Request Details</h2>
            <table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; border-color: #ddd;'>
                <tr><td><b>Name</b></td><td>$name</td></tr>
                <tr><td><b>Company</b></td><td>$company</td></tr>
                <tr><td><b>Phone</b></td><td>$phone</td></tr>
                <tr><td><b>Email</b></td><td>$email</td></tr>
                <tr><td><b>Pickup Location</b></td><td>$pickup</td></tr>
                <tr><td><b>Delivery Destination</b></td><td>$delivery</td></tr>
                <tr><td><b>Service Requested</b></td><td>$service</td></tr>
                <tr><td><b>Load Weight</b></td><td>$weight</td></tr>
                <tr><td><b>Target Dispatch Date</b></td><td>$dispatch</td></tr>
                <tr><td><b>Message Details</b></td><td>$message</td></tr>
            </table>";

        $mail->send();

        // --- EMAIL 2: Fast-Switch To Customer Confirmation ---
        $mail->clearAddresses();
        $mail->clearReplyTos();
        $mail->clearAttachments(); // Avoid returning their own file upload back to them

        $mail->addAddress($email, $name);
        $mail->Subject = "We Received Your Quote Request - SMR Roadlines";
        $mail->Body    = "
            <h2>Thank You!</h2>
            <p>Dear $name,</p>
            <p>Your quotation request has been successfully received by our system.</p>
            <p>Our dedicated pan-India logistics management team is reviewing your lane details and will contact you shortly with accurate pricing options.</p>
            <br>
            <p>Regards,<br><b>SMR Roadlines Management Team</b></p>";

        $mail->send();

        // --- Redirection Destination ---
        echo "<script>
            window.location.href = 'thank-you.html';
        </script>";
        exit;

    } catch (Exception $e) {
        error_log("PHPMailer Core System Fault: " . $mail->ErrorInfo);
        echo "<script>
            alert('Something went wrong processing your transaction. Please try again later.');
            window.history.back();
        </script>";
        exit;
    }
}
