/**
* @desc 	财务管理的逻辑代码
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
$(function(){
	var athAll = [{
			id: 'supplierId', name: '供应商编号'},{
			id: 'supplierName', name: '供应商名称'},{
			id: 'amount', name: '总金额'},{
			id: 'amountPaid', name: '已付金额'},{
			id: 'unpaidAmount', name: '未付金额'},{
			id: 'unpaidAmount', name: '超额'
		}],
		athSingle = [{
			id: 'amount', name: '总金额'},{
			id: 'amountPaid	', name: '已付金额'},{
			id: 'unpaidAmount', name: '未付金额'},{
			id: 'accountPayableNum', name: '单号'},{
			id: 'type', name: '业务类型'

		}],
		cthAll = [{
			id: 'useId', name: '用户编号'},{
			id: 'useName', name: '用户名称'},{
			id: 'amount', name: '发生额'},{
			id: 'amountReceived', name: '收款额'},{
			id: 'outstandingAmount', name: '余额'},{
			id: 'outstandingAmount', name: '超额'
		}],
		cthSingle = [{
			id: 'startDate', name: '开单日期'},{
			id: 'amount', name: '发生额'},{
			id: 'amountReceived', name: '收款额'},{
			id: 'outstandingAmount', name: '余额'},{
			id: 'collectionNum', name: '单号'},{
			id: 'type', name: '业务类型'
		}],
		ctotal = [{
			id: 'amount', name: '应收总额'},{
			id: 'amountReceived', name: '已收总额'},{
			id: 'thisCollection', name: '本次合计'},{
			id: 'thisCollection', name: '实际收款'},{
			id: 'reviewer', name: '审核人'},{
			id: 'startDate', name: '审核日期'
		}],
		atotal = [{
			id: 'amount', name: '应付总额'},{
			id: 'amountPaid', name: '已付金额'},{
			id: 'thisPayment', name: '本次合计'},{
			id: 'thisPayment', name: '实际付款'},{
			id: 'reviewer', name: '审核人'},{
			id: 'startDate', name: '审核日期'
		}],
		// yuyueTh = {

		// },
		defaultParam = {pageNumber:1,pageSize: 10},
		accountAllObj = {
			id: 'paytableall',
			port: 'listAccountByPage.do',
			itemId: 'id',
			th: athAll,
			isOpt: false,
			param: defaultParam,
			callback: function(vm){
				accountObj.param = $.extend({},defaultParam,{supplierId: vm.tr[0].id});
				COMMON.table(accountObj);
			}
		},
		accountObj = {
			id: 'paytablesingle',
			port: 'listAccountByPage.do',
			delport: 'deleteAccount.do',
			itemId: 'id',
			th: athSingle,
			isOpt: true,
			param: defaultParam,
			callback: function(vm){
				bindEvent(vm, accountObj.port);

				// $('div.fleft .manage-list').on('click', 'tr td:nth-child(2)', function(e){
				// 	var a = $(e.target).text();
				// 	accountObj.param.userId = a;
				// 	COMMON.ajaxFn({
				// 		url: accountObj.port,
				// 		obj: accountObj.param,
				// 		callback: function(json){
				// 			if(json.code == 1){
				// 				vm.tr = json.data.data||[];
				// 			}
				// 		}
				// 	});
				// });
			}
		},
		payAllObj = {
			id: 'tableall',
			port: 'listCollectionByPage.do',
			itemId: 'id',
			th: cthAll,
			isOpt: false,
			param: defaultParam,
			callback: function(vm){
				accountObj.param = $.extend({},defaultParam,{userId: vm.tr[0].id});
				COMMON.table(payObj);

			}
		},
		payObj = {
			id: 'tablesingle',
			port: 'listCollectionByPage.do',
			delport: 'deleteCollection.do',
			itemId: 'id',
			th: cthSingle,
			isOpt: true,
			param: defaultParam,
			callback: function(vm){
				bindEvent(vm, payObj.port);
				// $('div.fleft .manage-list').on('click', 'tr td:nth-child(2)', function(e){
				// 	var a = $(e.target).text();
				// 	payObj.param.userId = a;
				// 	COMMON.ajaxFn({
				// 		url: payObj.port,
				// 		obj: payObj.param,
				// 		callback: function(json){
				// 			if(json.code == 1){
				// 				vm.tr = json.data.data||[];
				// 			}
				// 		}
				// 	});
				// });
			}
		},
		ctotalObj = {
			id: 'totalTable',
			port: 'listCollectionByPage.do',
			itemId: 'id',
			th: ctotal,
			isOpt: false,
			param: defaultParam
		},
		atotalObj = {
			id: 'totalTable',
			port: 'listAccountByPage.do',
			th: atotal,
			isOpt: false,
			param: defaultParam
		},
		aTypeOpt = [{
			text: '应收款',
			value: 1
		},{
			text: '预收款',
			value: 2
		},{
			text: '直接收款',
			value: 3
		}],
		payOpt = [{
			text: '挂账',
			value: 1
		},{
			text: '会员卡',
			value: 2
		},{
			text: '零现钱',
			value: 3
		}],
		userOpt = [{
			text: '挂账',
			value: 1
		},{
			text: '会员卡',
			value: 2
		},{
			text: '零现钱',
			value: 3
		}],
		aeditObj = {
			itemId: 'mainId',
			id: 'id',
			addurl: '',
			editurl: 'listAccById.do',
			saveurl: 'addAccount.do',
			edittype: 0,
			editItem: [{
				id: 'accountPayableNum', name: '单号', value: ''},{
				id: 'supplierId', name: '供应商编号', value: ''},{
				id: 'supplierName', name: '供应商名称', value: ''},{
				id: 'paymentTerms', name: '支付方式', value: '',type:1,selected:1,options:payOpt},{
				id: 'accountPayee', name: '收款账户', value: '',type:1,selected:1,options:userOpt},{
				id: 'accountType', name: '收款类型', value: '', type: 1, selected:1,options:aTypeOpt},{
				id: 'type', name: '业务类型', value: '', type: 1,selected:1, options:[{text:'采购欠款',value:1},{text: '采购付款',value:2}]},{
				id: 'amount', name: '总金额', value: '', dataType: 'number'},{
				id: 'amountPaid', name: '已付金额', value: ''},{
				id: 'unpaidAmount', name: '未付金额', value: ''},{
				id: 'thisPayment', name: '本次付款', value: ''},{
				id: 'department', name: '部门', value: ''},{
				id: 'note', name: '备注' ,type: 2, value: ''
			}]
		},
		ceditObj = {
			itemId: 'mainId',
			id: 'id',
			addurl: '',
			editurl: 'listCollById.do',
			saveurl: 'addCollection.do',
			edittype: 0,
			editItem: [{
				id: 'useId', name: '客户编号', value: ''},{
				id: 'useName', name: '客户名称', value: ''},{
				id: 'collectionNum', name: '单号', value: ''},{
				id: 'type', name: '业务类型', value: '', type: 1,selected:1, options:[{text:'销售欠款',value:1},{text: '销售付款',value:2}]},{
				id: 'paymentTerms', name: '支付方式', value: '',type:1,selected:1,options:payOpt},{
				id: 'accountPayee', name: '收款账户', value: '',type:1,selected:1,options:userOpt},{
				id: 'accountType', name: '收款类型', value: '', type: 1, selected:1,options:aTypeOpt},{
				id: 'amount', name: '总金额', value: ''},{
				id: 'amountReceived', name: '已收金额', value: ''},{
				id: 'outstandingAmount', name: '未收金额', value: ''},{
				id: 'thisCollection', name: '本次收款', value: ''},{
				id: 'reviewer', name: '审核人', value: ''},{
				id: 'note', name: '备注' ,type: 2, value: ''
			}]
		};
	var isOpt = document.location.href.indexOf('opt.html')>-1;
	if(isOpt){
		// 操作页面
		var param = null,
			totalObj;
		COMMON.addTpl({table:1,th:athAll});
		COMMON.addTpl({edit:1});
		// COMMON.table(tableObj);
		if(COMMON.getQuery('type') ==0){
			// 应收账单
			param = ceditObj;
			totalObj = ctotalObj;
			$('div.opt-tit').html('应收账单');
		}else {
			param = aeditObj;
			totalObj = atotalObj;
			$('div.opt-tit').html('应付账单');
		}
		// 监控支付方式
		param.callback = function(data,vm){
			$('#paymentTerms').on('click', function(){
				var $this = $(this),
					val = $this.val();
				if(val = 1){
					$('#accountPayee').val(1);
					// vm.newData.
				}
			})
			// vm.paymentTerms = vm.newData.paymentTerms;
			// vm.$watch("paymentTerms", function(v) {
			// 	console.log(v);
			// })
		}
		
		COMMON.edit('edit',param);
		COMMON.table(totalObj);
	}else{
		var type = COMMON.getQuery('type');
		$('span','div.tabs').removeClass('on').eq(type).addClass('on');
		$('div.item','div.tabcon').removeClass('on').eq(type).addClass('on');
		// 列表页面
		COMMON.addTpl({table:1,th:athAll});
		COMMON.table(accountAllObj);
		COMMON.table(payAllObj);
		function bindEvent(vm, port){
			//添加左侧可点击的标识
			$('tr td:nth-child(2)','div.tabcon .fleft').css({color: '#00f',cursor:'pointer'});
			$('div.tabcon').off().on('click', 'tr td:nth-child(2)', function(e){
				var a = $(e.target).text(),
					param = $.extend({},defaultParam);
				if(port == 'listCollectionByPage.do'){
					param.userId = a;
				}else{
					param.supplierId = a;
				}
				

				COMMON.ajaxFn({
					url: port,
					obj: param,
					callback: function(json){
						if(json.code == 1){
							vm.tr = json.data.data||[];
						}
					}
				});
			});
		}
	}
});