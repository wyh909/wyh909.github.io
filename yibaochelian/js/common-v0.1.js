/**
* @desc 	公用的头部与底部
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
var COMMON = (function(){
	var gettype=Object.prototype.toString;
	var TXT = {
	        MONTH : [
	            '一月', '二月', '三月', '四月',
	            '五月', '六月', '七月', '八月',
	            '九月', '十月', '十一月', '十二月'
	        ],
	        WEEK: [
	            "星期一.", "星期二", "星期三", "星期四",
	            "星期五", "星期六", "星期日"
	        ]
		},
		OBJ = {
			URL: 'http://115.159.77.210:8080/ybcl2.0/enterprise/',
			STATUS: ['全部','预约','未修','正修','已修','内部交车','结算','交车'],
			CLASS: ['保养','维修','美容']
		},
		OPT = {

			statusOpt : [{
				text:'全部',value:'0'},{
				text:'预约',value:'1'},{
				text:'未修',value:'2'},{
				text:'在修',value:'3'},{
				text:'已修',value:'4'},{
				text:'内部交车',value:'5'},{
				text:'结算',value:'6'},{
				text:'交车',value:'7'
			}],
			classOpt : [{
				text:'保养',value:'保养'},{
				text:'维修',value:'维修'},{
				text:'美容',value:'美容'
			}],
			oilOpt : [{
				text:'半满',value:'0'},{
				text:'满',value:'1'
			}],
			colorOpt : [{
				text:'黑',value:'0'},{
				text:'白',value:'1'},{
				text:'红',value:'2'},{
				text:'黄',value:'3'},{
				text:'蓝',value:'4'},{
				text:'绿',value:'5'},{
				text:'银',value:'6'},{
				text:'橙',value:'7'
			}]
		},
		exps = {
	        name: /^([A-Za-z0-9]|[\u4E00-\u9FA5]){2,16}$/i,//用户真实姓名
	        //regmobile : /^0?1[3|4|5|8][0-9]\d{8}$/,//手机
	        phone: /^1[3458]\d{9}$/,//手机
	        //regareanum : /^0\d{2,3}/,//区号
	        mail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i,//邮箱
	        qq: /^[1-9]\d{4,12}$/, //qq格式
	        num: /^[0-9]+.?[0-9]*$/
	    },
		defaultParam = {'facilitatorID':(getCookie('facilitatorID')||1),'companyUserID':(getCookie('companyUserID')||1)},
		navIndex = 0,
		// tableModel = null,
		href = document.location.href,
		$dialog = $('div.dialog');
	// 接口地址兼容
	function setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
    function getCookie(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    }
    function getQueryString(param) {
        if (href.indexOf('?') === -1 || href.indexOf(param + '=' ) === -1) {
            return '';
        }

        var queryString = href.substring(href.indexOf('?') + 1);
        if (queryString.indexOf('#') !== -1) {
            queryString = queryString.substring(0, queryString.indexOf('#'));
        }

        var parameters = queryString.split('&');

        var pos, paraName, paraValue;
        for (var i = 0; i < parameters.length; i++) {
            pos = parameters[i].indexOf('=');
            if (pos === -1) { continue; }

            paraName = parameters[i].substring(0, pos);
            paraValue = parameters[i].substring(pos + 1);

            if (paraName === param) {
                return paraValue.replace(/\+/g, ' ');
            }
        }
        return '';
    } 
	function domRender(){
		// 导航栏选中当前页面
		var nav = ['index','yuyuejiedai','weixiujiedai','weixiulingliao','chejianguanli','kufangguanli','kehuguanli','yonghuguanli','caiwuguanli','xitongguanli','gerenyuyue'];
		for(var i=0,len=nav.length; i<len; i++){
			if(href.indexOf(nav[i])>0){
				$('a','div.mainnav').removeClass('on').eq(i).addClass('on');
			}
		}
		// $('span','div.tab').removeClass('on').eq(0).addClass('on');
		// $('div.item','div.tabcon').removeClass('on').eq(0).addClass('on');
		// table
		// tableInit();
		// editInit();
	}

	
	function tableInit(tableObj, model){
		var t = function(){
			var id = tableObj.id || 'table',
				param = tableObj.param,
				modelParam = tableObj.id || 'model';
			var tableModel = avalon.define(modelParam,function(vm){
				vm.$id = id;
				vm.itemId = tableObj.itemId;
				vm.th= tableObj.th;
				vm.tr=[];
				vm.isOpt = tableObj.isOpt === false?false:true;
				vm.isCheck = tableObj.isCheck === true?true:false;
				vm.nodata= '<img src="img/loading.gif"/>';
				vm.pageClass = (tableObj.pageClass ||'pager');
				vm.getkey= function(index, key){
					// if(tableObj.th[index].isEdit){
					// 	// 如果是可编辑的加上可编辑标志
					// 	// $()
					// }
					if(href.indexOf('index.html')>-1 && key=='state'){
						return '<img src="img/status'+vm.tr[index][key]+'.png" />';
					}else{
						if(vm.tr.size()>0 && vm.tr[index]){
							// 如果是时间
							if(tableObj.th[index]&&tableObj.th[index].time){
								var t = vm.tr[index][key];
								return new Date(t).toLocaleDateString();
							}
							return vm.tr[index][key];
						}
					}
				};

				vm.getId= function(index,e){
					var self = vm;
					// 如果编辑是新打开页面，编辑加链接
					// 否则是弹窗，进行编辑
					// if(editDialog){
					// 	// t弹窗,用户管理、客户管理列表页面
					// 	var $dialog = $('div.dialog');
					// 	$('div.hd', $dialog).html(tit);
					// 	$dialog.show();
					// }else{
						// 连接
						if(self.tr.length>0 && self.tr[index]){
							// 编辑的连接
							// btntype: 编辑按钮事件类型，如果是0，则是连接，如果是1，则表示弹窗
							if(tableObj.btntype == 1){
								// $('div.dialog').dialog({
								// 	title: '编辑数据',
								// 	content: '',
								// 	button: [],
								// 	callback: function(){

								// 	}
								// });
							}else{
								var pageArr = href.split('/');
								var page = pageArr[pageArr.length-1].split('.html')[0]||'index';
								if(href.indexOf('caiwuguanli')>-1){
									var type = '';
									if($('span.on','div.tabs').html() == '应收账单'){
										type = 0;
									}else{
										type = 1;
									}
									return page + '-opt.html?id='+ (self.tr[index][self.itemId])+ '&type=' + type;
								}else{
									return page + '-opt.html?id='+ (self.tr[index][self.itemId]);
								}
								
							}
							
							
						}
					// }
					
				};
				// 分页变序号
				vm.getNum= function(curpage){
					var $tr = $('tr',$('table.Mtable')),
						$tdList = null;
					for(var i=0,len=$tr.length; i<len; i++){
						if($tr.eq(i).hasClass('loading')){
							continue;
						}
						$tdList = $('td', $tr.eq(i)).first();
						// if(vm.isCheck){
						// 	$tdList.html('<input type="checkbox" id="'+vm.tr[i][vm.mainId]+'" />');
						// 	$('td', $tr.eq(i)).last().hide();
						// }else{
							$tdList.html(parseInt($tdList.html())+(curpage-1)*10);
						// }
						
					}
				};
				// // 删除某条记录
				vm.delItem= function(index){
					var itemId = vm.tr[index][tableObj.itemId],
						delParam = {};
	                // model.items.remove(item);
	                $dialog.dialog({
						title: '窗口提示',
						content: '确定删除此条数据吗？',
						button:[{
							text: '确定',
							cls: 'btn-ok',
							handler: function($el){

								delParam[tableObj.itemId] = itemId;
								delParam = $.extend({},defaultParam,delParam);
								ajaxFn({
									url: tableObj.delport,
									obj: delParam,
									callback: function(json){
										if(json.code == 1){
											$el.dialog('hide');
											vm.getTr(tableObj.port, param, tableObj.callback );
										}
									}
								})
							}
						},{
							text: '取消',
							cls: 'btn-cancel',
							handler: function($el){
								$el.dialog('hide');
							}
						}],
						callback: function($el){
							$el.addClass('w400');
						}
					});
					
					
				};
				// 维修接待添加会单独生成一个id
				vm.addItem= function(){
					// 根据btntype判断是弹窗还是连接
					if(tableObj.btntype == 1){
						// 弹窗
						$('div.dialog').dialog('show');
						if(typeof tableObj.callback == 'function'){
							tableObj.callback();
						}
					}else {
						// 连接
						var pageArr = href.split('/'),
							page = pageArr[pageArr.length-1].split('.html')[0]||'index';
						if(href.indexOf('weixiujiedai')>-1){
							ajaxFn({
								url: tableObj.addport,
								obj: {},
								callback: function(json){
									if(json.code == 1){
										
										location.href = page + '-opt.html?id=' + json.data.mainId;
									}
								}
							});
						}else{
							location.href = page + '-opt.html';
						}
						
					}
				};
				vm.getTr = function(){
					getTr(tableObj.port, param, tableObj.callback );
				};
				vm.searchItem = function(){
					var $search = $('div.search');
					param[$('span.select',$search).attr('data-id')] = $('input.inpt-search',$search).val();
					vm.getTr(tableObj.port, param, tableObj.callback);
				};
				vm.saveItem = function(){
					if(typeof tableObj.callback == 'function'){
						tableObj.callback(vm);
					}
				}

			});
			
			avalon.scan();
			function getTr(url, param, callback){
				param = $.extend({},defaultParam, (param||{}));
				curpage = param.pageNum;
				param.pageSize = 10;

				// 
				ajaxFn({
					url: url,
					obj: param,
					callback: function(json){
						if(json.code ==1||json.ret==1){
							var jsondata = json.data || {},
								data = null,
								$loading = $('tr.loading',$('div[avalonctrl='+tableModel.$id+']'));
							// 先判断是data是数据么

							if(gettype.call(jsondata)=='[object Array]'){
								if(jsondata.length>0){
									data = jsondata;
								}else{
									tableModel.nodata = '暂无数据';
									$loading.show();
									return;
								}
								
							}else if(gettype.call(jsondata)=='[object Object]'){
								if(!json.data){
									tableModel.nodata = '暂无数据';
									$loading.show();
									return;
								}else if(!json.data.data){
									tableModel.nodata = '暂无数据';
									$loading.show();
									return;
								}else{
									data = jsondata.data || {};
								}
							}
							$loading.hide();

							// 预约接待列表需要获取维修单号
							if(href.indexOf('yuyuejiedai')>-1){
								for(var i=0, len=data.length, dataItem; i<len; i++){
									dataItem = data[i];
									if(dataItem.maintainform){
										data[i] = $.extend({},dataItem.maintainform || {},dataItem);
									}
								}
								
							}
							tableModel.tr = [];
							tableModel.tr = data||{};
							// 回调
							if(typeof callback == 'function'){
								callback(tableModel);
							}
							// 分页
							pageTotal = json.data['total']||'';
							if(!pageTotal || pageTotal==1){
								$('div.page').hide();
							}else{
								$('div.page').show();
								var total = pageTotal,
									$page = $('div.page');
								// var total = parseInt(pageTotal/param.pageSize)+(parseInt(pageTotal%param.pageSize)>0?1:0);
								$page.pager({
									pageNumber : curpage,
				            		pageTotal: total,
				            		change: function(pageIndex){
				            			param.pageNum = pageIndex;
				            			// 重新调用接口填充数据
				            			getData(url, param, function(){
											tableModel.getNum(pageIndex);
				            			});
				            			// model.curpage = pageIndex;
				            		}
								});
							}
							
						}
						
					}
				});
			}
			function getData(url, param,pageCall){
				getTr(url, param,pageCall);
			} 
		}

		// return t;
		t();
	}
		


	// 输入框初始化
	// 默认参数，id：edit添加模板的元素，data：{editItem:模板的数据，如果是编辑会有}
	//editurl: 获取编辑数据的接口，
	// saveurl：详情的接口
	// edittype: 返回数据data，1表示一条数组数据，0表示对象数据
	function editInit(id,param){
		var id = id || 'edit',
			self = edit,
			edit = null,
			newData = {},
			editParam = {status:0};
			if(href.indexOf('xitongguanli')>-1 || href.indexOf('caiwuguanli')>-1){
				editParam = {};
			}
			editParam[param.itemId] = getQueryString('id');
			edit = avalon.define({
			$id: id,
			item: param.editItem,
			newData: newData,//定义一个新的数据，当文本框内容改变时，修改此值，并用于提交
			isJump: false,
			getNewData: function(){
				// 加载时给未赋值的赋默认值
				var self = this,
					editItem = param.editItem,
					itemVal = '';
				for(var i=0,len=editItem.length,item; i<len; i++){
					item = editItem[i];
					itemVal = newData[item.id];
					// if(!newData[item.id]){

					// }
					// 如果是选择框

					if(item.selected || item.selected==0){
						itemVal = itemVal?itemVal:item.selected;
					}else if(item.dataType == 'time'){
						// 日期
						$('#'+item.id).datetimepicker({
							lang: 'zh',
				                i18n: {
				                    de: {
				                        months: TXT.MONTH,
				                        dayOfWeek: TXT.WEEK
				                    }
				                },
				            format: 'Y/m/d',
				            value: (itemVal?new Date(itemVal).toLocaleDateString() : new Date().toLocaleDateString()),
				            closeOnDateSelect: true,
						  	onShow:function( ct ){
						  		// var endTime = $endTime.val();
						   	// 	this.setOptions({
						    // 		maxDate:endTime?endTime:false
						   	// 	})
						  	},
						  	timepicker:false
						});
					}else{
						// 输入框
						itemVal = itemVal?itemVal:item.value;
					}
					
				}
			},
			change: function(e){
				//input\textarea的值
				
				if(e.target.getAttribute('data-id')==param.itemId){
					newData['mainId'] = e.target.value;
				}else{
					newData[e.target.getAttribute('data-id')] = e.target.value;
				}
				
				// newData[]
			},
			flag: true,
			blur: function(index, e){
				var self = edit,
					editItem = param.editItem,
					val = e.target.value,
					$el = $(e.target),
					$parent = $el.parent();
				// check输入类型
					var dataType = editItem[index].dataType,
						flag = true,
						errTxt = '';
					if(dataType){
						if(dataType == 'name'){
							if(!exps['name'].test(val)){
								errTxt = '请输入真实姓名';
								self.flag = false;
							}
						}else if(dataType == 'phone'){
							if(!exps['phone'].test(val)){
								errTxt = '请输入正确的手机格式';
								self.flag = false;
							}
							

						}else if(dataType == 'email'){
							if(!exps['email'].test(val)){
								errTxt = '请输入正确的邮箱格式';
								self.flag = false;
							}
						}else if(dataType == 'number'){
							if(!exps['num'].test(val)){
								errTxt = '请输入数字格式';
								self.flag = false;
							}
						}
						if(errTxt){
							if($('div.error', $parent).size()>0){
								$('div.error', $parent).show();
								return;
							}
							$parent.append('<div class="error">'+errTxt+'</div>');
						}else{
							$('div.error', $parent).hide();
							self.flag = true;
						}
					}
			},
			data: [],
			// 需要弹窗显示其选择内容
			dialogData: function(id){
				if(param.editItem[id].click){
					param.editItem[id].click(param.editItem[id].id, edit);
				}
			},
			// function(id, param){
			// 	if(!param){
			// 		return;
			// 	}
			// 	obj = $.extend({},defaultParam,param.param||{});
			// 	ajaxFn({
			// 		url: param.url,
			// 		obj: obj,
			// 		callback: function(json){
			// 			if(json.code == 1){
			// 				var html = [];
			// 				if(json.data){
			// 					var dd = json.data.data||{},
			// 						value = '';
			// 					// edit.data.push(dd);
			// 					for(var i=0,len=dd.length; i<len; i++){
			// 						value = dd[i][id];
			// 						html.push([
			// 							'<span class="label">',
			// 								'<input type="radio" value="'+value+'" />'+value/*+(dd[i].brandName||'')*/,
			// 							'</span>'
			// 						].join(''));
			// 					}
			// 					// $('input[data-id='+id+']').parent().after('<div class="tips">'+html.join('')+'</div>');
			// 					// avalon.scan();
			// 					$('div.dialog').dialog({
			// 						title: '修改窗口',
			// 						content: html.join(''),
			// 						button: [{
			// 							text: '确定',
			// 							cls: 'btn-ok',
			// 							handler: function($el){
			// 								var $input = $('.bd input', $el);
			// 								$('input[data-id='+id+']').val($('input:checked',$el).val());
			// 								newData[id] = $('input:checked',$el).val();
			// 								// $('input[data-id='+id+']').attr('data-id',$input.attr('checked').attr('id'));
			// 								$el.dialog('hide');
			// 							}
			// 						},{
			// 							text: '取消',
			// 							cls: 'btn-cancel',
			// 							handler: function($el){
			// 								$el.dialog('hide');
			// 							}
			// 						}],
			// 						callback: function($el){
			// 							$el.addClass('dialog-select');
			// 						}
			// 					});
			// 				}
			// 			}
			// 		}
			// 	});
			// },
			addItem: function(){
				var addport = (param.addurl||param.addport);
				// 获取当前所有输入框、选择框及文本框的值，传递接口请求报存
				if(addport){
					ajaxFn({
						url: addport,
						obj: defaultParam,
						callback: function(json){
							// 
							if(json.code == 1){
								var itemId = param.itemId,
								data = json.data || {};
								newData = {};
								newData[itemId]=(data[itemId]||'&nbsp;');

								for(var i=0,len=param.editItem.length; i<len; i++){
									param.editItem[i]['value'] = '';
								}
								param.editItem[itemId] = data[itemId];
								edit.item = param.editItem;
							}
						}
					});
				}else{
					for(var i=0, len=param.editItem.length; i<len; i++){
						param.editItem[i].value = '';
						newData[param.editItem[i].name] = '';
					}

					// edit.item = param.editItem;
				}
				
			},
			saveItem: function(){
				// 如果是首页、维修接待、车间管理时，需要修改id
				// console.log('hh');
				if(!edit.flag){
					return;
				}
				edit.modifyId();
				var editItem = param.editItem;
				if(href.indexOf('kehuguanli-opt')>-1){
					var partData = {};
					partData.id = getQueryString('id');
					partData.carOwner = newData.carOwner;
					partData.carNum = newData.carNum;
					partData.carType = newData.carType;
					newData = partData;
				}
				if(getQueryString('id')){
					newData[param.itemId] = getQueryString('id');
				}
				// 保存时循环下看是否有未有值

				for(var i=0,len=editItem.length; i<len; i++){
					if(!newData[editItem[i].value]){
						newData[editItem[i].id] = $('#'+editItem[i].id).val();
					}
				}
				// 如果是个人预约，默认状态为0
				if(href.indexOf('gerenyuyue')>-1){
					newData.status = 0;
				}
				
				ajaxFn({
					url: (param.saveurl||param.saveport),
					type: 'POST',
					obj: newData,
					callback: function(json){
						// 
						if(json.code == 1){
							$('div.dialog').dialog({
								title:'提示',
								content: json.message || '保存成功',
								button: [{text: '确定',cls: 'btn-ok',handler:function($el){
									$el.dialog('hide');
									if(href.indexOf('gerenyuyue')>-1){
										location.href = href;
									// }else if(!edit.isJump){
										// 如果保存不跳转 ，例如维修接待下面的单据信息

									}else{
										if(getQueryString('type')){
											location.href = (href.substring(0,href.indexOf('-opt'))||'index')+'.html?type='+getQueryString('type');
										}else{
											location.href = (href.substring(0,href.indexOf('-opt'))||'index')+'.html';
										}
									}
										
									
								}}],
								callback: function($el){
									$el.addClass('w400');
								}
							});
							
						}else{
							$('div.dialog').dialog({
								title:'提示',
								content: json.message || '保存失败',
								button: [{text: '确定',cls: 'btn-ok',handler:function($el){
									$el.dialog('hide');
								}}],
								callback: function($el){
									$el.addClass('w400');
								}
							})
						}
					}
				});

			},
			cancelItem: function(){
				for(i in newData){
					if(i=='maintainfortNum'){
						newData['mainId'] = newData[i];
						delete newData[i];
					}
				}
				ajaxFn({
					url: param.cancelport,
					type: 'POST',
					obj: newData,
					callback: function(json){
						// 
						if(json.code == 1){
							location.href = (href.substring(0,href.indexOf('-opt'))||'index')+'.html';
						}else{
							alert('取消失败');
						}
					}
				});
			},
			modifyId: function(){
				if(href.indexOf('index')>-1 || href.indexOf('weixiujiedai')>-1){
					if(newData.maintainfortNum){
						newData.mainId = newData.maintainfortNum;
					}
				}
				if(href.indexOf('chejianguanli')>-1){
					if(newData.appointmentNum){
						newData.maintainID = newData.appointmentNum;
					}
				}
			}
		});
			// 如果是编辑页，则需要获取接口data给newData并填充到页面
			if(getQueryString('id')){
				// 兼容接口用的id，非mainId,如预约接待
				if(param.id){
					// delete editParam.itemId;
					editParam[param.id] = getQueryString('id');
				}
				// 库房管理获取单条信息
				if(href.indexOf('kufangguanli')>-1){
					editParam = $.extend({},{pageNumber:1,pageSize:10},editParam);
				}
				
				ajaxFn({
					url: (param.editurl||param.editport),
					obj: editParam,
					callback: function(json){
						if(json.code == 1){
							var editItem = param.editItem,
								editItemKey = '',
								// data = json.data.data || {};
								data = json.data || {};//维修接待
							// 兼容返回的数据不同格式，如json.data,和json.data.data
							if(param.edittype){
								if(data.length>0){
									data = data[0]||{};
								}else{
									data = data.data[0]||{};//客户管理
								}
								
							}
							// 因预约接待的数据包含维修接待，故重组数据
							if(href.indexOf('yuyuejiedai')>-1){
								data = $.extend({},data.maintainform||{},data);
							}
							if(data){
								var items = edit.item,
									item = null;
								for(var i=0,len=editItem.length; i<len; i++){
									// 如果是添加时，获取数据为空，没有id，则获取href，将id赋值
									// 用于首页，维修接待
									item = items[i];
									editItemKey = editItem[i]['id'];

									if(href.indexOf('index')>-1|| href.indexOf('weixiujiedai')>-1){
										if(editItemKey == 'maintainfortNum'){
											editItemVal = getQueryString('id');
											item.value = editItemVal;
											newData['mainId'] = editItemVal;
											continue;

										}
									}
										

									
									editItemVal = data[editItemKey];
									item.value = editItemVal;
									newData[editItemKey] = editItemVal;
									if(editItem[i]['option']){
										edit.selected = editItemVal;
									}


								}
								if(typeof param.callback == 'function'){
									param.callback(data, edit);
								}
							}
							$('div.opt').removeClass('tc');
							
						}else{
							$('div.opt').html(json.message||'数据不存在').addClass('tc');
						}
					}
				});
			}else{
				var editParam = param.editItem;
				// 系统管理中，有select的选项的需在添加项目时设置option的值
				for(var i=0, len=editParam.length; i<len; i++){
					if(editParam[i].type == 1 && editParam[i].options.length<1){
						if(param.callback && typeof param.callback == 'function'){
							param.callback({},edit);
						}
					}
				}
			}

		
	

	}
	function ajaxFn(param){
		// param.obj.id = 1;
		if(!param){
			return;
		}
		if(param.obj && !param.obj.facilitatorID){
			param.obj.facilitatorID = getCookie('facilitatorID')||1;
		}
		if(param.obj&&!param.obj.companyUserID){
			param.obj.companyUserID = getCookie('companyUserID')||1;
		}
		// param.obj.facilitatorID = '2';
		var type = param.type || 'GET',
			port = OBJ.URL;

		
		if(param.url){
			
			$.ajax({
				url: port+param.url,
				type: type,
				data: param.obj,
				dataType: 'jsonp',
				success: function(json){
					if(json.code == 1 || json.ret==1){
						param.callback(json);
					}
					// if(typeof param.callback == 'function'){
						
					// }
					else{
						$('div.dialog').dialog({
							title:'提示',
							content: json.message || '请求数据失败',
							button: [{text: '确定',cls: 'btn-ok',handler:function($el){
								$el.dialog('hide');
							}}],
							callback: function($el){
								$el.addClass('w400');
							}
						});
						// $('.loading').html('暂无数据');
					}
				},
				error: function(){
					$('div.dialog').dialog({
						title:'提示',
						content: json.message || '请求数据失败',
						button: [{text: '确定',cls: 'btn-ok',handler:function($el){
							$el.dialog('hide');
						}}],
						callback: function($el){
							$el.addClass('w400');
						}
					});
					// $('.loading').html('暂无数据');
					// console.log('服务器错误');
				}
			})
		}
	}

	function bindEvent(){
		// 搜索分类点击弹出选择
		var $search = $('div.search'),
			$searchBox = $('div.select-box', $search);
		$search.on('click', 'span.select', function(){
			$searchBox.show();
		}).on('click', 'div.select-box a', function(){
			var val = $(this).text();
			$('span.select', $search).html(val).attr('data-id',$(this).attr('data-id'));
			$searchBox.hide();
		});
		// tab不切换
		var $tab = $('span', 'div.tabs'),
			$tabcon = $('div.item', 'div.tabcon');
		$tab.on('click', function(){
			var $this = $(this),
				index = $this.index();
			if($this.hasClass('on')){
				return;
			}else {
				$tab.removeClass('on').eq(index).addClass('on');
				$tabcon.removeClass('on').eq(index).addClass('on');
			}
		});
		// 个人用户与企业用户注册登录的选择
		$('input', 'div.user-type').on('click', function(){
			var $this = $(this),
				$reg = $('div.reg');
			// var index = $(this).index();
				$reg.removeClass('on');
			if($this.attr('data-type') == 'person'){
				$reg.eq(0).addClass('on');
			}else {
				$reg.eq(1).addClass('on');
			}
		});
		// // 搜索
		// $('a.btn-search').on('click', function(){

		// });
		// 关闭按钮
		$('div.dialog,div.winpop').on('click', 'a.close', function(){
			$('div.dialog,div.winpop,div.mask').hide();
		})
		.on('click', 'a.btn-cancel', function(){
			$('div.dialog,div.winpop,div.mask').hide();
		}) ;

	}
	// 搜索
	function search(url, obj, callback){
		$('div.search').on('click','a.btn-search', function(url, obj, callback){
			ajaxFn({
				url: url,
				obj: obj,
				callback: callback
			})
		});
	}
	/**
	obj={
		table: 1,//添加table模板
		edit: 1, //添加编辑的模板
		total: 1 //添加总计的模板
	}
	*/ 
	function addTpl(obj){
		var tpl1 = [],
			tpl2 = [],
			tpl3 = [],
			tdHtml = [],
			$body = $('body');

		
		
		
		if(obj.table && $('#tpl').size()<1){
			
			// if(obj.th){
			// 	for(var i in obj.th){
			// 		if(i == 'id'){
			// 			tdHtml.push('<td>{{$index+1}}</td>');
			// 		}else if(i == 'opt'){
			// 			tdHtml.push('<td><a target="_blank" href="javascript:;"/></a></td>');
			// 		}
			// 		// if(i == 'status'){
			// 		// 	tdHtml.push('<td>{{el.'+i+'}}</td>');
			// 		// }
			// 		else{
			// 			tdHtml.push('<td>{{el.'+i+'}}</td>');
			// 		}
					
			// 	}
				
				
			// 	tdHtml = tdHtml.join('');
			// }else{
			// 	tdHtml = ['<td>{{el}}</td>'];
			// }
			tpl1.push([
				'<script type="avalon" id="tpl">',
					'<table class="Mtable">',
						'<thead>',
							'<tr>',
								'<th width="40">序号</th>',
								'<th ms-repeat="th" ms-attr-width="el.width">{{el.name}}</th>',
								// '<th ms-visible="isOpt?true:false">{{$val}}</th>',
								'<th ms-if-loop="isOpt" width="100">操作</th>',
							'</tr>',
						'</thead>',
						'<tbody>',
							'<tr class="loading">',
								'<td colspan="30" style="height:150px;padding-top:50px;text-align:center" ms-html="nodata"></td>',
							'</tr>',
							'<tr ms-repeat="tr">',
								'<td ms-if-loop="isCheck" align="center"><input type="checkbox" ms-attr-value="el.id" ms-attr-id="el.id" /></td>',
								'<td ms-if-loop="!isCheck" align="center">{{$index+1}}</td>',
								'<td ms-repeat="th" ms-data-id="$index==0?getId($index):0" ms-attr-id="el.id"  ms-html="getkey($outer.$index,el.id)"></td>',
								// '<td ms-repeat="th" ms-data-id="el.id" ms-html="getkey($outer.$index,el.id)"></td>',
								// '<td ms-repeat="th" ms-data-id="el.id" ms-if-loop="el.time?changeTime:getkey($outer.$index,el.id)"></td>',
								'<td align="center" ms-if-loop="isOpt"><a class="edit-item" ms-href="getId($index)" ms-attr-id="el.id" >编辑</a><a href="javascript:;" ms-click="delItem($index)" class="delete-item"> 删除</a></td>',
							'</tr>',
						'</tbody>',
					'</table>',
				'</script>'
			].join(''));
			$body.append(tpl1);
		}
		if(obj.edit && $('#edittpl').size()<1){
			tpl2.push([
				'<script type="avalon" id="edittpl">',
					'<div class="item" ms-class="allrow:el.type == 2" ms-repeat="item" >',
					'<label><span class="fred"  ms-if-loop="el.ismust">* </span>{{el.name}}：</label> ',
					// 如果type：0显示的是输入框
					'<span  ms-if="!el.type || el.type == 0"><input type="text" class="inpt" ms-attr-readonly="el.click" ms-attr-id="el.id" ms-data-id="el.id" ms-attr-value="el.value" ms-on-input="change" ms-blur="blur($index, $event)" ms-click="dialogData($index)"  /></span>',
					// 如果type：1显示的是选择框
					'<span ms-class="select-outer"  ms-if="el.type == 1" ms-attr-id="el.name" ms-attr-value="el.value">',
						'<select class="select" ms-duplex="el.selected" ms-data-id="el.id" ms-attr-id="el.id"  ms-change="change">',
							'<option ms-repeat="el.options" ms-attr-value="el.value" >{{el.text}}</option>',
							// '<option ms-repeat="getOption(el.id)" ms-attr-value="el" >{{el}}</option>',
						'</select>',
					'</span>',
					// 如果type：2显示的是文本输入框
					'<span ms-if="el.type == 2"><textarea  ms-on-input="change" ms-attr-data-id="el.id" ms-attr-value="el.value" class="remark"></textarea></div>',
					'</span>',
				'</script>'
			].join(''));
			$body.append(tpl2);
		}
		if(obj.total && $('#totaltpl').size()<1){
			tpl3.push([
				'<script type="avalon" id="totaltpl">',
					'<div class="item" ms-repeat="item">',
						'<label>{{el.name}}：</label> {{el.val}}',
					'</div>',
				'</script>'
			].join(''));
			$body.append(tpl3);
		}
	}


	// 进度管理
	var $process = $('div.process');
	function getProcess(param){
		var $step = null;
		ajaxFn({
			url: 'progressionBar.do',
			obj: {mainId: getQueryString('id')},
			callback: function(json){
				if(json.code==1){
					var data = json.data||{};
					$('p', $process).removeClass('on over');
					if(!json.data){
						
						return;
					}
					for(var i=1,len=$('p', $process).length; i<len; i++){
						// 如果不是当前状态且小于当前状态加class over
						// 如果是当前状态加class on
						$step = $('p.step'+i, $process);

						if(data.processNum == $step.attr('data-id')){
							$step.addClass('on');
							return;
						}else{
							$step.addClass('over');
						}
						// 根据时间计算如果到达某段时间的下一个流程自动提交
					}
				}
			}
		});	
	}

	function changeProcess(index){
		var param = {
			mainId: getQueryString('id'),
			processNum: index
		};
		COMMON.ajaxFn({
			url: 'progressionBarSaveOrUpdate.do',
			obj: param,
			callback: function(json){
				var txt = '';
				if(json.code == 1){
					txt = '修改成功';

				}else{
					txt = '修改失败';
				}
				$dialog.dialog({
					title: '确认提示',
					content: txt,
					button:[{
						text: '确认',
						cls: 'btn-ok',
						handler: function(){
							$dialog.dialog('hide');
						}
					}],
					callback: function($el){
						// 如果修改成功，则修改当前状态
						if(txt == '修改成功'){
							$('p',$process).removeClass('on over');
							for(var i=0,len=$('p',$process).length; i<len; i++){
								if(i<index){
									// $('p', $process).removeClass('on');
									$('p.step'+i, $process).addClass('over');
								}
							}
							$('p.step'+index, $process).addClass('on');
						}
						setTimeout(function(){
							$el.dialog('hide');
						}, 2000);
					}
				});
			}
		});
	}
	// 点击图标修改当前状态，需询问是否修改
	$process.on('click','p', function(){
		var $this = $(this),
			index = $this.index() + 1,
			$dialog = $('div.dialog');
		// if($this.hasClass('over') || $this.hasClass('on')){
		// 	return;
		// }else{
			// 将状态号赋给确定按钮

			// 弹窗提示是否确认修改
			$dialog.dialog({
				title: '确认修改流程',
				content: '确定要修改到当前状态吗？',
				button: [{
					text: '确定', cls:'btn-ok', handler: function($el){
						var index = $el.attr('data-id');
						changeProcess(index);
					}},{
					text: '取消', cls:'btn-cancel', handler: function($el){
						$el.dialog('hide');
					}
				}],
				callback: function(){
					var $dialog = $('div.dialog');
					$dialog.addClass('auto');
					$dialog.attr('data-id', index);
				}
			})
		// }
	});
	return {
		init: function(){
			domRender();
			bindEvent();
		},
		OBJ: OBJ,
		OPT: OPT,
		table: tableInit,

		edit: editInit,
		addTpl: addTpl,

		ajaxFn: ajaxFn,
		search: search,
		getQuery: getQueryString,
		gettype: gettype,

		getCookie: getCookie,
		setCookie: setCookie,

		getProcess: getProcess, //流程进度

		defaultParam: defaultParam,

	}
})();
$(function(){
	COMMON.init();
});