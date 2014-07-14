<?php
  require_once('../inc/init.php');

  // set timezone to the same as gridwatch's
  date_default_timezone_set('GMT');

  $lastTimes = fetchArray(query("SELECT timestamp FROM wind_vs_demand ORDER BY timestamp DESC LIMIT 1"));

  $startTime = strtotime($lastTimes[0]);
  $endTime = time();

  if( $endTime - $startTime < 60*5 ) {
    echo 'up to date';
    return;
  }

  $remoteFile = 'http://www.gridwatch.templar.co.uk/do_download.php';

  $fields = array(
              'none'=>'off',
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
              'starthour'  => date('G', $startTime),
              'startminute'=> date('i', $startTime),
              'startday'   => date('j', $startTime),
              'startmonth' => date('n', $startTime)-1,  // month is 0->11
              'startyear'  => date('Y', $startTime),
              'endhour'    => date('G', $endTime),
              'endminute'  => date('i', $endTime),
              'endday'     => date('j', $endTime),
              'endmonth'   => date('n', $endTime)-1,    // month is 0->11
              'endyear'    => date('Y', $endTime)
            );

  $data = curl_init($remoteFile);

  curl_setopt($data, CURLOPT_POSTFIELDS, $fields);
  curl_setopt($data, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($data, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($data, CURLOPT_ENCODING, "");

  $csv = curl_exec($data);

  curl_close($data);

  // Do it
  $lines = explode("\n", $csv);
  $head = str_getcsv(array_shift($lines));
  $head = array_map('trim', $head);

  $data = array();

  foreach ($lines as $line) {
      if( $line )
        $data[] = array_combine($head, array_map('trim', str_getcsv($line)));
  }

  $sql = array();

  foreach( $data as $row ) {
    $sql[] = '("' . es($row['timestamp']) . '", "' . es($row['demand']) . '", "' . es($row['wind']) . '")';
  }

  query("INSERT INTO wind_vs_demand (timestamp, demand, wind) VALUES " . implode(',', $sql));