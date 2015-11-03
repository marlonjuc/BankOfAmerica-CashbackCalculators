// JavaScript Document

/* February 11, 2013 */

/*Browser detection and serves up the Flash and/or HTML5 version*/

function showFlashCalculator()
{
	var flashContent  = $('#flashContent');
	var html5Content  = $('#html5Content');
	
	html5Content.hide();
	
	flashContent.show();
	flashContent.tabIndex = 2;  // This was needed on Chrome 23
	try{
		flashContent.focus();
	}catch(error){}
	 
	 if ( navigator.userAgent.match(/MSIE 8.0/i)) 
     {
        $('html').scrollTop(0);
     } 
}

function showHTML5Calculator()
{
	var flashContent  = $('#flashContent');
	var html5Content  = $('#html5Content');
	
	html5Content.show();
	flashContent.hide();
	
	initTouchScreenEvents();
	addRangeText();
	resizeElements();
	
	(function(doc) {
        if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) 
        {
            $('head').append('<meta name="viewport" content="width=device-width, user-scalable=1">');
        } 
        else if ( navigator.userAgent.match(/iPad/i) ) 
        {
            $('head').append('<meta name="viewport" content="width=device-width, user-scalable=yes">');
        }
        else if ( navigator.userAgent.match(/Android/i) ) 
        {
            $('head').append('<meta name="viewport" content="initial-scale=0.0, maximum-scale=5.0, user-scalable=1">');
            if ( navigator.userAgent.match(/Chrome/i)) //Chrome en Galaxy Tab
        	{
            	$('head').append('<meta name="viewport" content="width=device-width, user-scalable=yes">');
        	}
        }
        //alert("Browser : " + navigator.userAgent);
    }(document));
}

/*--------------------- Initialize Sliders http://jqueryui.com/slider/ ---------------------- */

var cash = 0;   
var bonus = 0;
var total = 0;
var cashbackPerYear = 0;
var bonusPerYear = 0;
var totalPerYear = 0;
var loyaltyBonus = 2000;

/******** Slider 1 Config *******/
            
