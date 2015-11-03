// JavaScript Document

/* February 17, 2013 */

/*Browser detection and serves up the Flash and/or HTML5 version*/

function showFlashCalculator()
{
	var flashContent  = $('#flashContent');
	var html5Content  = $('#html5Content');
	var aside = $('aside');
	
	html5Content.hide();
	flashContent.show();
	aside.addClass('flash');
	flashContent.tabIndex = 2;  // This was needed on Chrome 23
	try{
		flashContent.focus();
	}catch(error){}
	
	if ( navigator.userAgent.match(/MSIE 8.0/i)) 
	{
	   $('html').scrollTop(0);
	} 
	
	//$(document).keydown(function(event) {
		//$('#flashContent').focus();
	//});
	
}

function showHTML5Calculator()
{
	var flashContent  = $('#flashContent');
	var html5Content  = $('#html5Content');
	
	html5Content.show();
	flashContent.hide();
	
	initFormElements();
	initTouchScreenEvents();
	
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
            $('head').append('<meta name="viewport" content="initial-scale=0.0, maximum-scale=5.0, user-scalable=1">')            
            if ( navigator.userAgent.match(/Chrome/i)) //Chrome en Galaxy Tab
        	{
            	$('head').append('<meta name="viewport" content="width=device-width, user-scalable=yes">');
        	}
        }
        //alert("Browser : " + navigator.userAgent);
    }(document));
}

/************************ Initialize Sliders http://jqueryui.com/slider/ ******************/

var cash = 0;
var bonus = 0;
var bonusCash = 0;
var cashYear = 0;
var bonusCashYear = 0;
var pointsYear = 0;
var airlineTickets = 0;
var pointsMonth = 0;
var bonusPointsMonth = 0;
var bonusPointsYear = 0;

/******** Slider 1 Config *******/
	
	$(function() {

		//Store frequently elements in variables
		var slider1  = $('#slider1');
		
		//Call the Slider
		slider1.slider({
			//Config
			range: "min",
			min: 0,
			max:maxSlider1,
			step:50,
			value: 1,
			
			create: function( event, ui ) {
                if($("#slider1 .ui-slider-handle .white").length == 0)
                {
                     $("#slider1 .ui-slider-handle").append("<div class='white' tabindex='1'>$0</div>");
                     $("#slider1 a").attr("title","$0 current value slider monthly spending"); //ADA Screen Readers
                     $("#slider1 a").append("<span class='hidden'> current value slider monthly spending</span>"); //ADA Screen Readers
                }
            	desactivateCheckBoxes();
            },
		
			start: function(event,ui) {
				if(event.handleObj.type == "mousedown")
            	{
            		slider1.slider({ step: 50 });
            	}
            	if(event.handleObj.type == "keydown")
            	{
            		slider1.slider({ step: 50 });
            	}  
			},

			//Slider Event
			slide: function(event, ui) { //When the slider is sliding
				$("#slider1 .ui-slider-handle .white").text("");
                $("#slider1 .ui-slider-handle .white").text("$" + commaSeparateNumber(ui.value));
                $("#slider1 a").attr("title","$" + ui.value+ " current value slider monthly spending"); //ADA Screen Readers
				
				calculate();
				updateTotal();
				
            		activateCheckBoxes();
            	
			},

			stop: function(event,ui) {	
				updateTotal();
				calculate();
				if(ui.value == 0)
            	{
            		desactivateCheckBoxes();
            	}
			}
		});
	});

/*--------------------- To calculate cashback for period ---------------------- */

