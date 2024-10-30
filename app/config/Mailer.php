<?php
namespace Custom;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

final class Mailer 
{
    public function sendEmail($email, $subject, $body){
        $mail = new PHPMailer(true);
        try {
            // SMTP configuration
            $mail->SMTPDebug = SMTP::DEBUG_SERVER; 
            $mail->isSMTP();  
            $mail->Host = 'smtp.gmail.com';    
            $mail->SMTPAuth   = true; 
            $mail->Username   = 'akpeledavidprogress@gmail.com'; 
            $mail->Password   = 'hmzdtwrpkwjmcvcv';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;  

            $mail->setFrom('akpeledavidprogress@gmail.com', 'David Akpele');
            $mail->addAddress($email, 'David');               
            $mail->addReplyTo('akpeledavidprogress@gmail.com', 'David Akpele');
            //Content
            $mail->isHTML(true);                           
            $mail->Subject =  $subject;
            $mail->Body    =$body;

            $mail->AltBody = strip_tags($body);

            if($mail->send()){
                return true;
            }else{
                return false;
            }
        }catch (Exception $e) {
            $response= array('status'=>'error','message' =>"Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
            http_response_code(400);
            echo json_encode($response);
        }
    }
}
