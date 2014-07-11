<?php
  require_once('../inc/init.php');

  header('Content-type: application/json');

  date_default_timezone_set('GMT');

  // set up the end limited
  if( isset($_GET['end']) )
    $end = $_GET['end'];
  else
    $end = time() - (3600*48);

  // set up the start limited
  if( isset($_GET['start']) )
    $start = $_GET['start'];
  else
    $start = $end - 3600*10; // show 10h before end

  $delta = $end - $start;

  $query_where = '';

  if( $delta <= 3600*10 ) {
    // date range < 10 hours : show every 5 mins
    $query_where = '';
  } else if( $delta <= 3600 * 24 * 7 ) {
    // date range < 1 week : show every hour
    $query_where = '';
  } else if( $delta <= 3600 * 24 * 30 ) {
    // date range < 1 month : show daily average
    $query_where = '';
  } else {
    // date range < 1 year : show weekly average
    $query_where = '';
  }

  $end = es($end);
  $start = es($start);

  $dateSMYSQL = es(date("Y-m-d H:i", strtotime("+1 day", $start)));
  $dateEMYSQL = es(date("Y-m-d H:i", strtotime("+1 day", $end)));

  $query = "SELECT
              *
            FROM
              wind_vs_demand
            WHERE
              timestamp BETWEEN '$dateSMYSQL' AND '$dateEMYSQL'";

  $items = [];

  $results = query($query);

  while( $item = fetchAssoc($results) ) {
    array_push($items, $item);
  }

  echo json_encode($items);

  //print_r($dbDebug);