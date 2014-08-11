<?php
require_once('twitteroauth.php');

define("CONSUMER_KEY", "omTj1i6eUyjW7KAYJlQKeErbj");
define("CONSUMER_SECRET", "?esMWflatdWo0viVnYPkJey6fsHxW8n7s1fKzgsTRfu1kfvQ7nd");
define("OAUTH_TOKEN", "2677171598-Vxe9Q673Vc7r3Ge7N3VMp9r6rgjD1bYkUA8gt53");
define("OAUTH_SECRET", "FqJxoUrAvOY6ITQ1SAlV85ftGQcLjdRAuu5rShfKYpDuQ");

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_SECRET);
$content = $connection->get('account/verify_credentials');

$connection->post('statuses/update', array('status' => date(DATE_RFC822)));


