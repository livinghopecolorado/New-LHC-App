<?php
// Get the feed id
$id = (int) $_REQUEST['id'];

// Feed URL
$feed_url = "http://www.support4joomla.com/jbackend/rest/get/content/articles?maxsubs=2&limit=10&orderby=id&orderdir=desc&catid=".$id;

// Read the feed
$handle = fopen($feed_url, "r");
$feed = '';
while (!feof($handle)) {
  $feed .= fread($handle, 1024);
}
fclose($handle);

echo $feed;
