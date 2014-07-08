<!DOCTYPE HTML>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="css/wind.css">
  <title>Wind Power Supply</title>
</head>
 <body>
  <form action="" method="post" id="form">
    <label for="name">Start Hour:</label>
    <input type="text" name="starthour"><br>
    <label for="name">Start Minute:</label>
    <input type="text" name="startminute"><br>
    <label for="name">Start Day:</label>
    <input type="text" name="startday"><br>
    <label for="name">Start Month:</label>
    <input type="text" name="startmonth"><br>
    <label for="name">Start Year:</label>
    <input type="text" name="startyear"><br>
    <br>
    <label for="name">End Hour:</label>
    <input type="text" name="endhour"><br>
    <label for="name">End Minute:</label>
    <input type="text" name="endhour"><br>
    <label for="name">End Day:</label>
    <input type="text" name="endday"><br>
    <label for="name">End Month:</label>
    <input type="text" name="endmonth"><br>
    <label for="name">End Year:</label>
    <input type="text" name="endyear"><br>
    <input type="submit">
  </form>

  <button id="fetch">Submit</button>
  <ul></ul>
  <div class="turbine">
    <div class="rotor">
      <div class="rotor-blade blade1"></div>
      <div class="rotor-blade blade2"></div>
      <div class="rotor-blade blade3"></div>
      <div class="rotor-tip"></div>
    </div>
  <div class="mast"></div>
</div>
</body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="js/script.js"></script>
</html>