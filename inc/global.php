<?php
  $domain = $_SERVER["HTTP_HOST"];
  $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

  $title = "Winderful";
  $subtitle = "A prototype visualising the UK's wind energy";
  $turbineMast = '';
  $screenshot_url = "http://$domain/static/img/screenshot.png";


  if( isset($theme) && $theme ) {
    require_once($SITEROOT . "/assets/themes/$theme/config.php");
  }