var guid = function(){
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});
}


jQuery.fn.serializeObject = function() {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null) {
      value = this.value;
    } else {
      value = '';
    }

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });

  return objectData;
};


var utility = {};

utility.goto_action_uri = function (uri) {

    if (uri != "" && uri != undefined) {

        var domain_split_uri = uri.split("://");

        if (domain_split_uri.length == 1) {

            window.location.href = uri;

        } else {

            switch (domain_split_uri[0]) {

            case "http":
                window.location.href = uri;
                break;

            }

        }

    }

};


function dateDiff(date1,date2,interval) {
    var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            ( date2.getFullYear() * 12 + date2.getMonth() )
            -
            ( date1.getFullYear() * 12 + date1.getMonth() )
        );
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}



var user = {};

user.info = {};

user.info.firstLoginDate = function(){

  if (localStorage["user.info.firstLoginDate"]){
      return Date.parse(localStorage["user.info.firstLoginDate"])
  }
    else {

      localStorage["user.info.firstLoginDate"] = new Date();
    }

}


user.state = {};
user.state.days_in_treatment = 100;
user.state.lessons = {};
user.state.lessons.reviewed = [];

user.session = {};
user.session.id = guid();
user.session.state = {};

var behavioral = {};
behavioral.categories = [];
behavioral.categories_default = {id:0, name:"", styles:"", classes:"", priority:-1};
behavioral.categories[0] = {id:1, type:"clinical_aim", name:"home", title:"Home", styles:"",classes:"", priority:0};
behavioral.categories[1] = {id:2, name:"didactic", title:"Didactic Content", styles:"",classes:"bg-themeA", priority:0};
behavioral.categories[2] = {id:3, name:"coping", title:"Coping", styles:"",classes:"bg-themeB", priority:0};
behavioral.categories[3] = {id:4, name:"behavioral_activation", title:"Behavioral Activation", styles:"", classes:"bg-themeC",priority:0};
behavioral.categories[4] = {id:5, name:"viz", title:"Data Visualization", styles:"",classes:"bg-themeD", priority:0};
behavioral.categories[5] = {id:6, name:"prd", title:"Patient Reported Data", styles:"", classes:"bg-themeE",priority:0};
behavioral.categories[6] = {id:7, name:"ema", title:"Environmental Momentary Assessment", styles:"",classes:"bg-themeF", priority:1};
behavioral.categories[7] = {id:8, name:"cognitive", title:"Cognitive Restructuring", styles:"",classes:"bg-themeG", priority:0};
behavioral.categories[8] = {id:9, name:"recommendation", title:"Recommendation", styles:"",classes:"bg-themeG", priority:0};
behavioral.categories[9] = {id:10, name:"goal_setting", title:"Goal Setting", styles:"",classes:"bg-themeG", priority:0};


