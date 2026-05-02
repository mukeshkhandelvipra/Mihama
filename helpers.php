<?php
/**
 * Function to generate random string.
 */
require_once($_SERVER['DOCUMENT_ROOT'] . '/phpmailer/vendor/autoload.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



/**
 * to prevent xss
 */
function xss_clean($string) {
    return htmlspecialchars((string)($string ?? ''), ENT_QUOTES, 'UTF-8');
}

function sendEmail($to,$subject,$message,$reply_to=null,$cc=null,$bcc=null,$from = null){
	
	
    $mail = new PHPMailer(true);
	
	    //Server settings
	    $mail->SMTPDebug = 0;
	     // $mail->isSMTP();
	    $mail->CharSet  = 'UTF-8';

	    $mail->Host = 'mail.smtp2go.com';
	    $mail->SMTPAuth = true;
	    $mail->Username = 'mvmwebsite';
	    $mail->Password = 'NsFMKkDqDeHf3UK4';
	    $mail->SMTPSecure = 'tls';
	    $mail->Port = 587;  
	    $mail->SMTPOptions = array(
	    'tls' => array(
	        'verify_peer' => false,
	        'verify_peer_name' => false,
	        'allow_self_signed' => true
	    )
	);

	// $to ='mukeshkhandelvipr@gmail.com';
	$mail->setFrom('mukeshkhandelvipr@gmail.com', 'Mihama Araya Company');
	
	
	$mail->addAddress($to);
	if(!empty($bcc)) {
		$mail->addBcc($bcc);
	}
	if(!empty($cc)) {
		foreach($cc as $v){
			$mail->AddCC($v); 
		}
	}

	$mail->isHTML(true);
	$mail->Subject = $subject;
	$mail->Body    = $message;

	$mail->send();
	
	
return true;
}

function sanitizeUrl($url) {
    // Decode the URL to handle encoded characters
    $url = $url;

    // Replace %20 with -
    $url = str_replace('%20', '-', $url);
    $url = preg_replace('/\s+/', '-', $url);


    // Remove special characters
    // Keep only alphanumeric characters, dashes, and underscores
    $url = preg_replace('/[^a-zA-Z0-9\-]/', '', $url);

    return $url;
}