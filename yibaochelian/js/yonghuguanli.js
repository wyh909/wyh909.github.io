$(function(){function p(){$.extend({},d,{pageNum:1,pageSize:10}),j=avalon.define({$id:"useredit",itemId:"id",item:e.editItem,roles:[],newData:n,change:function(a){n[a.target.getAttribute("data-id")]=a.target.value},cancelItem:function(){r()},saveItem:function(){var a=$("div.bd-user",l);n.name=$("#name",a).val(),n.dept=$("#dept",a).val(),n.account=$("#account",a).val(),n.rolename=$("#rolename",a).val(),n.duty=$("#duty",a).val(),j.newData=n,COMMON.ajaxFn({url:"saveOrUpdateUsers.do",obj:n,callback:function(a){1==a.code&&(s(),r())}})}}),h=avalon.define({$id:"table",th:a,tr:[],ids:[],isOpt:!0,rolename:[],rolenames:[],getkey:function(a,b){return h.tr.size()>0&&h.tr[a]?h.tr[a][b]:void 0},addItem:function(){q("user","add")},editItem:function(a){$("div.bd-role",l).hide(),$("div.bd-user",l).hide(),q("user","edit",a),n.id=a},delItem:function(a){$("div.dialog").dialog({title:"窗口提示",content:"确定删除此条数据吗",button:[{text:"确定",cls:" btn-ok",handler:function(){COMMON.ajaxFn({url:"deleteUsersById.do",obj:{id:a},callback:function(a){1==a.code?s():alert("删除失败")}})}},{text:"取消",cls:"btn-cancel",handler:function(a){a.dialog("hide")}}]})}}),s(),s("role")}function q(a,b,c,d){var p,q,h="add"==b?"添加用户":"编辑用户",i="",k=$("div.dialog"),l=$("div.bd-role",k),n=$("div.bd-user",k);if($("div.hd",k).html(h),"user"==a?(i=f.port,n.show(),l.hide()):(i=g.port,l.show(),n.hide(),$("#rolename",l).val(d)),k.show(),m.show(),"add"!=b)"user"==a?($("#account").parent().parent().hide(),COMMON.ajaxFn({url:i,obj:{id:c},callback:function(b){var d,f,g,h,i,l,n,o,p,q;if(1==b.code){if(d=b.data.data||{},f={},g={},h=null,i=null,l={},n=[],"user"==a){for(d=d[0],f=e.editItem,o=0,p=f.length;p>o;o++){if(h=f[o]["id"],"rolename"==h){for(l=f[3]["option"],q=0,p=l.length;p>q;q++)n.push(l[q].value);i=n}else i=d[h]||"";j.item[o].value=i,g[h]=i}g.id=c,j.newData=g}k.show(),m.show()}}}),COMMON.ajaxFn({url:"roleList.do",obj:{pageSize:1,pageNum:10},callback:function(a){var d,e,b=a.data||[],c=[];for(d=0,e=b.length;e>d;d++);c.push({text:"test",value:1}),c.push({text:"test1",value:2}),j.item[3].option=c}})):(o.roleId=c,k.show(),m.show());else for($("#account").parent().parent().show(),p=0,q=e.editItem.length;q>p;p++)j.item[p].value=""}function r(){l.hide(),m.hide()}function s(a){var b=null,c=null;"role"==a?(b=$.extend({},d,g.param),c=g.port):(b=$.extend({},d,f.param),c=f.port),COMMON.ajaxFn({url:c,obj:b,callback:function(b){if(1==b.code){var c=b.data||{};$("tr.loading").hide(),"role"==a||(h.tr=c.data)}}})}var a=[{id:"name",name:"姓名"},{id:"account",name:"账号"}],b=[{id:"name",name:"角色名称"},{id:"desc",name:"角色描述"}],d={facilitatorID:COMMON.getCookie("facilitatorID")||1,companyUserID:COMMON.getCookie("companyUserID")||1},e={itemId:"id",editItem:[{id:"name",name:"姓名",value:"1",type:0},{id:"dept",name:"部门",value:""},{id:"account",name:"账号",value:""},{id:"rolename",name:"关联角色名称",type:1,option:[]},{id:"duty",name:"职责",value:""}]},f={id:"table",port:"listUsersByPage.do",saveport:"saveOrUpdateUsers.do",delport:"deleteUsersById.do",itemId:"id",th:a,param:{pageNum:1,pageSize:10}},g={id:"table",port:"roleList.do",saveport:"roleSaveUpdate.do",itemId:"id",th:b,param:{pageNum:1,pageSize:10}},h=null,j=null,l=$("div.dialog"),m=$("div.mask"),n={},o={};p()});