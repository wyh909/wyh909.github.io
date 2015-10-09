/**
* @desc 	维修领料的逻辑代码
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
$(function(){
	var isOpt = document.location.href.indexOf('opt.html')>-1,
	defaultParam = COMMON.defaultParam,
	curpage = 1,
	teamsOpt = [],
	teamsSeleted = '钣金1组',
	th = [{
		id: 'maintainfortNum', name:'维修单号'},{
		id: 'truename', name:'真实姓名'},{
		id: 'platenumber', name: '车牌号'},{
		id: 'phone', name:'电话'},{
		id: 'maintaintype', name:'类别'},{
		id: 'status', name:'状态'
	}],
	weilingliao = {
		itemId: 'maintainfortNum',
		port: 'maintainformList.do',
		addport: 'usedCompontInput.do',
		saveport: 'usedCompentDoSave.do',
		// itemId: 'productID',
		th: th,
		isOpt: true,
		param: {pageNum:1,isMaterial:0}
	},
	yilingliao = {
		itemId: 'maintainfortNum',
		port: 'maintainformList.do',
		addport: 'usedCompontInput.do',
		saveport: 'usedCompentDoSave.do',
		// itemId: 'productID',
		th: th,
		isOpt: true,
		param: {pageNum:1,isMaterial:1}
	},
	// 操作页编辑数据
	editObj = {
		itemId: 'appointmentNum',
		id: 'appId',
		// addurl: 'maintainformInput.do',
		editurl: 'listMaterialByPage.do',
		saveurl: 'materialSaveOrUpdate.do',
		editItem: [{
			id: 'orderNum',name:'单号', value: ''},{
			id: 'auditDate',name:'开单日期', value: '',dataType: 'time'},{
			id: 'maintainforNum',name:'维修单号', value: ''},{
			id: 'carOwner',name:'客户姓名', value: ''},{
			id: 'auditor',name:'开单员', value: ''},{
			id: 'identityNum',name:'识别号' },{
			id: 'platenumber',name:'车牌号', value: '',dataType:'plate'},{
			id: 'teams',name:'班组', value: '',type: 1, selected: teamsSeleted,options: teamsOpt},{
			id: 'employee',name:'领料员', value: ''},{
			id: 'depotManager',name:'仓管员', value: ''},{
			id: 'priseScheme',name:'售价方案', value: ''},{
			id: 'note',name:'备注', value: ''


		}]
	},
	lingliaoObj = {
		id: 'table',
		port: 'usedCompontList.do',
		addport: 'usedCompontInput.do',
		saveport: 'usedCompentDoSave.do',
		// itemId: 'productID',
		th: th,
		param: {pageNum:1,status:0}
	};

	// 班组数据、
	COMMON.ajaxFn({
		url: 'listTeams.do',
		obj: {},
		callback: function(json){
			if(json.code == 1){
				var data = json.data || [];
				for(var i=0,len=data.length; i<len; i++){
					teamsOpt.push({
						text: data[i],
						value: data[i]
					});
				}
				teamsSeleted = data[0];
			}
		}
	});
	setTimeout(function(){
		COMMON.addTpl({table:1,th:th});
		if(!isOpt){
			var childArr = [weilingliao,yilingliao],
				child = avalon.define('grid', function(vm){
				vm.tab= ['未领料','已领料'];
				vm.curIndex= 0;
				vm.th=[];
				vm.tr=[];
				vm.item= [];
				vm.nodata = '<img src="img/loading.gif"/>';
				vm.isCheck = (childArr[vm.curIndex].isCheck||false);
				vm.isOpt = (childArr[vm.curIndex].isOpt||false);
				vm.changeIndex= function(i,curpage){
					vm.curIndex = i;
					
					// 并获取数据填充
					var curChild = childArr[i];
					vm.th = curChild.th;
						// child.tr = [{itemName:11},{itemName:22}];
					param = $.extend({},defaultParam,curChild.param);
					param.pageNum = curpage||1;
					param.pageSize = 10;
					COMMON.ajaxFn({
						url: curChild.port,
						obj: param,
						callback: function(json){
							if(json.code == 1||json.ret == 1){
								// 先情况tr数据
								var data = json.data.data || [];
								vm.tr = [];
								if(!json.data){
									$('tr.loading td').html('暂无数据');
								}else{
									if(!(data instanceof Array)){
										var arr = [];
										arr.push(data);
										vm.tr = arr;
									}else{
										vm.tr = data||[];
									}
									
									$('tr.loading','div.tabitem').hide();

									
									// 没有删除功能
									$('a.delete-item').hide();
			
									// 分页
									var $page = $('div.page_'+vm.curIndex),
										pageTotal = json.data['total']||'';
										if(!pageTotal || pageTotal==1){
											$page.hide();
										}else{
											$page.show();
											var total = pageTotal;
											// var total = parseInt(pageTotal/param.pageSize)+(parseInt(pageTotal%param.pageSize)>0?1:0);
											$page.pager({
												pageNumber : curpage,
							            		pageTotal: total,
							            		change: function(pageIndex){
							            			curChild.param.pageNum = pageIndex;
							            			// 重新调用接口填充数据
							            			vm.changeIndex(vm.curIndex, pageIndex);
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
				vm.getkey= function(index, key){
					var self = child;
					if(child.tr.size()>0 && child.tr[index]){
						return child.tr[index][key];
					}
				};
				vm.getId= function(index,tit){
					var self = child,
						orderType = '',
						curTr = self.tr[index],
						childItem = childArr[index];
					if(vm.curIndex ==1){
						orderType = '&type=0';
					}else if (vm.curIndex == 2){
						orderType = '&type=1';
					}
						// 连接
					if(self.tr.size()>0 && self.tr[index]){
						return 'weixiulingliao-opt.html?id='+(curTr.appointmentNum||'') + '&carOwner=' + (curTr.truename||'') + '&platenumber=' + (curTr.platenumber||'') + orderType;
					}

				};
				vm.addItem = function(){
					location.href = 'kufangguanli-opt.html';
				};
				vm.editItem = function(){

				};
				vm.saveItem= function(){
					$dialog.dialog('show');
					editDialog(child.curIndex);
					// treeLink(model,name)
					$('#tree').on('click','a', function(){
						// 根据tree显示的文字，既itemName查询
						editDialog(child.curIndex,{itemName:$(this).html()});
					});
				};
				vm.delItem = function(index){
					var curChild = childArr[vm.curIndex],
						id = vm.tr[index][curChild.itemId];
					$('div.dialog').dialog({
						title: '窗口提示',
						content: '确定删除此条数据吗',
						button: [{
							text: '确定',
							cls: 'btn-ok',
							handler: function($el){
								COMMON.ajaxFn({
									url: curChild.delport,
									obj: {id: id},
									callback: function(json){
										if(json.code == 1||json.ret==1){
											$el.dialog('hide');
											vm.changeIndex(vm.curIndex);
										}
									}
								})
							}
						},{
							text: '取消',
							cls: 'btn-cancal',
							handler: function($el){
								$el.dialog('hide');
							}
						}],
						callback: function($el){
							$el.addClass('w400');
						}
					});
					
				}
			});
			avalon.scan();
			child.changeIndex(0);
		}else{
			COMMON.addTpl({table:1,th:th});
			COMMON.addTpl({edit:1});
			COMMON.edit('edit',editObj);
			COMMON.table(lingliaoObj);
		}
	},100);
		
		
	
});