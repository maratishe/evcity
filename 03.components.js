// basic utilities, not DOM-linked
$.ordermaker = function( HL, order, inverse) { // order: random | key.big2small | key.small2big
	var HL2 = []; var ks, k; if ( order != 'random') { k = $.ttl( order, '.').shift(); order = $.ttl( order, '.').pop(); }
	if ( order == 'random') { // returns 
		ks = $.hk( HL);
		ks = $.mathShuffle( ks);
		for ( var i in ks) HL2.push( HL[ ks[ i]]);
		return HL2;
	}
	HL2 = $.hlsort( HL, 'density', order == 'big2small' ? ( inverse ? false: true) : ( inverse ? true : false));
	return HL2;
}
$.itemselector = function( HL, order, count, c) {
	var HL2 = []; var ks;
	ks = $.hk( HL);
	if ( order == 'random') ks = $.mathShuffle( ks); // otherwise, headmost
	for ( var i in ks) if ( HL2.length < count) HL2.push( HL[ ks[ i]]);
	return HL2;
}
// menu: { key: 'option1 -- oiption2 -- ...', ...}   c( { key: selectoin, ...})
$.fn.feedbackbuttonsStages = function( menu, c, pileup) { var $me = $( this).first(); $me.ioanimoutemptyin( 'fast', function() { 
	var h = {};
	var one = function( k, c) { var $box = pileup ? $me.ioover( true) : $me; $box.ioanimoutemptyin( 'fast', function() { 
		$box.append( k + ': '); var vs = $.ttl( menu[ k], '--');
		var L = []; for ( var i in vs) L.push( '<strong>' + $.trim( vs[ i]) + '</strong>');
		$box.append( $.ltt( L, ' '))
		$box.css({ 'font-size': FONTS.normal, color: '#bbb'}).find( 'strong').iotextbutton( function( v) { c( k, v); }, '#fff');
	})}
	$me.ioloop( $.hk( menu), '1ms', function( dom, value, sleep, c2) { if ( ! value.length) { c2(); return c( h); }; one( value.shift(), function( k, v) { h[ k] = v; c2( value); });})
})}
$.fn.itemSelector = function( HL, showkey, c, msg, donec) { var $me = $( this).first(); $me.ioanimoutemptyin( 'fast', function() { // c( value, pos) 
	if ( msg) $me.append( msg).css({ 'font-size': FONTS.small, color: '#ccc'});
	var one = function ( i, v) {
		var $box = $me.append( ' ').ioover({ position: 'relative', 'font-size': FONTS.small}, 'strong').append( v);
		$box.iotextbutton( function( ) { c( v, i); }, '#fff')
	}
	$me.ioloop( $.hk( HL), '1ms', function( dom, value, sleep, c2) {  if ( ! value.length) { if ( donec) donec(); return c2(); }; var i = value.shift(); one( i, showkey ? HL[ i][ showkey] : i); c2( value); })
})}

