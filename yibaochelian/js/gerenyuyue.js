$(function(){function n(a){var c=$("div.winpop"),d=$("div.mask"),e=$("div.bd",c);"appointmentTime"==a||(c.show(),d.show(),e.hide(),$("div."+a,c).show())}function o(a,b){var c=$.extend({},COMMON.defaultParam);COMMON.ajaxFn({url:b,obj:c,callback:function(c){if(1==c.code){var d=c.data||{};a.tr="facilitatorList.do"==b?d:d.data||{}}}})}function p(c){var g,h,e=[],f=$("input:checked",$("div."+c));if("radio"==f.attr("type"))$("#"+c).val(f.val());else{for(g=0,h=f.length;h>g;g++)e.push(f.eq(g).val());$("#"+c).val(e.join(";"))}a.hide(),b.hide()}var j,k,l,m,a=$("div.winpop"),b=$("div.mask"),c=COMMON.OPT,d=c.colorOpt||[],e=c.oilOpt||[],f=c.classOpt||[],g=[{id:"productID",name:"商品编码"},{id:"productname",name:"商品名称"},{id:"unit",name:"单位"},{id:"productnum",name:"数量"},{id:"unitprice",name:"单价"},{id:"maintenanceMan",name:"领料人"}],h={itemId:"",id:"appId",editurl:"appointmentDetail.do",saveurl:"appointmentSaveOrUpdate.do",editItem:[{id:"truename",name:"车主姓名",value:"",dataType:"name"},{id:"phone",name:"联系电话",value:"",dataType:"phone"},{id:"address",name:"地址",value:""},{id:"platenumber",name:"车牌号",value:""},{id:"brand",name:"品牌",value:"",click:n},{id:"series",name:"车型",value:"",click:n},{id:"color",name:"颜色",value:"",type:1,selected:"0",options:d},{id:"motorNumber",name:"发动机号",value:"",dataType:"number"},{id:"oil",name:"油表状态",value:"",type:1,selected:0,options:e},{id:"miles",name:"里程",value:""},{id:"appointmentTime",name:"预约日期",value:"",dataType:"time"},{id:"facilitatorList",name:"预约4S店",value:"",click:n},{id:"appointmentType",name:"预约类型",value:"",type:1,selected:"保养",options:f},{id:"usedCompontInput",name:"预约配件",value:"",click:n},{id:"recommID",name:"推荐项目",value:"",click:n}],callback:function(a,b){$("span.fred","div.opt-tit").html(optionsStatus[a.status]["text"]),b.$watch("usedCompontInput",function(){})}},i={id:"yuyuepeijian",port:"usedCompontInput.do",th:g,isCheck:!0,isOpt:!1,param:{pageNum:1,status:0},callback:function(){var g,h,e=[],f=$("input:checked",$("div.usedCompontInput"));for(g=0,h=f.length;h>g;g++)e.push(f.eq(g).val());$("#usedCompontInput").val(e.join(";")),a.hide(),b.hide()}};COMMON.addTpl({edit:1}),COMMON.edit("edit",h),$("#peijian").on("click",function(){$("div.dialog-peijian").show()}),COMMON.addTpl({table:1,th:g}),COMMON.table(i),j=avalon.define("tuijianxiangmu",function(a){a.tr=[],a.getTr=function(){var b=$.extend({},COMMON.defaultParam);COMMON.ajaxFn({url:"recommendItemList.do",obj:b,callback:function(b){1==b.code&&(a.tr=b.data||{})}})},a.saveItem=function(){p("recommID")}}),k=avalon.define("brand",function(a){a.tr=[],a.getCon=function(){o(a,"listBrandByPage.do"),$.extend({},COMMON.defaultParam)},a.saveItem=function(){p("brand")}}),l=avalon.define("series",function(a){a.tr=[],a.getCon=function(){o(a,"listVehicleTypeByPage.do")},a.saveItem=function(){p("series")}}),m=avalon.define("fuwushang",function(a){a.tr=[],a.getCon=function(){o(a,"facilitatorList.do")},a.saveItem=function(){p("facilitatorList")}}),avalon.scan(),j.getTr(),k.getCon(),l.getCon(),m.getCon()});