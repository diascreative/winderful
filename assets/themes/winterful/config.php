<?php
// lets embed the svg code
$subtitle = "A prototype visualising the UK's wind energy<br><br>DIAS_ wishes you a winderful Christmas and sustainable new year";

// changing the screenshot url for social media
$screenshotUrl = "http://$domain/static/themes/$theme/img/screenshot.png";

$twitterShareMessage = "Winderful (Xmas edition) - visualising UK's #windenergy in real time. Made by @diascreative";

// we want to embed the SVG content for the windturbine
ob_start();
include( $SITEROOT . '/www/static/themes/winterful/img/tree.svg');
$turbineMast = ob_get_contents();
ob_end_clean();