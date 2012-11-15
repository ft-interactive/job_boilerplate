/* Author: P.Feeney (Fighne)

*/
(function (conf) {
	
	if(FT.Interactive.browserTest){
		$('#FTi').fadeIn(100);
		FT.Interactive.setPreloader(false);
		FT.Interactive.displayMessage(0);
		
	} else {
		
		var s =[];
		for (var i=0; i<conf.capability; i++){
			if(!isSupported(conf.capability[i])){
				s.push(i);
			}
		}
		if(s.length>0){
			if(s.length == 1){
				FT.Interactive.displayMessage(s[0]);
			} else {
				FT.Interactive.displayMessage(5);
			}
		} else{
			FT.Interactive.setPreloader(true);
		}
	}
	
	
	
	
	function initGraphic(f){
		$(".title").html(f.graphic_title);
		$("#sourcesCredits").html(f.source );
		$("#sourcesCredits").html("<br/> " + f.byline);
		//$("#source").html(f.sourceLink);
	};
	
}({
	uuid:'abcde-012345-098765-fedcba',
	/*
		the library list will have to match the yepnope loader parameters
	*/
	library: [
			{load: ['http://interactive.ftdata.co.uk/features/2012-10-17_boilerplateTest/css/FTi.css']},
			{load: ['http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js']},
			{load: ['http://interactive.ftdata.co.uk/js/svg/jquery.svg.js','http://interactive.ftdata.co.uk/js/svg/jquery.svgdom.min.js', 'http://interactive.ftdata.co.uk/js/svg/jquery.svganim.min.js']},
			{load: ['http://interactive.ftdata.co.uk/features/2012-10-17_boilerplateTest/js/scale.js']}
		] ,
	dataSources:['http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=180&id=276'],
	/*width x height */
	dimensions:[566,480],
	/*
		requirements of the browser environment to be able to display this interactive
		examples; svg, js18, 
	*/
	capability:['SVG']
}))


