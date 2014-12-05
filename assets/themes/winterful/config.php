<?php
// lets embed the svg code
$subtitle = "A prototype visualising the UK's wind energy<br><br>DIAS_ wishes you a winderful Christmas and sustainable new year";

ob_start();
include( $SITEROOT . '/www/static/themes/winterful/img/tree.svg');
$turbineMast = ob_get_contents();
ob_end_clean();