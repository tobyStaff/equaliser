/* ------------------------------------------------ *\
    Element Height EQ
     - Dependencies: JQuery
     - Options;
     	pass in wrapper selector.
     	pass in minScreenWidth. e.g '500' (px)
     - Usage;
     <div class="my-eq-wrapper">
     	<div class="eq"></div>
     	<div class="eq"></div>
     	<div class="eq"></div>
     </div>
\* ------------------------------------------------ */
var equalize = {

	init: function( userOptions ) {
		this.getOptions( userOptions );
		this.cacheElements();
		this.bindEvents();
	},

	getOptions: function( userOptions ) {

		// Defaults
		this.options = {
			eqHolder: ".eq-holder", // specify selector for element wrapping target elements.
			minScreenWidth: false // ignore script if below specified pixels.
			// Future options
			//maxScreenWidth: "150px", // ignore script if above specified pixels.
			//maxBoxHeight: "500px", // no elements should exceed this height.
		};

		// Merge with user options.
		this.options = this.extend( this.options, userOptions );

		// Simplify naming.
		this.eqHolder = this.options.eqHolder;
		this.minScreenWidth = this.options.minScreenWidth;

	},

	cacheElements: function() {
		this.$eqs = $( this.eqHolder ).find( '.eq' );
		this.eqLength = this.$eqs.length;
		this.originalHeightsArray = function() {
			var array = [];

			for ( var i = 0; i < this.eqLength; i++ ) {
				array.push( $( this.$eqs[i] ).height() );
			}

			return array;
		};
		this.originalHeights = this.originalHeightsArray();
	},

	bindEvents: function() {
		$( document ).ready( this.render.bind( this ) );
		$( window ).resize( this.render.bind( this ) );
	},

	render: function() {

		if ( this.minScreenWidth ) {
			if ( this.getScreenWidth() < this.minScreenWidth ) {
				this.resetHeights();
			}
			else {
				this.adjustHeights();
			}
		}
		else {
			this.adjustHeights();
		}
	},

	adjustHeights: function() {
		for ( var i = 0; i < this.eqLength; i++ ) {

			var elHeight = $( this.$eqs[i] ).height(),
				maxHeight = this.getMaxHeight();

			if ( elHeight < maxHeight ) {
				$( this.$eqs[i] ).css( 'height', maxHeight );
			}
		}
	},

	getMaxHeight: function() {
		return Math.max.apply( null, this.originalHeightsArray() );
	},

	resetHeights: function() {
		for ( var i = 0; i < this.eqLength; i++ ) {	
			var originalHeight = this.originalHeights[i];
			$( this.$eqs[i] ).css( 'height', originalHeight );
		}
	},

	getScreenWidth: function() {
		return $( window ).width();
	},

	// Merges two objects.
	extend: function(destination, source) {
	    for (var property in source) {
	        if (source[property] && source[property].constructor && source[property].constructor === Object) {
	            destination[property] = destination[property] || {};
	            _extend(destination[property], source[property]);
	        } 
	        else {
	            destination[property] = source[property];
	        }
	    }
	    return destination;
	}
};

equalize.init({
	minScreenWidth: 500
});