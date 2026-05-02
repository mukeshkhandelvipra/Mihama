<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers.php');
session_start();

$response = [];
// echo "<pre>";
// print_r($_SESSION['captcha']);exit;
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';
$captcha = $_POST['captcha'] ?? '';

if($captcha != $_SESSION['captcha'])
{
    $response['status'] = "error";
    $response['message'] = "Invalid captcha";
    echo json_encode($response);
    exit;
}

if(empty($name) || empty($email)  || empty($message))
{
    $response['status'] = "error";
    $response['message'] = "All fields are required";
    echo json_encode($response);
    exit;
}

$to = "mukeshkhandelvipr@gmail.com";
$subject = "New Contact Enquiry – ".$name;
$body = "Hello Admin,<br><br>

You have received a new contact enquiry from the website.<br><br>

<strong>Enquiry Details:</strong><br>
Name&nbsp;&nbsp;&nbsp;: $name<br>
Email&nbsp;&nbsp;: $email<br>
Message: $message<br>

--------------------------------------------------------------------------------<br><br>

Please connect with the client at the earliest.<br><br>

Regards,<br>
Knight International
";

$headers = "From:$email";

sendEmail($to,$subject,$body);

$response['status'] = "success";
$response['message'] = "Thank you! Your message has been sent.";

echo json_encode($response);