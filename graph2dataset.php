<?php
set_time_limit( 0);
ob_implicit_flush( 1);
//ini_set( 'memory_limit', '4000M');
for ( $prefix = is_dir( 'ajaxkit') ? 'ajaxkit/' : ''; ! is_dir( $prefix) && count( explode( '/', $prefix)) < 4; $prefix .= '../'); if ( ! is_file( $prefix . "env.php")) $prefix = '/web/ajaxkit/'; if ( ! is_file( $prefix . "env.php")) die( "\nERROR! Cannot find env.php in [$prefix], check your environment! (maybe you need to go to ajaxkit first?)\n\n");
foreach ( array( 'functions', 'env') as $k) require_once( $prefix . "$k.php"); clinit(); 
//clhelp( "");
//htg( clget( ''));
$JSONENCODER = 'jsonencode'; // jsonraw | jsonencode
extract( jsonload( 'fukuoka.familymarts.graph')); // status, list, graph
$H = array();
foreach ( $graph as $k => $h) {
	extract( lth( ttl( $k, ' '), ttl( 'from,to')));	// from, to
	$from = s642s( $from); 
	$to = s642s( $to);
	//die( " from#$from to#$to\n");
	extract( $h); // distance, traveltime, start, end
	htouch( $H, "$from");
	htouch( $H[ "$from"], 'bydistance'); $H[ "$from"][ 'bydistance'][ "$to"] = $distance;
	htouch( $H[ "$from"], 'bytraveltime'); $H[ "$from"][ 'bytraveltime'][ "$to"] = $traveltime;
}
foreach ( $H as $from => $h) foreach ( ttl( 'bydistance,bytraveltime') as $k) { 
	$h = $H[ "$from"][ "$k"];
	asort( $h, SORT_NUMERIC);
	$h2 = array(); 
	for ( $i = 0; $i < 10 && count( $h); $i++) { list( $k2, $v2) = hshift( $h); $h2[ "$k2"] = $v2; }
	//for ( $i = 0; $i < 5 && count( $h); $i++) { list( $k2, $v2) = hpop( $h); $h2[ "$k2"] = $v2; }
	$H[ "$from"][ "$k"] = $h2;
}
foreach ( $H as $from => $h) $H[ $from][ 'density'] = round( mavg( hv( $h[ 'bydistance'])), 2);
foreach ( $H as $from => $h) $H[ $from] = hm( compact( ttl( 'from')), $h);
$out = fopen( '01.dataset.js', 'w');
fwrite( $out, "var DATASET = " . jsonencode( hv( $H)) . "\n\n");
fclose( $out);

?>