user.sub = {};
user.sub.apps = [];
user.sub.apps_default = {id: 0, behavioral_categories:[], name:"Home", icon: "icon-home", styles:"", classes:"", orderer:"0", visible:false, uri:"../index.html", alt_name:"home", disabled:false };
user.sub.apps[0] = {id: 1, behavioral_categories:['didactic'], name:"Lessons", icon: "icon-book", styles:"", classes:"", orderer:"1", visible:true, uri:"billboard/index.html", alt_name:"lessons",  disabled:false };
user.sub.apps[1] = {id: 2, behavioral_categories:['coping'], name:"Active Coping", icon: "icon-sun", styles:"", classes:"", orderer:"2", visible:true, uri:"traptrac/index.html", alt_name:"TRAP", disabled:false  };
user.sub.apps[2] = {id: 3, behavioral_categories:['coping'], name:"Coping Cards", icon: "icon-star-half-full", styles:"", classes:"", orderer:"3", visible:true, uri:"copingcard/index.html", alt_name:"Coping Card",  disabled:false };
user.sub.apps[3] = {id: 4, behavioral_categories:['behavioral_activation','prd'], name:"Activity Calendar", icon: "icon-calendar", styles:"", classes:"", orderer:"4", visible:true, uri:"calendar/index.html", alt_name:"Activity Calendar",  disabled:false  };
user.sub.apps[4] = {id: 5, behavioral_categories:['prd','ema'], name:"Check-In", icon: "icon-pencil", styles:"", classes:"", orderer:"5", visible:true, uri:"mobilyzepro/index.html", alt_name:"PRO",  disabled:false };
user.sub.apps[5] = {id: 6, behavioral_categories:['viz'], name:"Graphs", icon: "icon-bar-chart", styles:"", classes:"", orderer:"6", visible:true, uri:"graphs/index.html", alt_name:"Graphs",  disabled:false  };
user.sub.apps[6] = {id: 7, behavioral_categories:['viz'], name:"Review", icon: "icon-info-sign", styles:"", classes:"", orderer:"7", visible:true, uri:"review/index.html", alt_name:"review",  disabled:false  };
user.sub.apps[7] = {id: 8, behavioral_categories:['viz','recommendation'], name:"Predictions", icon: "icon-eye-open", styles:"", classes:"", orderer:"8", visible:false, uri:"prediction/index.html", alt_name:"Predictions",  disabled:false  };
user.sub.apps[8] = {id: 9, behavioral_categories:['recommendation'], name:"Current Prompt", icon: "icon-comment-alt", styles:"", classes:"", orderer:"9", visible:false, uri:"prompt/index.html", alt_name:"Current Prompt",  disabled:false  };
user.sub.apps[9] = {id: 10, behavioral_categories:['recommendation'], name:"Fun Things", icon: "icon-rocket", styles:"", classes:"", orderer:"10", visible:true, uri:"fun/index.html", alt_name:"Current Prompt",  disabled:false  };

user.sub.widget = {};
user.sub.widget.view = function(el){


      var cssClasses = function(el){

        var added_classes = el.classes;
        _.each(el.behavioral_categories, function(el2){ 

            if (_.where(behavioral.categories,{name:el2}).length > 0){
            added_classes += " " +_.where(behavioral.categories,{name:el2})[0].classes;
            }

        });

        return added_classes
      }

      var view = "";

      view += "<button class='widget btn widget" + el.id + " " + cssClasses(el) + "' styles='" + el.styles + "' data-alt-name='" + el.alt_name +  "'>";
      view += "<i class='" + el.icon + "'></i>";
      view += "<h2 class='title'>" + el.name +"</h2>";
      view += "</button>";
      if (el.visible == true){
      return view
      }
      else {return ""}

    }

user.sub.widget.action = function(el){

  $(".widget" + el.id).on("click", function(ev){utility.goto_action_uri(el.uri)});

}

user.sub.widget.menu = {};
user.sub.widget.menu.view = function(array_of_widgets){
  var view = "";

  _.each(array_of_widgets, function(el){
      view += user.sub.widget.view(el)});

  return "<div class='widgetMenu'>" + view + "</div>"

}

user.sub.widget.menu.actions = function(array_of_widgets){
  _.each(array_of_widgets, function(el){
        $(".widget" + el.id).on("click", function(ev){utility.goto_action_uri(el.uri)});
  });
}


var prJsonSubmitUrl = "http://localhost:12345/json/submit";	// http://10.101.117.92:12345/test.html
var prwAddrHostAndPortHttps = "https://app2.cbits.northwestern.edu"; // https://ejs.cbits.northwestern.edu:8094 OR https://165.124.171.88 OR https://165.124.171.34:8094
var triggerIdCommonPrefix = 'CopingCard: ';

/**
 * Clears the contents of the specified jQuery element.
 * @param  {[type]} jqElem [description]
 * @return {[type]}        [description]
 */
var clearContents = function(jqElem) {
  if($(jqElem).is("input")) { $(jqElem).val(''); }
  if($(jqElem).is("textarea")) { $(jqElem).text(''); }
};

