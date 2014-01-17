<?php

$result = Array();

$file_handle = fopen( 'darts-checkouts.csv', 'r');
while (!feof($file_handle) ) {
	$data[] = fgetcsv($file_handle, 1024, ";");
}
fclose($file_handle);

foreach( $data as $checkout ) {
	$result[$checkout[0]] = Array();
	$result[$checkout[0]]['first'] = $checkout[1];
	$result[$checkout[0]]['second'] = $checkout[2];
	$result[$checkout[0]]['third'] = $checkout[3];
}

echo json_encode( $result );