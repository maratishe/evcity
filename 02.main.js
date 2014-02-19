var panes = null;
var FONTSIZE = null; var FONTS = {};	 // big, normal, small
var DEFS = {};
DEFS.order = 'random -- density.big2small -- density.small2big';
DEFS.selector = 'headmost -- random';
$.ioutils.nolog = false;
$.ioutils.callbacktimeout = '15s';
var $UNDER, $OVER, $FACE; var B = {};
var MAP;	// maps interface   location(), route()
var show = function() {
	var CS = $.ttl( '#F44,#4AF,#FA4,#A4F,#FF2'); var $B = {}; var C = {};
	var one = function( k, c) { 
		var $box3 = $FACE.ioover( true).css({ position: 'relative', float: 'left', margin: '5px', width: 'auto', height: 'auto'})
		.ioground( '#000', 0.5).ioground( C[ k], 0.5)
		.ioover( true);
		var genericshow = function( k) { $B[ k].ioanimoutemptyin( 'fast', function() { 
			var $box = $B[ k]; 
			var POS = $.domGetPagePos( $box.parent());
			$box.css({ 'left': Math.round( - POS.left + 20) + 'px', width: Math.round( $( 'body').width() - 40) + 'px', color: '#fff', 'font-size': Math.round() + 'px'})
			$box.ioground( '#000', 0.8); 
			$box.ioground( C[ k], 0.5);
			$box.ioover( true).css({ height: '3px'})
			var $box2 = $box.ioover( true).css({ margin: '0px 1%', width: '98%'})
			$box.ioover( true).css({ height: '3px'})
			eval( B[ k])( $box2);
		})}
		$box3.css({ width: 'auto', height: 'auto', margin: '3px 5px', 'font-size': FONTSIZE})
		.append( '<strong>' + k + '</strong>').find( 'strong').iotextbutton( function() { if ( $B[ k].height() > 10) return $B[ k].ioanimoutemptyin( 'fast'); else genericshow( k); }, '#fff')
		$A = $box3.ioover({ position: 'absolute', top: '110%', left: '0px', width: '300px', height: 'auto', 'z-index': 100000}); 
		$B[ k] = $A;
		$box3.parent().draggable();
		c();
	}
	for ( var k in B) { C[ k] = CS.shift(); CS.push( C[ k]); }
	$FACE.ioloop( $.hk( B), '1ms', function( dom, value, sleep, c) { if ( ! value.length) return c(); one( value.shift(), function() { c( value)})})
}
var main = function() { $( 'body').ioanimoutemptyin( 'fast', function() { 
	$( 'body').css({ margin: '0px', width: '100%', height: '100%', overflow: 'hidden'});
	$UNDER = $( 'body').ioover();
	$OVER = $( 'body').iounder();
	$FACE = $( 'body').ioover().css({ top: '5px', left: '1%', width: '98%', height: 'auto'});
	$UNDER.googlemapsapi( function( map) { MAP = map; })
	show();
})}
var sizes = function() { 
	var $box = $( 'body').ioover().css({ width: 'auto', height: 'auto'})
	$box.append( 'THIS IS TEST');
	for ( var k in $.io.font) {
		FONTSIZE = $.io.font[ k];
		$box.css({ 'font-size': $.io.font[ k]});
		var w1 = $box.width();
		var w2 = $box.parent().width();
		$.log( 'looking for FONTSIZE', w1, w2);
		if ( $box.width() < 0.2 * $box.parent().width()) break;
	}
	FONTS = { big: FONTSIZE}
	var f2p = $.hvak( $.hv( $.io.font)); var p2f = $.hk( $.io.font); var pos = parseInt( f2p[ FONTSIZE]);
	var pos2 = pos < parseInt( $.hv( f2p).pop()) - 1 ? pos + 2 : pos; FONTS.normal = $.io.font[ p2f[ pos2]]; 
	var pos3 = pos < parseInt( $.hv( f2p).pop()) - 3 ? pos + 4 : pos; FONTS.small = $.io.font[ p2f[ pos3]];
	//$.log( 'FONTS', FONTS);
	main();
}
$( document).ready( function() { sizes(); })