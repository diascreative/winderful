<?php
$title = "Windterful";

// lets embed the svg code
ob_start();
include( $SITEROOT . '/www/static/themes/winterful/img/tree.svg');
$turbineMast = ob_get_contents();
ob_end_clean();