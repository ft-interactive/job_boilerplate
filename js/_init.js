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
		if($.browser == 'msie'){
			r.browser = 'msie';
		} else if ($.browser == 'safari'){ 
			r.browser = 'safari';
		} else if ($.browser == 'webkit'){
			r.browser = 'webkit';
		} else if ($.browser == 'opera'){
			r.browser = 'opera';
		} else if ($.browser == 'mozilla'){
			r.browser = 'mozilla';
		} else {
			r.browser = 'unknown';
		}
		return r;
	},
	
	isSupported: function(str){
		var rVal = false;
		switch (str){
			case 'SVG':
				// awaiting comment from Luke
				break;
			case 'CANVAS':
				break;
			case 'CSS3':
				break;
			default:
				rVal = false;
			break;
		}
		return rVal;
	},
	
}