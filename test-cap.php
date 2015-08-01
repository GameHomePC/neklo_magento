<?php
ini_set('display_errors', 1);


require_once 'recaptcha/src/autoload.php';


define('RE_CAPTCHA_SITE_KEY', '6LdVnQoTAAAAAOrOiaQeq08buy7vt2miJC3ZQgnh');
define('RE_CAPTCHA_SECRET', '6LdVnQoTAAAAAFf9Ql_kpFVd1jbjGbYezJt8-gtG');


if ( isset($_POST['g-recaptcha-response']) )
{  
    
	$recaptcha = new \ReCaptcha\ReCaptcha( RE_CAPTCHA_SECRET );
	$resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
	echo '<pre>';
	var_dump( $resp );
	echo '</pre>';
	
	$isCaptchaValid = $resp->isSuccess();
}


?>
<html>
<body>
	<form method="post">
		<div class="g-recaptcha" data-sitekey="<?php echo RE_CAPTCHA_SITE_KEY; ?>"></div>
		<script src="https://www.google.com/recaptcha/api.js"></script>
		
		<input type="submit" value="Send" />
	</form>
</body>
</html>