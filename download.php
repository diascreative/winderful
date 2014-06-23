<?php

  date_default_timezone_set('GMT');

  $endTime = time();
  $startTime = $endTime - (60*5); // 5 minutes earlier

  $local_file = '/tmp/grid_watch.csv';
  $remote_file = 'http://www.gridwatch.templar.co.uk/do_download.php';
  $json_file = '/tmp/grid_watch.json';
  $new_json = './json/grid_watch_a.json';

  $fields = array(
              'none'=>'on',
              'demand'=>'on',
              'frequency'=>'off',
              'coal'=>'off',
              'nuclear'=>'off',
              'ccgt'=>'off',
              'wind'=>'on',
              'pumped'=>'off',
              'hydro'=>'off',
              'other'=>'off',
              'oil'=>'off',
              'ocgt'=>'off',
              'french_ict'=>'off',
              'dutch_ict'=>'off',
              'irish_ict'=>'off',
              'ew_ict'=>'off',
              'all'=>'off',
              'starthour'=>date('G', $startTime),
              'startminute'=>date('i', $startTime),
              'startday'=>date('j', $startTime),
              'startmonth'=>intval(date('n', $startTime)-1),
              'startyear'=>date('Y', $startTime),
              'endhour'=>date('G', $endTime),
              'endminute'=>date('i', $endTime),
              'endday'=>date('j', $endTime),
              'endmonth'=>intval(date('n', $endTime)-1),
              'endyear'=>date('Y', $endTime)
            );

  $data = curl_init($remote_file);

  $fp = fopen ($local_file, 'w+');

  curl_setopt($data, CURLOPT_POSTFIELDS, $fields);
  curl_setopt($data, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($data, CURLOPT_FILE, $fp);
  curl_setopt($data, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($data, CURLOPT_ENCODING, "");
  curl_exec($data);
  curl_close($data);

  fclose($fp);

/*
  Converts CSV to JSON
*/

  header('Content-type: application/json');

  // Set your CSV feed
  $feed = $local_file;

  // Arrays we'll use later
  $keys = array();
  $newArray = array();

  // Function to convert CSV into associative array
  function csvToArray($file, $delimiter) {
    if (($handle = fopen($file, 'r')) !== FALSE) {
      $i = 0;
      while (($lineArray = fgetcsv($handle, 4000, $delimiter, '"')) !== FALSE) {
        for ($j = 0; $j < count($lineArray); $j++) {
          $arr[$i][$j] = $lineArray[$j];
        }
      $i++;
      }
    fclose($handle);
    }
    return $arr;
  }

  // Do it
  $data = csvToArray($feed, ',');

  // Set number of elements (minus 1 because we shift off the first row)
  $count = count($data) - 1;

  //Use first row for names
  $labels = array_shift($data);

  foreach ($labels as $label) {
    $keys[] = $label;
  }

  // Add Ids, just in case we want them later
  $keys[] = 'id';

  for ($i = 0; $i < $count; $i++) {
    $data[$i][] = $i;
  }

  // Bring it all together
  for ($j = 0; $j < $count; $j++) {
    $d = array_combine($keys, $data[$j]);
    $newArray[$j] = $d;
  }

  // Print it out as JSON and save tmp

  file_put_contents($json_file, json_encode($newArray));

  $js =file_get_contents($json_file);

  $json = preg_replace('/[ \n]/', '', $js);

  file_put_contents($new_json, $json);
?>