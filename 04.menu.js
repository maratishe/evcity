// all specific menu items, each in each own function
B.map = function( $box) { $box.feedbackbuttonsStages({ order: DEFS.order, 'number of locations': '10 -- 25 -- 50 -- 100', 'pick center': DEFS.selector}, function( h) { 
	var HL = $.ordermaker( DATASET, h.order, true);
	HL = $.itemselector( HL, 'headmost', parseInt( h[ 'number of locations']))
	var CENTER = $.itemselector( HL, h[ 'pick center'], 1).shift();
	$box.empty();
	var map = function( h) { $.log( 'showing', h.from); MAP.location( h.from); }
	$box.ioover( true).itemSelector( [ CENTER], 'density', function( v, pos) { map( CENTER); }, 'your center: ');
	$box.ioover( true).itemSelector( HL, 'density', function( v, pos) { map( HL[ pos]); }, 'other locations: ');
})}
B.service = function( $box) { }
B.distributions = function( $box) { }
B.simulation = function( $box) { }
B[ 'export'] = function( $box) { }

