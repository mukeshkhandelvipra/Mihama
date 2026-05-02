<?php 
 //phpinfo();exit;
        // Generate random string (A-Z, 2-9)
        if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
            $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghijklmnopqustuvwxyz';
            $captchaText = '';
            for ($i = 0; $i < 6; $i++) {
                $captchaText .= $chars[random_int(0, strlen($chars) - 1)];
            }

            // Store securely in session
            $_SESSION['captcha'] = $captchaText;
            $_SESSION['captcha_expires'] = time() + 120; // 2 minutes

            // Image setup
            $width = 220;
            $height = 70;
            $image = imagecreatetruecolor($width, $height);

            // Colors
            $bg = imagecolorallocate($image, rand(230, 245), rand(230, 245), rand(230, 245));
            imagefill($image, 0, 0, $bg);

            // Random line colors
            $lineColors = [];
            for ($i = 0; $i < 3; $i++) {
                $lineColors[] = imagecolorallocate($image, rand(80, 180), rand(80, 180), rand(80, 180));
            }

            // Add 10–15 interference lines
            for ($i = 0; $i < rand(15,20); $i++) {
                $color = $lineColors[array_rand($lineColors)];
                imagesetthickness($image, rand(1, 3));
                imageline(
                    $image,
                    rand(0, $width), rand(0, $height),
                    rand(0, $width), rand(0, $height),
                    $color
                );
            }

            // Add 500–800 random dots for noise
            for ($i = 0; $i < rand(800, 1200); $i++) {
                $dotColor = imagecolorallocate($image, rand(100, 200), rand(100, 200), rand(100, 200));
                imagesetpixel($image, rand(0, $width - 1), rand(0, $height - 1), $dotColor);
            }

            // Choose font
            $font = '/var/www/vhosts/knight.international/httpdocs/assets/fonts/ARIAL.woff'; // any TTF font
            if (!file_exists($font)) {
                die('Font file not found. Please place arial.ttf in the same folder.');
            }

            // Draw CAPTCHA text
            for ($i = 0; $i < strlen($captchaText); $i++) {
                $angle = rand(-30, 30);
                $x = 25 + $i * 30 + rand(-3, 3);
                $y = rand(40, 60);
                $fontSize = rand(28, 32);
                $textColor = imagecolorallocate($image, rand(0, 90), rand(0, 90), rand(0, 90));
                imagettftext($image, $fontSize, $angle, $x, $y, $textColor, $font, $captchaText[$i]);
            }

            // Add final distortion lines over text
            for ($i = 0; $i < 5; $i++) {
                $color = $lineColors[array_rand($lineColors)];
                imagesetthickness($image, rand(1, 2));
                imageline(
                    $image,
                    rand(0, $width), rand(0, $height),
                    rand(0, $width), rand(0, $height),
                    $color
                );
            }

            // Output image
            header('Content-Type: image/png');
            imagepng($image);
            imagedestroy($image);
            exit;