//===========================================================
// PurpleRobotWarehouse POST code (i.e. database-upload code)
//===========================================================
/* 
 * 
 * @param  {[type]} protoHostAndPortUrlBase 
 * @param  {[type]} userId                  
 * @param  {[type]} postData                
 * @param  {[type]} cbFn                    
 * @param  {[type]} cbData                  
 * @return {[type]}                         
 */

/**
 * POSTs a user-enrollment form to Purple Robot Warehouse, for a specific user.
 * @param  {[type]} protoHostAndPortUrlBase Base URL to which you wish to POST. EX: "https://app2.cbits.northwestern.edu"
 * @param  {[type]} userId                  A user ID string, which will be MD5 hashed - this hash value is the database name. EX (pre-MD5-hashing): "evan.story@northwestern.edu".
 * @param  {[type]} tableName               Table name. EX: "user_responses".
 * @param  {[type]} postData                The data structure to POST. EX: { Q1: "Name?", A1: "John Doe", Q2: "Rate your happiness, 1-10 (high).", A2: 7 }
 * @param  {[type]} cbFn                    Callback function. Takes 4 parameters: cbData, responseData, postData, postUrl
 * @param  {[type]} cbData                  External data to pass to the callback function.
 * @return {[type]}                         No defined return value.
 */
var postToPRImporter = function(protoHostAndPortUrlBase, userId, tableName, postData, cbFn, cbData) {
  var postUrl = protoHostAndPortUrlBase + '/prImporter';

  // generate the PR Importer message to be posted
  var userIdHash = md5(userId);
  var prImporterPostMessage = {
    "json": {
      "Operation": "SubmitProbes",
      "UserHash": userIdHash,
      "Payload": [
        {
          "PROBE": tableName,
          "GUID": guid(),
          "TIMESTAMP": (new Date().getTime() / 1000)
        }
      ],
      "Checksum": ""
    }
  };

  // SINGLE-LEVEL TABLE COLUMN + VALUE APPEND: loop-over the keys in the postData obj and append them to the Payload
  _.each(_.keys(postData), function(k) {
    prImporterPostMessage.json.Payload[0][k] = postData[k];
  });

  // stringify the payload
  prImporterPostMessage.json.Payload = JSON.stringify(prImporterPostMessage.json.Payload);
  
  // package-up the data.
  prImporterPostMessage.json.Checksum = md5(
      prImporterPostMessage.json.UserHash
    + prImporterPostMessage.json.Operation
    + prImporterPostMessage.json.Payload
  );
  var postData = prImporterPostMessage;
  postData.json = JSON.stringify(prImporterPostMessage.json);

  // POST the data to the specified URL.
  console.log('posting the following object to this URL: ' + postUrl);
  console.log(postData);

  $.post(postUrl, postData)
    .done(function(responseData) { 
      // call the user's callback function, if defined
      if (!isNullOrUndefined(cbFn)) {
        cbFn(cbData, responseData, postData, postUrl);
      }
    }
  );
};




// =====================
// Date / Time functions
// =====================

/**
 * Takes an HTML5 date string, and and an HTML5 time string, and returns a JS Date object.
 * @param  {[type]} dateStr [description]
 * @param  {[type]} timeStr [description]
 * @return {[type]}         [description]
 */
var html5DateAndTimeToJSDateTime = function(dateStr, timeStr) {
	var darr = dateStr.split('-');
	var tarr = timeStr.split(':');

	var year = parseInt(darr[0]),
		month = parseInt(darr[1]) - 1,
		day = parseInt(darr[2]),
		hour = parseInt(parseInt(tarr[0], 10)),
		minute = parseInt(parseInt(tarr[1], 10)),
		second = 0
		;
	var d = new Date(year, month, day, hour, minute, second);
	return d;
};


/**
 * Returns the string representing an ICal-formatted Date string. EX: "20130101T123400" (as seen on: http://tech.cbits.northwestern.edu/purple-robot-javascript-api/)
 * Copy-pasted from PRNM.
 * @return {[type]} [description]
 */
