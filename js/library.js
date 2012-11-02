// library functions
function initGraphic(f){
	$(".title")
		.empty()
		.append(f.graphic_title);
	$("#sourcesCredits")
		.append(f.source );
	$("#sourcesCredits")
	.append("<br/> " + f.byline);
	$("#source")
	.append(f.sourceLink);
};

function yqlUrl(url){
	var rVal = 'http://query.yahooapis.com/v1/public/yql?q=';
	rVal += encodeURIComponent("select * from xml where url='" + url + "'");
	rVal += '&format=json&diagnostics=true&callback=?';
	return rVal;
};

function _yqlUrl(url){
	var rVal = ' http://interactive.ftdata.co.uk/data/yql/?' + url.split('?')[1] + '&format=json&diagnostics=true&callback=?';
	return rVal;
};