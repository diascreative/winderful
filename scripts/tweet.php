<?php
  error_reporting(0);

  require_once( dirname(__FILE__) . '/../inc/init.php' );
  require_once( dirname(__FILE__) . '/../inc/twitter/twitteroauth.php' );

    // only tweet when we reach these milestones
  $mileStones = array(10, 12, 15, 18, 20, 22, 24, 25);

  $current = getCurrentData();

  if( shouldTweet($current) ) {
    tweetPercentage($current);
  }

  function getCurrentData() {
    // get latest data
    // inner select grabs highest % tweeted today

    // only check today's readings
    $hour = date('H');

    if( $hour < 12 ) {
      $start = time();
      $end = time();

      $dateSMYSQL = es(date("Y-m-d 00:00", $start)); // today 00
      $dateEMYSQL = es(date("Y-m-d 12:00", $end));   // today 12
    } else {
      $start = time();
      $end = time() + 3600 * 24;

      $dateSMYSQL = es(date("Y-m-d 12:00", $start)); // today 12
      $dateEMYSQL = es(date("Y-m-d 00:00", $end));   // tomorrow 00
    }

    $query = "SELECT
                timestamp,
                FLOOR(100*wind/demand) AS percent,
                (SELECT percentage FROM tweets WHERE timestamp BETWEEN '$dateSMYSQL' AND '$dateEMYSQL' ORDER BY percentage DESC LIMIT 1) AS day_max
              FROM
                wind_vs_demand
              WHERE
                timestamp BETWEEN '$dateSMYSQL' AND '$dateEMYSQL'
              ORDER BY
                timestamp DESC
              LIMIT 1";

    return fetchAssoc(query($query));
  }

  function shouldTweet($data) {
    // we should tweet if we have reached a milestone and
    // we have not tweeted a higher milestone today
    global $mileStones;

    if( in_array($data['percent'], $mileStones) &&
        $data['percent'] > $data['day_max'] ) {
      return true;
    } else {
      return false;
    }
  }

  function tweetPercentage($current) {
    global $socialUrl;

    // tweet the percentage milestone :)
    $percent = $current['percent'];
    $time = $current['timestamp'];

    $message = "Right now #wind is meeting $percent% of the National Grid's electricity demand. $socialUrl";

    $connection = new TwitterOAuth(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
    $status = $connection->post('statuses/update', array('status' => $message));

    if( 1 ) {
      query("INSERT INTO tweets (percentage, timestamp) VALUES ($percent, '$time')");
      echo "tweeted!";
    } else {
      echo "failed to tweet";
    }
  }