$(function() {
    
    	//Store frequently elements in variables
        var slider1  = $('#slider1'),
        tooltip = $('#slider1 .tooltip');
        
        //Call the Slider
        slider1.slider({
            //Config
            range: "min",
            min:0,
            max:maxSlider1,
            step:50,
            value:0,
            
            create: function( event, ui ) {
                if($("#slider1 .ui-slider-handle .white").length == 0)
                {
                     $("#slider1 .ui-slider-handle").append("<div class='white' tabindex='2'>$0</div>");
                     $("#slider1 a").attr("title","$0 current value slider Purchases"); //ADA Screen Readers
                     $("#slider1 a").append("<span class='hidden'> current value slider Purchases</span>"); //ADA Screen Readers
                }
            },
            
            start: function(event,ui) {
            },

            //Slider Event
            slide: function(event, ui) { //When the slider is sliding
                var value  = slider1.slider('value');
                tooltip.css('left', $("#slider1 .ui-slider-handle").position().left);  //Adjust the tooltip accordingly
                $("#slider1 .ui-slider-handle .white").text("");
                $("#slider1 .ui-slider-handle .white").text("$" + commaSeparateNumber(ui.value));
                $("#slider1 a").attr("title","$" + ui.value + " current value slider Purchases"); //ADA Screen Readers
                calculate();
                updateTotal();
            },

            stop: function(event,ui) {
            	updateTotal();
            	calculate();
            },
            
            change: function(event, ui) { 
                tooltip.css('left', $("#slider1 .ui-slider-handle").position().left);  //Adjust the tooltip accordingly
            }
        });
    });
    /******** Slider 2 Config *******/
    
    $(function() {

        //Store frequently elements in variables
        var slider2  = $('#slider2'),
        tooltip = $('#slider2 .tooltip');

        //Call the Slider
        slider2.slider({
            //Config
            range: "min",
            min: 0,
            max:maxSlider2,
            step:50,
            value: 0,
            
            create: function( event, ui ) {
                if($("#slider2 .ui-slider-handle .white").length == 0)
                {  
                     $("#slider2 .ui-slider-handle").append("<div class='white' tabindex='3'>$0</div>");
                     $("#slider2 a").attr("title","$0 current value slider Restaurants"); //ADA Screen Readers
                     $("#slider2 a").append("<span class='hidden'> current value slider Restaurants</span>"); //ADA Screen Readers
                }
            },

            start: function(event,ui) {
            },

            //Slider Event
            slide: function(event, ui) { //When the slider is sliding
                tooltip.css('left', $("#slider2 .ui-slider-handle").position().left);  //Adjust the tooltip accordingly
                $("#slider2 .ui-slider-handle .white").text("");
                $("#slider2 .ui-slider-handle .white").text("$" + commaSeparateNumber(ui.value));
				$("#slider2 a").attr("title","$" + ui.value + " current value slider Restaurants"); //ADA Screen Readers
				tooltip.css('left', $("#slider2 .ui-slider-handle").position().left);  //Adjust the tooltip accordingly
                
                calculate();
                updateTotal();
            },

            stop: function(event,ui) {
            	updateTotal();
            	calculate();
            },
            
            change: function(event, ui) { 
                tooltip.css('left', $("#slider2 .ui-slider-handle").position().left);  //Adjust the tooltip accordingly
            }
        });
    });
    
    /******** Slider 3 Config *******/
    
    $(function() {

        //Store frequently elements in variables
        var slider3  = $('#slider3'),
            tooltip = $('#slider3 .tooltip');

        //Call the Slider
        slider3.slider({
            //Config
            range: "min",
            min: 0,
            max:maxSlider3,
            step:50,
            value: 0,
            
            create: function( event, ui ) {
                if($("#slider3 .ui-slider-handle .white").length == 0)
                {   
                     $("#slider3 .ui-slider-handle").append("<div class='white' tabindex='4'>$0</div>");
                     $("#slider3 a").attr("title","$0 current value slider Gas Stations and office supply stores"); //ADA Screen Readers
                     $("#slider3 a").append("<span class='hidden'> current value slider Gas Stations and office supply stores</span>"); //ADA Screen Readers
                }
            },

            start: function(event,ui) {
            },

            //Slider Event
            slide: function(event, ui) { //When the slider is sliding
                tooltip.css('left', $("#slider3 .ui-slider-handle").position().left);  //Adjust the tooltip accordingly
                $("#slider3 .ui-slider-handle .white").text("");
                $("#slider3 .ui-slider-handle .white").text("$" + commaSeparateNumber(ui.value));
                $("#slider3 a").attr("title","$" + ui.value + " current value slider Gas Stations and office supply stores"); //ADA Screen Readers

                calculate();
                updateTotal();
            },

            stop: function(event,ui) { 
            	updateTotal();
            	calculate();
            },
            
            change: function(event, ui) { 
                tooltip.css('left', $("#slider3 .ui-slider-handle").position().left);  //Adjust the tooltip accordingly
            }
        });
        slider3.stop();
});
        
/*--------------------- To calculate cashback for period ---------------------- */

function calculate()
{
	var chart1  = $('#chart1');
	var chart2  = $('#chart2');
	
	var chartLoyaltyMonth  = $('#chartLoyaltyMonth');
	var chartLoyaltyYear  = $('#chartLoyaltyYear');
	
	var ruler = $('.ruler');
	
	//calculation based on rulers, scales where 1000 is every level
	var newHeight = (cashbackPerYear  * ruler.height()) / 1000;
	var newHeightYear = newHeight / 12;
	
	var extraProportion = (bonusPerYear  * ruler.height()) / 1000;
	var extraProportionYear = extraProportion / 12;
	
 	if(newHeight != chart2.height()) // it means slider changed
 	{
 		if(newHeightYear < 1)
 		{
 			newHeightYear = 1;
 		}
 		if(newHeight < 1)
 		{
 			newHeight = 1;
 		}
 		
 		TweenLite.to(chart1, .4, {css:{top:-(newHeightYear) + 'px', height:newHeightYear + 'px'}, ease:Power1.easeOut});
 		TweenLite.to(chart2, .4, {css:{top:-(newHeight) + 'px', height:newHeight + 'px'}, ease:Power1.easeOut});
 		
 		TweenLite.to(chartLoyaltyMonth, .4, {css:{top:-(extraProportionYear) + 'px', height:extraProportionYear + 'px'}, ease:Power1.easeOut});
 		TweenLite.to(chartLoyaltyYear, .4, {css:{top:-(extraProportion) + 'px', height:extraProportion + 'px'}, ease:Power1.easeOut});
 	}	
 }
  
