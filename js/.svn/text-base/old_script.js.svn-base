/* Author: P.Feeney (Fighne)

*/
( function(){

    FT.Interactive.datasource = '';
    $.getJSON(yqlUrl(FT.Interactive.dataSource), function(ds) {}).success(setData);
    
    function setData(ds) {
		FT.Interactive.dataset = ds.query.results.dataset;
		initGraphic(FT.Interactive.dataset.pagefurniture);
		init();
	};
    
    function init(){};
}())