Date.prototype.toICal = function() { var fn = 'Date.prototype.toICal';
  var  yy = this.getFullYear()
      ,MM = this.clone().addMonths(1).getMonth()
      ,dd = this.getDate()
      ,hh = this.getHours()
      ,mm = this.getMinutes()
      ,ss = this.getSeconds();

  var ret = ''
    + yy.toString()
    + ((MM < 10) ? '0' + MM : MM.toString())
    + ((dd < 10) ? '0' + dd : dd.toString())
    + 'T'
    + ((hh < 10) ? '0' + hh : hh.toString())
    + ((mm < 10) ? '0' + mm : mm.toString())
    + ((ss < 10) ? '0' + ss : ss.toString())
    ;
  return ret;
};


/**
 * Converts an ICal-formatted date string into a JS Date object.
 * Copy-pasted from PRNM.
 * @param  {[type]} iCalStr [description]
 * @return {[type]}         [description]
 */
var iCalToDate = function(iCalStr) { var fn = 'iCalToDate';
  var  yy = iCalStr.substr(0,4)
      ,MM = (parseInt(iCalStr.substr(4,2), 10)) - 1
      ,dd = iCalStr.substr(6,2)
      ,hh = iCalStr.substr(9,2)
      ,mm = iCalStr.substr(11,2)
      ,ss = iCalStr.substr(13,2);

  var d = new Date(yy,MM,dd,hh,mm,ss);
  // self.debug('iCalStr = ' + iCalStr + '; d = ' + d, fn);
  return d;
};



// =================
// Utility functions
// =================
 
var isNullOrUndefined = function(v) { var fn = 'isNullOrUndefined';
  // if(v == '"') { self.debug('v is a double-quote!', fn); return false; }
  return (v == null || v == undefined || v == 'null');
};

var isStringGt0Len = function(s) { var fn = 'isString';
  var ret = !self.isNullOrUndefined(s) && _.isString(s) && s.length > 0;
  self.debug('s = ' + s + '; ret = ' + ret, fn);
  return ret;
};


/**
 * Returns a single-quoted string representing a set of values in an array.
 * Copy-pasted from PRNM.
 * @param  {[type]} paramArray [description]
 * @return {[type]}            [description]
 */
var getQuotedAndDelimitedStr = function(paramArray, delim, quoteChar, doNotQuoteTokens) { var fn = 'getQuotedAndDelimitedStr';
  // self.log('entered and exiting, with paramArray = ' + paramArray,fn);
  var qc = self.isNullOrUndefined(quoteChar) ? '\'' : quoteChar;
  if(self.isNullOrUndefined(paramArray) || paramArray.length == 0) { return ''; }
  return _.reduce(_.map(paramArray, function(param) { 
      return !self.isNullOrUndefined(doNotQuoteTokens) && _.isArray(doNotQuoteTokens) && _.contains(doNotQuoteTokens, param)
        ? param
        : qc + param + qc;
    }),
    function(memo, val) {
      return paramArray.length == 1 ? val : memo + delim + val;
  });
};




