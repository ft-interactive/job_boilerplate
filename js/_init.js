/* Author: P.Feeney (Fighne)

*/
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
				break;
			case 'CSS3':
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
	},
	displayMessage: function(type){
		console.log('func:displayMessage');
		switch(type){
			case 0: // ie browser and not supported
				$('#content').load('admin/ifIE.html body');
				break;
			case 1: // ie browser and no svg
				$('#content').load('admin/ifIE_SVG.html body');
				break;
			case 2: // ie browser and no CSS3
				$('#content').load('admin/ifIE_CSS3.html body');
				break;
			case 3: // ie browser and no canvas
				$('#content').load('admin/ifIE_Canvas.html body');
				break;
			default:
				$('#content').load('admin/ifIE_Multiple.html body');
				break;
		}
	}
}

//$('#FTi').delay(2000).fadeIn(500); 