function calculate(value)
{
	var chart1 = $('#chart1');
	var chart2 = $('#chart2');
	var chart3 = $('#chart3');
	var chart4 = $('#chart4');
	
	var rulerGraphics = $('#graphics .ruler');
	var rulerPoints = $('#points .ruler');
	
	//calculation based on rulers, scales where 500 is every level
	var newHeight = pointsMonth * rulerGraphics.height() / 1000;
	var newBonusHeight = bonusPointsMonth * rulerGraphics.height() / 1000;
	var newHeightYear = newHeight * 12;
	var newBonusYear = bonusPointsYear * rulerGraphics.height() / 1000;
	
	var remainderTickets = cashYear % 25000; //In case Modulus (division remainder) needed
	var ticketIntervals = .5;
	var newHeightAirline = cashYear / 25000;
	var percentToIncreaseAirline = newHeightAirline * rulerPoints.height() / 5;
	var airlineBonus = bonusCashYear / 25000;
	var airlineHeight = airlineBonus * rulerPoints.height() / 5;
	
	if(Math.floor(newHeight) != chart2.height() ) // it means slider changed
 	{
 		TweenLite.to(chart1, .4, {css:{top:-(newHeight + 4) + 'px', height: Math.max(1, newHeight) + 'px'}, ease:Power1.easeOut});
		TweenLite.to(chart1_1, .4, {css:{top:-(newHeight + newBonusHeight + 4) + 'px', height:newHeight + newBonusHeight + 'px'}, ease:Power1.easeOut});
		TweenLite.to(chart2, .4, {css:{top:-(newHeight * 12 + 4) + 'px', height: Math.max(1, newHeight * 12) + 'px'}, ease:Power1.easeOut});
		TweenLite.to(chart2_1, .4, {css:{top:-(newHeightYear + newBonusYear + 4) + 'px', height: newHeightYear + newBonusYear + 'px'}, ease:Power1.easeOut});
		TweenLite.to(chart3, .4, {css:{top:-(percentToIncreaseAirline + 4) + 'px', height:Math.max(1, percentToIncreaseAirline) + 'px'}, ease:Power1.easeOut});
		TweenLite.to(chart4, .4, {css:{top:-(airlineHeight + percentToIncreaseAirline + 4) + 'px', height:airlineHeight + percentToIncreaseAirline + 'px'}, ease:Power1.easeOut});
	}
 }
  
/*--------------------- To update total for all the year ---------------------- */