/*--------------------- To update total for all the year ---------------------- */

function updateTotal()
{
	var value1  = $('#slider1').slider('value');
	var value2  = $('#slider2').slider('value');
	var value3  = $('#slider3').slider('value');
	
	var displayText1 = $('#value1');
	var displayText2 = $('#value2');
	var displayText3 = $('#value3');
	
	var totalmonth = $('#totalmonth');
	var totalyear = $('#totalyear');
	var totalyearHorizontal = $('#totalyear-horizontal');
	
	var loyaltyStatus = $('.loyaltyStatus');	
	
	var currentHighSpend = value1 + value2 + value3;
	var difference = Math.abs(loyaltyBonus - currentHighSpend);
	
	var acum1 = 0;
	var acum2 = 0;
	var acum3 = 0;
	
	acum1 = ((value1 * percent1) / 100); 
	acum2 = ((value2 * percent2) / 100);
	acum3 = ((value3 * percent3) / 100);
	
	displayText1.text("$" + acum1.toFixed(2));
	displayText2.text("$" + acum2.toFixed(2));
	displayText3.text("$" + acum3.toFixed(2));
	
	
	cash = Math.floor(acum1) + Math.floor(acum2) + Math.floor(acum3);
	
	//if(value1 >= loyaltyBonus || value2 >= loyaltyBonus || value3 >= loyaltyBonus)
	if(currentHighSpend >= loyaltyBonus)
	{
		bonus = Math.floor((value1 + value2 + value3) * 0.0025);
		
		loyaltyStatus.text("");
		loyaltyStatus.append("You’ve earned <span class='loyaltyTotal'>$" + commaSeparateNumber(bonus.toFixed(0)) + "</span> Loyalty Bonus cash back.");
	}else
	{
		bonus = 0;
		
		loyaltyStatus.text("");
		loyaltyStatus.append("You are <span class='loyaltyTotal'>$" + commaSeparateNumber(difference.toFixed(0)) + "</span> away from getting your bonus.");
	}
	
	total = cash + bonus;
	
	cashbackPerYear = cash * 12;
	bonusPerYear = bonus * 12;
	totalPerYear = cashbackPerYear + bonusPerYear;
	
	if(bonus > 0)
	{
		totalmonth.addClass('noBonus');
		totalmonth.text("");
		totalmonth.append("Cash Back: $" + commaSeparateNumber(cash.toFixed(0)) + "<br/>Loyalty Bonus: $" + commaSeparateNumber(bonus.toFixed(0)) + "<br/>Total: $" + commaSeparateNumber(total.toFixed(0)));
		
		totalyear.addClass('noBonus');
		totalyear.text("");
		totalyear.append("Cash Back: $" + commaSeparateNumber(cashbackPerYear.toFixed(0)) + "<br/>Loyalty Bonus: $" + commaSeparateNumber(bonusPerYear.toFixed(0)) + "<br/>Total: $" + commaSeparateNumber(totalPerYear.toFixed(0)));
		
		//Alternal blue box, when there is not enough space on graph, globe should be on left side position
		totalyearHorizontal.addClass('noBonus');
		totalyearHorizontal.text("");
		totalyearHorizontal.append("Cash Back: $" + commaSeparateNumber(cashbackPerYear.toFixed(0)) + "<br/>Loyalty Bonus: $" + commaSeparateNumber(bonusPerYear.toFixed(0)) + "<br/>Total: $" + commaSeparateNumber(totalPerYear.toFixed(0)));		
	}else
	{	
		totalmonth.removeClass('noBonus');
		totalmonth.text("");
		totalmonth.append("$" + commaSeparateNumber(total.toFixed(0)));
		
		totalyear.removeClass('noBonus');
		totalyear.text("");
		totalyear.append("$" + commaSeparateNumber(totalPerYear.toFixed(0)));
	}
	
  	resizeElements();
}


//To show and hide elements received for parameter
//animate opacity

