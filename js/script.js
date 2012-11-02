/* Author: P.Feeney (Fighne)

*/
(function (conf) {
	FT.Interactive.setStyle();
    var _selfRef = FT.Interactive.setRef(conf.uuid);
	var FTi = FT.Interactive.apps[_selfRef];
	FTi.conf = conf;
	var dPointer = 0;
	FTi.dataset;
	if(FTi.conf.dataSources.length == 0){
		init();
	} else if(FTi.conf.dataSources.length == 1){
		FTi.dataset = {};
		getData(dPointer);
	} else {
		FTi.dataset = [];
		getData(dPointer);
	};
	getData(dPointer);
	
    function setData(ds) {
		FTi.conf.dataSources.length === 1 ? FTi.dataset = ds.query.results.dataset : FTi.dataset.push(ds.query.results.dataset);
		dPointer++;
		FTi.conf.dataSources.length > 1 ? getData(dPointer) : createEnv();
	}
    function getData(dPointer) {
		$.getJSON(FTi.conf.dataSources[dPointer] + '&callback=?').success(setData);
	}
    function createEnv(){
		if(!FTi.conf.developing){
			FT.Interactive.buildSpace(FTi);
		}
		var rUrl = 'http://interactive.ftdata.co.uk/data/ePoint/?';
		rUrl += 'url=' + escape(FT.Interactive.convertUuid(FTi.conf.uuid));
		rUrl += '&xPath=' + escape('/html/body/div/div/div');
		$.getJSON(rUrl + '&callback=?',function(ds){}).success(insertContent);
	};
	function insertContent(ds){
		$(FTi.self).find('div#FTi > div').html(ds.query.results.dataset.content);
		init();
	}
	function init(){};
}({
	uuid:'abcde-012345-098765-fedcba',
	/*
		the library list will have to match the yepnope loader parameters
	*/
	library:{
		
		},
	dataSources:['http://interactive.ftdata.co.uk/data/yql/?_cf=194&id=273'],
	/*width x height */
	dimensions:[566,480],
	/*
		requirements of the browser environment to be able to display this interactive
		examples; svg, js18, 
	*/
	capability:[],
	developing: false  
}))


