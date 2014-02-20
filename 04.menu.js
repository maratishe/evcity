// all specific menu items, each in each own function
B.map = function( $box) { $box.feedbackbuttonsStages({ order: DEFS.order, 'number of locations': '10 -- 25 -- 50 -- 100', 'pick center': DEFS.selector}, function( h) { 
	$.log( 'input', h);
	var HL = $.ordermaker( DATASET, h.order, true);
	HL = $.itemselector( HL, 'headmost', parseInt( h[ 'number of locations']));
	var CENTER = $.itemselector( HL, h[ 'pick center'], 1, 'density', true).shift();
	$box.empty();
	var map = function( h) { $.log( 'showing', h.from); MAP.location( h.from); }
	$box.ioover( true).itemSelector( [ CENTER], 'density', function( v, pos) { map( CENTER); }, 'your center: ');
	$box.ioover( true).itemSelector( HL, 'density', function( v, pos) { map( HL[ pos]); }, 'other locations: ');
	KVS.get( 'evcitySetup', function( h) { var setup = {}; if ( h && h.evcitySetup) setup = h.evcitySetup;  setup.map = { center: CENTER, places: HL}; KVS.set({ evcitySetup: setup}); })
})}
B.service = function( $box) { $box.feedbackbuttonsStages({ 'EV battery capacity (kWh)': '?50', 'Service Usage Monthly Quota (times)': '?50'}, function( h) { 
	var vs = $.hv( h);
	KVS.get( 'evcitySetup', function( h) { var setup = {}; if ( h && h.evcitySetup) setup = h.evcitySetup;  setup.service = { capacity: parseInt( vs[ 0]), quota: parseInt( vs[ 1])}; KVS.set({ evcitySetup: setup}); })
	$box.ioanimoutemptyin( 'fast', function() { $box.append( 'OK'); });
})}
B.distributions = function( $box) { }
B.simulation = function( $box) { }
B[ 'export'] = function( $box) { }

