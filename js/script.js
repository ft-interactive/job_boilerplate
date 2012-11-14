/* Author: P.Feeney (Fighne)

*/
(function (conf) {
	
	if(!FT.Interactive.browserTest){
		$('#FTi').fadeIn(100);
		setPreloader(false);
		
	} else {
		setPreloader(true);
	}
	
	
	
	
	function initGraphic(f){
		$(".title").html(f.graphic_title);
		$("#sourcesCredits").html(f.source );
		$("#sourcesCredits").html("<br/> " + f.byline);
		//$("#source").html(f.sourceLink);
	};
	
	/*
		comment out tests not required
		alternative img must be supplied
	*/
	
	if(FT.Interactive.browserTest('SVG', 'http://im.ft-static.com/m/img/masthead_main.jpg')){
		$('#FTi .content').html(' <div class="loaderH" id="preLoader"> <div class="loaderC"> <img src="http://interactive.ftdata.co.uk/imgs/ftloader.png" width="228" height="256" alt="loading..."> <div id="loadText"> <p>Loading...</p> </div> </div> </div> ');
	};
	//FT.Interactive.browserTest('CANVAS');
	//FT.Interactive.browserTest('CSS3');
	

	//FT.Interactive.setStyle();
	/*
    var _selfRef = FT.Interactive.setRef(conf.uuid);
	var FTi = FT.Interactive.apps[_selfRef];
	FTi.conf = conf;
	yepnope(FTi.conf.library);
	var dPointer = 0;
	
	if(FTi.conf.dataSources.length == 0){
		init();
	} else if(FTi.conf.dataSources.length == 1){
		FTi.dataset = {};
		getData(dPointer);
	} else {
		FTi.dataset = [];
		getData(dPointer);
	};
	*/
	//getData(dPointer);
	
    function setData(ds) {
		console.log('func:setData');
		FTi.conf.dataSources.length === 1 ? FTi.dataset = ds.query.results.dataset : FTi.dataset.push(ds.query.results.dataset);
		dPointer++;
		dPointer <= (FTi.conf.dataSources.length - 1) ? getData(dPointer) : createEnv();
	}
    function getData(dPointer) {
		console.log('func:getData');
		// until data is completely stable from the YQL generator use Yahoo! YQL
		$.getJSON(FT.Interactive.yql(FTi.conf.dataSources[dPointer])).success(setData);
	}
    function createEnv(){
		if(window.location.host != 'interactive.ftdata.co.uk'){
			FT.Interactive.buildSpace(FTi);
			var rUrl = 'http://interactive.ftdata.co.uk/data/ePoint/?';
			rUrl += 'url=' + escape(FT.Interactive.convertUuid(FTi.conf.uuid));
			rUrl += '&xPath=' + escape('/html/body/div/div/div');
			$.getJSON(rUrl + '&callback=?',function(ds){}).success(insertContent);
		} else {
			init();
		}
	};
	function insertContent(ds){
		$(FTi.self).find('div#FTi > div').html(ds.query.results.dataset.content);
		init();
	}
	function init(){
	
		var supportsSVG = false;
		try{
		  var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		  supportsSVG = typeof svg.createSVGPoint == 'function';
		  //alert('yes svg');
		}catch(e){
			$('#preLoader').css("visibility", "hidden");
			$('#regionData').css("visibility", "hidden");
			$('#svgload').css("visibility", "hidden");
			$('#errorMessageHolder').css("visibility", "visible");
			$('#errorImage').css("visibility", "visible");
			$('#errorMessage').css("visibility", "visible");
			$("#chartInstruction").hide();
			$('#errorBground').css({ "visibility": "visible" });
			$('#errorBground').height($('#contentBox').height() + 12);
			$.get('http://interactive.ftdata.co.uk/admin/ifIE.html', function(data) {
				$('#errorMessage').html(data);
			});
			$('#errorImage').html('<img src="_media/errorMsg.jpg"/>')
			$("#errorMessageHolder").bind("click", function() {
				$('#errorMessageHolder').stop().animate(
					{
						opacity:0
					},
					500, function() {
						 $("#errorMessageHolder").hide();
					}
				);
			})
		}
		// end of SVG check

		$('#button').click(function () {
			$('ul.the_menu').slideToggle('fast');
		});
		
		$('.footer').click(function () {
			$('#sourcesCredits').slideToggle('fast');
		});
		
		var scalefactor;
		var xPos;
		var yPos;
    	FTi.dataMap = [];
		FTi.ddFlag=false;
		//FT.Interactive.dataset = ds.query.results.dataset;
		initGraphic(FTi.dataset.pagefurniture);
		
		
		//$('#button').css('visibilty', 'visible');
		
		if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)){
			$("#chartInstruction").append("<div id='mapDesc'>" + FTi.dataset.map.intro +"</div><div id='userInstruction'>Tap on the regions<br/>to access constituency data</div>")
		}else{
			$("#chartInstruction").append("<div id='mapDesc'>" + FTi.dataset.map.intro +"</div><div id='userInstruction'>Click on the regions<br/>to access constituency data</div>")
		};
		
		function loadSVG(){
		//console.log('func:loadSVG');
			$("#svgload").svg({
				onLoad: function() {
						var svg = $("#svgload").svg('get');
						svg.load('http://interactive.ftdata.co.uk/features/2012-10-17_boilerplateTest/_media/ukConstituencies.svg', {addTo: true,  changeSize: true /*set to true to keep size from Illustrator file!!*/, onLoad: setUpMap});  
					},
				settings: {}
			});	
		};
		function loadSVGRegions(){
			$("#svgloadRegions").svg({
					onLoad: function() {
							var svg = $("#svgloadRegions").svg('get');
							svg.load('http://interactive.ftdata.co.uk/features/2012-10-17_boilerplateTest/_media/ukRegions.svg', {addTo: true,  changeSize: true /*set to true to keep size from Illustrator file!!*/, onLoad: loadSVG});  
						},
					settings: {}
				});
		}
		loadSVGRegions();
		
		var item = FTi.dataset.map.uk.regions.region;
		var itemCon = FTi.dataset.map.uk.regions.region;
		var rbItem = FTi.dataset.map.key.label;
		function mouseEventSetup(){
		//console.log('func:mouseEventSetup');
		for (var i=0; i < item.length; i++) {
			$('#' + item[i].areaCode).mousemove(function(e){
					var toolTipWidth =  $("#regionData").width();
					if(e.pageX > 400) {
						$("#regionData").css({
							left: (e.pageX - toolTipWidth-30) + "px"
						});
					}else{
						$("#regionData").css({
							left: (e.pageX + 20) + "px"
						});	
					}
					if (e.pageY > 700) {
							top: (e.pageY - 40) + "px"
					}else{
						$("#regionData").css({
							top: (e.pageY - 20) + "px",
						});	
					}
				});		
			
			 for (var k=0; k < item[i].pcons.constituency.length; k++) {
				$('#' + item[i].pcons.constituency[k].areaCode).mousemove(function(e){
					var toolTipWidth =  $("#regionData").width();
					if(e.pageX > 400) {
						$("#regionData").css({
							left: (e.pageX - toolTipWidth-30) + "px"
						});
					}else{
						$("#regionData").css({
							left: (e.pageX + 20) + "px"
						});	
					}
					if (e.pageY > 700) {
							top: (e.pageY - 40) + "px"
					}else{
						$("#regionData").css({
							top: (e.pageY - 20) + "px",
						});	
					}
				});		
			 }
		}
		
		//setup Radio Buttons
		var rbTable= document.getElementById('radioButtons');
		var row=rbTable.insertRow(0);
		for (var k=0; k< rbItem.length; k++) {
			var cell = row.insertCell(k);
			cell.id = k;
			if (k==0) {
			cell.className="radioSelected"
			cell.innerHTML= '<div class="rbStyle">'  + rbItem[k].name + '</div>';
			}else{
				cell.className="radioUp"
				cell.innerHTML='<div class="rbStyle">' + rbItem[k].name + '</div>';
			}
		}
		$("#radioButtons tBody tr td").bind("click", function() {
			$("#radioButtons tBody tr td").removeClass("radioSelected");
			$("#radioButtons tBody tr td").addClass("radioUp");
			$(this).removeClass("radioUp");
			$(this).addClass("radioSelected");
			setMapColour(this.id);
			createKey(this.id);
		});
		
		//**********dropDown menu*************
		/*$("#dd_title").append(ddItem[0].name)
		for(i=0; i<ddItem.length; i++) {
			//console.log(ddItem[i].name)
			if (FT.Interactive.ddFlag == false) {
				$("#ddList").append("<li id= "+i+"><a>" + ddItem[i].name + "</a></li>");
			}
		}
		$("#ddList li").unbind();
		$("#ddList li").bind("click", function() {
			FT.Interactive.ddFlag = true;
			var text = $(this).text();
			$("#dd_title").html(text);
			FT.Interactive.dataPointer = this.id;
			setMapColour(FT.Interactive.dataPointer);
			createKey(FT.Interactive.dataPointer);
		});
		*/
		
		$('#preLoader').css("visibility", "hidden");
		$('.instruction').css("visibility", "visible");
		$('#keyHolder').css("visibility", "visible");
		//setMapColour(0);
		createKey(0);
	}
	
	function setMapColour(rbID){
		console.log('func:setMapColour:rbID='+rbID)
		for (var i=0; i < item.length; i++) {
			 for (k=0; k < item[i].pcons.constituency.length; k++) {
				 $('#' + item[i].pcons.constituency[k].areaCode).transition({fill:item[i].pcons.constituency[k].data[rbID].colour},500,'in-out')
			 }
		}
		
	 }
	 
	 function createKey(rbID){
		 $('#keyHolder').empty();
		 $('#keyHolder').html("<div><b>Key</b></div><div id = 'keyDivisionHolder'></div>")
		 var keyItem = FTi.dataset.map.key.label[rbID].range;
		 for (i=0; i < keyItem.length; i++) {
			 $('#keyDivisionHolder').append("<div class='keyDivision' id ='keyDivision_" + i + "'><div class='keyColour' id='keyColour_" + i + "'></div><div class='keyLabel'>" + keyItem[i].label + "</div></div></div>")
			 $('#keyColour_' + i).css({
				 "background-color": keyItem[i].colour
			 });
			 $('#keyDivision_' + (keyItem.length-1)).css({
				 "margin-bottom": 12 + "px"
			 });
		 }
		 $('#keyDivisionHolder').addClass('keyDivisionHolderStyle');
	 }
	 
		
	function setUpMap() {
		 
		 FTi.dataMap = {};
		 var mapPos = $('#ukCons').position();
		 $('#resetBtn').click(function(event) {
			   $(this).hide();
			   $("#ukCons").stop().animate(
				{	
					width:  566,
					height: 670,
					left: 0 + "px",
					top: 0  +"px",
					
					//height: $('#Layer_1').style.height * 2
				},700, function(){ 
				 $("#ukCons path").css({
					"stroke-width": .5
				 });
				 $("#ukCons polygon").css({
					"stroke-width": .5
				 });
				 $("#svgloadRegions").show();
				 $("#keyHolder").show();
				 $("#chartInstruction").show();
				 });
			   
				 $('#orkneyShetland').hide();
			  })
			 $('#orkneyShetland').hide();
		 for (i=0; i < item.length; i++) {
			 FTi.dataMap[item[i].areaCode] = i;
			 //console.log(item[i].pcons.constituency.length)
			 $('#' + item[i].areaCode).css({
				"fill-opacity":0
			 });
			 $('#' + item[i].areaCode).mouseover(function(event) {
				 var p = FTi.dataMap[event.currentTarget.id];	
				 $("#regionData").show();
				 $("#regionData").empty();
					$("#regionData").append("<li class='regionName'><b>" + item[p].displayName + "</b></li><li><i>Click to zoom</i></li>");
					$("#regionData").stop().animate(
					{
						opacity:.9
					},
					200
					);
				 $(this).css({
					"fill-opacity":0.8
				 });
			 })
			 
			 $('#' + item[i].areaCode).mouseout(function(event) {
				 var p = FTi.dataMap[event.currentTarget.id];
				 $(this).css({
					"fill-opacity":0
				 });
				 $("#regionData").empty();
				 $("#regionData").hide();
				 $("#regionData").css({opacity:0});
			 })
			  var mapPos = $("#ukCons").offset();
			  $('#' + item[i].areaCode).click(function(event) {
				  $('#orkneyShetland').show();
				  $("#svgloadRegions").hide();
				  var p = FTi.dataMap[event.currentTarget.id];
				  scalefactor = item[p].scale;
				  xPos = item[p].xPos;
				  yPos = item[p].yPos;
				  $("#resetBtn").css("visibility", "visible");
				  $("#resetBtn").show();
				  $("#keyHolder").hide();
				  $("#chartInstruction").hide();
				  $("#ukCons").css("position","relative");
				  $("#ukCons").stop().animate(
					{	
						width:  566 * scalefactor,
						height: 670 * scalefactor,
						left: xPos + "px",
						top: yPos  +"px",
						
						//height: $('#Layer_1').style.height * 2
					},700
					)
				  $("#ukCons path").css({
						"stroke-width": (1/scalefactor)
					 });
				  $("#ukCons polygon").css({
						"stroke-width": (1/scalefactor)
					 });
			  });
			  
			 for (k=0; k < item[i].pcons.constituency.length; k++) {
				FTi.dataMap[item[i].pcons.constituency[k].areaCode] = k;
				$('#' + item[i].pcons.constituency[k].areaCode).addClass('regionCursor');
				$('#' + item[i].pcons.constituency[k].areaCode).css({
					"fill": item[i].pcons.constituency[k].data[0].colour,
					"stroke": "#fff",
					"stroke-width": 0.5
				 });
				 
				$('#' + item[i].pcons.constituency[k].areaCode).mouseover(function(event) {
					//console.log(mapDepth);
					$(this).css({
						"opacity": 0.6
					 });		
					$("#regionData").show();
					$("#regionData").empty();
						$("#regionData").append("<div id='partyColor' style='background-color:" + $(this).data('countyInfo').partyColour +"'></div><li class='regionName'><b>" + $(this).data('countyInfo').county + "</b></li><li class='mpName'><b>" + $(this).data('countyInfo').mpName + "</b></li><li class='partyName'>" + $(this).data('countyInfo').partyName + "</li><div id='pensionData'><li><b>" + $(this).data('countyInfo').pensionLabel + "</b></li><li>Mean: £" + $(this).data('countyInfo').pensionMean + "</li><li>Median: £" + $(this).data('countyInfo').pensionMedian + "</li></div>");
						$("#regionData").stop().animate(
						{
							opacity:.9
						},
						200
						);
				})
				.data('countyInfo', { 
					state: FTi.dataset.map.uk.regions.region[i].displayName,
					county: FTi.dataset.map.uk.regions.region[i].pcons.constituency[k].displayName,
					partyColour:FTi.dataset.map.uk.regions.region[i].pcons.constituency[k].currentColour,
					mpName:FTi.dataset.map.uk.regions.region[i].pcons.constituency[k].name,
					partyName:FTi.dataset.map.uk.regions.region[i].pcons.constituency[k].party,
					pensionLabel:FTi.dataset.map.uk.regions.region[i].pcons.constituency[k].data[0].label,
					pensionMean:FTi.dataset.map.uk.regions.region[i].pcons.constituency[k].data[0].mean,
					pensionMedian:FTi.dataset.map.uk.regions.region[i].pcons.constituency[k].data[0].median})
				$('#' + item[i].pcons.constituency[k].areaCode).mouseout(function(event){	
					$("#regionData").empty();
					$("#regionData").hide();
					$("#regionData").css({opacity:0});
					$(this).css({
						"opacity": 1
					 });
				});
				
				$('#' + item[i].pcons.constituency[k].areaCode).click(function(event){		
				});
			 }
		 }	
		 mouseEventSetup();	
	}
	
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