//Touche - makes HTML buttons more responsive on touch devices by 300ms
// 
/*
 * SimpleModal 1.4.4 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2013 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sun, Jan 20 2013 15:58:56 -0800
 */
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],n=b(document),k=navigator.userAgent.toLowerCase(),l=b(window),g=[],o=null,p=/msie/.test(k)&&!/opera/.test(k),q=/opera/.test(k),m,r;m=p&&/msie 6./.test(k)&&"object"!==typeof window.XMLHttpRequest;r=p&&/msie 7.0/.test(k);b.modal=function(a,h){return b.modal.impl.init(a,h)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=
function(){b.modal.impl.setContainerDimensions()};b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,h){b.modal.impl.update(a,h)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,
close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,h){if(this.d.data)return!1;o=p&&!b.support.boxModel;this.o=b.extend({},b.modal.defaults,h);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof b?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id",
"simplemodal-placeholder").css({display:"none"})),this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&m)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:g[0],width:g[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(m||o)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});n.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});l.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();m||o?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:g[0],width:g[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");n.unbind("keydown.simplemodal");l.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,e){if(e){var f=e[0].style;f.position="absolute";if(2>b)f.removeExpression("height"),f.removeExpression("width"),f.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),f.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,d;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):e.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(d="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),d=-1===d.indexOf("%")?d+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(d.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
d='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');f.removeExpression("top");f.removeExpression("left");f.setExpression("top",c);f.setExpression("left",d)}}})},focus:function(a){var h=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",e=b(":input:enabled:visible:"+a,h.d.wrap);setTimeout(function(){0<e.length?e.focus():h.d.wrap.focus()},
10)},getDimensions:function(){var a="undefined"===typeof window.innerHeight?l.height():window.innerHeight;j=[n.height(),n.width()];g=[a,l.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?g[0]:g[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",
b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=m||r,b=this.d.origHeight?this.d.origHeight:q?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:q?this.d.container.width():this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),e=this.d.data.outerHeight(!0),f=
this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||b;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,d=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<g[0]?c:g[0],d=d&&d<g[1]?d:g[1],i=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",b=b?this.o.autoResize&&b>c?c:b<i?i:b:e?e>c?c:this.o.minHeight&&"auto"!==i&&e<i?i:e:i,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>d?d:a<c?c:a:f?
f>d?d:this.o.minWidth&&"auto"!==c&&f<c?c:f:c;this.d.container.css({height:b,width:a});this.d.wrap.css({overflow:e>b||f>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=g[0]/2-this.d.container.outerHeight(!0)/2;b=g[1]/2-this.d.container.outerWidth(!0)/2;var e="fixed"!==this.d.container.css("position")?l.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(a=e+(this.o.position[0]||a),b=this.o.position[1]||b):
a=e+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?
this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();
this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});


/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-shiv-cssclasses-teststyles-prefixes-load
 */
// window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};




var PurpleRobotClient = {};



// PurpleRobotClient.serverUrl = "http://165.124.199.39:12345/json/submit";
// PurpleRobotClient.serverUrl = "http://165.124.198.95:12345/json/submit";
PurpleRobotClient.serverUrl = "http://localhost:12345/json/submit";


PurpleRobotClient.launchRequest = "PurpleRobot.fetchString(\'app_config\')";
PurpleRobotClient.lastResponse = null;
PurpleRobotClient.loadPrompt = null;


//QUEUE FUNCTIONS
PurpleRobotClient.transmissionQueue = {};

PurpleRobotClient.transmissionQueue.contents = function(){
    if (!localStorage["prc_outgoing_queue"]){
        localStorage["prc_outgoing_queue"] = '[]';
    }

    return JSON.parse(localStorage["prc_outgoing_queue"]);
};

PurpleRobotClient.transmissionQueue.add = function(js_to_execute){
    
    var local_queue_copy = PurpleRobotClient.transmissionQueue.contents();

    // console.log(js_to_execute);
    local_queue_copy.push(js_to_execute);

    localStorage["prc_outgoing_queue"] = JSON.stringify(local_queue_copy);
    
};

PurpleRobotClient.transmissionQueue.send = function(){
    var js_to_execute = "";
       _.each(PurpleRobotClient.transmissionQueue.contents(), function (i) {
        js_to_execute = js_to_execute + i;
    });
    console.log("QUEUE SPOOLED | transmission queue contents:", js_to_execute);
    PurpleRobotClient.transmitScript(js_to_execute,"queue");
    
};

PurpleRobotClient.transmissionQueue.clear = function(){
     localStorage["prc_outgoing_queue"] = '[]';
     console.log("QUEUE CLEARED | transmission queue contents:", PurpleRobotClient.transmissionQueue.contents());
};




//UTILITY FUNCTIONS
PurpleRobotClient.postJSON = function (json, emission_type) {

    var post_data = {};
    post_data.json = JSON.stringify(json);

    console.log("TRANSMISSION ATTEMPT | Purple Robot Transmission [PurpleRobotClient.postJSON()]: ", post_data);

    $.ajax(PurpleRobotClient.serverUrl, {
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: post_data,
        success: function (data) {
            // alert("Trigger created. It will launch shortly after " + fire_date + "...");
            //            alert("GOT DATA: " + JSON.stringify(data));
            console.log("SUCCESS | Purple Robot Transmission [PurpleRobotClient.postJSON()]: ", data);

             switch (emission_type)
                {
                    case "queue":
                    PurpleRobotClient.transmissionQueue.clear();
                    break;
                    default:
                    break;
                };
            PurpleRobotClient.lastResponse = data;

            if (PurpleRobotClient.lastResponse = 'loadPrompt'){
                PurpleRobotClient.loadPrompt = true;
            }

            payl


        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("Error - Transmission to Purple Robot: " + textStatus + " --- " + errorThrown);
            
            console.log("ERROR | Purple Robot Transmission [PurpleRobotClient.postJSON()]: " + textStatus + " --- " + errorThrown); 
        }
    });

};

PurpleRobotClient.transmitScript = function (js_to_execute,emission_type) {

    var emission_style = "";
    var json = {};
    json.command = "execute_script";
    json.script = js_to_execute;


    switch (emission_type)
    {
        case "queue":
        emission_style = "queue";
        return PurpleRobotClient.postJSON(json, emission_style);
        break;
        case "generateString":
        return json;
        break;
        default:
        emission_style = "";
        return PurpleRobotClient.postJSON(json, emission_style);
        break;
    };
    
    
    
};


PurpleRobotClient.actionHandler = function(js_to_execute, emission_format){
    
    switch (emission_format)
    {
        case "generateString":
        return js_to_execute;
        break;
        case "addToQueue":
        return PurpleRobotClient.transmissionQueue.add(js_to_execute);
        break;
        default:
        return PurpleRobotClient.transmitScript(js_to_execute);
        break;
    };

};



//PASSTHROUGH FUNCTIONS
//
//these passthrough functions take the form of the functions that exist in PR with the addition of an emission_format parameter
//the emission_format current options are:
//[null] : transmit immediately
//addToQueue : adds to the outgoing execute queue to transmit when that queue is spooled
//generateString : returns only the string to be transmitted
//

PurpleRobotClient.emitReading = function (name,value,emission_format,options) {
    options = options || {};
    name = name || "app_eav";
    js_to_execute = 'PurpleRobot.emitReading(\"' + name + '\",' + JSON.stringify(value) + ');'
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}

PurpleRobotClient.playDefaultTone = function (emission_format) {
    js_to_execute = 'PurpleRobot.playDefaultTone();';
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}

PurpleRobotClient.enableBackgroundImage = function (emission_format) {
    js_to_execute = 'PurpleRobot.enableBackgroundImage();'
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}

PurpleRobotClient.disableBackgroundImage = function (emission_format) {
    js_to_execute = 'PurpleRobot.disableBackgroundImage();'
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}

PurpleRobotClient.restoreDefaultId = function (emission_format) {
    js_to_execute = 'PurpleRobot.restoreDefaultId();'
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}

PurpleRobotClient.updateTrigger = function (triggerId, triggerObject, emission_format) {
    js_to_execute = 'PurpleRobot.updateTrigger(\"' + triggerId + '\",' + triggerObject + ');'
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}

PurpleRobotClient.setUserId = function (name,emission_format) {
    js_to_execute = 'PurpleRobot.setUserId(\"' + name + '\");'
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}

PurpleRobotClient.persistString = function (string, value, emission_format) {
    // PurpleRobotClient.persistString("load_prompt",JSON.stringify('{\"load_prompt\":true}'));

    js_to_execute = 'PurpleRobot.persistString(\"' + string + '\",' + value + ');'
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}

PurpleRobotClient.fetchString = function (name,emission_format) {
    js_to_execute = 'PurpleRobot.fetchString(\"' + name + '\");'
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}

PurpleRobotClient.emitToast = function (contents,emission_format) {
    js_to_execute = 'PurpleRobot.setUserId(\"' + contents + '\");'
    return PurpleRobotClient.actionHandler(js_to_execute, emission_format);
}



