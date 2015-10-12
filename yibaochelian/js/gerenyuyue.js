/**
* @desc 	首页的逻辑代码
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/

$(function(){
	var $dialog = $('div.winpop'),
		$mask = $('div.mask'),
		OPT = COMMON.OPT,
		colorOpt = OPT.colorOpt || [],
		oilOpt = OPT.oilOpt ||[],
		classOpt = OPT.classOpt ||[],
		yypjTh = [{
			id: 'productID', name: '商品编码'},{
			id: 'productname', name: '商品名称'},{
			id: 'unit', name: '单位'},{
			id: 'productnum', name: '数量'},{
			id: 'unitprice', name: '单价'},{
			// id: 'appointmentNum', name: '领料班组'},{
			id: 'maintenanceMan', name: '领料人'
		}],
		// tjxmTh = [{
		// 	id: 'productID', name: '商品编码'},{
		// 	id: 'productname', name: '商品名称'},{
		// 	id: 'unit', name: '单位'},{
		// 	id: 'productnum', name: '数量'},{
		// 	id: 'unitprice', name: '单价'},{
		// }],

		// 操作页编辑数据
		editObj = {
			itemId: '',
			id: 'appId',
			// addurl: 'maintainformInput.do',
			editurl: 'appointmentDetail.do',
			saveurl: 'appointmentSaveOrUpdate.do',
			editItem: [{
				id: 'truename', name:'车主姓名', value: '', dataType: 'name'},{
				id: 'phone', name:'联系电话', value: '', dataType: 'phone'},{
				id: 'address', name:'地址', value: ''},{
				id: 'platenumber', name:'车牌号', value: ''},{
				id: 'brand', name:'品牌', value: '',click: showDialog},{
				id: 'series', name:'车型', value: '',click: showDialog},{
				id: 'color', name:'颜色', value: '',type:1,selected:'0',options:colorOpt},{
				id: 'motorNumber', name:'发动机号', value: '',dataType:'number'},{
				id: 'oil', name:'油表状态', value: '', type:1, selected: 0, options:oilOpt},{
				id: 'miles', name:'里程', value: ''},{
				id: 'appointmentTime', name:'预约日期', value: '',dataType: 'time'},{
				id: 'facilitatorList', name:'预约4S店', value: '',click: showDialog},{
				id: 'appointmentType', name:'故障类型', value: '', type:1, selected: '保养', options:classOpt},{
				id: 'usedCompontInput', name:'预约配件', value: '', click: showDialog},{
				id: 'recommID', name:'推荐项目', value: '',click: showDialog},{
				id: 'note', name:'备注', value: ''

			}],
			callback: function(data,vm){
				$('span.fred', 'div.opt-tit').html(optionsStatus[data.status]['text']);
				vm.$watch('usedCompontInput', function(){

				})
			}
		},
		// 预约配件
		yypjObj = {
			id: 'yuyuepeijian',
			port: 'usedCompontInput.do',
			// itemId: 'appointmentNum',
			th: yypjTh,
			isCheck: true,
			isOpt: false,
			param: {pageNum:1,status:0},
			callback: function(vm){
					var param = {},
						yypjVal = [],
						$input = $('input:checked',$('div.usedCompontInput'));
					for (var i=0, len=$input.length; i<len; i++){
						yypjVal.push($input.eq(i).val());
					}
					// vm.newData['usedCompontInput'] = yypjVal.join(';');
					$('#usedCompontInput').val(yypjVal.join(';'));
					$dialog.hide();
					$mask.hide();
			}
		};
		// mainId = COMMON.getQuery('id'),
		

		// 如果是操作页
		
		// 添加品牌、车型的选择内容
		COMMON.loadData.brand();
		COMMON.loadData.series();
		COMMON.addTpl({edit:1});
		COMMON.edit('edit',editObj);
		$('#peijian').on('click',function(){
			$('div.dialog-peijian').show();
		});
		// 预约配件
		COMMON.addTpl({table:1,th:yypjTh});
		COMMON.table(yypjObj);
		// 推荐项目
		var tjxmModel = avalon.define('tuijianxiangmu', function(vm){
			
			vm.tr = [];
			vm.getTr = function(){
				var param = $.extend({},COMMON.defaultParam);
				COMMON.ajaxFn({
					url: 'recommendItemList.do',
					obj: param,
					callback: function(json){
						if(json.code == 1){
							vm.tr = json.data || {};
						}
					}
				});
			};
			vm.saveItem = function(){
				saveData('recommID');
				
			};
		});
		avalon.scan();
		
		tjxmModel.getTr();
		
		
	
	function showDialog(id, vm){
		var $dialog = $('div.winpop'),
			$mask = $('div.mask'),
			$bd = $('div.bd', $dialog),
			index = 0;
		if(id == 'appointmentTime'){
			
			// 时间
			// $('#appointmentTime').attr('')
		}else{
			$dialog.show();
			$mask.show();
			$bd.hide();
			$('div.'+id, $dialog).show();
		}
			
	}
	
	

	
});