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
$.itemselector = function( HL, order, count, key, inverse) { // order: random, headmost, biggest, smallest
	$.log( 'order', order);
	if ( order == 'biggest') order = key + '.big2small';
	if ( order == 'smallest') order = key + '.small2big';
	var HL2 = HL;
	if ( order != 'headmost') HL2 = $.ordermaker( HL, order, inverse);
	//$.log( 'order', order, $.ltt( $.hltl( HL2, 'density')));
	var HL3 = [];
	for ( var i = 0; i < count && i < HL2.length; i++) HL3.push( HL2[ i]);
	return HL3;
}
// menu: { key: 'option1 -- oiption2 -- ...', ...}   c( { key: selectoin, ...})
$.fn.feedbackbuttonsStages = function( menu, c, pileup) { var $me = $( this).first(); $me.ioanimoutemptyin( 'fast', function() { 
	var h = {};
	var one = function( k, c) { var $box = pileup ? $me.ioover( true) : $me; $box.ioanimoutemptyin( 'fast', function() { 
		$box.append( k + ': '); var vs = $.ttl( menu[ k], '--');
		var L = []; 
		for ( var i in vs) {
			var v = $.trim( vs[ i]);
			if ( v.substr( 0, 1) != '?') { L.push( '<strong>' + $.trim( vs[ i]) + '</strong>'); continue; }
			v = v.substr( 1); if ( ! v.length) v = '25';
			L.push( $( '<input></input>').attr( 'value', '?').css({ width: v + 'px', height: '1.1em', border: '0px', 'background-color': '#888', color: '#fff', 'font-size': FONTS.small}).get( 0).outerHTML);
		}
		$.log( L);
		$box.append( $.ltt( L, ' '))
		$box.css({ 'font-size': FONTS.normal, color: '#bbb'}).find( 'strong').iotextbutton( function( v) { c( k, v); }, '#fff');
		var input = function( $box) { $box.ioafter({}, 'span').append( 'go').ioatomsPlainButton({ donotwrap: true, donotdraw: true, off: 1.0, hover: 0.8, on: 0.6}).onclick( function() { var v = $.trim( $box.val()); if ( v == '?' || ! v.length) return; c( k, v);  })}
		$box.find( 'input').each( function() { input( $( this)); })
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

