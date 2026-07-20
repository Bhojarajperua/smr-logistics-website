<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if($_SERVER["REQUEST_METHOD"]=="POST"){

$name=trim($_POST['name']);
$phone=trim($_POST['phone']);
$email=trim($_POST['email']);
$position=trim($_POST['position']);
$experience=trim($_POST['experience']);
$message=trim($_POST['message']);

if(empty($name)||empty($phone)||empty($email)||empty($position)){

die("Please fill all required fields.");

}

if(!filter_var($email,FILTER_VALIDATE_EMAIL)){

die("Invalid Email.");

}

$mail=new PHPMailer(true);

try{

$mail->isSMTP();

$mail->Host='smtp.gmail.com';

$mail->SMTPAuth=true;

$mail->Username='aryankumarperua@gmail.com';

$mail->Password='dvys youv xeis bnzj';

$mail->SMTPSecure=PHPMailer::ENCRYPTION_STARTTLS;

$mail->Port=587;

$mail->setFrom('aryankumarperua@gmail.com','SMR Careers');

$mail->addAddress('bhojarajperua@gmail.com');

$mail->addReplyTo($email,$name);

if(isset($_FILES['resume']) && $_FILES['resume']['error']==0){

$allowed=['pdf','doc','docx'];

$ext=strtolower(pathinfo($_FILES['resume']['name'],PATHINFO_EXTENSION));

if(!in_array($ext,$allowed)){

die("Only PDF, DOC and DOCX files are allowed.");

}

if($_FILES['resume']['size']>5*1024*1024){

die("Maximum file size is 5MB.");

}

$newName=time().'_'.basename($_FILES['resume']['name']);

$destination='uploads/resumes/'.$newName;

move_uploaded_file($_FILES['resume']['tmp_name'],$destination);

$mail->addAttachment($destination);

}

$mail->isHTML(true);

$mail->Subject="New Career Application - ".$position;

$mail->Body="

<h2>New Job Application</h2>

<table border='1' cellpadding='10' cellspacing='0'>

<tr><td>Name</td><td>$name</td></tr>

<tr><td>Phone</td><td>$phone</td></tr>

<tr><td>Email</td><td>$email</td></tr>

<tr><td>Position</td><td>$position</td></tr>

<tr><td>Experience</td><td>$experience</td></tr>

<tr><td>Message</td><td>$message</td></tr>

</table>

";

$mail->send();

header("Location: application-success.html");

exit();

}

catch(Exception $e){

echo "Mailer Error: ".$mail->ErrorInfo;

}

}

?>