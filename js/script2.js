/***********CHECK FOR SVG SUPPORT*****************/
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
	$('#errorBground').css({
		"visibility": "visible"
	});
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


function libTest(){
   // console.log('func:libTest');
    var rVal;  
    if(navigator.userAgent.match(/iPhone/i)){
        FT.Interactive.mobile = true;
        FT.Interactive.appLibs[0] = FT.Interactive.coreLibsList[1];
    } else {
        FT.Interactive.mobile = false;
        FT.Interactive.appLibs[0] = FT.Interactive.coreLibsList[0];
    }
    if(window.jquery){
        rVal = false;
    } else{
        rVal = true;
    }
    return rVal;
};

	$('#preLoader').css("z-index", 5000);
	$('#button').click(function () {
		$('ul.the_menu').slideToggle('fast');
	});
	
	$('.footer').click(function () {
		$('#sourcesCredits').slideToggle('fast');
	});
	function setUpData(ds) {
		//console.log(ds.query.results.dataset)
		var FTi = FT.interactive;
		var scalefactor;
		var xPos;
		var yPos;
    	FT.Interactive.dataMap = [];
		FT.Interactive.ddFlag=false;
		FT.Interactive.dataset = ds.query.results.dataset;
		initGraphic(ds.query.results.dataset.pagefurniture);
		
		$('.instruction').css("visibility", "visible");
		$('#keyHolder').css("visibility", "visible");
		//$('#button').css('visibilty', 'visible');
		
		if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)){
			$("#chartInstruction").append("<div id='mapDesc'>" + ds.query.results.dataset.map.intro +"</div><div id='userInstruction'>Tap on the regions<br/>to access constituency data</div>")
		}else{
			$("#chartInstruction").append("<div id='mapDesc'>" + ds.query.results.dataset.map.intro +"</div><div id='userInstruction'>Click on the regions<br/>to access constituency data</div>")
		}
		function loadSVG(){
		//console.log('func:loadSVG');
			$("#svgload").svg({
				onLoad: function() {
						var svg = $("#svgload").svg('get');
						svg.load('_media/ukConstituencies.svg', {addTo: true,  changeSize: true /*set to true to keep size from Illustrator file!!*/, onLoad: setUpMap});  
					},
				settings: {}
			});	
		};
		function loadSVGRegions(){
			$("#svgloadRegions").svg({
					onLoad: function() {
							var svg = $("#svgloadRegions").svg('get');
							svg.load('_media/ukRegions.svg', {addTo: true,  changeSize: true /*set to true to keep size from Illustrator file!!*/, onLoad: loadSVG});  
						},
					settings: {}
				});
		}
		loadSVGRegions();
	var item = ds.query.results.dataset.map.uk.regions.region;
	var itemCon = ds.query.results.dataset.map.uk.regions.region;
	var rbItem = ds.query.results.dataset.map.key.label;
	
	
	/************CHART****************
		
		
		
		for(i=0; i<FTi.dataset.electoralCollege.dataItem.length; i++){
			var scaleFactor = 850 / 538 
			
			$("#container").append('<div id="chartBar_' + i + '" class="chartDiv"></div>');
			$("#chartBar_" + i).css({
				"width": Number(FTi.dataset.electoralCollege.dataItem[i].value * scaleFactor) +"px",
				"background-color": FTi.dataset.map.key.label[0].range[i].colour
			});
			$("#chartBar_" + i).append(FTi.dataset.electoralCollege.dataItem[i].value)
		}*/
		
		
	function mouseEventSetup(){
		//console.log('func:mouseEventSetup');
		for (i=0; i < item.length; i++) {
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
			
			 for (k=0; k < item[i].pcons.constituency.length; k++) {
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
		for (k=0; k< rbItem.length; k++) {
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
		//setMapColour(0);
		createKey(0);
	}
	
	function setMapColour(rbID){
		console.log(rbID)
		for (i=0; i < item.length; i++) {
			 for (k=0; k < item[i].pcons.constituency.length; k++) {
				 $('#' + item[i].pcons.constituency[k].areaCode).transition({fill:item[i].pcons.constituency[k].data[rbID].colour},500,'in-out')
			 }
		}
		
	 }
	 
	 function createKey(rbID){
		 $('#keyHolder').empty();
		 $('#keyHolder').html("<div><b>Key</b></div><div id = 'keyDivisionHolder'></div>")
		 var keyItem = ds.query.results.dataset.map.key.label[rbID].range;
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
		 
		 FT.Interactive.dataMap = {};
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
			 FT.Interactive.dataMap[item[i].areaCode] = i;
			 //console.log(item[i].pcons.constituency.length)
			 $('#' + item[i].areaCode).css({
				"fill-opacity":0
			 });
			 $('#' + item[i].areaCode).mouseover(function(event) {
				 var p = FT.Interactive.dataMap[event.currentTarget.id];	
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
				 var p = FT.Interactive.dataMap[event.currentTarget.id];
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
				  var p = FT.Interactive.dataMap[event.currentTarget.id];
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
				FT.Interactive.dataMap[item[i].pcons.constituency[k].areaCode] = k;
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
					state: FT.Interactive.dataset.map.uk.regions.region[i].displayName,
					county: FT.Interactive.dataset.map.uk.regions.region[i].pcons.constituency[k].displayName,
					partyColour:FT.Interactive.dataset.map.uk.regions.region[i].pcons.constituency[k].currentColour,
					mpName:FT.Interactive.dataset.map.uk.regions.region[i].pcons.constituency[k].name,
					partyName:FT.Interactive.dataset.map.uk.regions.region[i].pcons.constituency[k].party,
					pensionLabel:FT.Interactive.dataset.map.uk.regions.region[i].pcons.constituency[k].data[0].label,
					pensionMean:FT.Interactive.dataset.map.uk.regions.region[i].pcons.constituency[k].data[0].mean,
					pensionMedian:FT.Interactive.dataset.map.uk.regions.region[i].pcons.constituency[k].data[0].median})
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


function init(){};

// this(below) needs a code tidy up
if(FT){
    FT.Interactive = {};
} else {
    var FT = {
        Interactive: {
            coreLibsList: ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js', 'http://cdnjs.cloudflare.com/ajax/libs/zepto/0.8/zepto.min.js'],
            mobile: false,
            coreLibPointer: '',
            dataResourceList: ['http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=180&id=276'],
            appLibs: [
                ['css/FTi.css'],
                ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'],
                ['http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js'],
                ['js/jquery.svg.js'],
                ['js/jquery.svgdom.js'],
				['js/jquery.svganim.min.js'],
				['js/scale.js']
	            ],
			dataset: {}
        }
    };
};

/*
    !Important: all code for interactives must reside within a single call
*/

function libsLoader(){
   //console.log('func:libsLoader');
    // function to load the libs and the functions required
    yepnope(
                [
                 {
                    load: ['css/FTi.css','http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js','http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js','js/jquery.svg.min.js','js/jquery.svgdom.min.js', 'js/jquery.svganim.min.js','js/scale.js'],
                    callback: function (url, result, key) {
                       // console.log(url, result, key);
                        if(key == 6){
                             $.getJSON(yqlUrl(FT.Interactive.dataResourceList[0]), function(ds){}).success(setUpData);
                        }
                    }
                 }
                ])
    
    
}
libsLoader();



