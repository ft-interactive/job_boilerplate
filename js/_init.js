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
	/*
		http://msdn.microsoft.com/en-us/library/ie/hh869301%28v=vs.85%29.aspx
		The best solution is to use feature detection, rather than browser detection. However, if you simply need to update your existing user-agent string detection to account for Internet Explorer 10, here’s a regular expression that captures the full value of the Version token:
	*/
	
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
	browserTest: function (str, url){
		if(str == 'SVG' && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0")){
			return true;
		} else {
			$('#FTi .content').html('');
			$('#FTi .content').html('<p>Sorry, your internet browser does not support SVGs, the graphic technology used in this interactive graphic. Most likely you are using an older version of Internet Explorer. </p>');
			setTimeout(function() {
				 $('#FTi #content').html('<img src="' + url + '">'); 
			}, 5000);
		}
		if(str == 'CANVAS'){
		}
		if(str == 'CSS3'){
		}
	
	}
}