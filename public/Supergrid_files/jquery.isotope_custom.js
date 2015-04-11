$(window).load(function(){

	<!-- This makes the grid centered -->
   $.Isotope.prototype._getCenteredMasonryColumns = function() {
      this.width = this.element.width();
      
      var parentWidth = this.element.parent().width();
      
                    // i.e. options.masonry && options.masonry.columnWidth
      var colW = this.options.masonry && this.options.masonry.columnWidth ||
                    // or use the size of the first item
                    this.$filteredAtoms.outerWidth(true) ||
                    // if there's no items, use size of container
                    parentWidth;
      
      var cols = Math.floor( parentWidth / colW );
      cols = Math.max( cols, 1 );
  
      // i.e. this.masonry.cols = ....
      this.masonry.cols = cols;
      // i.e. this.masonry.columnWidth = ...
      this.masonry.columnWidth = colW;
    };
    
    $.Isotope.prototype._masonryReset = function() {
      // layout-specific props
      this.masonry = {};
      // FIXME shouldn't have to call this again
      this._getCenteredMasonryColumns();
      var i = this.masonry.cols;
      this.masonry.colYs = [];
      while (i--) {
        this.masonry.colYs.push( 0 );
      }
    };
  
    $.Isotope.prototype._masonryResizeChanged = function() {
      var prevColCount = this.masonry.cols;
      // get updated colCount
      this._getCenteredMasonryColumns();
      return ( this.masonry.cols !== prevColCount );
    };
    
    $.Isotope.prototype._masonryGetContainerSize = function() {
      var unusedCols = 0,
          i = this.masonry.cols;
      // count unused columns
      while ( --i ) {
        if ( this.masonry.colYs[i] !== 0 ) {
          break;
        }
        unusedCols++;
      }
      
      return {
            height : Math.max.apply( Math, this.masonry.colYs ),
            // fit container to columns that have been used;
            width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
          };
    };
    
    // If screen width is equal or less than 480, disable transforms.
    
    var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
    
     if (jQuery.browser.mobile || isiPad) { 
     
	     var bubu = {
		     animationEngine: 'best-available',
		     filter: '.homepage',
		     sortBy: 'original-order',
		     sortAscending: true,
		     transformsEnabled: false,
		     layoutMode: 'masonry'
	     };
     
     } else {
     	var bubu = {
     	    animationEngine: 'best-available',
     	    filter: '.homepage',
     	    sortBy: 'original-order',
     	    sortAscending: true,
     	    transformsEnabled: true,
     	    layoutMode: 'masonry'
     	};
     }
     
    // Settings for the grid
    $(function(){
    	
  
      var $container = $('#container'),
          // object that will keep track of options
          isotopeOptions = {},
          // defaults, used if not explicitly set in hash
           
          defaultOptions = bubu;
          
      var setupOptions = $.extend( {}, defaultOptions, {
        itemSelector : '.widget',
      		masonry: {
         		gutterWidth: 50,
        		 columnWidth: 1,
      		 },
       
        });
        
      // Infinite Scroll 
          $container.infinitescroll({
            navSelector  : '#page_nav',
            nextSelector : '#page_nav a',
            itemSelector : '.blog',
            behavior: 'twitter',
            loading: {
                msgText: 'Loading...',
                finishedMsg: 'Loaded all!'
              }
            },
            
            // call Isotope as a callback
            function( newElements ) {
              $container.isotope( 'appended', $( newElements ) ); 
            }
          );
    
  
      // set up Isotope
      $container.isotope( setupOptions );
  
      var $optionSets = $('nav').find('ul'),
          isOptionLinkClicked = false;
  
      // switches selected class on buttons
      function changeSelectedLink( $elem ) {
        // remove selected class on previous item
        $elem.parents().find('.selected').removeClass('selected');
        // set selected class on new item
        $elem.addClass('selected');
      }
  
      $optionSets.find('a').click(function(){
      	
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return;
        }
        changeSelectedLink( $this );
            // get href attr, remove leading #
        var href = $this.attr('href').replace( /^#/, '' ),
            // convert href into object
            // i.e. 'filter=.inner-transition' -> { filter: '.inner-transition' }
            option = $.deparam( href, true );
        // apply new option to previous
        $.extend( isotopeOptions, option );
        // set hash, triggers hashchange on window
        $.bbq.pushState( isotopeOptions );
        isOptionLinkClicked = true;
      
      if ($(window).width() <= 480) {  
	 	 $('#nav-collapse').removeClass('in');
	  	$('#nav-collapse').css('height','0');
	  }
	  // Reloads script on filter.
	  	
        $.getScript("js/load-more.js");
        $.getScript("js/maps.js");
        return false;
      });

      var hashChanged = false;

      $(window).bind( 'hashchange', function( event ){
        // get options object from hash
        var hashOptions = window.location.hash ? $.deparam.fragment( window.location.hash, true ) : {},
            // do not animate first call
            aniEngine = hashChanged ? 'best-available' : 'none',
            // apply defaults where no option was specified
            options = $.extend( {}, defaultOptions, hashOptions, { animationEngine: aniEngine } );
        // apply options from hash
        $container.isotope( options );
        // save options
        isotopeOptions = hashOptions;
    
        // if option link was not clicked
        // then we'll need to update selected links
        if ( !isOptionLinkClicked ) {
          // iterate over options
          var hrefObj, hrefValue, $selectedLink;
          for ( var key in options ) {
            hrefObj = {};
            hrefObj[ key ] = options[ key ];
            // convert object into parameter string
            // i.e. { filter: '.inner-transition' } -> 'filter=.inner-transition'
            hrefValue = $.param( hrefObj );
            // get matching link
            $selectedLink = $optionSets.find('a[href="#' + hrefValue + '"]');
            changeSelectedLink( $selectedLink );
          }
        }
    
        isOptionLinkClicked = false;
        hashChanged = true;

      })
        // trigger hashchange to capture any hash data on init
        .trigger('hashchange');
        	
		
		
    });
 
  
    });