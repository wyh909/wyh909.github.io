$(function(){function v(a,b){var b=$.extend({},{mainId:COMMON.getQuery("id")},b||{}),c=t[a];u.th=c.thadd,u.tr=[],b=b||{},COMMON.ajaxFn({url:c.addport,obj:b,callback:function(b){var c=b.data||{},d=c.data||{},e=$("tr.loading",$("div[avalonctrl=table_list]"));d&&d.length>0?(u.tr=d,1==a&&$(".Mtable","div.add-item").css("width","1200px"),e.hide()):(u.nodata="暂无数据",e.show())}})}var n,o,p,q,r,s,t,u,a=COMMON.getQuery("id"),b=COMMON.OPT,d=(b.colorOpt,b.oilOpt),e=b.classOpt,f=b.statusOpt,g=$("div.winpop"),h=$("div.dialog"),i=[{id:"appointmentNum",name:"预约编号"},{id:"maintainfortNum",name:"维修单号"},{id:"truename",name:"姓名"},{id:"platenumber",name:"车牌"},{id:"phone",name:"电话"},{id:"maintaintype",name:"类别"},{id:"status",name:"状态"}],j=[{id:"itemId",name:"推荐项目id",width:80},{id:"itemName",name:"推荐项目名称",width:""},{id:"workType",name:"工种",width:""},{id:"faultCode",name:"错误代码",width:""},{id:"standardWorkTime",name:"标准工时",width:""},{id:"standardUnitPrice",name:"标准单价",width:""},{id:"coastWorkTime",name:"工时花费"}],k=[{id:"productID",name:"商品编码"},{id:"productname",name:"商品名称"},{id:"unit",name:"单位"},{id:"productnum",name:"数量",isEdit:!0},{id:"unitprice",name:"单价",isEdit:!0},{id:"teams",name:"领料班组",isEdit:!0},{id:"maintenanceMan",name:"领料人",isEdit:!0}],l=[{id:"productID",name:"商品编号"},{id:"productname",name:"商品名称"},{id:"origin",name:"产地"},{id:"type",name:"分类"},{id:"carModle",name:" 车型"},{id:"lastdeliveryDate",name:"最近出货时间"},{id:"lastpurchaseDate",name:" 最近进货时间"},{id:"account",name:"商品可售数量"},{id:"unit",name:"单位（升，个）"},{id:"safeaccount",name:"安全数量"},{id:"suggestBuyprice",name:"建议购买价格"},{id:"suggestSaleprice",name:" 建议销售价格"},{id:"repertory",name:"仓库名称"}];h=$("div.dialog"),n={id:"table",port:"appointmentList.do",delport:"appointmentDelete.do",itemId:"appointmentNum",th:i,param:{pageNum:1,status:0}},o={itemId:"appointmentNum",id:"appId",editurl:"appointmentDetail.do",saveurl:"appointmentSaveOrUpdate.do",editItem:[{id:"appointmentNum",name:"预约单号",value:""},{id:"truename",name:"姓名",value:""},{id:"platenumber",name:"车牌",value:""},{id:"phone",name:"电话",value:"",dataType:"phone"},{id:"maintaintype",name:"类别",value:"",type:1,selected:"保养",options:e},{id:"status",name:"状态",value:"",type:1,selected:"0",options:f},{id:"oil",name:"油耗",value:"",type:1,selected:"0",options:d},{id:"usedComponents",name:"备注",value:"",type:2}],callback:function(a){$("span.fred","div.opt-tit").html(f[a.status]["text"])}},p={id:"yuyuexiangmu",port:"serviceItemList.do",addport:"serviceItemInput.do",saveport:"serviceItemDoSave.do",th:j,thadd:j,btntype:1,param:{pageNum:1}},q={id:"yuyuepeijian",port:"usedCompontList.do",addport:"usedCompontInput.do",saveport:"usedCompentDoSave.do",isOpt:!1,btntype:1,th:k,thadd:l,param:{pageNum:1}},r=document.location.href.indexOf("opt.html")>-1,r?(COMMON.addTpl({edit:1}),COMMON.addTpl({table:1,th:i}),COMMON.edit("edit",o),s={port:"usedCompontInput.do",obj:COMMON.defaultParam,isFold:!1},TREE.tree($("div.tree"),s),t=[p,q],child=avalon.define("grid",function(a){a.tab=["预约项目","预约配件"],a.curIndex=0,a.th=[],a.tr=[],a.item=[],a.newData=[],a.isCheck=a["curIndex"].isCheck===!0?!0:!1,a.nodata='<img src="img/loading.gif"/>',a.isOpt=!0,a.changeIndex=function(b,c){a.curIndex=b;var d=t[b],e={mainId:COMMON.getQuery("id")};a.th.removeAll(),a.th.pushArray(d.th),COMMON.ajaxFn({url:d.port,obj:e,callback:function(b){var e,f,g,h,i;if(1==b.code)if(e=null,a.tr=[],b.data){if(3==a.curIndex&&e.recommendItem&&(e.pageName=e.recommendItem.pageName),e.data){if(e=e.data||{},e instanceof Array?a.tr=e||[]:(f=[],f.push(e),a.tr=f),0==a.curIndex)for(g=0,h=$("tr","table tbody").length;h>g;g++)$("tr","table tbody").eq(g).find("a").last().hide();$("tr.loading").hide()}else a.nodata="暂无数据",$("tr.loading").show();i=b.data["total"]||"",i&&$("div.page").pager({pageNumber:c,pageTotal:i,change:function(b){d.pageNum=b,a.changeIndex(g)}})}else a.nodata="暂无数据",$("tr.loading").show()}})},a.getkey=function(a,b){var e,f,g,h,i,c=child;if(c.tr.size()>0&&child.tr[a]){for(child.tr[a][b],e=t[c.curIndex].th,f=null,g=null,h=0,i=e.length;i>h;h++)if(g=e[h],g.id==b&&"time"==g.dataType)return f=c.tr[a][b]||new Date,new Date(f).toLocaleDateString();return c.tr[a][b]}},a.getId=function(a){var c=child;return c.tr.size()>0&&c.tr[a]?"javascript:;":void 0},a.addItem=function(){$("div.bd",g).hide(),$("div.add-item",g).show(),g.dialog("show"),v(child.curIndex),$("#tree").on("click","a",function(){v(child.curIndex,{itemName:$(this).html()})})},a.delItem=function(b){var c=t[a.curIndex],d=a.tr[b][c.itemId],e={};h.dialog({title:"窗口提示",content:"确定删除此条数据吗？",button:[{text:"确定",cls:"btn-ok",handler:function(b){e[c.itemId]=d,e=$.extend({},defaultParam,e),COMMON.ajaxFn({url:c.delport,obj:e,callback:function(c){1==c.code&&(b.dialog("hide"),a.changeIndex(a.curIndex))}})}},{text:"取消",cls:"btn-cancel",handler:function(a){a.dialog("hide")}}],callback:function(a){a.addClass("w400")}})}}),u=avalon.define("table_list",function(b){b.th=[],b.tr=[],b.search={itemId:"",itemName:""},b.isOpt=!1,b.isCheck=!0,b.nodata='<img src="img/loading.gif"/>',b.getkey=function(a,b){var c=u;return c.tr.size()>0&&c.tr[a]?c.tr[a][b]:void 0},b.getId=function(a){var c=child;return c.tr.size()>0&&c.tr[a]?"javascript:;":void 0},b._thInit=function(){var b=this;return"width:"+b.th.width},b.saveItem=function(){var h,i,b=[],c=$("input:checkbox",g),d=null,e=child.curIndex,f=t[e].saveport;for(h=0,i=c.length;i>h;h++)d=c.eq(h).parent().next("td").text(),c.eq(h).attr("checked")&&b.push(d);COMMON.ajaxFn({url:f,obj:{mainId:a,itemIds:b.join(";")},callback:function(){g.dialog("hide"),child.changeIndex(e)}})},b.searchFn=function(){var a={itemId:$("#itemId").val()||"",itemName:$("#itemName").val()||""};v(child.curIndex,a)}}),avalon.scan(),child.changeIndex(0)):(COMMON.addTpl({table:1,th:i}),COMMON.table(n))});