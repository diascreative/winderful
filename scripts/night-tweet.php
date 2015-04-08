<?php
require_once dirname(__FILE__) . '/../inc/init.php';
require_once dirname(__FILE__) . '/../inc/twitter/twitteroauth.php';

$maxPercentage = getMaxPercentageForTheNight();

if (shouldTweet($maxPercentage)) {
	tweetPercentage($maxPercentage);
}

function getMaxPercentageForTheNight() {
	$today = time();

	$dateSMYSQL = es(date("Y-m-d 00:00", $today)); // midnight
	$dateEMYSQL = es(date("Y-m-d 09:00", $today)); // 9am

	$query = "SELECT
                timestamp,
                FLOOR(100*wind/demand) AS percent
              FROM
                wind_vs_demand
              WHERE
                timestamp BETWEEN '$dateSMYSQL' AND '$dateEMYSQL'
              ORDER BY
                percent DESC
              LIMIT 1";

	return fetchAssoc(query($query));
}

function shouldTweet($data) {
	// if the max production went over 10%
	return $data['percent'] > 10;
}

function tweetPercentage($current) {
	global $socialUrl;

	// tweet the max percentage for last night
	$percent = $current['percent'];
	$time = $current['timestamp'];

	$message = "While you were sleeping, #windenergy reached $percent% of the National Grid's electricity demand. $socialUrl";

	$connection = new TwitterOAuth(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
	$status = $connection->post('statuses/update', array('status' => $message));

	if (1) {
		echo $message;
	} else {
		echo "failed to tweet";
	}
}
