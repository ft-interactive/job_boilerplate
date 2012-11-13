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
	browserTest: function (str, url){
		if(str == 'SVG' && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0")){
			return true;
		} else {
			$('#FTi #content').html('');
			$('#FTi #content').html('<p>Sorry, your internet browser does not support SVGs, the graphic technology used in this interactive graphic. Most likely you are using an older version of Internet Explorer. </p>');
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