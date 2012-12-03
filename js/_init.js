/* Author: P.Feeney (Fighne)

*/

// Prevent console.* errors in old IE (from http://goo.gl/UmPYa)
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

var FT = FT || {};
FT.Interactive = FT.Interactive || {
	iFrameComms: function(){},
	rdDataSet: function(url, jsonPath, iFormat){
	
		/*
			if iFormat is empty automatically assume JSONP
		*/
		
	},
	wrDataSet: function(){},
	
	// written assuming jQuery is already loaded and present
	browserVersion: function(){
		var r = { browser: '', version: $.browser.version };
		if($.browser.msie){
			r.browser = 'msie';
		} else if ($.browser.safari){ 
			r.browser = 'safari';
		} else if ($.browser.webkit){
			r.browser = 'webkit';
		} else if ($.browser.opera){
			r.browser = 'opera';
		} else if ($.browser.mozilla){
			r.browser = 'mozilla';
		} else {
			r.browser = 'unknown';
		}
		return r;
	},
	
	isSupported: function(str){
		switch (str){
			case 'SVG':
				return document['implementation'] && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0");
				break;
			case 'CANVAS':
				 var elem = document.createElement('canvas'); return !!(elem.getContext && elem.getContext('2d'));
				break;
			case 'CSS3':
				return elm.style.animationName;
				break;
			default:
				return false;
			break;
		}
	},
	browserTest: function(){
		return this.browserVersion().browser === 'msie' && this.browserVersion().version <= 8? true : false ;
	},
	setPreloader: function(bool){
		bool ? $('#FTi #preLoader').css('display','inline'): $('#FTi #preLoader').css('display','none');
		return bool;
	},
	displayMessage: function(type){
		var m = '';
		switch(type){
			case 0: // ie browser and not supported
				m = '<p>Sorry, your internet browser is not supported, the graphic technology used in this interactive graphic. Most likely you are using an older version of Internet Explorer. </p>';
				
				break;
			case 1: // ie browser and no svg
				m = '<p>Sorry, your internet browser does not support SVGs, the graphic technology used in this interactive graphic. Most likely you are using an older version of Internet Explorer. </p>';
				break;
			case 2: // ie browser and no CSS3
				m = '<p>Sorry, your internet browser does not support CSS3, the graphic styling technology used in this interactive graphic. Most likely you are using an older version of Internet Explorer. </p>';
				break;
			case 3: // ie browser and no canvas
				m = '<p>Sorry, your internet browser does not support Canvas, the graphic technology used in this interactive graphic. Most likely you are using an older version of Internet Explorer. </p>';
				break;
			default:
				m= '<p>Sorry, your internet browser does not support several technology used in this interactive graphic. Most likely you are using an older version of Internet Explorer. </p>';
				break;
		}
		
		m += '<p>Please either upgrade to Internet Explorer 9, or view this interactive graphic in another browser such as<a href="http://www.mozilla.org/en-US/firefox/new/" target="_blank">Mozilla Firefox</a>,<a href="https://www.google.com/intl/en/chrome/browser/" target="_blank">Google Chrome</a>,<a href="http://www.apple.com/safari/" target="_blank">Safari</a> or<a href="http://www.opera.com/" target="_blank">Opera</a>.</p><p>The image shown below this message is a  sample preview of the full graphic.</p>';
		
		$('#FTi #content').html(m);
	}
}

//$('#FTi').delay(2000).fadeIn(500); 