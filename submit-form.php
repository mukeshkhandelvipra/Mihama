<?php
require_once __DIR__ . '/helpers.php';
session_start();
header('Content-Type: application/json');

$response = [];
// echo "<pre>";
// print_r($_SESSION['captcha']);exit;
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';
$captcha = $_POST['captcha'] ?? '';

if(empty($_SESSION['captcha']) || $captcha !== $_SESSION['captcha'])
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

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['status'] = "error";
    $response['message'] = "Please enter a valid email address";
    echo json_encode($response);
    exit;
}

$to = "mukeshkhandelvipra@gmail.com";
$subject = "New Contact Enquiry – ".$name;
$body = "Hello Admin,<br><br>

You have received a new contact enquiry from the website.<br><br>

<strong>Enquiry Details:</strong><br>
Name&nbsp;&nbsp;&nbsp;: " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "<br>
Email&nbsp;&nbsp;: " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "<br>
Message: " . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "<br>

--------------------------------------------------------------------------------<br><br>

Please connect with the client at the earliest.<br><br>

Regards,<br>
Knight International
";

try {
    sendEmail($to, $subject, $body, $email);
    $response['status'] = "success";
    $response['message'] = "Thank you! Your message has been sent.";
} catch (Exception $e) {
    $response['status'] = "error";
    $response['message'] = "Unable to send email right now. Please try again later.";
    $response['debug'] = $e->getMessage();
}

echo json_encode($response);