function updateTotal()
{
  	var value1  = $('#slider1').slider('value');
	
  	var monthcash = $('#monthcash');
	var totalcash = $('#totalcash');
	var totalpoints = $('#totalpoints');
	
  	acum1 = 0;

	acum1 = (value1 * percent1); 
	
	cash = Math.floor(acum1);
	
	var valueMonth = $('#valueMonth');//Screen Points
	var valueYear = $('#valueYear');//Screen Points
	var bonusMonth = $('#bonusMonth');
	var bonusYear = $('#bonusYear');
	var totalMonth = $('#totalMonth');
	var totalYear = $('#totalYear');
	
	if (cash > 0)
	{
		$(".disabled").addClass('enabled');
		$(".selector").removeClass('enabled');
	}
	else
	{
		$(".disabled").removeClass('enabled');
		$(".selector").addClass('enabled');
	}
	
	valueMonth.text("");
	valueMonth.append("<span class='value'>" + commaSeparateNumber(Number(cash)) + " points/month</span>");
	
	cashYear = cash * 12;
	
	valueYear.text("");
	valueYear.append("<span class='value'>" + commaSeparateNumber(Number(cashYear)) + " points/year</span>");
	
	if (value1 >= 2000)
		bonusCash = Math.floor(value1 * 0.375);
	else
		bonusCash = 0;
	
	bonusMonth.text("");
	bonusMonth.append("<span class='value'>" + commaSeparateNumber(Math.floor(bonusCash)) + " points/month</span>");
	
	if (bonusCash > 0)
		bonusCashYear = bonusCash * 12 + bonus;
	else
		bonusCashYear = 0 + bonus;
	
	bonusYear.text("");
	bonusYear.append("<span class='value'>" + commaSeparateNumber(Math.floor(bonusCashYear)) + " points/year</span>");
	
	totalMonth.text("");
	totalMonth.append("<span class='value'>" + commaSeparateNumber(Math.floor(cash) + Math.floor(bonusCash)) + " points/month</span>");
	
	totalYear.text("");
	totalYear.append("<span class='value'>" + commaSeparateNumber(Math.floor(cashYear) + Math.floor(bonusCashYear)) + " points/year</span>");
	
	pointsMonth = cash * 0.006;
	bonusPointsMonth = bonusCash * 0.006;
	pointsYear = ((cashYear * 1) / 100);
	
	if(bonus > 0)//if checkboxes are selected, use bonusPointsYear based on cashYear + bonus, else use pointMonth for each month
	{
		
		bonusPointsYear = Math.floor(bonusCashYear * 0.006);
	}else
	{
		bonusPointsYear = Math.floor(bonusPointsMonth) * 12;
	}
	
	monthcash.text("");
	if (bonusPointsMonth > 0)
	{
		monthcash.append("Cash Back: $" + commaSeparateNumber(Math.floor(pointsMonth)) + "<br />Loyalty Bonus: $" + commaSeparateNumber(Math.floor(bonusPointsMonth)) + "<br/>Total: $" + commaSeparateNumber(Math.floor(pointsMonth) + (Math.floor(bonusPointsMonth))));
		monthcash.addClass('noBonus');
		if (bonusPointsMonth > 170)
			TweenLite.to($("#chart1_1 .triangle-border"), 0.6, { css: { height: '50px', top: '-59px' } } );
		else
			TweenLite.to($("#chart1_1 .triangle-border"), 0.6, { css: { height: '50px', top: '-63px' } } );
	}
	else
	{
		monthcash.append("$" + commaSeparateNumber(Math.floor(pointsMonth)));
		monthcash.removeClass('noBonus');
		TweenLite.to($("#chart1_1 .triangle-border"), 0.6, { css: { height: '14px', top: '-27px' } } );
	}
	
	totalcash.text("");
	if (bonusPointsYear > 0)
	{
		totalcash.append("Cash Back: $" + commaSeparateNumber(12 * Math.floor(pointsMonth)) + "<br />Loyalty Bonus: $" + commaSeparateNumber(Math.floor(bonusPointsYear)) + "<br/>Total: $" + commaSeparateNumber(12 * Math.floor(pointsMonth) + Math.floor(bonusPointsYear)));
		totalcash.addClass('noBonus');
		TweenLite.to($("#chart2_1 .triangle-border"), 0.6, { css: { height: '50px', top: '-59px' } } );
	}
	else
	{
		if(bonus > 0)
		{
			totalcash.append("$" + commaSeparateNumber(Math.floor(bonusCashYear * 0.006)));
		}else
		{
			totalcash.append("$" + commaSeparateNumber(12 * Math.floor(pointsMonth)));
		}
		totalcash.removeClass('noBonus');
		TweenLite.to($("#chart2_1 .triangle-border"), 0.6, { css: { height: '14px', top: '-27px' } } );
	}
	
	airlineTickets = cashYear / 25000;
	var airlineBonus = bonusCashYear / 25000;
	
	totalpoints.text("");
	if (airlineBonus > 0)
	{
		totalpoints.append("Trips/year: " +
		Math.floor(airlineTickets) + "<br />Bonus Trips: " + Math.floor(airlineBonus) + "<br/>Total: " + (Math.floor(airlineBonus) + Math.floor(airlineTickets)));
		totalpoints.addClass('noBonus');
		TweenLite.to($("#chart4 .triangle-border"), 0.6, { css: { height: '50px', top: '-59px' } } );
	}
	else
	{
		totalpoints.append(Math.floor(airlineTickets));
		totalpoints.removeClass('noBonus');
		TweenLite.to($("#chart4 .triangle-border"), 0.6, { css: { height: '14px', top: '-27px' } } );
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

//Resize Elements when total textfield increase width

function resizeElements()
{
	var maxCharPerTextField = 5;
	var difference = 0;
	
	var wrapper = $(".wrapper");
	var bonus = $("#bonus");
	
	var chart1  = $('#chart1');
	var chart2  = $('#chart2');
	var chart3  = $('#chart3');
	
	difference = bonus.height() + bonus.position().top;
	wrapper.height(Number(difference));
	
	if(chart1.height() >= 1)
	{
		$("#chart1 .triangle-border").css('top', '-75px');
	}else
	{
		$("#chart1 .triangle-border").css('top', '-80px');
	}
	if(chart2.height() >= 1)
	{
		$("#chart2 .triangle-border").css('top', '-75px');
	}else
	{
		$("#chart2 .triangle-border").css('top', '-80px');
	}
	if(chart3.height() >= 1)
	{
		$("#chart3 .triangle-border").css('top', '-75px');
	}else
	{
		$("#chart3 .triangle-border").css('top', '-80px');
	}
	
	if (cash < 25000)
	{
		TweenLite.to($("#chart1_1 .triangle-border"), 0.4, { css: { width: '98px' } });
		TweenLite.to($("#chart2_1 .triangle-border"), 0.4, { css: { left: '-14px', width: '98px' } });
		
	}
	else
	{
		TweenLite.to($("#chart1_1 .triangle-border"), 0.4, { css: { width: '113px' } });
		TweenLite.to($("#chart2_1 .triangle-border"), 0.4, { css: { left: '-29px', width: '113px' } });
		
	}
	
	if ( navigator.userAgent.match(/Android/i) ) 
    {
        $("#benefits .travel_icon").css('margin-left', "16px"); 
        if ( navigator.userAgent.match(/Chrome/i)) //Chrome en Galaxy Tab
    	{
        	$("#benefits .travel_icon").css('margin-left', "18px"); 
    	}
    }
}



/*--------------------- To initialize check box component and control through JQuery ---------------------- */
//Calculate new amount over 10%, or any provided value for each checkbox and update charts and textfields
function initFormElements()
{
	var chart1  = $('#chart1');
	var chart2  = $('#chart2');
	
	var monthcash = $('#monthcash');
	var totalcash = $('#totalcash');
	
	$(".footerBorder").append("<p>NOTE: This calculator is for illustrative purposes only. It does not include First Use, nor Business Advantage, nor Business Fundamentals Bonus points. Actual rewards earned will depend upon your individual purchases.</div>");
	
	var percentToIncrease = 0;
	
	if(checkBoxes.Boxes.length > 0)
	{
		$("#bonus").append("<div class='titleBonus'>" + checkBoxes.Title + "</div>");
		for(var i = 0; i < checkBoxes.Boxes.length; i++)
		{
			try{
				$("#bonus").append("<div class='checkbox'><div class='selector' tabindex='" + (i + 5) + "'><input type='checkbox' id='bonusCheck" + i + "'/><div class='cover'></div></div><label for='bonusCheck" + i + "'>" + checkBoxes.Boxes[i].Description + "</label></div>");
				
				var checkbox = $("#bonus #bonusCheck" + i +"");
				checkbox.attr('value', checkBoxes.Boxes[i].Value);
				var formElement = checkbox.parent();
				formElement.attr("id", "bonusCheck" + i);
				formElement.attr("value", checkBoxes.Boxes[i].Value);
				//var cover = $("#bonus #bonusCheck" + i + " .cover");
				//cover.hide();
				
			}catch(error){}

			checkbox.on("change",function(){
				var cover = $(" .cover");
				cover.show();
				if (this.checked == true) 
				{
					bonus += Number(this.value);
				}else 
				{
					bonus -= Number(this.value);
				}
				updateTotal();
				calculate();
				setTimeout(function(){cover.hide()}, 150);
			});
			
			formElement.keydown(function(event) {
				
				if (event.which == 32) //SPACE BAR pressed
				{ 
					var checkbox = $("#bonus #" + this.id + "");
					var classCheckBox = $("#bonus #" + this.id + " .ez-checkbox");
					
					if (!checkbox.attr("checked"))//is undefined
					{
						classCheckBox.addClass("ez-checked");
						checkbox.attr("checked", true);
						bonus += Number(this.value);
					}else 
					{
						classCheckBox.removeClass("ez-checked");
						checkbox.removeAttr("checked");
						bonus -= Number(this.value);
					}
					updateTotal();
					calculate();
				}
			});
		}
	}
	
	resizeElements();
	customizeCheckBox();
	$(".selector").addClass('enabled');
}

/*Miscelaneus functions*/

function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }


function activateCheckBoxes()
{
	for(var i = 0; i < checkBoxes.Boxes.length; i++)
	{
			
		var cover = $("#bonus #bonusCheck" + i + " .cover");
		cover.hide();
	}
}

function desactivateCheckBoxes()
{
	for(var i = 0; i < checkBoxes.Boxes.length; i++)
	{
			
		var cover = $("#bonus #bonusCheck" + i + " .cover");
		cover.show();
		var checkbox = $("#bonus #bonusCheck" + i + "");
		var classCheckBox = $("#bonus #bonusCheck" + i + " .ez-checkbox");
		classCheckBox.removeClass("ez-checked");
		checkbox.removeAttr("checked");
		bonus = 0;
	}
	updateTotal();
	calculate();
	
}

/**
* Initialize div class for checkbox ezMark jQuery Plugin
*
**/
function customizeCheckBox()
{
	$('.customCheckBox input').ezMark();
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
	    document.getElementById("section1").addEventListener("touchcancel", touchHandler, true); 
   }catch(error){}
}
