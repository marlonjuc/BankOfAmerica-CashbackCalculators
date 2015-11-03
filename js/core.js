//Core utility functions
//Version 1.0

var Core = {
    houseLender: null,

    //Cormetrics PageViewTag
    cmTracking: function(pageID,categoryID,urlHost){
        // ****************************** BEGIN COREMETRICS INCLUDE *******************************
        s = window.top.location.search.indexOf('adlink');
        e = (window.top.location.search.indexOf('&', s) > 0) ? window.top.location.search.indexOf('&', s) : window.top.location.search.length;
        al = (s > 0) ? window.top.location.search.substring(s+7, e) : null;

        cmError = false;
        if(window.location.hostname == urlHost){
            cmSetProduction(); 
        }else{ 
            cmSetStaging();
        }
        cmCreatePageviewTag(pageID,null, null,categoryID,false,false,null,false,false,null,null,null,null,null,null,null,null,null,null);
        // ****************************** END COREMETRICS INCLUDE *******************************
    },
    //Dart Tags tagging Method
    print_iframe: function(src, type, cat, home) {
        try {
            iframe = document.createElement('iframe');
            iframeURL = "https://fls.doubleclick.net/activityi;src=";
            axel = Math.random() + "";
            a = axel * 10000000000000;
            ord = 1;
            if(home) {
                iframeURL = iframeURL +src+";type="+type+";cat="+cat+";ord="+ord+";num="+a;
            } else {
                ord = a;
                iframeURL = iframeURL +src+";type="+type+";cat="+cat+";ord="+ord;
            }
            iframeURL = iframeURL +"?";
            iframe.src = iframeURL;
            iframe.width = 1;
            iframe.height = 1;
            iframe.border = 0;
            iframe.hidden = true;
            iframes = document.getElementsByTagName("iframe");
            if(iframes.length > 0) {
                document.body.removeChild(document.getElementsByTagName("iframe")[0]);
            }
                document.body.insertBefore(iframe, document.body.firstChild);
        } catch (e) {}
    },


	//Method to open Equal House Lender pop Up
	//The function receives the class name as a parameter
	openHouseLender:function(popUpClass) {
		$(popUpClass).bind("click", function(e) {
			e.preventDefault();
			this.houseLender = window.open('http://www.bankofamerica.com/help/equalhousing_popup.cfm', 'houseLender', 'width=640,height=371,scrollbars=yes,resizable=yes,left=35,top=161');
			return false;
		});
	},


    //This Method checks if the user has the right Font Family installed
    //and apply a fallbak functionality
    checkFont: function(font) {
        // a font will be compared against all the three default fonts.
        // and if it doesn't match all 3 then that font is not available.
        baseFonts = ['monospace', 'sans-serif', 'serif'],
        //we test using 72px font size, we may use any size. I guess larger the better.
        testString = "mmmmmmmmmmlli",

         //we test using 72px font size, we may use any size. I guess larger the better.
        testSize = '72px',

        h = document.getElementsByTagName("body")[0];

        // create a SPAN in the document to get the width of the text we use to test
        s = document.createElement("span");
        s.style.fontSize = testSize;
        s.innerHTML = testString;
        defaultWidth = {};
        defaultHeight = {};
        for (var index in baseFonts) {
            //get the default width for the three base fonts
            s.style.fontFamily = baseFonts[index];
            h.appendChild(s);
            defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
            defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
            h.removeChild(s);
        }

        detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
     this.detect = detect;
    }
}