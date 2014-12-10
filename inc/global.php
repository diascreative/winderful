<?php
  if( isset($_SERVER["HTTP_HOST"]) ) {
    $domain = $_SERVER["HTTP_HOST"];
  } else {
    $domain = 'winderful.diascreative.net';
  }

  $socialUrl = "http://bit.ly/winderful";

  $title = "Winderful";
  $subtitle = "A prototype visualising the UK's wind energy";
  $turbineMast = '';

  // social media
  $screenshotUrl = "http://$domain/static/img/screenshot.png";

  $twitterShareMessage = "Winderful - visualising UK's #windenergy in real time. Made by @diascreative";

  if( isset($theme) && $theme ) {
    require_once($SITEROOT . "/assets/themes/$theme/config.php");
  }