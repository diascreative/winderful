<?php
$SITEROOT = dirname(dirname(__FILE__));

if (file_exists($SITEROOT . '/inc/config.php')) {
	require_once $SITEROOT . '/inc/config.php';
} else {
	echo "Please set the config.php file.
            <br><br>
            Copy <b>/inc/config.sample.php</b> to <b>/inc/config.php</b> and update its details";
	exit;
}

require_once $SITEROOT . '/inc/db.php';
require_once $SITEROOT . '/inc/global.php';
