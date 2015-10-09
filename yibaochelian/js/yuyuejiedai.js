/**
* @desc 	首页的逻辑代码
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/

$(function(){
	var id = COMMON.getQuery('id'),
		OPT = COMMON.OPT,
		colorOpt = OPT.colorOpt,
		oilOpt = OPT.oilOpt,
		classOpt = OPT.classOpt,
		statusOpt = OPT.statusOpt,
		$winpop = $('div.winpop'),
		$dialog = $('div.dialog'),
		th = [{
			id: 'appointmentNum', name: '预约编号'},{
			id: 'maintainfortNum', name: '维修单号'},{
			id: 'truename', name: '真实姓名'},{
			id: 'platenumber', name: '车牌号'},{
			id: 'phone', name: '电话'},{
			id: 'maintaintype', name: '类别'},{
			id: 'status', name: '状态'
		}],
		thYuyue = [{
			id: 'itemId',name: '推荐项目id', width: 80},{
			id: 'itemName',name: '推荐项目名称', width: ''},{
			id: 'workType',name: '工种', width: ''},{
			id: 'faultCode',name: '错误代码', width: ''},{
			id: 'standardWorkTime',name: '标准工时', width: ''},{
			id: 'standardUnitPrice',name: '标准单价', width: ''},{
			id: 'coastWorkTime',name: '工时花费'
		}],
		thPeijian = [{
			id: 'productID',name:'商品编码'},{
			id: 'productname',name:'商品名称'},{
			id: 'unit',name:'单位'},{
			id: 'productnum',name:'数量',isEdit:true},{
			id: 'unitprice',name:'单价',isEdit:true},{
			id: 'teams',name:'领料班组',isEdit:true},{
			id: 'maintenanceMan',name:'领料人',isEdit:true
		}],
		thxmll = [{
			id: 'productID', name: '商品编号'},{
			id: 'productname', name: '商品名称'},{
			id: 'origin', name: '产地'},{
			id: 'type', name: '分类'},{
			id: 'carModle', name: ' 车型'},{
			id: 'lastdeliveryDate', name: '最近出货时间'},{
			id: 'lastpurchaseDate', name: ' 最近进货时间'},{
			id: 'account', name: '商品可售数量'},{
			id: 'unit', name: '单位（升，个）'},{
			id: 'safeaccount', name: '安全数量'},{
			id: 'suggestBuyprice', name: '建议购买价格'},{
			id: 'suggestSaleprice', name: ' 建议销售价格'},{
			id: 'repertory', name: '仓库名称'
		}],
		primaryId = '',
		$dialog = $('div.dialog'),
		// 列表页请求数据
		tableObj = {
			id: 'table',
			port: 'appointmentList.do',
			delport: 'appointmentDelete.do',
			itemId: 'appointmentNum',
			th: th,
			param: {pageNum:1,status:0}
		},
		// 操作页编辑数据
		editObj = {
			itemId: 'appointmentNum',
			id: 'appId',
			// addurl: 'maintainformInput.do',
			editurl: 'appointmentDetail.do',
			saveurl: 'appointmentSaveOrUpdate.do',
			editItem: [{
				id: 'appointmentNum',name: '预约单号',value:''},{
				id: 'truename', name: '真实姓名',value:''},{
				id: 'platenumber', name: '车牌号',value:''},{
				// id: 'maintainfortNum', name: '维修单号', value: ''},{
				id: 'phone', name: '电话',value:'',dataType:'phone'},{
				id: 'maintaintype', name: '类别',value:'',type:1,selected:'保养',options:classOpt},{
				id: 'status', name: '状态',value:'',type:1,selected:'0',options:statusOpt},{
				id: 'oil', name: '油耗', value: '',type:1,selected:'0',options:oilOpt},{
				id: 'usedComponents', name: '备注',value:'',type: 2
			}],
			callback: function(data){
				$('span.fred', 'div.opt-tit').html(statusOpt[data.status]['text']);
				
			}
		},
		// mainId = COMMON.getQuery('id'),
		// 操作页下面的预约项目
		yuyuexiangmu = {
			id: 'yuyuexiangmu',
			port: 'serviceItemList.do',
			addport: 'serviceItemInput.do',
			saveport: 'serviceItemDoSave.do',
			// itemId: 'mainId',
			th: thYuyue,
			thadd: thYuyue,
			btntype: 1,
			param: {pageNum:1}
		},
		// 操作页下面的预约配件
		yuyuepeijian = {
			id: 'yuyuepeijian',
			port: 'usedCompontList.do',
			addport: 'usedCompontInput.do',
			saveport: 'usedCompentDoSave.do',
			isOpt: false,
			btntype: 1,
			// itemId: 'itemId',
			th: thPeijian,
			thadd: thxmll,
			param: {pageNum:1}
		};
	// 根据连接判断是列表页还是操作页
	var isOpt = document.location.href.indexOf('opt.html')>-1;
	if(!isOpt){
		// 列表页
		COMMON.addTpl({table:1,th:th});
		COMMON.table(tableObj);

	}else{
		// 如果是操作页
		COMMON.addTpl({edit:1});
		COMMON.addTpl({table:1,th:th});
		COMMON.edit('edit',editObj);
		// 弹窗左侧树
		var treeObj = {
			port:'usedCompontInput.do',
			obj:COMMON.defaultParam,
			isFold: false
		}
		TREE.tree($('div.tree'),treeObj);
		// 下面的两个列表
		var childArr = [yuyuexiangmu,yuyuepeijian];
		child = avalon.define('grid', function(vm){
			vm.tab= ['预约项目','预约配件'];
			vm.curIndex= 0;
			vm.th=[];
			vm.tr=[];
			vm.item= [];
			vm.newData=[];			
			vm.isCheck = vm['curIndex'].isCheck === true?true:false;
			vm.nodata= '<img src="img/loading.gif"/>';
			vm.isOpt = true;
			vm.changeIndex= function(i, curpage){
				vm.curIndex = i;
				// 并获取数据填充
				var curChild = childArr[i],
				param = {mainId: COMMON.getQuery('id')};
				// vm.th = curChild.th;
				
				vm.th.removeAll();
				vm.th.pushArray(curChild.th);

				// child.tr = [{itemName:11},{itemName:22}];
				COMMON.ajaxFn({
					url: curChild.port,
					obj: param,
					callback: function(json){
						if(json.code == 1){
							// 先情况tr数据
							var data = null;
							vm.tr = [];
							// 当前的location加类型

							if(!json.data){
								vm.nodata = '暂无数据';
								$('tr.loading').show();
							}else{
								if(vm.curIndex == 3 && data.recommendItem){
									// 费用合计，需要从子对象中获取套餐pageNum
									data.pageName = data.recommendItem.pageName;
								}
								if(!data.data){
									vm.nodata = '暂无数据';
									$('tr.loading').show();
								}else{
									data = data.data||{};
									if(!(data instanceof Array)){
										var arr = [];
										arr.push(data);
										vm.tr = arr;
									}else{
										vm.tr = data||[];
									}
									if(vm.curIndex == 0){
										// 角色没有删除
										// $('table',$dialog).css('width','1200px');
										for(var i=0,len=$('tr','table tbody').length;i<len;i++){
											$('tr','table tbody').eq(i).find('a').last().hide();
										}
									}
									$('tr.loading').hide();
								}
									
								

								// 分页
								var pageTotal = json.data['total']||'';
								if(pageTotal){
									$('div.page').pager({
										pageNumber : curpage,
					            		pageTotal: pageTotal,
					            		change: function(pageIndex){
					            			curChild.pageNum = pageIndex;
					            			// 重新调用接口填充数据
					            			vm.changeIndex(i);
					            			// model.curpage = pageIndex;
					            		}
									});
								}

							}
							
						}else{

						}
						
					}
				});
				
			};

			vm.getkey = function(index, key){
				var self = child;
				if(self.tr.size()>0 && child.tr[index]){
					var text = child.tr[index][key],
						th = childArr[self.curIndex].th,
						t = null,
						thItem = null;
					// // 如果是时间，改为时间格式
					for(var i=0,len=th.length; i<len; i++){
						thItem = th[i];
						if(thItem.id == key){
							if(thItem.dataType == 'time'){
								t = self.tr[index][key]||new Date();
								return new Date(t).toLocaleDateString();
							}
							
						}
					}
					return self.tr[index][key];
				}
				
			};

			vm.getId = function(index,tit){
				var self = child;
					// 连接
				if(self.tr.size()>0 && self.tr[index]){
					// 当前内容框修改
					return 'javascript:;';
				}
			};
			vm.addItem = function(){
				$('div.bd',$winpop).hide();
				$('div.add-item', $winpop).show();
				$winpop.dialog('show');
				editDialog(child.curIndex);
				// treeLink(model,name)
				$('#tree').on('click','a', function(){
					// 根据tree显示的文字，既itemName查询
					editDialog(child.curIndex,{itemName:$(this).html()});
				});
			};
			vm.delItem= function(index){
				var curChild = childArr[vm.curIndex],
					itemId = vm.tr[index][curChild.itemId],
					delParam = {};
                // model.items.remove(item);
                $dialog.dialog({
					title: '窗口提示',
					content: '确定删除此条数据吗？',
					button:[{
						text: '确定',
						cls: 'btn-ok',
						handler: function($el){
							delParam[curChild.itemId] = itemId;
							delParam = $.extend({},defaultParam,delParam);
							COMMON.ajaxFn({
								url: curChild.delport,
								obj: delParam,
								callback: function(json){
									if(json.code == 1){
										$el.dialog('hide');
										vm.changeIndex(vm.curIndex);
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
		});
		// 下面预约项目等的列表
		var table_list = avalon.define('table_list', function(vm){
			vm.th = [];
			vm.tr = [];
			vm.search = {itemId: '',itemName: ''};
			vm.isOpt = false;
			vm.isCheck = true;
			vm.nodata= '<img src="img/loading.gif"/>';
			vm.getkey = function(index, key){
				var self = table_list;
				if(self.tr.size()>0 && self.tr[index]){
					return self.tr[index][key];
				}
				
			};
			vm.getId = function(index,tit){
				var self = child;
					// 连接
				if(self.tr.size()>0 && self.tr[index]){
					return 'javascript:;';
				}
			};
			vm._thInit = function($index){
				var self = this;
				return 'width:'+self.th.width;
			};
			vm.saveItem = function(){
				var productIds = [],
					$input = $('input:checkbox',$winpop),
					itemId = null,
					curIndex = child.curIndex,
					port = childArr[curIndex].saveport;
				for(var i=0,len=$input.length; i<len; i++){
					itemId = $input.eq(i).parent().next('td').text();
					if($input.eq(i).attr('checked')){
						productIds.push(itemId);
					}
				}
				COMMON.ajaxFn({
					url: port,
					obj: {mainId: id, itemIds:(productIds.join(';')) },
					callback: function(json){
						$winpop.dialog('hide');
						child.changeIndex(curIndex);
					}
				})
			};
			vm.searchFn = function(){
				// 获取输入框的值
				var param = {
					itemId: $('#itemId').val()||'',
					itemName: $('#itemName').val()||''
				};
				editDialog(child.curIndex, param);
			};
		});
		avalon.scan();
		child.changeIndex(0);
		// 保存配件
		// $('a#btn-lingliao').on('click', function(){
		// 	var $items = $('input:checkbox', $('div.winpop')),
		// 	productId = '',
		// 	product = '';
		// 	for(var i=0,len = $items.length; i<len; i++){
		// 		product = $items.eq(i).parent().next().attr('data-id');
		// 		if(productId == ''){
		// 			productId = product;
		// 		}else{
		// 			productId = productId+';' + product;
		// 		}
				
		// 	}
		// 	COMMON.ajaxFn({
		// 		url: 'usedCompontInput.do',
		// 		obj: {
		// 			mainId: COMMON.getQuery('id'),
		// 			productID: productId
		// 		},
		// 		callback: function(json){
		// 			if(json.code == 1 ){
		// 				$('div.winpop').hide();
		// 				$('.dialog-tips').dialog({
		// 					title: '提示',
		// 					content: '保存成功',
		// 					button: [{text: '确定',cls:'btn-ok',handler: function($el){
		// 						$el.dialog('hide');
		// 					}}],
		// 					callback: function($el){
		// 						$el.addClass('w400');
		// 					}
		// 				})
		// 			}
		// 		}
		// 	})
		// });
		function editDialog(curIndex, param){
			var param = $.extend({},{mainId: COMMON.getQuery('id')},param||{}),
				curObj = childArr[curIndex];
			table_list.th = curObj.thadd;
			table_list.tr = [];
			param = param || {};
			COMMON.ajaxFn({
				url: curObj.addport,
				obj: param,
				callback: function(json){
					var jsondata = json.data || {},
						data = jsondata.data || {},
						$loading = $('tr.loading',$('div[avalonctrl=table_list]'));//项目维修；json.data.data
					// $dialog.attr('data-id', );
					// table_list.th = th;
					if(data && data.length>0){
						table_list.tr = data;
						// 项目领料的内容过长，需要加宽度
						if(curIndex == 1){
							$('.Mtable','div.add-item').css('width','1200px');
						}
						$loading.hide();
					}else{
						table_list.nodata = '暂无数据';
						$loading.show();
					}
				}
			});
		}
	}
	function showDialog(){
		$('div.dialog').show();
	}

	// function showPeijian(model){
	// 	$('div.dialog').dialog({
	// 		title: '预约配件',
	// 		content: '',
	// 		button: [{
	// 			text: '确定',
	// 			cls: 'btn-ok',
	// 			handler: function($el){
	// 				// 保存选中的内容

	// 			}
	// 		},{
	// 			text: '取消',
	// 			cls: 'btn-cancel',
	// 			handler: function($el){
	// 				$el.dialog('hide');
	// 			}
	// 		}]
	// 	});
	// }
	// function getPeijian(){
	// 	COMMON.ajaxFn({
	// 		url: yuyuepeijian.port,
	// 		obj: {},
	// 		callback: function(json){
	// 			if(json.code == 1){
	// 				return (json.data||'');
	// 			}
	// 		}
	// 	});
	// }
	
});