function show(element)
{
	element.animate({
	opacity: 1
		}, 300, function() {
	});
}

function hide(element)
{
	element.animate({
	opacity: 0
		}, 300, function() {
	});
}

//To move Elements on left
//animate left

function move(element, x)
{
	element.animate({
		left: x
		}, 200, function() {
			show(element);
		});
}

//Add range text to scrubber

function addRangeText()
{
	$("#slider1 .tooltip").text("1%");
	
	$("#slider2 .tooltip").text("2%");
	
	$("#slider3 .tooltip").text("3%");
}

//Resizing elements according to content in speech bubbles

function resizeElements()
{
	if(bonus > 0)
	{
		$("#chart1 .triangle-border").css("line-height", "15px");	
		$("#chart2 .triangle-border").css("line-height", "15px");
		
		TweenLite.to($("#chart1 .triangle-border"), 0.6, { css: { height: '50px', top: '-78px' } } );
		TweenLite.to($("#chart2 .triangle-border"), 0.6, { css: { height: '50px', top: '-78px' } } );
		
		if(totalPerYear > 12000)
		{
			TweenLite.to($("#chart2 .triangle-border"), .3, { css:{opacity:0}, ease:Power1.easeOut});
			TweenLite.to($("#chart2 .triangle-border-horizontal"), .3, { css:{opacity:0.95}, ease:Power1.easeOut});
		}else
		{
			TweenLite.to($("#chart2 .triangle-border-horizontal"), .3, { css:{opacity:0}, ease:Power1.easeOut});	
			TweenLite.to($("#chart2 .triangle-border"), .3, { css:{opacity:0.95}, ease:Power1.easeOut});
		}
		if(bonus.toString().length >= 3)
		{
			TweenLite.to($("#chart1 .triangle-border"), 0.2, { css: { width: '107px'} } );
		}else
		{
			TweenLite.to($("#chart1 .triangle-border"), 0.2, { css: { width: '92px'} } );
		}
		if(bonusPerYear.toString().length >= 3)
		{
			
			TweenLite.to($("#chart2 .triangle-border"), 0.2, { css: { width: '107px'} } );
		}else
		{
			TweenLite.to($("#chart2 .triangle-border"), 0.2, { css: { width: '92px'} } );
		}
	}else
	{
		$("#chart1 .triangle-border").css("line-height", "11px");	
		$("#chart2 .triangle-border").css("line-height", "11px");
		$("#chart2 .triangle-border-horizontal").css("opacity", "0");	
		
		TweenLite.to($("#chart1 .triangle-border"), 0.6, { css: { height: '17px', top: '-52px' } } );
		TweenLite.to($("#chart2 .triangle-border"), 0.6, { css: { height: '17px', top: '-52px' } } );
	}
	
}

/*Miscelaneus functions*/

function commaSeparateNumber(val)
{
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}


/**
* Apple Touch Screen JS / iPhone Touch Events in JavaScript
*
**/

function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }

    //initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //screenX, screenY, clientX, clientY, ctrlKey,
    //altKey, shiftKey, metaKey, button, relatedTarget);
    
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                              first.screenX, first.screenY,
                              first.clientX, first.clientY, false,
                              false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function initTouchScreenEvents()
{
	try{
	    document.getElementById("slider1").addEventListener("touchstart", touchHandler, true);
	    document.getElementById("slider1").addEventListener("touchmove", touchHandler, true);
	    document.getElementById("slider1").addEventListener("touchend", touchHandler, true);
	    document.getElementById("slider1").addEventListener("touchcancel", touchHandler, true); 
		
		document.getElementById("slider2").addEventListener("touchstart", touchHandler, true);
	    document.getElementById("slider2").addEventListener("touchmove", touchHandler, true);
	    document.getElementById("slider2").addEventListener("touchend", touchHandler, true);
	    document.getElementById("slider2").addEventListener("touchcancel", touchHandler, true);
		
		document.getElementById("slider3").addEventListener("touchstart", touchHandler, true);
	    document.getElementById("slider3").addEventListener("touchmove", touchHandler, true);
	    document.getElementById("slider3").addEventListener("touchend", touchHandler, true);
	    document.getElementById("slider3").addEventListener("touchcancel", touchHandler, true); 
    }catch(error){}  
}
